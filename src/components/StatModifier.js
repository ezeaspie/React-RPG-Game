import React , { Component } from 'react';

class StatModifier extends Component {

    createNewStatObject(upOrDown, e) {
        e.preventDefault();
        let updatedObj = this.props.statData;
        if(this.props.avaliable -1 >= 0 && upOrDown){
            updatedObj.value++;
            console.log(updatedObj.value, this.props.total);
            this.props.updateStat(updatedObj,this.props.statData.id);
        }
        else if(updatedObj.value -1 > 0 && !upOrDown){
            updatedObj.value--;
            console.log(updatedObj.value);
            this.props.updateStat(updatedObj,this.props.statData.id);
        }
    }

    render(){
        return(
            <div className = "stat-modify">
                <h3>{this.props.statData.name}</h3>
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