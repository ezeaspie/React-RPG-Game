import React, { Component } from 'react';

class Option extends Component {

runEffectAndUpdate = () => {
    let returnValue = this.props.option.effect();
    if(this.props.option.name === "Rob the Place"){
     this.props.updateLog(returnValue[4]);   
    }
    if(returnValue !== undefined){
        this.props.updatePlayerState(returnValue[0]);
    }
}

calculateRobChance = () => {
    if(this.props.option.name === "Rob the Place"){
        let chance = this.props.option.effect();
        console.log(chance);
        return <div className="rob">
            <p>{this.props.option.name} - {chance[2]}% chance of success</p>
            <p>Store Difficulty : {chance[3]}</p>
            </div>
    }
     return <p>{this.props.option.name}</p>
}
//IE: Thank you, come again - if true => BROKE ALERT - if false
    render(){
        return(
               <li className="option" onClick={this.runEffectAndUpdate}>{this.calculateRobChance()}</li>
        )
    }
}

export default Option;