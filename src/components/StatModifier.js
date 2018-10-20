import React , { Component } from 'react';

class StatModifier extends Component {
    constructor(props){
        super(props);
        this.state = {
            isInfoVisible : false,
        }
    }

    createNewStatObject(upOrDown, e) {
        e.preventDefault();
        let updatedObj = this.props.statData;
        if(this.props.avaliable -1 >= 0 && upOrDown){
            updatedObj.value++;
            this.props.updateStat(updatedObj,this.props.statData.id);
        }
        else if(updatedObj.value -1 > 0 && !upOrDown){
            updatedObj.value--;
            this.props.updateStat(updatedObj,this.props.statData.id);
        }
    }

    render(){
        let statDesc = [
            "This is how good you are with people. This affects your speech success chances, your ability to get personal jobs, and your ability to get something extra when talking to others.",
            "Your overall physicality. This affects how much damage your attacks do in battle as well as your ability to succeed in sitautions or jobs where you need a bit of muscle.",
            "A measure of your smarts. This affects your ability in minigames and intelligence related jobs.",
            "How mobile and quick are you? This affects your attack points in battle, allowing you to attack more per turn. This also affects your robbery success chances.",
            "We all need a bit of luck - luck affects almost everything you do. From the chances of you landing a critical in battle, to whether you win in BlackJack or Slots, to your ability to rob places sucessfully!",
        ]
        return(
            <div className = "stat-modify">
                <h3>{this.props.statData.name} 
                <span 
                onMouseOver={()=>{this.setState({isInfoVisible:true})}}
                onMouseOut={()=>{this.setState({isInfoVisible:false})}}
                className="about"> ?</span>
                </h3>
                <div className="stat-description" 
                style={this.state.isInfoVisible?{opacity:"1",transition:"ease .3s all"}:{opacity:"0",transition:"ease .3s all"}}>
                    <p>{statDesc[this.props.currentStatId]}</p>
                </div>
                <div className="modifier">
                    <button className="sub-button" onClick = {(e) => {this.createNewStatObject(false,e)}}>-</button>
                    <h3>{this.props.statData.value}</h3>
                    <button className="sub-button" onClick = {(e) => {this.createNewStatObject(true,e)}}>+</button>
                </div>
            </div>
        )
    }
}

export default StatModifier;