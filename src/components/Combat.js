import React, { Component } from 'react';

class Combat extends Component {
    constructor(props){
        super(props);
        this.state = {
            player: this.props.player,
            opponent: this.props.opponent,
            enviornment: null,
            playerAP:0,
            playerMaxAP: 0,
            opponentAP:0,
            opponentMaxAP: 0,
            activePlayer: true,
        }
    }

    componentWillMount(){
        this.calculateAttackPoints();
        if(this.state.player.stats[3].value < this.state.opponent.stats[3].value) {
            this.setState({activePlayer:false});
            console.log(true);
        }
    }

    filterWeapons = (player) => {
        const weapons = player.inventory.filter(item => item.isWeapon);
    }

    aiAttackLogic = () => {
        let player = this.state.player;
        let opponent = this.state.opponent;
        let agility = this.state.opponentAP;


    }

    calculateAttackPoints = () => {
        let player = this.state.player;
        let opponent = this.state.opponent;
        let pAgility = player.stats[3].value;
        let oAgility = opponent.stats[3].value;

        const attackPointFunction = (agility) => {
            let floorAgility = Math.floor(agility/2);
            let finalAgility = 5 + floorAgility;
            return finalAgility;
        }
        
        let playerAP = attackPointFunction(pAgility);
        let opponentAP = attackPointFunction(oAgility);
        this.setState({
            playerMaxAP:playerAP,
            opponentMaxAP:opponentAP,
            playerAP,
            opponentAP,   
        });
    }

    handleAttack = (playerOrOpponent, amount, attackPoints, isWeapon) => {
        let attacker = null;
        let attackerAP = null;
        let target = null;
        let opponentAP = null;

        if(playerOrOpponent){
            attacker = this.state.player;
            target = this.state.opponent;
        }
        else{
            attacker = this.state.opponent;
            target = this.state.player;
        }
        target.health -= amount;
        attackerAP -= attackPoints;

        if(playerOrOpponent){
            this.setState({
                playerAP : attackerAP,
                opponent : target,
            });
        }
        else{
            this.setState({
                opponentAP : attackerAP,
                player : target,
            });
        }
    }

    render(){
        let player = this.props.player;
        let opponent = this.props.opponent;
        let playerAP = this.state.playerAP;
        let playerMaxAP = this.state.playerMaxAP;
        let opponentAP = this.state.opponentAP;
        let opponentMaxAP = this.state.opponentMaxAP;
        return(
            <div>
                <div>
                    <h1>{player.name}</h1>
                    <p>{player.health}/{player.maxHealth} HP</p>
                    <meter value={player.health} min="0" max={player.maxHealth}></meter>
                    <p>{playerAP}/{playerMaxAP} AP</p>
                    <meter value={playerAP} min="0" max={playerMaxAP}></meter>
                        {
                            this.state.activePlayer?
                            <div>
                                <button onClick={()=>{this.handleAttack(true,player.stats.strength,5,false)}}>Punch</button>
                                <button>Kick</button>
                                <button>Flee</button>
                                <button>Show Inventory</button>
                            </div>
                            :
                            null
                        }
                        
                </div>

                <div>
                    <h1>{opponent.name}</h1>
                    <p>{opponent.health}/{opponent.maxHealth} HP</p>
                    <meter value={opponent.health} min="0" max={opponent.maxHealth}></meter>
                    <p>{opponentAP}/{opponentMaxAP} AP</p>
                    <meter value={opponentAP} min="0" max={opponentMaxAP}></meter>
                </div>
            </div>
        )
    }
}

export default Combat;