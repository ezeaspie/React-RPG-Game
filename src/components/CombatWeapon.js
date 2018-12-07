import React, {Component} from 'react';

class CombatWeapon extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    
    render(){
        let isDisabled = false;

        if(this.props.isPlayer){
            if(this.props.isOpponentDead){
                isDisabled=true;
            }
            if(this.props.attackPoints < this.props.weapon.apCost){
                isDisabled = true;
            }
            if(this.props.isPlayer && !this.props.isActive){
                isDisabled = true;
            }
            if(!this.props.weapon.isMelee && this.props.weapon.ammoCost > this.props.player.ammo[this.props.weapon.ammoId].amount){
                isDisabled = true;
            }
        }


        let invalidStyle= {
            opacity:'.5',
        }

        return(
            <button className="combat-weapon"
            disabled={isDisabled} 
            style={this.props.attackPoints < this.props.weapon.apCost?invalidStyle:null}
            onClick={
                this.props.isPlayer?
                ()=>{this.props.handleAttack(true,this.props.weapon)}
                :()=>{return false}
                }>
                <p className="weapon-name">{this.props.weapon.name}</p>
                <p className="weapon-data">{this.props.weapon.damage} DMG | {this.props.weapon.apCost} AP</p>
                <p className="weapon-acc">{this.props.weapon.accuracy} ACC{this.props.weapon.isMelee?null:` | ${this.props.weapon.ammoCost} ${this.props.player.ammo[this.props.weapon.ammoId].abbreviation}`}</p>
            </button>
        )
    }
}

export default CombatWeapon;