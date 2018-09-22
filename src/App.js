import React, { Component } from 'react';
import './App.css';
import StartMenu from './components/StartMenu';
import CharacterCreation from './components/CharacterCreation';
import MapUI from './components/MapUI';
import Interface from './components/Interface';
import Combat from './components/Combat';
import Weapons from './gameAssets/weapons';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      gameState : undefined,
      gameScreen : undefined,
      playerObject : undefined,
      playerPosition: undefined,
      playerCurrentMap: 0,
      activeStore: undefined,
      opponentObject: undefined,
      hasSavedGame:false,
    }
  }

  componentWillMount = () => {
    const playerSave = JSON.parse(localStorage.getItem( "playerSave" ));
    const playerPosition = JSON.parse(localStorage.getItem("playerPos"));
    const playerMap = JSON.parse(localStorage.getItem("playerMap"));

    if(playerSave !== null){
      this.setState( { 
        playerObject: playerSave, 
        hasSavedGame : true,
        playerPosition,
        playerCurrentMap : playerMap, 
      },
      ()=>{
        this.updateGameState(0);
      } 
      );
      console.log('save found');
      return;
    }
    this.updateGameState(0);
    return;
  }

  saveToLocal = (position = null) => {
    let getAndSetData = () => {
      const playerData = this.state.playerObject;
      const playerPosition = this.state.playerPosition;
      const playerMap = this.state.playerCurrentMap;
      localStorage.setItem("playerSave", JSON.stringify(playerData));
      localStorage.setItem("playerPos", JSON.stringify(playerPosition));
      localStorage.setItem('playerMap', JSON.stringify(playerMap));
      console.log("Game Saved");
      return;
    }
    if(position !== null){
      this.setState({playerPosition:position},getAndSetData);
    }
    getAndSetData();
   }

  updatePlayerState = (playerObject) => {
    this.setState({playerObject});
  }

  createPlayer = (name, stats) => {
    let playerObject = {
      name,
      stats,
      inventory : [
        {
          name: "ID Card",
          description: "Your ID Card",
          isConsumable:false,
        }
      ],
      money: 20,
      health: 90,
      maxHealth: 100,
      karma: 0,
      streetCred: 0,
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
    }
    this.setState({playerObject : playerObject,playerPosition : [15,3], playerCurrentMap:0},()=>{
      this.updateGameState(2);
      this.saveToLocal();
      });
  }

  updatePlayerPosition = (newPosition) => {
    this.setState({playerPosition:newPosition});
  }

  renderStoreInterface = (storeId) => {
    let player = this.state.playerObject;

    let handleConsumable = (item) => {
      let found = player.inventory.filter((inventoryItem) => {
        return inventoryItem.name === item.name;
      });
      let index = player.inventory.indexOf(found[0]);
      player.inventory.splice(index,1);
    }

    let createOpponent = (name,strRange,lckRange,agiRange,moneyRange,possibleWeapons,weaponAmount) => {
      //name='string',RANGE = [lowVal,highVal],possibleWeapons=Array of all wieldable, weaponAmount=how much weapons to give opponent
      let valueFromRange = (min,max) => {
          return Math.floor(Math.random()*(max-min+1)+min);
      }

      let chooseWeapons = () => {
        let equippedWeapons = [];
        for(var i=0; i < weaponAmount; i++){
          let selectedWeaponIndex = valueFromRange(0,possibleWeapons.length-1);
          equippedWeapons.push(possibleWeapons[selectedWeaponIndex]);
          possibleWeapons.splice(selectedWeaponIndex, 1);
          console.log(possibleWeapons); 
        }
        return equippedWeapons;
      }
      
      let opponent = {
        name,
        stats : [
          {
              name: "Charisma",
              value:3,
          },
          {
              name: "Strength",
              value:valueFromRange(strRange[0],strRange[1]),
          },
          {
              name: "Intelligence",
              value:5,
          },
          {
              name: "Agility",
              value:valueFromRange(agiRange[0],agiRange[1]),
          },
          {
              name: "Luck",
              value:valueFromRange(lckRange[0],lckRange[1]),
          }
      ],
        inventory: chooseWeapons(),
        money: valueFromRange(moneyRange[0],moneyRange[1]),
        health: 100,
        maxHealth: 100,
      }
      console.log(opponent);
      return opponent;
    }

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
              isConsumable:true,
              effect() {
                handleConsumable(this);
                return(player.updateHealth(true,5));
              },
            },
            {
              name:"Fiji Water",
              description: "Water that shows you're living the high life.",
              price: 10,
              isConsumable:true,
              effect: () => {
                handleConsumable(this);
                return(player.updateHealth(true,10))
              },
            },
          ],
          options: [
            {
              name: "Rob the Place",
              effect: ()=>{return(player.updateHealth(false,30))},
            }
          ]
      },
      {
        id:403,
        isShop: true,
        name:"9:30 Bar",
        inventory: [
          {
            name:"Beer",
            description: "Warm and toasted, covered with cream cheese.",
            price: 10,
            isConsumable:true,
            effect() {
              handleConsumable(this);
              return(player.updateHealth(true,5));
            },
          },
          Weapons[0],
          {
            name:"Whiskey",
            description: "Water that shows you're living the high life.",
            price: 20,
            isConsumable:true,
            effect: () => {
              handleConsumable(this);
              return(player.updateHealth(true,10))
            },
          },
        ],
        options: [
          {
            name: "Rob the Place",
            effect: ()=>{return(player.updateHealth(false,30))},
          },
          {
            name: "Get into a fight",
            effect: ()=>{
              let opponent = createOpponent("Melweed",[5,10],[5,10],[5,10],[100,200],Weapons,2);
              this.setState({opponentObject:opponent},()=>this.updateGameState(4));
            }
          },
        ]
    }
    ]
    let storeObject = storeCollection.filter(object => object.id === storeId);
    this.setState({activeStore:storeObject[0]}, ()=>{this.updateGameState(3)});
  }

  updateGameState = (newStateId) => {

    const screenStateCollection = [
      <StartMenu 
      updateGameState = {this.updateGameState}
      hasSavedGame = {this.state.hasSavedGame}
      />,
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
      updatePlayerState={this.updatePlayerState}
      saveGame={this.saveToLocal}
      />,
      ],
      <Interface 
      updatePlayerState={this.updatePlayerState}
      storeData={this.state.activeStore}
      updateGameState = {this.updateGameState}
      playerData = {this.state.playerObject}
      />,
      <Combat 
      player={this.state.playerObject}
      opponent={this.state.opponentObject}
      updatePlayerState={this.updatePlayerState}
      updateGameState={this.updateGameState}
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
