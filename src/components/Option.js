import React, { Component } from 'react';

class Option extends Component {

runEffectAndUpdate = () => {
    let returnValue = this.props.option.effect();
    if(this.props.option.name === "Rob the Place"){
     this.props.updateLog(returnValue[4]); 
     let content = 
     <div className="message-box" style={{background:"rgba(0,0,0,.75)", color: "#E7DFDD"}}>
        <p>{returnValue[4]}</p>
        <p>Cash: +{returnValue[5]}</p>
        <p>StreetCred: +{returnValue[6]}</p>
        <button className="sub-button" onClick ={()=>{this.props.setDialougeBox(false,null)}}>Ok</button>
    </div>
    if(!returnValue[1]){
        content = 
    <div className="message-box" style={{background:"rgba(0,0,0,.75)", color: "#E7DFDD"}}>
        <p>{returnValue[4]}</p>
        <p>Health: -{returnValue[5]}</p>
        <p>StreetCred: -{returnValue[6]}</p>
        <button className="sub-button" onClick ={()=>{this.props.setDialougeBox(false,null)}}>Ok</button>
    </div>
    }
    this.props.setDialougeBox(true,content);
    }
    if(returnValue !== undefined){
        this.props.updatePlayerState(returnValue[0]);
    }
}

calculateRobChance = () => {
    if(this.props.option.name === "Rob the Place"){
        let chance = this.props.option.getData();
        console.log(chance);
        return <div className="rob">
            <p>{this.props.option.name} - {chance[0]}% chance of success</p>
            <p>Store Difficulty : {chance[1]}</p>
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