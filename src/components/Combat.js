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
            player: null,
            opponent: null,
            enviornment: null,
            activePlayer: true,
            isQuest:false,
            log:[],
            isOpponentDead:false,
            theme:null,
        }

        this.handleFlee = this.handleFlee.bind(this);
    }

    componentWillMount(){
        let audio = new Audio(this.props.theme);
        audio.loop = true;
        let activePlayer = true;
        let isQuest = false;
        let playerObjects = this.filterWeapons();
        if(this.props.player.stats[3].value < this.props.opponent.stats[3].value) {
            activePlayer = false;
        }
        if(this.props.bountyObject !== null){
            isQuest = true;
        }
        
        this.setState({
            player : {
                main: this.props.player,
                attackPoints:0,
                maxAttackPoints:0,
                weapons:playerObjects[0],
            },
            opponent: {
                main:this.props.opponent,
                attackPoints: 0,
                maxAttackPoints:0,
                weapons: playerObjects[1],
            },
            canChump:this.props.canChump,
            activePlayer,
            isQuest,
            theme:audio,
        },
        ()=>{
            this.calculateAttackPoints();
            if(!this.state.activePlayer){
                this.aiAttackLogic();
            }
            this.state.theme.play();
        }
        )
    }

    updateLog = (message,isPlayer) => {
        let randomNum = Math.floor(Math.random() * 10000); 
        let log = this.state.log;
        let item = 
        <li className = {`combat-log-item ${isPlayer?"alt-item":null}`} key={message + randomNum}>{message}</li>
        log.unshift(item);
        if(log.length > 10){
            log.pop();
        }
        this.setState({log});
    }

    filterWeapons = () => {
        let player = this.props.player;
        let opponent = this.props.opponent;
        let lightMelee = new Audio('./audio/effects/punch.mp3');
        let heavyMelee = new Audio('./audio/effects/kick.mp3');
        let punch = {
            name: 'Punch',
            description: 'Good old fashioned knuckle sandwich.',
            isMelee:true,
            apCost: 5,
            audio:lightMelee,
            damage: 3,
            accuracy: 95,
            effect: () => {
                return {damage:3, apCost:5,accuracy:95}
              }
        }
        let kick = {
            name: 'Kick',
            description: 'Kick him RIGBABY',
            isMelee:true,
            apCost: 10,
            audio:heavyMelee,
            damage: 6,
            accuracy: 95,
            effect: () => {
                return {damage:6, apCost:5,accuracy:95}
              }
        }

        let playerWeapons = [];
        let opponentWeapons = [];

        playerWeapons = player.activeWeapons;
        let currentWeapons = [];

        playerWeapons.forEach((weaponId,i)=>{
            let selectedWeapon = Weapons.filter((weapon)=>{
                return weapon.id === weaponId;
            });
            let weaponObject = selectedWeapon[0];
            return currentWeapons.push(weaponObject);
        })
        opponentWeapons = opponent.inventory.filter(item => item.isWeapon); 

        currentWeapons.unshift(punch,kick);
        opponentWeapons.unshift(punch,kick);
        
        return [currentWeapons,opponentWeapons]
    }

    handleRanged = (isPlayer,weapon,isCriticalHit) => {
        let runAttack = weapon.effect();
        let baseDamage = runAttack.damage;
        if(isCriticalHit){
            baseDamage *= 2;
        }
        return baseDamage;
    }

    calculateMeleeDamage = (isPlayer,weapon,isCriticalHit) => {
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

        let unfilteredMoves = opponent.weapons.filter((weapon)=>{
            return opponent.attackPoints >= weapon.apCost;
        });

        let rangedWeapons = unfilteredMoves.filter((weapon)=>{
            return !weapon.isMelee;
        });

        let ammoFilteredWeapons = rangedWeapons.filter((weapon)=>{
            return opponent.main.ammo[weapon.ammoId].amount >= weapon.ammoCost;
        });

        let meleeAttacks = unfilteredMoves.filter((weapon)=>{
            return weapon.isMelee;
        });

        let possibleMoves = ammoFilteredWeapons.concat(meleeAttacks);

        let killerMoves = possibleMoves.filter((weapon) => {
            let damage = this.calculateMeleeDamage(false,weapon,false);
            return damage >= player.main.health;
        });

        setTimeout(()=>{
            if(possibleMoves.length === 0){
                //CHECK IN THIS ARE FOR THE BUG
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
        },1000);
        
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
        if(!weapon.isMelee){//ranged weapon ammo handling
            let ammoType= attacker.main.ammo[weapon.ammoId];
            let difference = ammoType.amount - weapon.ammoCost;
            console.log(difference);
            if(!ammoType.amount >= weapon.ammoCost){
                if(!isPlayer){
                    this.aiAttackLogic();
                    return;
                }
                return; //display message (like SAVED)
            }
        }

        let isCrit = this.isCritical(isPlayer);
        let didHit = calculateAccuracy();
        
        let attackDamage = 0;
        let message = undefined;
        
        if(weapon.isMelee){
            attackDamage = this.calculateMeleeDamage(isPlayer,weapon,isCrit);
        }
        else{
            attackDamage = this.handleRanged(isPlayer,weapon,isCrit);
        }

        if(!didHit){
            message=`${attacker.main.name}'s ${weapon.name} attack missed!`;
            attackDamage=0;
        }
        else{
            message = `${isCrit?"CRITICAL ":""}${attacker.main.name} uses ${weapon.name} on ${target.main.name} for ${attackDamage} DMG`;
            weapon.audio.play();
        }
        target.main.health -= attackDamage;

        if(!weapon.isMelee){
            attacker.main.ammo[weapon.ammoId].amount -= weapon.ammoCost;
        }

        attacker.attackPoints -= weapon.apCost;

        if(isPlayer){
            this.setState({player:attacker,opponent:target},
                ()=>{
                    this.updateLog(message,true);
                    if(attacker.attackPoints <= 0){
                        this.handleEndOfAttack(true,true);
                    }
                    else{
                        this.handleEndOfAttack(false,true);
                    }
                });
        }
        else{
            this.setState({player:target,opponent:attacker},()=>{
                this.updateLog(message,false);
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
        console.log({forceEndTurn,isPlayer});
        let player = this.state.player;
        let opponent = this.state.opponent;

        if(player.main.health <= 0){
            this.handleDeath(true);
            return;
        }
        if(opponent.main.health <= 0){
            this.handleDeath(false);
            //Return to store.
            return;
        }

        if(forceEndTurn){
            let activePlayer = undefined;
            if(isPlayer){
                activePlayer=false;
                player.attackPoints += Math.ceil(player.maxAttackPoints*.75);
                if(player.attackPoints >= player.maxAttackPoints || player.maxAttackPoints <= 5){
                    player.attackPoints = player.maxAttackPoints;
                }
            }
            else{
                activePlayer = true;
                opponent.attackPoints += Math.ceil(opponent.maxAttackPoints*.75);
                if(opponent.attackPoints >= opponent.maxAttackPoints || opponent.maxAttackPoints <= 5){
                    opponent.attackPoints = opponent.maxAttackPoints;
                }
            }
            this.setState({
                player,
                opponent,
                activePlayer,
            },()=>{
                if(!this.state.activePlayer){
                    this.aiAttackLogic();
                }
            });
        }
        else{
            if(!isPlayer){
                this.aiAttackLogic();
            }
        }

    }

    handleDeath(isPlayer){
        let player = this.state.player;
        let opponent = this.state.opponent;
        if(isPlayer){
            this.state.theme.pause();
            this.props.handleDeath(opponent.main.skin);
        }
        else{
            this.setState({isOpponentDead:true});
            let bonusMessage = null;
            let deathSound = new Audio('./audio/effects/bart.mp3');
            deathSound.play();
            setTimeout(()=>{
                document.querySelector('.opponent').classList.add("paused");
            },2300);

            if(this.props.bonusReward !== null){
                let randomNum = Math.floor(Math.random() * 1000); 
                let chance = this.props.bonusRewardChance;
                if(chance+player.main.stats[4].value >= randomNum){

                    if(!isNaN(this.props.bonusReward)){
                        console.log('is skin');
                        if(this.props.checkForSkin(this.props.bonusReward)){
                            console.log('you already have this skin')
                        }
                        else{
                            this.props.addSkin(this.props.bonusReward);
                            bonusMessage = <div style={{display:'flex',flexDirection:'column',alignContent:'center',alignItems:'center'}}><div style={{background: `url(./images/other/you${this.props.bonusReward}.png)`, width:'2em',height:'2em',backgroundSize:'cover', borderRadius:'5px'}}></div><p>You've earned a new skin!</p></div>
                        }
                    }
                    
                    else{
                        if(this.props.bonusReward.isConsumable){
                            bonusMessage = <p>You also found <span className="positive">{this.props.bonusReward.name}</span> on {opponent.main.name}'s body.</p>
                            this.props.addInventoryItem(this.props.bonusReward);
                            console.log('consumbale');
                        }
                        if(this.props.bonusReward.isWeapon){
                            bonusMessage = <p>You also found <span className="positive">{this.props.bonusReward.name}</span> on {opponent.main.name}'s body.</p>
                            if(!this.props.checkForItem(this.props.bonusReward.id)){
                                this.props.addInventoryItem(this.props.bonusReward);
                            }
                            else{
                                console.log('no');
                            }
                        }      
                    }
                }
            }

            player.main.money += opponent.main.money;
            player.main.streetCred += 5;

            let message = 
            <div className="message-box">
                <p>You find <span className="positive">{opponent.main.money} dollars</span> in {opponent.main.name}'s' wallet.</p>
                <p>The people heard how you beat down {opponent.main.name} and you earned <span className="positive">5 street cred!</span></p>
                {bonusMessage}
                <button className="main-button" onClick={()=>{
                    if(this.state.isQuest){
                        let bountyObject = this.props.bountyObject;
                        bountyObject.complete = true;
                        this.props.updateBountyList(bountyObject);
                    }
                    this.state.theme.pause();
                    this.props.updatePlayerState(player.main);
                    this.props.updateTime(false,4);
                    if(this.props.shopId === undefined){
                        this.props.updateGameState(2);
                    }
                    else{
                        this.props.updateGameState(3);
                    }
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
                this.state.theme.pause();
                player.main.streetCred -= highCredLost;
                this.props.updatePlayerState(player.main);
                this.props.updateTime(false,4);
                if(this.props.shopId === undefined){
                    this.props.updateGameState(2);
                }
                else{
                    this.props.updateGameState(3);
                }
            }}>Give {opponent.main.name} ${lowMoneyLost} and lose {highCredLost} street cred.</button>
            <button className="main-button" onClick={()=>{
                player.main.money -= highMoneyLost;
                this.state.theme.pause();
                player.main.streetCred -= lowCredLost;
                this.props.updatePlayerState(player.main);
                this.props.updateTime(false,4);
                if(this.props.shopId === undefined){
                    this.props.updateGameState(2);
                }
                else{
                    this.props.updateGameState(3);
                }
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
                    <button disabled={!this.state.activePlayer || this.state.isOpponentDead} className="main-button" onClick={()=>{this.handleEndOfAttack(true,true)}}>Pass</button>
                    <button disabled={!this.state.activePlayer || !this.state.canChump || this.state.isOpponentDead} className="main-button" onClick={this.handleFlee}>Chump out</button>
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
                        <ul className="ammo-section">
                            {
                                player.main.ammo.map((ammoType)=>{
                                    return (
                                    <li className="ammo" key={ammoType.name}>
                                    <img src={`./images/ammo/${ammoType.id}.png`} alt={ammoType.name}/><span>x{ammoType.amount}</span>
                                    </li>)
                                })
                            }
                        </ul>
                       </div>
                       <div className="combat-options">
                                {
                                    player.weapons.map((weapon,i)=>{
                                        return <CombatWeapon 
                                            isOpponentDead={this.state.isOpponentDead}
                                            player={this.state.player.main}
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
                </div>

                <div className="combat-visuals">
                    <div className="combat-arena">
                        <div className="combat-icon player"
                        style={{backgroundImage:`url(./images/other/you${player.main.skin}.png)`}}
                         ></div>
                        <div className={this.state.isOpponentDead?"combat-icon opponent death-opponent":"combat-icon opponent"} 
                        style={{backgroundImage:`url(./images/other/${opponent.main.skin})`}}
                        ></div>
                    </div>
                    <div>
                        <ul className="combat-log">
                            {
                                this.state.log.map((logItem,i)=>{
                                    return logItem
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
                    <ul className="ammo-section">
                            {
                                opponent.main.ammo.map((ammoType)=>{
                                    return (
                                    <li className="ammo" key={ammoType.name}>
                                    <img src={`./images/ammo/${ammoType.id}.png`} alt={ammoType.name}/><span>x{ammoType.amount}</span>
                                    </li>)
                                })
                            }
                        </ul>
                </div>
                <div className="combat-options">
                {
                    opponent.weapons.map((weapon,i)=>{
                        return <CombatWeapon 
                            key={"opponentWeapon" + i}
                            player={this.state.opponent.main}
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