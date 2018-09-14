import React, { Component } from 'react';
import StatsOverlay from './StatsOverlay';
import InventoryOverlay from './InventoryOverlay';


//Maybe turn the playerData into state in here, pass inv and stats as a prop and
//when clicked, run the update the state and then update the global object.

class PlayerConsole extends Component {
    constructor(props){
        super(props);
        this.state = {
            isStatOverlay:false,
            isInventoryOverlay:false,
            playerData: this.props.playerData,
        }
    }

    handlePlayerInventoryChanges = (newObj) => {
        this.setState({playerData : newObj});
        this.props.updatePlayerState(newObj);
    }

    updateOverlayState = (whichState) => {
        if(whichState){
        this.setState({isStatOverlay:false});
        }
        else{
            this.setState({isInventoryOverlay : false});
        }
    } 


    render(){
        let playerData = this.state.playerData;
        let hiddenStyle = {
            position:"fixed",
            opacity:"0",
            zIndex: "-9999",
            transition: "ease-in-out .2s opacity",
            background:"rgba(0,0,0,0.7)",
        }
        let overlayStyle = {
            position:"fixed",
            top:"0",
            bottom:"0",
            width:"100%",
            opacity:"1",
            zIndex:"1",
            transition: "ease-in-out .2s opacity",
            background:"rgba(0,0,0,0.7)",
        }
        return(
            <div>
                <h1>{playerData.name}</h1>
                <h2>{playerData.health} / {playerData.maxHealth}</h2>
                <meter value={playerData.health} min="0" max={playerData.maxHealth}></meter>
                <h4>{'$' + playerData.money}</h4>
                <button onClick={()=>{this.setState({isStatOverlay:true})}}>Show Stats</button>
                <button onClick={()=>{this.setState({isInventoryOverlay:true})}}>Show Inventory</button>
                
                <StatsOverlay 
                handleClick = {this.updateOverlayState}
                updatePlayerState={this.props.updatePlayerState}
                style={this.state.isStatOverlay ? overlayStyle : hiddenStyle} 
                stats={playerData.stats}
                />

                <InventoryOverlay 
                handleClick = {this.updateOverlayState}
                updatePlayerState={this.props.updatePlayerState}
                style={this.state.isInventoryOverlay ? overlayStyle : hiddenStyle}
                inventoryData={playerData.inventory}
                handlePlayerInventoryChanges = {this.handlePlayerInventoryChanges}
                />
    
            </div>
        )
    }
}

export default PlayerConsole;