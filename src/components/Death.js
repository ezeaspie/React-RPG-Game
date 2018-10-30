import React, { Component } from 'react';

class Death extends Component {

    render(){
        return(
            <div className="death">
                <h1>You Died!</h1>
                <h2>You lived to be {this.props.days} days old</h2>
                <h2>You died with a net worth of {this.props.playerData.money} dollars</h2>
                <button 
                className="main-button" 
                onClick={()=>{
                    this.props.retrieveSave();
                    this.props.updateGameState(0)
                }}
                >Return to Main Menu</button>
            </div>
        )
    }
}

export default Death;