import React , { Component } from 'react';
import Option from './Option';

class Interface extends Component {

    updatePlayer = (stats = this.props.playerData.stats,inv = this.props.playerData.inventory,money =this.props.playerData.money ,health = this.props.playerData.health ,maxHealth = this.props.playerData.maxHealth) => {
        let newObject = {name: this.props.playerData.name, stats, inventory:inv,money,health,maxHealth}    
        console.log(newObject);
    }

    render(){
        let playerData = this.props.playerData;
        
        return(
            <div className="store">
                <h1>{this.props.storeData.name}</h1>
                <ul>
                    {this.props.storeData.options.map((option,i)=>{
                        return <li key={"option" + i} onClick={()=>{option.effect()}}>
                        {option.name}
                        </li>
                    })}
                </ul>
                <button onClick={()=>{this.props.updateGameState(2)}}>Back</button>
            </div>
            
        )
    }
}

export default Interface;