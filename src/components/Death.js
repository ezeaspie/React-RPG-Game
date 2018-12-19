import React, { Component } from 'react';

class Death extends Component {

    constructor(props){
        super(props);
        this.state = {
            isPaused:false,
        }
    }

    componentDidMount(){
        setTimeout(()=>{
            let cry = new Audio('./audio/effects/bart.mp3');
            cry.play();
        },2500);
        setTimeout(()=>{
            this.setState({isPaused:true});
            let laugh = new Audio('./audio/effects/miffy.mp3');
            laugh.play();
        },4000);

    }

    render(){

        let killer = true;
        if(this.props.killer === null || this.props.killer === false){
            killer = false;
        }


        let opponentImage = {backgroundImage:`url(./images/other/${this.props.killer})`};
        let playerImage = {backgroundImage:`url(./images/other/you${this.props.playerData.skin}.png)`};
        return(
            <div className="death">
                <h1>You Died!</h1>
                <div className="death-animation">
                <h2 className= "fade-in-death">Long live {this.props.playerData.name}!</h2>
                <div 
                className={this.state.isPaused?"death-player paused":"death-player"}
                style={playerImage}
                ></div>
                {killer?

                <div 
                className="death-killer"
                style={opponentImage}
                ></div>

                    :
                    null}
                </div>
                <div className="death-info">
                    <h2>You lived to be {this.props.days} days old</h2>
                    <h2>You died with a net worth of {this.props.playerData.money} dollars</h2>
                    <button 
                    className="main-button" 
                    onClick={()=>{
                        this.props.retrieveSave();
                        this.props.updateGameState(0);
                    }}
                    >Return to Main Menu</button>
                </div>
                
            </div>
        )
    }
}

export default Death;