import React , { Component } from 'react';

class Jail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dialogBox:false,
            dialogContent:null,
            bail: 0,
            money: 0,
            attemptedCharisma:false,
        }
    }

    componentDidMount(){
        let content = 
        <div className="message-box" style={{background:"rgba(0,0,0,.75)", color: "#E7DFDD", padding:".5em 1em", boxSizing: "border-box"}}>
            <p>You got caught and taken to jail. Pay, fight, or wait your way out or take this time to try to make a little extra money and Street Cred...</p>
            <button className="sub-button" onClick ={()=>{this.setState({dialogBox:false,dialogContent:null})}}>Ok</button>
        </div>
        this.setState({dialogBox:true,dialogContent:content,bail:this.props.bail-this.props.luckReward, money:this.props.player.money});
    }

    setDialougeBox = (showOrHide,content) => {
        this.setState({dialogContent:content, dialogBox:showOrHide});
    }

    forceRender = () => {
        this.forceUpdate();
    }

    payBail = () => {
        //Check if Player can pay bail.
        //If TRUE => Deduct money
        this.props.updateGameState(2)//and update state.
        //ELSE
        //show message.
    }

    updateBail = () => {
        //Make bail amount higher or lower.
    }

    handlePayBail = () => {
        let player = this.props.player;
        if(player.money >= this.state.bail){
            player.money -= this.state.bail;
            this.props.updatePlayerState(player);
            this.props.updateGameState(2);
            return;
        }
        let content = 
        <div className="message-box" style={{background:"rgba(0,0,0,.75)", color: "#E7DFDD"}}>
            <p>You don't have enough money</p>
            <button className="sub-button" onClick ={()=>{this.setState({dialogBox:false,dialogContent:null})}}>Ok</button>
        </div>    
        this.setState({dialogBox:true,dialogContent:content});
    }

    handleCharismaCheck(charismaChance){
        let randomNum = Math.floor(Math.random() * 100);
        let bailGrow = this.state.bail/2;
        let bailShrink = this.state.bail/2;
        bailShrink = bailShrink - Math.floor(bailShrink/charismaChance);
        bailGrow = Math.ceil(bailGrow/charismaChance);

        if(charismaChance >= randomNum){
            let ultimateSuccessChance = this.props.player.stats[4].value;
            let randomNum = Math.floor(Math.random() * 100);
            if(ultimateSuccessChance >= randomNum){
                //GET OUT OF JAIL FREE!
                let content = 
                <div className="message-box" style={{background:"rgba(0,0,0,.75)", color: "#E7DFDD"}}>
                    <p>Somehow the guards took a liking to you and agreed to let you go - so long as you behave yourself!</p>
                    <button className="sub-button" onClick ={()=>{this.props.updateGameState(2)}}>Ok</button>
                </div>    
                this.setState({dialogBox:true,dialogContent:content});
            }
            else{
                let content = 
                <div className="message-box" style={{background:"rgba(0,0,0,.75)", color: "#E7DFDD"}}>
                    <p>You convinced the guards that you're not that dangerous. They're not letting you go but they did agree to lower your bail by {bailShrink}.</p>
                    <button className="sub-button" onClick ={()=>{this.setState({dialogBox:false,dialogContent:null, bail:this.state.bail-bailShrink,attemptedCharisma:true})}}>Ok</button>
                </div>    
                this.setState({dialogBox:true,dialogContent:content});
            }
        }
        else{
            let content = 
            <div className="message-box" style={{background:"rgba(0,0,0,.75)", color: "#E7DFDD"}}>
                <p>You failed to convince the guards. Instead, they added {bailGrow} to your bail.</p>
                <button className="sub-button" onClick ={()=>{this.setState({dialogBox:false,dialogContent:null, bail:this.state.bail+bailGrow,attemptedCharisma:true})}}>Ok</button>
            </div>    
        this.setState({dialogBox:true,dialogContent:content});
        }
    }

    render(){
        let charismaCheck = this.props.player.stats[0].value;
        charismaCheck -= this.props.storeRank;
        if(charismaCheck<1){
            charismaCheck = 1;
        }
        
        return(
            <div className="store">
                <h1>Jail</h1>
                <h2 className="store-cash">Cash:{this.state.money}</h2>
                {this.state.dialogBox?this.state.dialogContent:null}
                <ul className="store-list options">
                    <li className="option" onClick={this.handlePayBail}>Pay Bail of ${this.state.bail}</li>
                    <li className="option">Sell Commodities</li>
                    <li 
                    className="option"
                    onClick={this.state.attemptedCharisma?()=>{
                        let content = 
                        <div className="message-box" style={{background:"rgba(0,0,0,.75)", color: "#E7DFDD"}}>
                            <p>You already tried that. Your charisma isn't high enough to try again.</p>
                            <button className="sub-button" onClick ={()=>{this.setState({dialogBox:false,dialogContent:null})}}>Ok</button>
                        </div>    
                        this.setState({dialogBox:true,dialogContent:content});
                    }:()=>{this.handleCharismaCheck(charismaCheck)}}
                    >
                        <p>Try to talk your way out</p>
                        <p>{charismaCheck}% chance of success</p>
                    </li>
                    <li className="option">Fight your way out</li>
                </ul>
            </div>
            
        )
    }
}

export default Jail;