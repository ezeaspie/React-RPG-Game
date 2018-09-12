import React, {Component} from 'react';

class StartMenu extends Component {

    constructor(props){
        super(props);
        this.state = {
            html : <div className="start-menu">
            <h1>Cube RPG - Incomplete</h1>
            <ul>
                <li onClick = {() => this.props.updateGameState(1)}>Start</li>
                <li onClick = {() => this.updateStartMenu(1)}>Instructions</li>
            </ul>
        </div>
        }
    }

    updateStartMenu(newOption){
            if (newOption === 1){ //Instructions
                this.setState({html: 
                    <div className = "instructions">
                    <h2>You are a cube. You decide who you want to be in this weird town</h2>
                    <p>For some reason you never existed before ... but now you do ... and that's what matters</p>
                    <p>Load a previously made game or start a new one and earn stat points, money, and karma to become the person you want to be.</p>
                    <button onClick = {()=>{this.updateStartMenu(0)}}>Back</button>
                    </div>
                });                
            }
            else {
                this.setState({html :
                    <div className="start-menu">
                    <h1>Cube RPG - Incomplete</h1>
                    <ul>
                        <li onClick = {() => this.props.updateGameState(1)}>Start</li>
                        <li onClick = {() => this.updateStartMenu(1)}>Instructions</li>
                    </ul>
                    </div>
                })                
            }
    }

    render(){
        return(
            this.state.html
        )
    }
}

export default StartMenu;