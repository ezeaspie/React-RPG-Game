import React, { Component } from 'react';

class Option extends Component {

runEffectAndUpdate = () => {
    let returnValue = undefined;
    if(this.props.option.name === "Rob the Place"){
        console.log("ROBBERY IN PROGRESS...");
        if(this.props.checkTime(6)){
            returnValue = this.props.option.effect();
            this.props.updateLog(returnValue[4]); 
            this.props.updateTime(false,6);
            let content = 
            <div className="message-box" style={{background:"rgba(0,0,0,.75)", color: "#E7DFDD"}}>
                <p>{returnValue[4]}</p>
                <p>Cash: +{returnValue[5]}</p>
                <p>StreetCred: +{returnValue[6]}</p>
                <button className="sub-button" onClick ={()=>{this.props.setDialougeBox(false,null)}}>Ok</button>
            </div>
            if(!returnValue[1]){
                this.props.updateTime(true,24);
                content = 
            <div className="message-box" style={{background:"rgba(0,0,0,.75)", color: "#E7DFDD"}}>
                <p>{returnValue[4]}</p>
                <p>Health: -{returnValue[5]}</p>
                <p>StreetCred: -{returnValue[6]}</p>
                <button className="sub-button" onClick ={()=>{this.props.setDialougeBox(false,null)}}>Ok</button>
            </div>
            }
            this.props.setDialougeBox(true,content);
        }else{
            let content = 
             <div className="message-box" style={{background:"rgba(0,0,0,.75)", color: "#E7DFDD"}}>
                <p>Don't you think it's a bit late to try a robbery no? Make sure to get your sleep!</p>
                <button className="sub-button" onClick ={()=>{this.props.setDialougeBox(false,null)}}>Ok mom</button>
            </div>
            this.props.setDialougeBox(true,content);
        }
    }else{
        returnValue = this.props.option.effect();
        console.log(returnValue);
    }
    if(returnValue !== undefined){
        this.props.updatePlayerState(returnValue[0]);
        let content = <div className="message-box" style={{background:"rgba(0,0,0,.75)", color: "#E7DFDD"}}>
            {returnValue[1]}
            <button className="sub-button" onClick ={()=>{this.props.setDialougeBox(false,null)}}>Ok</button>
        </div>
        this.props.setDialougeBox(true,content);
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