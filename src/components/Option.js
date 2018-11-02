import React, { Component } from 'react';

class Option extends Component {

handleRobbery = () => {
    if(this.props.checkTime(6)){
        let returnValue = this.props.option.effect();
        if(this.props.option.name === "Rob the Place"){
         this.props.updateLog(returnValue[4]); 
         this.props.updateTime(false,6);
         //ADD 7 TO TOTAL DAYS.
         let content = 
         <div className="message-box" style={{background:"rgba(0,0,0,.75)", color: "#E7DFDD"}}>
            <p>{returnValue[4]}</p>
            <p>Cash: +{returnValue[5]}</p>
            <p>StreetCred: +{returnValue[6]}</p>
            <button className="sub-button" onClick ={()=>{this.props.setDialougeBox(false,null)}}>Ok</button>
        </div>
        this.props.forceRender();
        if(!returnValue[1]){
            this.props.updateTime(true,24);
            this.props.goToJail(returnValue[5],returnValue[6],returnValue[7],returnValue[8]);
            return;
        }
        this.props.setDialougeBox(true,content);
        this.props.updatePlayerState(returnValue[0]);
        }
    }
    else{
        let content = 
        <div className="message-box" style={{background:"rgba(0,0,0,.75)", color: "#E7DFDD"}}>
            <p>It's a bit too late to try a robbery don't you think?</p>
            <button className="sub-button" onClick ={()=>{this.props.setDialougeBox(false,null)}}>Ok mom</button>
        </div>
         this.props.setDialougeBox(true,content);
    }
}
runEffectandUpdate = () => {
    let returnValue = this.props.option.effect();
    if(returnValue !== undefined){
        this.props.updatePlayerState(returnValue[0]);
        let content = 
        <div className="message-box" style={{background:"rgba(0,0,0,.75)", color: "#E7DFDD"}}>
            <div>{returnValue[1]}</div>
            <button className="sub-button" onClick ={()=>{this.props.setDialougeBox(false,null)}}>Ok</button>
        </div>
        this.props.setDialougeBox(true,content);
        this.props.forceRender();
    }

}

calculateRobChance = () => {
        let chance = this.props.option.getData();
        return <div>
            <p>{this.props.option.name} - {chance[0]}% chance of success</p>
            <p>Store Difficulty : {chance[1]}</p>
            </div>
}

    render(){
        let isRobbery = false;
        let content = <p>{this.props.option.name}</p>
        if(this.props.option.name === "Rob the Place"){
            isRobbery = true;
            content = this.calculateRobChance();
        }
        return(
            <li 
            className="option" 
            onClick={isRobbery?this.handleRobbery:this.runEffectandUpdate}>
            {content}
            </li>
        )
    }
}

export default Option;