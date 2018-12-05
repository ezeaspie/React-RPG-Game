import React, {Component} from 'react';

class CombatWeapon extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    
    render(){

        let invalidStyle= {
            opacity:'.5',
        }

        return(
            <button className="combat-weapon"
            disabled={this.props.isPlayer && !this.props.isActive?true:false} 
            style={this.props.attackPoints < this.props.weapon.apCost?invalidStyle:null}
            onClick={
                this.props.isPlayer?
                ()=>{this.props.handleAttack(true,this.props.weapon)}
                :()=>{return false}
                }>
                <p className="weapon-name">{this.props.weapon.name}</p>
                <p className="weapon-data">{this.props.weapon.damage} DMG | {this.props.weapon.apCost} AP</p>
                <p className="weapon-acc">{this.props.weapon.accuracy} ACC</p>
            </button>
        )
    }
}

export default CombatWeapon;