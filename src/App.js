import React, { Component } from 'react';
import './App.css';
import StartMenu from './components/StartMenu';
import CharacterCreation from './components/CharacterCreation';
import MapUI from './components/MapUI';
import Interface from './components/Interface';
import Combat from './components/Combat';
import Weapons from './gameAssets/weapons';
import Jobs from './gameAssets/jobData';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      gameState : undefined,
      gameScreen : undefined,
      gameTime: 8,
      playerObject : undefined,
      playerPosition: undefined,
      playerCurrentMap: 0,
      activeStore: undefined,
      opponentObject: undefined,
      hasSavedGame:false,
      activeJob:undefined,
    }
  }

  componentWillMount = () => {
    const playerSave = JSON.parse(localStorage.getItem( "playerSave" ));
    const playerPosition = JSON.parse(localStorage.getItem("playerPos"));
    const playerMap = JSON.parse(localStorage.getItem("playerMap"));
    const currentTime = JSON.parse(localStorage.getItem("gameTime"));
    if(playerSave !== null){
      this.setState( { 
        playerObject: playerSave, 
        hasSavedGame : true,
        playerPosition,
        playerCurrentMap : playerMap, 
        gameTime : currentTime,
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
      const currentTime = this.state.gameTime;
      localStorage.setItem("playerSave", JSON.stringify(playerData));
      localStorage.setItem("playerPos", JSON.stringify(playerPosition));
      localStorage.setItem('playerMap', JSON.stringify(playerMap));
      localStorage.setItem('gameTime', JSON.stringify(currentTime));
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

  updatePlayerLog = (message) => {
    let player = this.state.playerObject;
    if(player.log.length+1 > 10){
      player.log.pop();
    }
    player.log.unshift(message);
  }

  updateTime = (setTime,amount=0) => {
    if(setTime){
      this.setState({gameTime:amount});
    }
    else{
      let time = this.state.gameTime;
      time += amount;
      this.setState({gameTime: time});
    }
  }
  
  checkTime = (timeToAdd) => {
    let time = this.state.gameTime;
    time += timeToAdd;
    if(time <= 24){
      return true;
    }
    return false;
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
      log:[],
      jobs: [],
      npcStates:[],
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

    let getRobThePlaceData = (storeRank) => {
      let strength = player.stats[1].value;
        let luck = player.stats[4].value;
        let agility = player.stats[3].value;

        let robChance = strength + luck + agility;
        robChance /= 3;
        robChance = Math.ceil(robChance);
        robChance -= storeRank;

        if(robChance < 2){
          robChance = 2;
        }
        return [robChance,storeRank];
    }

    let robThePlace = (storeRank) => {
        let strength = player.stats[1].value;
        let luck = player.stats[4].value;
        let agility = player.stats[3].value;

        let robChance = strength + luck + agility;
        robChance /= 3;
        robChance = Math.ceil(robChance);
        robChance -= storeRank;

        if(robChance < 2){
          robChance = 2;
        }

        let randomNum = Math.floor(Math.random() * 100);
        let calculateRewardMultipier = () => {
          let rewardMultipler = 0;
          if(storeRank > 100){
            rewardMultipler = 5;
            return rewardMultipler;
          }if(storeRank >= 75){
            rewardMultipler = 4;
            return rewardMultipler;
          }if(storeRank >= 50){
            rewardMultipler = 3;
            return rewardMultipler;
          }if(storeRank >= 25){
            rewardMultipler = 2;
            return rewardMultipler;
          }
            rewardMultipler = 1;
            return rewardMultipler;
        }

        let rewardMultipler = calculateRewardMultipier();

        let cashReward = 100 * rewardMultipler;
        cashReward += storeRank;
        let calculateLuckBonus = () => {
          let rank = storeRank + 1;
          let bonus = luck + rank;
          return Math.floor(bonus/2);
        }

        cashReward += calculateLuckBonus();

        let streetCredReward = 5 + storeRank/2;
        streetCredReward *= rewardMultipler;

        console.log(cashReward,streetCredReward);

        console.log({randomNum,robChance, rewardMultipler}); 
        if(robChance >= randomNum){
            let message = "Robbery success - Stole some cash.";
            player.money += cashReward;
            player.streetCred += streetCredReward;
            return [player,true,robChance,storeRank,message,cashReward,streetCredReward];
        }
        let message = "Robbery failed - Caught,robbed, and beat down in jail.";
        let beatDownAmount = Math.floor(Math.random() * player.health);
        player.health -= beatDownAmount;
        player.streetCred -= streetCredReward;
        return [player,false,robChance,storeRank,message,beatDownAmount,streetCredReward];
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
                      this.setState({gameTime:8});
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
              effect: ()=>{
                return robThePlace(0);
              },
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
            effect: ()=>{return(robThePlace(0))},
            getData: ()=>{return(getRobThePlaceData(0))}
          },
          {
            name: "Get into a fight",
            effect: ()=>{
              let opponent = createOpponent("Melweed",[5,10],[5,10],[5,10],[100,200],Weapons,2);
              if(this.checkTime(2)){
                this.setState({opponentObject:opponent},()=>this.updateGameState(4));
              }
              else{
                return false;
              }
            }
          },
        ]
    },
    {
      id:404,
      isShop: false,
      name:"Wilson High School",
      options: [
        {
          name: "Get into a fight",
          effect: ()=>{
            let weapons = [Weapons[0],Weapons[1],Weapons[2],Weapons[3]];
            let opponent = createOpponent("Wilson Kid",[5,10],[5,10],[5,10],[100,200],weapons,2);
            if(this.checkTime(2)){
              this.setState({opponentObject:opponent},()=>this.updateGameState(4));
            }
            else{
              return false;
            }
          }
        },
        {
          name: "Study",
          effect: ()=>{console.log("i learned")}
        },
        {
          name: "Go to Class",
          effect: ()=>{console.log("i learned")}
        },
        {
          name: "Use Gym Facilities",
          effect: ()=>{console.log("i learned")}
        },
      ]
  }
    ]
    let storeObject = storeCollection.filter(object => object.id === storeId);
    let jobObject = Jobs.filter(job => job.id === storeId);
    console.log(jobObject);
    this.setState({activeStore:storeObject[0],activeJob:jobObject[0]}, ()=>{this.updateGameState(3)});
  }

  handleNPCInteractions = (npcId) => {
    let player = this.state.playerObject;
    const NPCData = [
      {
          id:601,
          name: "Ya Boy",
          state:0,
          dialouge: [
              {
                  message : "Alright, so this my ... Drake freestyle.",
                  options: [
                      {
                          name:"Listen to his rap",
                          effect:()=>{
                            let audio = new Audio('./audio/effects/WackAssFreestyle.mp3');
                            audio.play();
                            return false;
                          }
                      },
                      {
                        name:"Tell him he can't freestyle",
                        effect:()=>{
                          let audio = new Audio('./audio/effects/WackAssFreestyle.mp3');
                          audio.play();
                          return false;
                        }
                      },
                      {
                        name:"Exit",
                        effect:()=>{
                          let audio = new Audio('./audio/effects/WackAssFreestyle.mp3');
                          audio.play();
                          return false;
                        }
                      }
                  ]
              },
          ]
      },
      {
        id:602,
        name: "Charlie",
        dialouge: [
          {
            message: "Excuse me, I'm thirsty and I want something to drink. Do you have anything I could have please?",
            options: [
              {
              name:"Give him Fiji Water",
              effect:()=> {
                let foundArray = [];
                for (let i=0 ; i < player.inventory.length; i++){
                  if (player.inventory[i].name === "Fiji Water"){
                    foundArray.push(i);
                  }
                }
                if(foundArray[0] === undefined){
                  return 1;
                }
                player.inventory.splice(foundArray[0],1);
                this.setState({playerObject : player});
                return 2;
              },
            },
              {
                name:"Give him Booze",
                effect:()=> {
                  let foundArray = [];
                  for (let i=0 ; i < player.inventory.length; i++){
                    if (player.inventory[i].name === "Beer" ||player.inventory[i].name === "Whiskey"){
                      foundArray.push(i);
                    }
                  }
                  if(foundArray[0] === undefined){
                    return 1;
                  }
                  player.inventory.splice(foundArray[0],1);
                  this.setState({playerObject : player});
                  return 3; 
              }
            }
            ]
          },
          {
            message: "You don't have any Fiji Water! Leave me alone loser!",
            options: [
              {
                name:"Exit",
                effect: ()=>{
                  return false;
                }
              }
            ]
          },
          {
            message: "Wow thanks! I'll tell all my friends how cool you are! (-5 Street Cred, +1 Charisma)",
            options:[
              {
                name:"Exit",
                effect: ()=>{
                  player.streetCred -= 5;
                  player.stats[0].value += 1;
                  this.setState({playerObject:player});
                  return false;
                }
              }
            ]
          },
          {
            message: "Are you sure this is better than water? I feel a bit dizzy... (+5 Street Cred, +1 Charisma)",
            options:[
              {
                name:"Exit",
                effect: ()=>{
                  player.streetCred += 5;
                  player.stats[0].value += 1;
                  this.setState({playerObject:player});
                  return false;
                }
              }
            ]
          }
        ],
      }
    ]

    let chosenNPC = NPCData.filter((npcs)=>{
      return npcs.id === npcId;
    });
    let npc = chosenNPC[0];

    return npc;
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
      handleNPCInteractions={this.handleNPCInteractions}
      time={this.state.gameTime}
      />,
      ],
      <Interface 
      updatePlayerState={this.updatePlayerState}
      jobData={this.state.activeJob}
      storeData={this.state.activeStore}
      updateGameState = {this.updateGameState}
      playerData = {this.state.playerObject}
      updateLog={this.updatePlayerLog}
      jobOptions={this.state.jobOptions}
      checkTime={this.checkTime}
      updateTime={this.updateTime}
      />,
      <Combat 
      updateLog={this.updatePlayerLog}
      player={this.state.playerObject}
      opponent={this.state.opponentObject}
      updatePlayerState={this.updatePlayerState}
      updateGameState={this.updateGameState}
      updateTime={this.updateTime}
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
