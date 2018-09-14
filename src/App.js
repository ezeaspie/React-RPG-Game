import React, { Component } from 'react';
import './App.css';
import StartMenu from './components/StartMenu';
import CharacterCreation from './components/CharacterCreation';
import MapUI from './components/MapUI';
import Interface from './components/Interface';
import PlayerConsole from './components/PlayerConsole';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
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

  updatePlayerState = (playerObject) => {
    this.setState(playerObject);
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
          this.health += amount;
          return [this,this.health];
        }
        if(!upOrDown){
          this.health -= amount;
          return [this,this.health];
        }
      },
      purchase (product) {
        if(this.money - product.price >= 0){
          this.money -= product.price;
          this.inventory.push(product);
          console.log(`Purchased ${product.name} for ${product.price}`);
          return [this,true];
        }
        console.log('WARNING _ BROKE ALERT!')
        return [this,false];
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
                      return(player.updateHealth(true,99999));
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
              effect: () => {
                let found = player.inventory.filter((item) => {
                  return item.name === "Bagel";
                });
                let index = player.inventory.indexOf(found[0]);
                player.inventory.splice(index,1);
                console.log(found[0],index);
                return([player.updateHealth(true,5),true]);
              },
            },
            {
              name:"Fiji Water",
              description: "Water that shows you're living the high life.",
              price: 10,
              effect: () => {return(player.updateHealth(true,10))},
            },
          ],
          options: [
            {
              name: "Rob the Place",
              effect: ()=>{return(player.updateHealth(false,30))},
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
      [
      <MapUI 
      character = {this.state.playerObject} 
      mapId = {this.state.playerCurrentMap}
      playerPosition = {this.state.playerPosition}
      updatePlayerPosition={this.updatePlayerPosition}
      renderStoreInterface={this.renderStoreInterface}
      />,
      <PlayerConsole
      playerData = {this.state.playerObject} 
      updatePlayerState={this.updatePlayerState}
      />
      ],
      <Interface 
      updatePlayerState={this.updatePlayerState}
      storeData={this.state.activeStore}
      updateGameState = {this.updateGameState}
      playerData = {this.state.playerObject}
      />,
    ]

    this.setState({gameState : newStateId,gameScreen : screenStateCollection[newStateId]});
  }
  render() {
    return (
      <div className="App">
      {this.state.gameScreen}
      </div>
    );
  }
}

export default App;
