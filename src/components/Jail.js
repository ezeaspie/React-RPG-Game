import React , { Component } from 'react';
import Weapons from '../gameAssets/weapons';

class Jail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dialogBox:false,
            dialogContent:null,
            bail: 0,
            money: 0,
            attemptedCharisma:false,
            playerInventory: undefined,
            possibleItems:undefined,
        }
    }

    componentDidMount(){
        let content = 
        <div className="message-box" style={{background:"rgba(0,0,0,.75)", color: "#E7DFDD", padding:".5em 1em", boxSizing: "border-box"}}>
            <p>You got caught and taken to jail. Pay, fight, or wait your way out or take this time to try to make a little extra money and Street Cred...</p>
            <button className="sub-button" onClick ={()=>{this.setState({dialogBox:false,dialogContent:null})}}>Ok</button>
        </div>
        this.setState({playerInventory:this.props.player.inventory,dialogBox:true,dialogContent:content,bail:this.props.bail-this.props.luckReward, money:this.props.player.money});
    }

    handleSalesAttempt = () => {
        let inventory = this.state.playerInventory;
        let possibleItems = inventory.filter((item,i)=>{
            return (
                item.id === 2 || item.id === 3 || item.id === 4
            )
        });
        console.log(possibleItems); 

        let handleSale = (item,saleChance,charisma,intelligence) => {
            let randomNum = Math.floor(Math.random() * 100);
            if(saleChance >= randomNum){
                console.log(true);
                for (var i = 0; i < inventory.length; i++) {
                if (inventory[i].id === item.id) {
                    console.log("true",i);
                    inventory.splice(i,1);
                    this.setState({playerInventory:inventory,money:this.state.money + (item.price*1.5)},()=>{
                        let player = this.props.player;
                        player.inventory = this.state.playerInventory;
                        player.money = this.state.money;
                        this.props.updatePlayerState(player);
                        this.handleSalesAttempt();
                    });
                    break;
                    }
                }
            }
            else{
                let maxRemoved = this.state.possibleItems.length - Math.floor(((intelligence + charisma)/2)/20);
                console.log(maxRemoved);
                let counter = 0;
                for (let i = 0; i < inventory.length; i++) {
                    console.log(i);
                    if (inventory[i].id === 2 || inventory[i].id === 3 || inventory[i].id === 4) {
                        inventory.splice(i,1);
                        counter++;
                        i--;
                        console.log({counter,index:i},inventory.length);
                        if(counter >= maxRemoved){
                            break;
                        }
                    }
                }
                this.setState({playerInventory:inventory},()=>{
                    let player = this.props.player;
                    player.inventory = this.state.playerInventory;
                    this.props.updatePlayerState(player);
                    this.handleSalesAttempt();
                });
            }
        }

        this.setState({possibleItems},()=>{
            let player = this.props.player;
            let charisma = player.stats[0].value;
            let intelligence = player.stats[2].value;
            let agility = player.stats[3].value;

            let saleChance = Math.floor((charisma + intelligence + agility)/3);

            let content = 
            <div className="message-box" style={{background:"rgba(0,0,0,.75)", color: "#E7DFDD"}}>
                <p>You can sell these items</p>
                <p>{saleChance}% chance of success</p>
                {
                    this.state.possibleItems.map((item)=>{
                        return <button onClick = {()=>handleSale(item,saleChance,charisma,intelligence)}className="main-button">{item.name} for ${item.price * 1.5}</button>
                    })
                }
                <button className="sub-button" onClick ={()=>{this.setState({dialogBox:false,dialogContent:null})}}>Ok</button>
            </div> 

            this.setState({dialogBox:true,dialogContent:content});
        });
    }

    handleCombat = () => {
        if(this.props.storeRank === 100) {
            this.props.createOpponent("Warden Dasse",[90,100],[50,70],[50,65],[700,1000],Weapons,3,true,false);
            return;
        }
        if(this.props.storeRank >= 75) {
            this.props.createOpponent("Prison Overseer", [50,70],[30,60],[50,60],[450,800],Weapons,3,true,false);
            return;
        }
        if(this.props.storeRank >= 50) {
            this.props.createOpponent("Head Guard", [30,50],[30,60],[35,45],[200,450],Weapons,3,true,false);
            return;
        }
        if(this.props.storeRank >= 25) {
            this.props.createOpponent("Senior Guard", [10,35],[20,40],[10,30],[150,300],Weapons,2,true,false);
            return;
        }
        this.props.createOpponent("Guard",[5,10],[5,10],[5,10],[50,150],Weapons,2,true,false);
        return;
    }

    setDialougeBox = (showOrHide,content) => {
        this.setState({dialogContent:content, dialogBox:showOrHide});
    }

    forceRender = () => {
        this.forceUpdate();
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

    handleWait = () => {
        this.props.setDay(7);
        this.props.updateGameState(2);
    }

    render(){
        let charismaCheck = this.props.player.stats[0].value;
        charismaCheck -= this.props.storeRank;
        if(charismaCheck<1){
            charismaCheck = 1;
        }
        let findOpponentName = () => {
            if(this.props.storeRank === 100) {
                return "Warden Dasse";
            }
            if(this.props.storeRank >= 75) {
                return "Prison Overseer";
            }
            if(this.props.storeRank >= 50) {
                return "Head Guard";
            }
            if(this.props.storeRank >= 25) {
                return "Senior Guard";
            }
            return "Guard"
        }
        let opponentName=findOpponentName();

        
        
        return(
            <div className="store">
                <h1>Jail</h1>
                <h2 className="store-cash">Cash:{this.state.money}</h2>
                {this.state.dialogBox?this.state.dialogContent:null}
                <ul className="store-list options">
                    <li className="option" onClick={this.handlePayBail}>Pay Bail of ${this.state.bail}</li>
                    <li className="option" onClick={this.handleSalesAttempt}>Sell Commodities</li>
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
                    <li className="option" onClick={this.handleCombat}><p>Fight your way out</p><p>vs. {opponentName}</p></li>
                    <li className="option" onClick={this.handleWait}><p>Wait out your 7 day sentence</p></li>
                </ul>
            </div>
            
        )
    }
}

export default Jail;