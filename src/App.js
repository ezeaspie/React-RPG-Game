import React, { Component } from 'react';
import './App.css';
import StartMenu from './components/StartMenu';
import CharacterCreation from './components/CharacterCreation';
import MapUI from './components/MapUI';
import Interface from './components/Interface';

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
    let playerObject = {
      name,
      stats,
      inventory : [
        {
          name: "ID Card",
          description: "Your ID Card",
        }
      ],
      money: 20,
      health: 90,
      maxHealth: 100,
      updateHealth (upOrDown,amount) {
        if(upOrDown){
          if(this.maxHealth < this.health + amount){
            this.health = this.maxHealth;
            return this.health;
          }
          this.health += amount;
          return this.health;
        }
        if(!upOrDown){
          this.health -= amount;
          return this.health;
        }
      },
      purchase (product) {
        if(this.money - product.price >= 0){
          this.money -= product.price;
          this.inventory.push(product);
          console.log(`Purchased ${product.name} for ${product.price}`);
          return true;
        }
        console.log('WARNING _ BROKE ALERT!')
        return false;
      }
    }
    this.setState({playerObject : playerObject,playerPosition : [15,3]},()=>{this.updateGameState(2); console.log(this.state.playerObject.updateHealth(false,8))});
  }

  updatePlayerPosition = (newPosition) => {
    this.setState({playerPosition:newPosition});
  }

  renderStoreInterface = (storeId) => {
    let player = this.state.playerObject;
    const storeCollection = [
      {
          id:401,
          isShop: false,
          name:"Home",
          options: [
              {
                  name: "Sleep",
                  effect: () => {
                      player.updateHealth(true,99999);
                  }
              }
          ]
      },
      {
          id:402,
          isShop: true,
          name:"Shell Gas Station",
          inventory: [
            {
              name:"Bagel",
              description: "Warm and toasted, covered with cream cheese.",
              price: 5,
              effect: () => {player.updateHealth(true,5)},
            },
            {
              name:"Fiji Water",
              description: "Water that shows you're living the high life.",
              price: 10,
              effect: () => {player.updateHealth(true,10)},
            },
          ],
          options: [
            {
              name: "Rob the Place",
              effect: ()=>{player.updateHealth(false,30)},
            }
          ]
      }
    ]
    let storeObject = storeCollection.filter(object => object.id === storeId);
    this.setState({activeStore:storeObject[0]}, ()=>{this.updateGameState(3)});
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
