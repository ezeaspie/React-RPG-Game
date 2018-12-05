import React, { Component } from 'react';
import Weapons from '../gameAssets/weapons';
import CombatWeapon from './CombatWeapon';

class Combat extends Component {
    constructor(props){
        super(props);
        this.state = {
            canChump:true,
            dialogBox:false,
            dialogContent:null,
            player: {
                main:this.props.player,
                attackPoints: 0,
                maxAttackPoints:0,
                weapons: [],
            },
            opponent: {
                main:this.props.opponent,
                attackPoints: 0,
                maxAttackPoints:0,
                weapons: [],
            },
            enviornment: null,
            activePlayer: true,
            isQuest:false,
            log:[],
        }

        this.handleFlee = this.handleFlee.bind(this);
    }

    componentWillMount(){
        this.setState({canChump:this.props.canChump});
        if(this.props.bountyObject !== null){
            this.setState({isQuest:true});
        }
        this.calculateAttackPoints();
        if(this.state.player.main.stats[3].value < this.state.opponent.main.stats[3].value) {
            this.setState({activePlayer:false});
        }
        this.filterWeapons();
    }

    updateLog = (message) => {
        let log = this.state.log;
        log.unshift(message);
        if(log.length > 10){
            log.pop();
        }
        this.setState({log});
    }

    filterWeapons = () => {
        let player = this.state.player;
        let opponent = this.state.opponent;
        let punch = {
            name: 'Punch',
            description: 'Good old fashioned knuckle sandwich.',
            apCost: 5,
            damage: 3,
            accuracy: 95,
            effect: () => {
                return {damage:3, apCost:5,accuracy:95}
              }
        }
        let kick = {
            name: 'Kick',
            description: 'Kick him RIGBABY',
            apCost: 10,
            damage: 6,
            accuracy: 95,
            effect: () => {
                return {damage:6, apCost:5,accuracy:95}
              }
        }

        let playerWeapons = [];
        let opponentWeapons = [];

        playerWeapons = player.main.activeWeapons;

        playerWeapons.forEach((weaponId,i)=>{
            let selectedWeapon = Weapons.filter((weapon)=>{
                return weapon.id === weaponId;
            });
            let weaponObject = selectedWeapon[0];
            return playerWeapons[i] = weaponObject;
        })

        opponentWeapons = opponent.main.inventory.filter(item => item.isWeapon); 

        playerWeapons.unshift(punch,kick);
        opponentWeapons.unshift(punch,kick);
        
        player.weapons = playerWeapons;
        opponent.weapons = opponentWeapons;
        
        this.setState({player,opponent});
    }

    calculateAttackDamage = (isPlayer,weapon,isCriticalHit) => {
        let user = undefined;
        let runAttack = weapon.effect();
        let baseDamage = runAttack.damage;
        let damageBuff = 0; //Used to add to perks and stuff probably in the future
        if(isPlayer){
            user = this.state.player.main;
        }
        else{
            user = this.state.opponent.main;
        }

        let meeleeBuffCalculation = () => {
            let strength = user.stats[1].value;
            let buffCap = baseDamage/2;
            let strengthPercentage = strength * .01;

            let buff = buffCap * strengthPercentage;
            console.log({buff,buffCap,strength});
            return Math.floor(buff);
        }

        damageBuff = meeleeBuffCalculation();

        damageBuff += baseDamage;

        if(isCriticalHit){
            damageBuff *= 2;
            return damageBuff;
        }
        return damageBuff;
    }

    aiAttackLogic = () => {
        let player = this.state.player;
        let opponent = this.state.opponent;

        let possibleMoves = opponent.weapons.filter((weapon)=>{
            return opponent.attackPoints >= weapon.apCost;
        });

        let killerMoves = possibleMoves.filter((weapon) => {
            let damage = this.calculateAttackDamage(false,weapon,false);
            return damage >= player.main.health;
        });
        if(possibleMoves.length === 0){
            console.log("no possible moves");
            this.handleEndOfAttack(true,false);
            return;
        }
        if(killerMoves[0] !== undefined){
            this.handleAttack(false,killerMoves[0]);
        }
        else{
            let randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
            this.handleAttack(false,randomMove);
        }
    }

    calculateAttackPoints = () => {
        let player = this.state.player.main;
        let opponent = this.state.opponent.main;
        let pAgility = player.stats[3].value;
        let oAgility = opponent.stats[3].value;

        const attackPointFunction = (agility) => {
            let floorAgility = Math.floor(agility/2);
            if(floorAgility < 5){
                floorAgility = 5;
            }
            if(floorAgility >= 50){
                floorAgility = 50;
            }
            return floorAgility;
        }
        
        let playerAP = attackPointFunction(pAgility);
        let opponentAP = attackPointFunction(oAgility);

        let playerClone = this.state.player;
        let opponentClone = this.state.opponent;

        playerClone.attackPoints = playerAP;
        opponentClone.attackPoints = opponentAP;
        playerClone.maxAttackPoints = playerAP;
        opponentClone.maxAttackPoints = opponentAP;

        this.setState({
            player: playerClone,
            opponent: opponentClone,  
        });
    }

    isCritical = (isPlayer) => {
        let attacker = null;

        if(isPlayer){
            attacker = this.state.player;
        }
        else{
            attacker = this.state.opponent;
        }
        let critPercentage = Math.floor(attacker.main.stats[4].value/3);
        let randomNum = Math.floor(Math.random() * 100); 
        if(critPercentage >= randomNum){
            return true;
        }
        return false;
    }

    handleAttack = (isPlayer, weapon) => {
        let attacker = null;
        let target = null;

        let calculateAccuracy = () => {
            let randomNum = Math.floor(Math.random() * 100);
            //let playerAccuracyModifier = player.accuracy <= this will be a way to track accuracy deficits and boosts +-5,etc.
            let accuracy = weapon.accuracy;
            if(accuracy >= randomNum){
                return true;
            }
            return false;
        }

        if(!calculateAccuracy){
            this.updateLog(`${attacker.main.name}'s ${weapon.name} attack missed!`);
            return;
        }
        if(isPlayer){
            attacker = this.state.player;
            target = this.state.opponent;
        }
        else{
            attacker = this.state.opponent;
            target = this.state.player;
        }
        if(weapon.apCost > attacker.attackPoints){
            return;
        }

        let isCrit = this.isCritical(isPlayer);

        let attackDamage = this.calculateAttackDamage(isPlayer,weapon,isCrit);

        target.main.health -= attackDamage;

        attacker.attackPoints -= weapon.apCost;

        if(isCrit){
            this.updateLog(console.log('CRITICAL HIT'));
        }
        this.updateLog(`${attacker.main.name} uses ${weapon.name} on ${target.main.name} for ${attackDamage} DMG`);

        if(isPlayer){
            this.setState({player:attacker,opponent:target},
                ()=>{
                    if(attacker.attackPoints <= 0){
                        this.handleEndOfAttack(true,true);
                    }
                    else{
                        this.handleEndOfAttack(false);
                    }
                });
        }
        else{
            this.setState({player:target,opponent:attacker},()=>{
                if(attacker.attackPoints <= 0){
                    this.handleEndOfAttack(true,false);
                }
                else{
                    this.handleEndOfAttack(false);
                }
            });
        }
    }

    handleEndOfAttack = (forceEndTurn,isPlayer=false) => {
        let player = this.state.player;
        let opponent = this.state.opponent;

        if(forceEndTurn){
            if(isPlayer){
                player.attackPoints += Math.ceil(player.maxAttackPoints*.75);
                if(player.attackPoints >= player.maxAttackPoints || player.attackPoints < 5){
                    player.attackPoints = player.maxAttackPoints;
                }
            }
            else{
                opponent.attackPoints += Math.ceil(opponent.maxAttackPoints*.75);
                if(opponent.attackPoints >= opponent.maxAttackPoints || opponent.attackPoints < 5){
                    opponent.attackPoints = opponent.maxAttackPoints;
                }
            }
            this.setState({
                player,
                opponent,
                activePlayer:!this.state.activePlayer,
            });
        }

        if(player.main.health <= 0){
            console.log("PLAYER DIED");
            this.handleDeath(true);
            return;
        }
        if(opponent.main.health <= 0){
            console.log("OPPONENT DIED");
            this.handleDeath(false);
            //Return to store.
            return;
        }
    }

    handleDeath(isPlayer){
        let player = this.state.player;
        let opponent = this.state.opponent;
        if(isPlayer){
            this.props.updateGameState(6);
        }
        else{
            //Play Opponent Died message.
            //Give STR buff?
            player.main.money += opponent.main.money;
            player.main.streetCred += 5;

            let message = 
            <div className="message-box">
                <p>You find {opponent.main.money} dollars in {opponent.main.name}'s' wallet.</p>
                <p>The people heard how you beat down ${opponent.main.name} and you earned 5 street cred!</p>
                <button className="main-button" onClick={()=>{
                    if(this.state.isQuest){
                        let bountyObject = this.props.bountyObject;
                        bountyObject.complete = true;
                        this.props.updateBountyList(bountyObject);
                    }
                    this.props.updatePlayerState(player.main);
                    this.props.updateTime(false,4);
                    this.props.updateGameState(3);
                }}>Ok</button>
            </div>
            this.setState({dialogBox:true,dialogContent:message});
        }
    }

    handleFlee (){
        let player = this.state.player;
        let opponent = this.state.opponent;

        let lowMoneyLost = Math.ceil(player.main.money*.2);
        let highCredLost = Math.ceil(player.main.streetCred*.4);

        let highMoneyLost = Math.ceil(player.main.money*.4);
        let lowCredLost = Math.ceil(player.main.streetCred * .2);

        let isButtonDisabled = false;

        if(highCredLost === 0){
            isButtonDisabled = true;
        }
        
        let message = 
        <div className="message-box">
            <div className="chump-options">
            <button className="main-button" 
            disabled={isButtonDisabled}
            onClick={()=>{
                player.main.money -= lowMoneyLost;
                player.main.streetCred -= highCredLost;
                this.props.updatePlayerState(player.main);
                this.props.updateTime(false,4);
                this.props.updateGameState(3);
            }}>Give {opponent.main.name} ${lowMoneyLost} and lose {highCredLost} street cred.</button>
            <button className="main-button" onClick={()=>{
                player.main.money -= highMoneyLost;
                player.main.streetCred -= lowCredLost;
                this.props.updatePlayerState(player.main);
                this.props.updateTime(false,4);
                this.props.updateGameState(3);
            }}>Give {opponent.main.name} ${highMoneyLost} and lose {lowCredLost} street cred.</button>
            </div>
           
            <button className="sub-button" onClick ={()=>{this.setState({dialogBox:false})}}>I'm not a chump!</button>
        </div>

        this.setState({dialogContent: message, dialogBox:true});
    }

    render(){
        let player = this.state.player;
        let opponent = this.state.opponent;

        let CalculateMeterParams = (highOrLow,isPlayer) => {
            let playerData = undefined;
            if(isPlayer){
                playerData = player;
            }
            else{
                playerData = opponent;
            }
            let low = playerData.main.maxHealth/3;
            let high = low * 2;
            let optimum = playerData.main.maxHealth-5;

            if(highOrLow === 0) {
                return Math.ceil(high);
            }
            if(highOrLow === 1){
                return Math.ceil(low);
            }
            return Math.ceil(optimum);
        }
        return(
            <div className="combat">
                {
                    this.state.dialogBox?
                    this.state.dialogContent:
                    null
                }
                <div className="combat-buttons">
                    <button disabled={!this.state.activePlayer} className="main-button" onClick={()=>{this.handleEndOfAttack(true,true)}}>Pass</button>
                    <button disabled={!this.state.activePlayer || !this.state.canChump} className="main-button" onClick={this.handleFlee}>Chump out</button>
                </div>
                
                <div className="combat-player main">
                    <div className="combat-info">
                        <h1 className="combat-name">{player.main.name}</h1>
                        <div className="meter-section">
                            <p className="combat-health">{player.main.health}/{player.main.maxHealth} HP</p>
                            <meter className="combat-health-meter"
                            value={player.main.health} 
                            low={CalculateMeterParams(1,true)}
                            high={CalculateMeterParams(0,true)}
                            optimum={CalculateMeterParams(2,true)}
                            min="0" 
                            max={player.main.maxHealth}></meter>    
                        </div>
                        <div className="meter-section">
                            <p className="combat-ap">{player.attackPoints}/{player.maxAttackPoints} AP</p>
                            <meter className="combat-ap-meter" value={player.attackPoints} min="0" max={player.maxAttackPoints}></meter>
                        </div>
                       </div>
                       <div className="combat-options">
                                {
                                    player.weapons.map((weapon,i)=>{
                                        return <CombatWeapon 
                                            key={"playerWeapon" + i}
                                            isPlayer={true}
                                            weapon={weapon}
                                            isActive={this.state.activePlayer}
                                            handleAttack={this.handleAttack}
                                            attackPoints={player.attackPoints}
                                        />
                                    })
                                }
                            </div>
                        {
                            this.state.activePlayer?
                            null
                            : 
                            <div style={{display:'none'}}>
                            {
                                opponent.attackPoints === 0?
                                null:
                                setTimeout(this.aiAttackLogic,1500)
                            }
                            </div>
                        }
                        
                </div>

                <div className="combat-visuals">
                    <div>
                        <div>COMBAT ICON</div>
                        <div>COMBAT ICON II</div>
                    </div>
                    <div>
                        <ul className="combat-log">
                            {
                                this.state.log.map((logItem,i)=>{
                                    return <li className = "combat-log-item" key={"log"+i}>{logItem}</li>
                                })
                            }
                        </ul>
                    </div>
                </div>

                <div className="combat-opponent main">
                <div className="combat-info">
                    <h1 className="combat-name">{opponent.main.name}</h1>
                    <p className="combat-health">{opponent.main.health}/{opponent.main.maxHealth} HP</p>
                    <meter 
                    className="combat-health-meter"
                    value={opponent.main.health} 
                    low={CalculateMeterParams(1,false)}
                    high={CalculateMeterParams(0,false)}
                    optimum={CalculateMeterParams(2,false)}
                    min="0" max={opponent.main.maxHealth}></meter>
                    <p className="combat-ap">{opponent.attackPoints}/{opponent.maxAttackPoints} AP</p>
                    <meter className="combat-ap-meter" value={opponent.attackPoints} min="0" max={opponent.maxAttackPoints}></meter>
                </div>
                <div className="combat-options">
                {
                    opponent.weapons.map((weapon,i)=>{
                        return <CombatWeapon 
                            key={"opponentWeapon" + i}
                            isPlayer={false}
                            weapon={weapon}
                        />
                    })
                }
                </div>
                </div>
            </div>
        )
    }
}

export default Combat;