import React, { Component } from 'react';
import './App.css';
import StartMenu from './components/StartMenu';
import CharacterCreation from './components/CharacterCreation';
import MapUI from './components/MapUI';
import Interface from './components/Interface';
import PlayerData from './gameAssets/playerData';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      renderMap:false,
      gameState : 0,
      gameScreen : <StartMenu updateGameState = {this.updateGameState} />,
      playerObject : undefined,
      playerPosition: undefined,
      playerCurrentMap: 0,
      activeStore: undefined,
    }
  }

  componentWillMount = () => {
    //Check Local State for a saved player. If there is, load it into the state
    //and add an option for 'CONTINUE' and a warning if a player clicks NEW GAME.
    //If not, continue as normal - character will be created via new game
  }

  createPlayer = (name, stats) => {
    let playerData = {
      name : name,
      stats : stats,
      inventory : [
        {
          name: "ID Card",
          description: "Your ID Card",
        }
      ],
      money: 20,
      health: 90,
      maxHealth: 100,
      updateHealth: (upOrDown,amount) => {
        if(upOrDown){
          if(this.maxHealth < this.health + amount){
            this.health = this.maxHealth;
            console.log(this.health);
            return this.health;
          }
          this.health += amount;
          return this.health;
        }
        if(!upOrDown){
          this.health - amount;
          console.log(this.health);
        }
      } 
    }

    this.setState({playerObject : playerData,playerPosition : [15,3]},()=>{this.updateGameState(2); playerData = this.state.playerObject; console.log(playerData)});
  }

  updatePlayerPosition = (newPosition) => {
    this.setState({playerPosition:newPosition});
  }

  renderStoreInterface = (storeData) => {
    console.log(storeData);
    this.setState({activeStore:storeData}, ()=>{this.updateGameState(3)});
  }

  updateGameState = (newStateId) => {

    const screenStateCollection = [
      <StartMenu updateGameState = {this.updateGameState} />,
      <CharacterCreation 
      updateGameState = {this.updateGameState} 
      createPlayer = {this.createPlayer} />,
      null,
      <Interface 
      storeData={this.state.activeStore}
      updateGameState = {this.updateGameState}
      playerData = {this.state.playerObject}
      />,
    ]

    this.setState({gameState : newStateId}, ()=>{
      if(this.state.gameState === 2){
        this.setState({renderMap : true});
      }
      else{
        this.setState({gameScreen : screenStateCollection[newStateId]});
        this.setState({renderMap : false});
      }
    });
  }
  render() {

    let map = <MapUI 
    character = {this.state.playerObject} 
    mapId = {this.state.playerCurrentMap}
    playerPosition = {this.state.playerPosition}
    updatePlayerPosition={this.updatePlayerPosition}
    renderStoreInterface={this.renderStoreInterface}
    />

    return (
      <div className="App">
      { this.state.renderMap ? map : this.state.gameScreen}
      </div>
    );
  }
}

export default App;
