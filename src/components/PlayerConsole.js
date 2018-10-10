import React, { Component } from 'react';
import StatsOverlay from './StatsOverlay';
import InventoryOverlay from './InventoryOverlay';
import mapData from '../gameAssets/mapData';

//Maybe turn the playerData into state in here, pass inv and stats as a prop and
//when clicked, run the update the state and then update the global object.

class PlayerConsole extends Component {
    constructor(props){
        super(props);
        this.state = {
            isStatOverlay:false,
            isInventoryOverlay:false,
        }
    } 

    forceRender = () => {
        this.forceUpdate();
    }

    handlePlayerInventoryChanges = (newObj) => {
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
        let playerData = this.props.playerData;
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
            left:"0",
            right:"0",
            width:"100%",
            opacity:"1",
            zIndex:"1",
            transition: "ease-in-out .2s opacity",
            background:"rgba(0,0,0,0.7)",
        }

        let CalculateMeterParams = (highOrLow) => {
            let low = playerData.maxHealth/3;
            let high = low * 2;
            let optimum = playerData.maxHealth-5;

            if(highOrLow === 0) {
                return Math.ceil(high);
            }
            if(highOrLow === 1){
                return Math.ceil(low);
            }
            return Math.ceil(optimum);
        }
        return(
            <div>
                <div className="console-row cr1">
                    <p className="console-name">{playerData.name}</p>
                    <div className="console-health">
                        <p>{playerData.health} / {playerData.maxHealth}</p>
                        <meter className="health-bar"
                        min="0"  
                        low={CalculateMeterParams(0)}
                        high={CalculateMeterParams(1)}
                        optimum={CalculateMeterParams(2)}
                        value={playerData.health} 
                        max={playerData.maxHealth}></meter>
                    </div>
                </div>
                <div className="console-row cr2">
                    <p>{mapData[this.props.mapId].name}</p>
                    <p>{'$' + playerData.money}</p>
                    <p>{this.props.time + ':00'}</p>
                </div>
                <div className="console-row cr1">
                    <button className="main-button" onClick={this.props.saveGame}>Save</button>
                    <button className="main-button" onClick={()=>{this.setState({isStatOverlay:true})}}>Show Stats</button>
                    <button className="main-button" onClick={()=>{this.setState({isInventoryOverlay:true})}}>Show Inventory</button>
                </div>
                
                <StatsOverlay 
                handleClick = {this.updateOverlayState}
                updatePlayerState={this.props.updatePlayerState}
                style={this.state.isStatOverlay ? overlayStyle : hiddenStyle} 
                stats={playerData.stats}
                />

                <InventoryOverlay 
                forceRender = {this.forceRender}
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