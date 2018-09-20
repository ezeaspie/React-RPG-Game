import React, { Component } from 'react';

class Option extends Component {

runEffectAndUpdate = () => {
    let returnValue = this.props.option.effect();
    if(returnValue !== undefined){
        this.props.updatePlayerState(returnValue[0]);
    }
}
//IE: Thank you, come again - if true => BROKE ALERT - if false
    render(){
        return(
            <li onClick ={this.runEffectAndUpdate}>
                {this.props.option.name}
            </li>
        )
    }
}

export default Option;