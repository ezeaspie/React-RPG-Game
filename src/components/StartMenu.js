import React, {Component} from 'react';

class StartMenu extends Component {

    constructor(props){
        super(props);
        this.state = {
            dialogBox: false,
            dialogContent: undefined,
            html : undefined,
        }
        this.handleNewGame = this.handleNewGame.bind(this);
    }

    componentWillMount () {
        this.updateStartMenu(0);
    }

    handleNewGame () {
        if(this.props.hasSavedGame){
            let content =
            <div className="message-box">
                <div className="dialog-content">
                    <p>Starting a new game will overwrite your previously saved game.</p>
                    <p>Are you sure you want to continue?</p>
                </div>
                <div className="dialog-buttons">
                    <button 
                    onClick={()=>this.props.updateGameState(1)}
                    className="main-button urgent">Delete Save and Start New Game</button>
                    <button 
                    onClick={()=>{this.setState({dialogBox:false})}}
                    className="main-button">Cancel</button>
                </div>
            </div>
            this.setState({dialogContent:content, dialogBox:true});
            console.log("true");
        }
        else{
            this.props.updateGameState(1);
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
            <h1 className="start-header">Cube RPG - Incomplete</h1>
            <ul className="start-options">
                <button className="main-button" 
                onClick = {this.handleNewGame}>Start ></button>
                <button className="main-button" disabled={!this.props.hasSavedGame} onClick = {() => this.props.updateGameState(2)}>Continue ></button>
                <button className="main-button" onClick = {() => this.updateStartMenu(1)}>Instructions ></button>
            </ul>
        </div>
                })                
            }
    }

    render(){
        return(
            <div className="start-content">
            {
                this.state.dialogBox?
                this.state.dialogContent
                :null
            }
            {this.state.html}
            </div>   
        )
    }
}

export default StartMenu;