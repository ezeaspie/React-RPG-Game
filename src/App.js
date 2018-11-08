import React, { Component } from 'react';
import './App.css';
import StartMenu from './components/StartMenu';
import CharacterCreation from './components/CharacterCreation';
import MapUI from './components/MapUI';
import Interface from './components/Interface';
import Combat from './components/Combat';
import Weapons from './gameAssets/weapons';
import Jobs from './gameAssets/jobData';
import Jail from './components/Jail';
import Death from './components/Death';
import Credits from './components/Credits';
import staticItems from './gameAssets/StaticItems';

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
      canChump:true,
      hasSavedGame:false,
      activeJob:undefined,
      consumableItems: undefined,
      currentDay: 1,
    }
  }

  componentWillMount = () => {
    this.setInventoryList();
    const playerSave = JSON.parse(localStorage.getItem( "playerSave" ));
    const playerPosition = JSON.parse(localStorage.getItem("playerPos"));
    const playerMap = JSON.parse(localStorage.getItem("playerMap"));
    const currentTime = JSON.parse(localStorage.getItem("gameTime"));
    const currentDay = JSON.parse(localStorage.getItem("currentDay"));
    if(playerSave !== null){
      this.setState( { 
        playerObject: playerSave, 
        hasSavedGame : true,
        playerPosition,
        playerCurrentMap : playerMap, 
        gameTime : currentTime,
        currentDay,
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

  retrieveSave = () => {
    const playerSave = JSON.parse(localStorage.getItem( "playerSave" ));
    const playerPosition = JSON.parse(localStorage.getItem("playerPos"));
    const playerMap = JSON.parse(localStorage.getItem("playerMap"));
    const currentTime = JSON.parse(localStorage.getItem("gameTime"));
    const currentDay = JSON.parse(localStorage.getItem("currentDay"));
    this.setState( { 
      playerObject: playerSave, 
      hasSavedGame : true,
      playerPosition,
      playerCurrentMap : playerMap, 
      gameTime : currentTime,
      currentDay,
    });
  }

  saveToLocal = (position = null) => {
    let getAndSetData = () => {
      const playerData = this.state.playerObject;
      const playerPosition = this.state.playerPosition;
      const playerMap = this.state.playerCurrentMap;
      const currentTime = this.state.gameTime;
      const currentDay = this.state.currentDay;
      localStorage.setItem("playerSave", JSON.stringify(playerData));
      localStorage.setItem("playerPos", JSON.stringify(playerPosition));
      localStorage.setItem('playerMap', JSON.stringify(playerMap));
      localStorage.setItem('gameTime', JSON.stringify(currentTime));
      localStorage.setItem('currentDay', JSON.stringify(currentDay));
      console.log("Game Saved");
      return;
    }
    if(position !== null){
      this.setState({playerPosition:position},getAndSetData);
    }
    getAndSetData();
   }

   setInventoryList = () => {
    const consumableItems = 
    [
      {
        name:"Bagel",
        id:0,
        description: <div><p>Warm and toasted, covered with cream cheese.</p><p>+5 Health</p></div>,
        price: 5,
        isConsumable:true,
        effect: () => {
          return this.updatePlayerHealth(5,false);
        },
      },
      {
        name:"Fiji Water",
        id:1,
        description: <div><p>Why spend so much on water? Because you can that's why.</p>+10 Health<p></p></div>,
        price: 10,
        isConsumable:true,
        effect: () => {
          return this.updatePlayerHealth(10,false);
        },
      },
      {
        name:"Beer",
        id:2,
        description: <div><p>Tastes like dishwater but good enough for what you need.</p><p>+1 Charisma -1 Intelligence</p></div>,
        price: 10,
        isConsumable:true,
        effect:()=> {
          return this.updatePlayerStat(1,0,-1,0,0,0);
        },
      },
      {
        name:"Whiskey",
        id:3,
        description: <div><p>This drink packs a bigger punch.</p><p>+2 Charisma -1 Intelligence</p></div>,
        price: 40,
        isConsumable:true,
        effect: () => {
          return this.updatePlayerStat(2,0,-1,0,0,0);
        },
      },
      {
        name:"Goldschläger",
        id:4,
        description: <div><p>With gold flakes floating around, the drink of choice to show off your cash while drinking!</p><p>+10 Charisma -4 Intelligence +1 StreetCred</p></div>,
        price: 500,
        isConsumable:true,
        effect: () => {
          return this.updatePlayerStat(10,0,-4,0,0,1);
        }
      },
      {
        name:"'From Fit to Fat' Plan",
        id:5,
        description: <div><p>Ignore the title, there was a misprint. No really.</p><p>+5 Strength -3 Intelligence</p></div>,
        price: 100,
        isConsumable:true,
        effect: () => {
          return this.updatePlayerStat(0,5,-3,0,0,0);
        }
      },
      {
        name:"PURE Protein",
        id:6,
        description: <div><p>Not your ordinary protein powder - this will make you into a beast. At the cost of several hours on the toilet</p><p>+5 Strength</p></div>,
        price: 120,
        isConsumable:true,
        effect: () => {
          return this.updatePlayerStat(0,5,0,0,0,0);
        }
      },
      {
        name:"Good Weed",
        id:7,
        description: <div><p>There's probably a reason why this is so cheap.</p><p>+1 Charisma</p></div>,
        price: 25,
        isConsumable:true,
        effect: () => {
          let audio = new Audio("./audio/effects/goodWeed.mp3");
          audio.play();
          return this.updatePlayerStat(1,0,0,0,0,0);
        }
      },
      {
        name:"Crack",
        id:8,
        price:150,
        description: <div><p>Probably not the best for your health but you do you!</p><p>+2 Charisma -5 Intelligence -1 StreetCred</p></div>,
        isConsumable:true,
        effect: () => {
          return this.updatePlayerStat(2,0,-5,0,0,-1);
        },
      },
        {
          name:"Greek Yogurt",
          id:9,
          price:10,
          description: <div><p>Rich and organic, this is sure to give you a healthy boost for the day!</p><p>+10 Health</p></div>,
          isConsumable:true,
          effect: () => {
            return this.updatePlayerHealth(10,false);
          }
        },
        {
          name:"Kale Salad",
          id:10,
          price:25,
          description: <div><p>If you manage to actually get it down, you'll feel great!</p><p>+30 Health</p></div>,
          isConsumable:true,
          effect: () => {
            return this.updatePlayerHealth(30,false);
          },
        },
        {
          name:"SuperFruit",
          id:11,
          price:50,
          description: <div><p>+100 Health</p><p>Hi welcome to superfruit today's my birthday so the whole episode's going to be about me! That's not true. It is. It's not happening. I wish you could just stay calm instead of flying off the handle all the time! I hope you're happy. I hope you're happy. I hope you're happy when you grovel in submission to feed your own ambition. And now i can't imagine how. I hope you're happy. RIGHT NOWWWWWWW.</p></div>,
          isConsumable:true,
          effect: () => {
            return this.updatePlayerHealth(100,false);
          },
        },
    ]

    this.setState({consumableItems});
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

  setDay = (amount) => {
    this.setState({currentDay:this.state.currentDay + amount});
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
    }
    this.setState({playerObject : playerObject,playerPosition : [15,3], playerCurrentMap:0},()=>{
      this.updateGameState(2);
      this.saveToLocal();
      });
  }

  updatePlayerPosition = (newPosition) => {
    this.setState({playerPosition:newPosition});
  }

  updatePlayerHealth = (amount,exceedMax) => {
    let player = this.state.playerObject;
    if(exceedMax){
      player.health += amount;
    }
    else{
      let limit = player.maxHealth;
      if(player.health + amount >= limit){
        player.health = player.maxHealth;
      }
      else{
        player.health += amount;
      }
    }

    return player;
  }

  goToJail = (bail,streetCred,luckReward,storeRank) => {
    let JailElement = <Jail
    createOpponent={this.createOpponent}
    checkTime={this.checkTime}
    bail = {bail}
    updateOpponent={this.updateOpponent}
    luckReward={luckReward}
    streetCred = {streetCred}
    player={this.state.playerObject}
    updateGameState={this.updateGameState}
    updatePlayerState={this.updatePlayerState}
    storeRank={storeRank}
    setDay={this.setDay}
    />
    this.setState({gameState : 5,gameScreen : JailElement});
  }

  updateOpponent = (opponentObject) => {
    this.setState({opponentObject});
  }

  createOpponent = (name,strRange,lckRange,agiRange,moneyRange,possibleWeapons,weaponAmount,updateState=false,canChump=true) => {
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
    if(!canChump){
      this.setState({canChump:false});
    }
    else{
      this.setState({canChump:true});
    }
    if(updateState){
      this.setState({opponentObject:opponent},()=>this.updateGameState(4));
      return;
    }
    return opponent;
  }

  updatePlayerStat = (charisma,strength,intelligence,agility,luck,streetCred)=> {
    let player = this.state.playerObject;
    let statArray = [charisma,strength,intelligence,agility,luck];
    player.streetCred += streetCred;
    let newArray = player.stats.map((stat,i) => {
      let newVal = stat.value += statArray[i];
      return {name:stat.name,value:newVal}
    });
    player.stats = newArray;
    return player;
  }

  renderStoreInterface = (storeId) => {
    let player = this.state.playerObject;

    let updateStat = (charisma,strength,intelligence,agility,luck,money,streetCred) => {
      let statArray = [charisma,strength,intelligence,agility,luck];
      let updatedStats = statArray.map((statChange,i) => {
        player.stats[i].value += statChange;
        if(statChange !== 0){
          return {name:player.stats[i].name, value:statChange}
        }
        return undefined;
        });
        updatedStats = updatedStats.filter((stat)=>{return stat !== undefined});
        if(money !== 0){
          player.money += money;
          updatedStats.push({name:"Money", value:money});
        }
        if(streetCred !== 0){
          player.streetCred += streetCred;
          updatedStats.push({name:"StreetCred", value:streetCred});
        }
        console.log(updatedStats);
      let message = <div>
        {
          updatedStats.map((stat)=>{
              return <p style={{textAlign:"center"}}>{stat.name} {stat.value>0?"+":null}{stat.value}</p>
          })
        }
      </div>;
      return [player,message];
    }

    let getRobThePlaceData = (storeRank) => {
      let strength = player.stats[1].value;
        let luck = player.stats[4].value;
        let agility = player.stats[3].value;

        let robChance = strength + luck + agility;
        robChance /= 3;
        robChance = Math.ceil(robChance);
        robChance -= storeRank;

        if(robChance < 1){
          robChance = 1;
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

        let luckReward = calculateLuckBonus();

        let streetCredReward = 5 + storeRank/2;
        streetCredReward *= rewardMultipler;

        console.log({robChance:robChance>=randomNum});

        if(robChance >= randomNum){
            let message = "Robbery success - Stole some cash.";
            player.money += cashReward + luckReward;
            player.streetCred += streetCredReward;
            return [player,true,robChance,storeRank,message,cashReward+luckReward,streetCredReward];
        }
        else{
          let message = "Robbery failed - Caught,robbed, and beat down in jail.";
          return [player,false,robChance,storeRank,message,cashReward,streetCredReward,luckReward,storeRank];  
        }
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
                      this.setState({gameTime:9, currentDay: this.state.currentDay + 1});
                      return([this.updatePlayerHealth(20,false),<p>Restored 20 health</p>]);
                  }
              }
          ]
      },
      {
          id:402,
          isShop: true,
          name:"Gas Station",
          inventory: [
            this.state.consumableItems[0],
            this.state.consumableItems[1],
          ],
          options: [
            {
              name: "Rob the Place",
              effect: ()=>{return(robThePlace(0))},
              getData: ()=>{return(getRobThePlaceData(0))}
            }
          ]
      },
      {
        id:403,
        isShop: true,
        name:"9:30 Bar",
        inventory: [
          this.state.consumableItems[2],
          Weapons[0],
          this.state.consumableItems[3],
          this.state.consumableItems[4],
        ],
        options: [
          {
            name: "Rob the Place",
            effect: ()=>{return(robThePlace(20))},
            getData: ()=>{return(getRobThePlaceData(20))}
          },
          {
            name: "Get into a fight vs. Melweed",
            effect: ()=>{
              let opponent = this.createOpponent("Melweed",[5,10],[5,10],[5,10],[100,200],Weapons,2);
              if(this.checkTime(4)){
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
      name:"Wilmox High School",
      options: [
        {
          name: "Get into a fight",
          effect: ()=>{
            let weapons = [Weapons[0],Weapons[1],Weapons[2],Weapons[3]];
            let opponent = this.createOpponent("High School Kid",[5,10],[5,10],[5,10],[100,200],weapons,2);
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
          effect: ()=>{
            if(this.checkTime(6)){
              this.updateTime(false,6);
              return updateStat(0,0,1,0,0,0,0);
            }
            else{return [player, <p>It's too late!</p>]}}
        },
        {
          name: "Go to Class for $25",
          effect: ()=>{
            if(this.checkTime(8)){
              if(this.state.playerObject.money >= 25){
                this.updateTime(false,8);
                return updateStat(0,0,3,0,0,-25,0);
              }
             return [player, <p>You don't have enough money</p>] 
            }
            else{return [player, <p>It's too late!</p>]}
          }
        },
        {
          name: "Use Gym Facilities for $25",
          effect: ()=>{
            if(this.checkTime(4)){
              if(this.state.playerObject.money >= 25){
                this.updateTime(false,4);
                return updateStat(0,1,3,0,0,-25,0);
              }
             return [player, <p>You don't have enough money</p>] 
            }
            else{return [player, <p>It's too late!</p>]}
          }
        },
      ]
    },
    {
      id:405,
      isShop: false,
      name:"Bank of NorthWest",
      inventory: [],
      options: [
        {
          name: "Rob the Place",
          effect: ()=>{return(robThePlace(100))},
          getData: ()=>{return(getRobThePlaceData(100))}
        },
      ]
  },
  {
    id:406,
    isShop: true,
    name:"Speedy Delivery Post Office",
    inventory: [
      staticItems[0],
      staticItems[1],
      staticItems[2],
    ],
    options: [
      {
        name: "Rob the Place",
        effect: ()=>{return(robThePlace(40))},
        getData: ()=>{return(getRobThePlaceData(40))}
      }
    ]
  },
  {
    id:407,
    isShop: false,
    name:"Renter's Construction Contracters",
    inventory: [],
    options: [
      {
        name: "Rob the Place",
        effect: ()=>{return(robThePlace(25))},
        getData: ()=>{return(getRobThePlaceData(25))}
      }
    ]
  },
  {
    id:408,
    isShop: true,
    name:"Strong Guy's Gym",
    inventory: [
      this.state.consumableItems[5],
      this.state.consumableItems[6],
    ],
    options: [
      {
        name: "Rob the Place",
        effect: ()=>{return(robThePlace(30))},
        getData: ()=>{return(getRobThePlaceData(30))}
      },
      {
        name: "Get into a fight vs. Henry the Strong Guy",
        effect: ()=>{
          let opponent = this.createOpponent("Henry the Strong Guy",[20,30],[10,20],[20,25],[150,300],Weapons,1,false,true);
          if(this.checkTime(4)){
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
    id:409,
    isShop: true,
    name:"The Back Alley",
    inventory: [
      this.state.consumableItems[7],
      this.state.consumableItems[1],
    ],
    options: [
      {
        name: "Rob the Place",
        effect: ()=>{return(robThePlace(50))},
        getData: ()=>{return(getRobThePlaceData(50))}
      },
      {
        name: "Get into a fight vs. Frank",
        effect: ()=>{
          let opponent = this.createOpponent("Frank",[50,60],[20,30],[30,55],[500,550],Weapons,3,false,true);
          if(this.checkTime(4)){
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
    id:410,
    isShop: false,
    name:"Mattress Discounters",
    inventory: [
      this.state.consumableItems[0],
      this.state.consumableItems[1],
    ],
    options: [
      {
        name: "Rob the Place",
        effect: ()=>{return(robThePlace(20))},
        getData: ()=>{return(getRobThePlaceData(20))}
      },
    ]
  },
  {
    id:411,
    isShop: false,
    name:"Channy Used Auto Sales",
    inventory: [
      this.state.consumableItems[0],
      this.state.consumableItems[1],
    ],
    options: [
      {
        name: "Rob the Place",
        effect: ()=>{return(robThePlace(35))},
        getData: ()=>{return(getRobThePlaceData(35))}
      },
      {
        name: "Get into a fight vs. a Car Salesman",
        effect: ()=>{
          let opponent = this.createOpponent("Jim the Salesman",[5,10],[5,10],[5,10],[50,70],Weapons,0,false,true);
          if(this.checkTime(4)){
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
    id:412,
    isShop: true,
    name:"Fresh! Organic Market",
    inventory: [
      this.state.consumableItems[9],
      this.state.consumableItems[10],
      this.state.consumableItems[11],
    ],
    options: [
      {
        name: "Rob the Place",
        effect: ()=>{return(robThePlace(10))},
        getData: ()=>{return(getRobThePlaceData(10))}
      },
    ]
  },
  {
    id:413,
    isShop: true,
    name:"Homeowner's Depot",
    inventory: [
      staticItems[3],
    ],
    options: [
      {
        name: "Rob the Place",
        effect: ()=>{return(robThePlace(10))},
        getData: ()=>{return(getRobThePlaceData(10))}
      },
    ]
  }
    ]
    let storeObject = storeCollection.filter(object => object.id === storeId);
    let jobObject = Jobs.filter(job => job.id === storeId);
    this.setState({activeStore:storeObject[0],activeJob:jobObject[0]}, ()=>{this.updateGameState(3)});
  }

  handleNPCInteractions = (npcId) => {
    let player = this.state.playerObject;
    let stats = this.state.playerObject.stats;
    let filterNPCState = (id) => {
      let isNew = false;
      let filteredObjectArray = player.npcStates.filter((npc) =>{
        return id === npc.id;
      });
      if(filteredObjectArray[0] === undefined){
        player.npcStates.push({id, state:0});
        filteredObjectArray.push({id,state:0});
        isNew = true;
      }
        return [filteredObjectArray[0],isNew];
    }

    let checkForNewNPCState = (id,isNew) => {
      if(isNew){
        this.setState({playerObject: player});
      }
      else{
        return;
      }
    }

    let setNPCState = (id,newState) => {
        player.npcStates.filter((npc,i) =>{
        if(id === npc.id){
          player.npcStates[i].state = newState;
          this.setState({playerObject:player});
        }        
        return id === npc.id;
      });
    }

    let noCheck = () => {
      return true
    }

    let checkForItem = (itemId) => {
      let foundArray = [];
      for (let i=0 ; i < player.inventory.length; i++){
        if (player.inventory[i].id === itemId){
          foundArray.push(i);
        }
      }
      if(foundArray[0] === undefined){
        return false;
      }
      console.log(true);
      return true;
    }

    let removeInventoryItem = (itemId) => {
      let foundArray = [];
      for (let i=0 ; i < player.inventory.length; i++){
        if (player.inventory[i].id === itemId){
          foundArray.push(i);
        }
      }
      player.inventory.splice(foundArray[0],1);
      this.setState({playerObject : player});
    }

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
                          name:"Alright, let me hear it.",
                          check: ()=>noCheck(),
                          effect:()=>{
                            let audio = new Audio('./audio/effects/WackAssFreestyle.mp3');
                            audio.play();
                            return false;
                          }
                      },
                      {
                        name:"You can't freestyle!",
                        check: ()=>noCheck(),
                        effect:()=>{
                          let audio = new Audio('./audio/effects/WackAssFreestyle.mp3');
                          audio.play();
                          return false;
                        }
                      },
                      {
                        name:"Exit",
                        check: ()=>noCheck(),
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
              check: ()=>{
                let foundArray = [];
                for (let i=0 ; i < player.inventory.length; i++){
                  if (player.inventory[i].name === "Fiji Water"){
                    foundArray.push(i);
                  }
                }
                if(foundArray[0] === undefined){
                  return false;
                }
                return true;
              },
              effect:()=> {
                let foundArray = [];
                for (let i=0 ; i < player.inventory.length; i++){
                  if (player.inventory[i].name === "Fiji Water"){
                    foundArray.push(i);
                  }
                }
                player.inventory.splice(foundArray[0],1);
                this.setState({playerObject : player});
                return 2;
              },
            },
              {
                name:"Give him Booze",
                check: ()=>{
                  let foundArray = [];
                  for (let i=0 ; i < player.inventory.length; i++){
                    if (player.inventory[i].name === "Beer" ||player.inventory[i].name === "Whiskey"){
                      foundArray.push(i);
                    }
                  }
                  if(foundArray[0] === undefined){
                    return false;
                  }
                  return true;
                },
                effect:()=> {
                  let foundArray = [];
                  for (let i=0 ; i < player.inventory.length; i++){
                    if (player.inventory[i].name === "Beer" ||player.inventory[i].name === "Whiskey"){
                      foundArray.push(i);
                    }
                  }
                  player.inventory.splice(foundArray[0],1);
                  this.setState({playerObject : player});
                  return 3; 
              }
            },
            {
              name:"Exit",
              check: ()=>noCheck(),
              effect: ()=>{
                return false;
              }
            },
            ]
          },
          {
            message: "You don't have any Fiji Water! Leave me alone loser!",
            options: [
              {
                name:"Exit",
                check: ()=>noCheck(),
                effect: ()=>{
                  return false;
                }
              },
            ]
          },
          {
            message: "Wow thanks! I'll tell all my friends how cool you are! (-5 Street Cred, +1 Charisma)",
            options:[
              {
                name:"Exit",
                check: ()=>noCheck(),
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
                check: ()=>noCheck(),
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
      },
      {
        id:603,
        name: "Frank",
        dialouge: [
          {
            message: "You the guy who bringing the goods?",
            options: [
              {
              name:"No, I think you've mistaken me for someone else.",
              check: ()=>noCheck(),
              effect:()=> {
                return 2
              },
            },
              {
                name:"Yeah that's me. Where do I drop them off?",
                check: ()=>noCheck(),
                effect:()=> {
                  return 1; 
              }
            }
            ]
          },
          {
            message: "What do mean 'Where do I drop them off'? You got the location. Can't tell you - people might be listening in.",
            options: [
              {
                name:`[Charisma ${stats[0].value * 2>=100?100:stats[0].value *2}%] Try to get more info from him.`,
                check: ()=>noCheck(),
                effect: ()=>{
                  let NPCStateReturn = filterNPCState(603);
                  let isNew = NPCStateReturn[1];
                  let npcState = NPCStateReturn[0];
                  checkForNewNPCState(603,isNew);
                  console.log(npcState);
                  if(npcState.state === 1){
                    return 5;
                  }
                  if(npcState.state === 2){
                    return 6;
                  }
                  let randomNum = Math.floor(Math.random() * 100);
                  if(player.stats[0].value >= randomNum){
                    setNPCState(603,2)
                    return 3;
                  }
                  else{
                    setNPCState(603,1)
                    return 4;
                  }
                }
              },
              {
                name:"Exit",
                check: ()=>noCheck(),
                effect: ()=>{
                  return false;
                }
              }
            ]
          },
          {
            message: "Oh. We never talked.",
            options:[
              {
                name:"Exit",
                check: ()=>noCheck(),
                effect: ()=>{
                  return false;
                }
              }
            ]
          },
          {
            message: "Hmm... you don't look like a cop. The Back Alley is in the back of the Mattress Discount. Go into the alley and at the end turn to the right.",
            options:[
              {
                name:"Exit",
                check: ()=>noCheck(),
                effect: ()=>{
                  return false;
                }
              }
            ]
          },
          {
            message: "Nu-uh. You might be a cop. I ain't telling you nothing.",
            options:[
              {
                name:"Exit",
                check: ()=>noCheck(),
                effect: ()=>{
                  return false;
                }
              }
            ]
          },
          {
            message: "I already told you no! Now get outta my face.",
            options:[
              {
                name:"Exit",
                check: ()=>noCheck(),
                effect: ()=>{
                  return false;
                }
              }
            ]
          },
          {
            message: "Huh? I already told you. In the alley next to the Mattress Discount. Get to the end of the alley and turn right.",
            options:[
              {
                name:"Exit",
                check: ()=>noCheck(),
                effect: ()=>{
                  return false;
                }
              }
            ]
          },
        ],
      },
      {
        id:604,
        name: "Jacob",
        dialouge: [
          {
            message: "My mom's birthday is coming up... Ah I can't think of a present! What am I going to do?",
            options: [
              {
              name:"Sorry, not my business.",
              check: ()=> {
                let returnVal = filterNPCState(604);
                if(returnVal[0].state !== 2){
                  return true;
                }
              },
              effect:()=> {
                return 2
              },
            },
              {
                name:"What does she like?",
                check: ()=>{
                  let returnVal = filterNPCState(604);
                if(returnVal[0].state !== 2 && returnVal[0].state !== 1){
                  return true;
                }
                },
                effect:()=> {
                  return 1; 
              }
            },
            {
              name:"I gave you a gift already. Did you say you need something else?",
              check: ()=> {
                let returnVal = filterNPCState(604);
                if(returnVal[0].state === 1){
                  return true;
                }
              },
              effect:()=>{
                return 3;
              }
            },
            {
              name:"Uh... I gave you the gift and packing supplies.",
              check: ()=> {
                let returnVal = filterNPCState(604);
                console.log(returnVal);
                if(returnVal[0].state === 2){
                  return true;
                }
              },
              effect:()=>{
                return 5;
              }
            },
            ]
          },
          {
            message: "Her tastes are too expensive for me! She always mentions how sore her bed makes her back... she did mention she wanted a new sewing machine... oh and she likes fancy liqour. Not to drink but just to keep as decor. Yeah, I don't understand it either.",
            options: [
              {
                name:`Yeah that's too much money. Maybe get her a card?`,
                check: ()=>noCheck(),
                effect: ()=>{
                  return 2
                }
              },
              {
                name:"Here's a sewing machine. I don't need it.[+25 Charisma]",
                check: ()=>checkForItem(104),
                effect: ()=>{
                  removeInventoryItem(104);
                  checkForNewNPCState(604,true);
                  setNPCState(604,1);
                  this.updatePlayerStat(25,0,0,0,0,0);
                  return 3;
                }
              },
              {
                name:"Expensive liquor? I have a bottle of Goldschläger you can have.[+25 Charisma]",
                check: ()=>checkForItem(4),
                effect: ()=>{
                  removeInventoryItem(4);
                  checkForNewNPCState(604,true);
                  setNPCState(604,1);
                  this.updatePlayerStat(25,0,0,0,0,0);
                  return 3;
                }
              }
            ]
          },
          {
            message: "Yeah I guess. Sorry to bother you.",
            options:[
              {
                name:"Exit",
                check: ()=>noCheck(),
                effect: ()=>{
                  return false;
                }
              }
            ]
          },
          {
            message: "Thanks a bunch! But my mom lives out of state and I don't have any packing supplies... I don't suppose you can help me there.",
            options:[
              {
                name:"Here's some packing supplies. [+2 StreetCred]",
                check: ()=> checkForItem(101),
                effect: ()=> {
                  removeInventoryItem(101);
                  setNPCState(604,2);
                  this.updatePlayerStat(25,0,0,0,0,2);
                  return 4;
                }
              },
              {
                name:"Exit",
                check: ()=>noCheck(),
                effect: ()=>{
                  return false;
                }
              }
            ]
          },
          {
            message: "Thanks a bunch - you're really kind! I'll make sure to let everyone know how good you are!",
            options:[
              {
                name:"Exit",
                check: ()=>noCheck(),
                effect: ()=>{
                  return false;
                }
              }
            ]
          },
          {
            message: "Oh right. That was you. Sorry, I'm a bit forgetful. Thanks again!",
            options:[
              {
                name:"Exit",
                check: ()=>noCheck(),
                effect: ()=>{
                  return false;
                }
              }
            ]
          },
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
      consumableItems = {this.state.consumableItems}
      mapId = {this.state.playerCurrentMap}
      playerPosition = {this.state.playerPosition}
      updatePlayerPosition={this.updatePlayerPosition}
      renderStoreInterface={this.renderStoreInterface}
      updatePlayerState={this.updatePlayerState}
      saveGame={this.saveToLocal}
      handleNPCInteractions={this.handleNPCInteractions}
      time={this.state.gameTime}
      currentDay={this.state.currentDay}
      />,
      ],
      <Interface 
      goToJail={this.goToJail}
      time={this.state.gameTime}
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
      canChump={this.state.canChump}
      />,
      <Jail />,
      <Death 
      days={this.state.currentDay}
      playerData={this.state.playerObject}
      updateGameState={this.updateGameState}
      retrieveSave={this.retrieveSave}
      />,
      <Credits />,
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
