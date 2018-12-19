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
      bountyList :[],
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
    const bountyList = JSON.parse(localStorage.getItem("bountyList"));
    if(playerSave !== null){
      this.setState( { 
        playerObject: playerSave, 
        hasSavedGame : true,
        playerPosition,
        playerCurrentMap : playerMap, 
        gameTime : currentTime,
        currentDay,
        bountyList:bountyList,
      },
      ()=>{
        this.rebuildInventory();
        this.updateGameState(0);
      } 
      );
      console.log('save found');
      return;
    }
    this.updateGameState(0);
    return;
  }

  rebuildInventory = () => {
    let player = this.state.playerObject;
    this.state.playerObject.inventory.map((item,i)=>{
      let id = item.id;
      let restoredItem = null;
      let array = [];
      if(id < 100){//Consumable item
        array = this.state.consumableItems;
      }
      else if(id > 100 && id < 300){
        array= staticItems;
      }else{
        array=Weapons;
      }
      array.filter((item)=>{
        if(id === item.id){
          restoredItem = item;
        }
        return id === item.id;
      });
      if(restoredItem !== null){
        player.inventory[i] = restoredItem;
      }
      return restoredItem;
    });
    this.setState({playerObject : player});
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

  resetActiveStore = () => {
    this.setState({activeJob:undefined,activeStore:undefined});
  }

  saveToLocal = (position = null) => {
    let getAndSetData = () => {
      const playerData = this.state.playerObject;
      const playerPosition = this.state.playerPosition;
      const playerMap = this.state.playerCurrentMap;
      const currentTime = this.state.gameTime;
      const currentDay = this.state.currentDay;
      const bountyList = this.state.bountyList;
      localStorage.setItem("playerSave", JSON.stringify(playerData));
      localStorage.setItem("playerPos", JSON.stringify(playerPosition));
      localStorage.setItem('playerMap', JSON.stringify(playerMap));
      localStorage.setItem('gameTime', JSON.stringify(currentTime));
      localStorage.setItem('currentDay', JSON.stringify(currentDay));
      localStorage.setItem('bountyList',JSON.stringify(bountyList));
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
          price:80,
          description: <div><p>+100 Health</p><p>Hi welcome to superfruit today's my birthday so the whole episode's going to be about me! That's not true. It is. It's not happening. I wish you could just stay calm instead of flying off the handle all the time! I hope you're happy. I hope you're happy. I hope you're happy when you grovel in submission to feed your own ambition. And now i can't imagine how. I hope you're happy. RIGHT NOWWWWWWW.</p></div>,
          isConsumable:true,
          effect: () => {
            return this.updatePlayerHealth(100,false);
          },
        },
        {
          name:"Medical Journal of Psychology",
          id:12,
          price:100,
          description:<div><p>+3 Charisma</p><p>An entire issue of peer-reviewed articles with the latest on psychological discoveries.</p></div>,
          isConsumable:true,
          effect: () => {
            return this.updatePlayerStat(3,0,0,0,0,0);
          }
        },
        {
          name:"Horseshoe Charm",
          id:13,
          price: 100,
          description:<div><p>+1 Luck</p><p>Get lucky with this charm - guaranteed to make you 1% luckier today!</p></div>,
          isConsumable:true,
          effect: ()=>{
            return this.updatePlayerStat(0,0,0,0,1,0);
          }
        }
    ]

    this.setState({consumableItems});
   }
  updatePlayerState = (playerObject) => {
    this.setState({playerObject});
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

  createPlayer = (name, stats, skin) => {
    let ammoFactory = (name,id,abbreviation) => {
      return{
        id,
        name,
        abbreviation,
        amount:0,
      }

    }
    let playerObject = {
      name,
      stats,
      inventory : [
      ],
      money: 20,
      health: 90,
      maxHealth: 100,
      streetCred: 0,
      jobs: [],
      npcStates:[],
      companion:null,
      activeWeapons:[],
      skin,
      skinCollection:[skin],
      armor:[],
      ammo:[
        ammoFactory("Light Bullets",0,"LB"),
        ammoFactory("Medium Bullets",1,"MB"),
        ammoFactory("Heavy Bullets",2,"HB"),
        ammoFactory('Batteries',3,"BAT"),
        ammoFactory('Energy Cells', 4,"CEL"),
        ammoFactory('Power Charges',5,"PWR"),
        ammoFactory('Cherry Bombs', 6,"BOM"),
        ammoFactory('Explosive Shells', 7,"SHL"),
      ]
    }
    this.setState({playerObject : playerObject,playerPosition : [15,3], playerCurrentMap:0},()=>{
      this.updateGameState(2);
      this.saveToLocal();
      });
  }

  addSkin = (id) => {
    let player = this.state.playerObject;
    player.skinCollection.push(id);
    this.setState({playerObject:player});
  }

  editAmmo = (ammoId,amount) => {
    let player = this.state.playerObject;
    player.ammo[ammoId].amount += amount;

    this.setState({playerObject:player});
  }

  equipWeapon = (weapon) => {
    let id = Number(weapon.id);
    let player = this.state.playerObject;

    let check = player.activeWeapons.filter((weaponId)=>{
      return id === weaponId;
    });

    if(check[0] !== undefined){
        return;
    }
    console.log("added a weapon");

    if(player.activeWeapons.length > 3){
      player.activeWeapons.pop();
    }
    player.activeWeapons.unshift(id);
    this.setState({playerObject:player});
  }

  removeWeapon = (index) => {
    let player = this.state.playerObject;
    player.activeWeapons.splice(index,1);
    this.setState({playerObject:player});
  }

  updatePlayerPosition = (newPosition) => {
    this.setState({playerPosition:newPosition});
  }

  updatePlayerCompanion = (companionIndex) => {
    let player = this.state.playerObject;
    player.companion = companionIndex;
    this.setState({playerObject:player});
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

  createOpponent = (name,strRange,lckRange,agiRange,moneyRange,possibleWeapons,weaponAmount,ammoCount,skin,canChump=true,maxHealth=100) => {
    //name='string',RANGE = [lowVal,highVal],possibleWeapons=Array of all wieldable, weaponAmount=how much weapons to give opponent
      let ammoFactory = (name,id,abbreviation,amount) => {
        return{
          id,
          name,
          abbreviation,
          amount,
        }
      }
    
    let valueFromRange = (min,max) => {
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    let chooseWeapons = () => {
      let equippedWeapons = [];
      for(var i=0; i < weaponAmount; i++){
        let selectedWeaponIndex = valueFromRange(0,possibleWeapons.length-1);
        equippedWeapons.push(possibleWeapons[selectedWeaponIndex]);
        possibleWeapons.splice(selectedWeaponIndex, 1);
      }
      return equippedWeapons;
    }
    
    let opponent = {
      name,
      skin,
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
      health: maxHealth,
      maxHealth: maxHealth,
      ammo:[
        ammoFactory("Light Bullets",0,"LB",ammoCount[0]),
        ammoFactory("Medium Bullets",1,"MB",ammoCount[1]),
        ammoFactory("Heavy Bullets",2,"HB",ammoCount[2]),
        ammoFactory('Batteries',3,"BAT",ammoCount[3]),
        ammoFactory('Energy Cells', 4,"CEL",ammoCount[4]),
        ammoFactory('Power Charges',5,"PWR",ammoCount[5]),
        ammoFactory('Cherry Bombs', 6,"BOM",ammoCount[6]),
        ammoFactory('Explosive Shells', 7,"SHL",ammoCount[7]),
      ]
    }
    if(!canChump){
      this.setState({canChump:false});
    }
    else{
      this.setState({canChump:true});
    }
    return opponent;
  }

  addInventoryItem = (item) => {
    let player = this.state.playerObject;
    player.inventory.push(item);
    this.setState({playerObject : player});
  }

  checkForItem = (itemId) => {
    let player = this.state.playerObject;
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

  checkForSkin = (skinId) => {
    let player = this.state.playerObject;
    let foundArray = [];
    for (let i=0 ; i < player.skinCollection.length; i++){
      if (player.skinCollection[i] === skinId){
        foundArray.push(i);
      }
    }
    if(foundArray[0] === undefined){
      return false;
    }
    console.log(true);
    return true;
  }

  removeInventoryItem = (itemId) => {
    let player = this.state.playerObject;
    let foundArray = [];
    for (let i=0 ; i < player.inventory.length; i++){
      if (player.inventory[i].id === itemId){
        foundArray.push(i);
      }
    }
    player.inventory.splice(foundArray[0],1);
    this.setState({playerObject : player});
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
          Weapons[2],
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
            id:1,
            rank: 45,
            effect: ()=>{
              let opponent = this.createOpponent("Melweed",[45,55],[45,55],[30,50],[400,500],[Weapons[10],Weapons[4]],2,[0,10,5,0,0,0,0,0]);
              if(this.checkTime(4)){
                this.startCombat(opponent,'',this.state.consumableItems[7]);
                //this.setState({opponentObject:opponent},()=>this.updateGameState(4));
              }
              else{
                return [player, <p>It's too late!</p>];
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
          name: "Get into a fight vs High School Kid",
          id:1,
          rank:10,
          effect: ()=>{
            let opponent = this.createOpponent("High School Kid",[10,20],[10,20],[10,20],[50,100],[Weapons[1],Weapons[3]],1,0,'NONE',true);
            if(this.checkTime(2)){
              this.startCombat(opponent,'none',this.state.consumableItems[9],500);
            }
            else{
              return [player, <p>It's too late!</p>];
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
            if(this.checkTime(6)){
              if(this.state.playerObject.money >= 25){
                this.updateTime(false,6);
                return updateStat(0,0,2,0,0,-25,0);
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
                return updateStat(0,1,0,0,0,-25,0);
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
        name: "[AGI++, AGI+++ Chance] Take Courier Agility Course for $65",
        effect: ()=>{
          if(this.checkTime(8)){
            if(this.state.playerObject.money >= 65){
              this.updateTime(false,8);
              let randomNum = Math.floor(Math.random() * 100);
              if(randomNum + this.state.playerObject.stats[4].value >= randomNum){
                return updateStat(0,0,0,3,0,-65,0);
              }
              return updateStat(0,0,0,2,0,-65,0);
            }
           return [player, <p>You don't have enough money</p>] 
          }
          else{return [player, <p>It's too late!</p>]}
        }
      },
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
        name: "Work Out for $45",
        effect: ()=>{
          if(this.checkTime(8)){
            if(this.state.playerObject.money >= 45){
              this.updateTime(false,8);
              return updateStat(0,2,0,0,0,-45,0);
            }
           return [player, <p>You don't have enough money</p>] 
          }
          else{return [player, <p>It's too late!</p>]}
        }
      },
      {
        name: "Take Henry's Personal Training for $70",
        effect: ()=>{
          if(this.checkTime(8)){
            if(this.state.playerObject.money >= 70){
              this.updateTime(false,8);
              return updateStat(0,3,0,0,0,-70,0);
            }
           return [player, <p>You don't have enough money</p>] 
          }
          else{return [player, <p>It's too late!</p>]}
        }
      },
      {
        name: "Get into a fight vs. Henry the Strong Guy",
        id:1,
        rank:65,
        effect: ()=>{
          let opponent = this.createOpponent("Henry the Strong Guy",[90,100],[70,80],[55,65],[600,700],[Weapons[1]],1,0,null,true,120);
          if(this.checkTime(4)){
            this.startCombat(opponent,null,this.state.consumableItems[6]);
          }
          else{
            return [this.state.playerObject,<p>It's too late!</p>];
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
      Weapons[11],
      staticItems[8],
    ],
    options: [
      {
        name: "Rob the Place",
        effect: ()=>{return(robThePlace(50))},
        getData: ()=>{return(getRobThePlaceData(50))}
      },
      {
        name: "Get into a fight vs. Fat Guy",
        id:1,
        rank:55,
        effect: ()=>{
          let opponent = this.createOpponent("Fat Guy",[55,60],[55,60],[30,55],[480,550],Weapons,3,false,true);
          if(this.checkTime(4)){
            this.setState({opponentObject:opponent},()=>this.updateGameState(4));
          }
          else{
            return [this.state.playerObject,<p>It's too late!</p>];
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
        name: "Take Mattress Sales Course for $65",
        effect: ()=>{
          if(this.checkTime(8)){
            if(this.state.playerObject.money >= 65){
              this.updateTime(false,8);
              return updateStat(2,0,0,0,0,-65,0);
            }
           return [player, <p>You don't have enough money</p>] 
          }
          else{return [player, <p>It's too late!</p>]}
        }
      },
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
        name: "Take Car Agility Course for $65",
        effect: ()=>{
          if(this.checkTime(8)){
            if(this.state.playerObject.money >= 65){
              this.updateTime(false,8);
              return updateStat(0,0,0,2,0,-65,0);
            }
           return [player, <p>You don't have enough money</p>] 
          }
          else{return [player, <p>It's too late!</p>]}
        }
      },
      {
        name: "Take Car Salesman Course for $25",
        effect: ()=>{
          if(this.checkTime(8)){
            if(this.state.playerObject.money >= 25){
              this.updateTime(false,8);
              return updateStat(1,0,0,0,0,-25,0);
            }
           return [player, <p>You don't have enough money</p>] 
          }
          else{return [player, <p>It's too late!</p>]}
        }
      },
      {
        name: "Rob the Place",
        effect: ()=>{return(robThePlace(35))},
        getData: ()=>{return(getRobThePlaceData(35))}
      },
      {
        name: "Get into a fight vs. Jim the Salesman",
        id:1,
        rank:20,
        effect: ()=>{
          let opponent = this.createOpponent("Jim the Salesman",[20,30],[20,30],[20,30],[150,180],[Weapons[1],Weapons[0]],1,0,"none",true,100);
          if(this.checkTime(4)){
            this.startCombat(opponent,"none",this.state.consumableItems[13],50);
          }
          else{
            return [this.state.playerObject,<p>It's too late!</p>];
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
      staticItems[7],
      this.state.consumableItems[12],
      staticItems[14],
      Weapons[10],
      Weapons[0],
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
    id:414,
    isShop: true,
    name:"NorthWest Police Station",
    inventory: [
      staticItems[6],
      staticItems[9],
      Weapons[1],
      Weapons[12],
      Weapons[9],
    ],
    options: [
      {
        name: "[AGI+ Chance]Try Police Training for $35",
        effect: ()=>{
          if(this.checkTime(8)){
            if(this.state.playerObject.money >= 35){
              this.updateTime(false,8);
              let randomNum = Math.floor(Math.random() * 100);
              if(randomNum + this.state.playerObject.stats[4].value >= randomNum){
                return updateStat(0,0,0,1,0,-45,0);
              }
              let message = <p>You ran the course but failed to reach the par time. Better luck next time!</p>;
              return [player,message];
            }
           return [player, <p>You don't have enough money</p>] 
          }
          else{return [player, <p>It's too late!</p>]}
        }
      },
    ]
  },
  {
    id:415,
    isShop: true,
    name:"Cristina's Place",
    inventory: [
      staticItems[4],
      this.state.consumableItems[7],
      this.state.consumableItems[13],
      staticItems[6],
      Weapons[3],
    ],
    options: [
    ]
  },
    ]
    let storeObject = storeCollection.filter(object => object.id === storeId);
    let jobObject = Jobs.filter(job => job.id === storeId);
    this.setState({activeStore:storeObject[0],activeJob:jobObject[0]}, ()=>{this.updateGameState(3)});
  }

  handleNPCInteractions = (npcId) => {
    let player = this.state.playerObject;
    let stats = this.state.playerObject.stats;

    //Returns NPC State Object && Creates a new object if not found. 
    let filterNPCState = (id) => {
      let isNew = false;
      let filteredObjectArray = player.npcStates.filter((npc) =>{
        return id === npc.id;
      });
      if(filteredObjectArray[0] === undefined){
        player.npcStates.push({id, state:0,relationship:0});
        filteredObjectArray.push({id,state:0,relationship:0});
        isNew = true;
      }
        return [filteredObjectArray[0],isNew];
    }

    let checkNPCState = (id,stateToCheck,checkforGreaterThan=false) => {
      let item = filterNPCState(id);

      if(item[0].state >= stateToCheck && checkforGreaterThan){
        return true;
      }
      if(item[0].state === stateToCheck){
        return true;
      }
      return false;
    }

    let checkNPCRelationship = (id,check) => {
      let item = filterNPCState(id);
      if(item[0].relationship >= check){
        return true;
      }
      return false;
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

    let updateNPCRelationship = (id,change) =>{
      player.npcStates.filter((npc,i) =>{
        if(id === npc.id){
          player.npcStates[i].relationship += change;
          this.setState({playerObject:player});
        }        
        return id === npc.id;
      });
    }

    let noCheck = () => {
      return true
    }

    let handleBountyList = (id) => {
      let bountyList = this.state.bountyList;
      let index = undefined;
      let found = bountyList.filter((item,i)=>{
        index = i;
        return id === item.id;
      })
      console.log(found[0]);
      if(found[0].complete){
        bountyList.splice(index,1);
        this.setState({bountyList});
        return true;
      }
      return false;
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

    let addInventoryItem = (item, isItemId,isConsumable,isWeapon=false) => {
      if(isItemId){
        let foundArray = [];
        let array = [];
        if(isConsumable){
          array = this.state.consumableItems;
        }
        else if(isWeapon){
          array=Weapons;
        }
        else{
          array = staticItems;
        }
        for (let i=0 ; i < array.length; i++){
          if (array[i].id === item){
            foundArray.push(array[i]);
          }
        }
        player.inventory.push(foundArray[0]);
      }
      else{
        player.inventory.push(item);
      }
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
              name:`[Fight Difficulty: 5] Stop begging or else I'm going to have to teach you a lesson right here right now.`,
              check: ()=>{ 
                return this.checkTime(4);
              },
              effect: ()=>{
                let opponent = this.createOpponent("Charlie",[5,10],[5,10],[5,10],[10,50],[],0,0,"602.gif",true);
                this.startCombat(opponent,'bigBossTheme',this.state.consumableItems[1],500);
                return false;
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
        name: "Mel",
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
                  if(player.stats[0].value*2 >= randomNum){
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
                  this.removeInventoryItem(104);
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
                  this.removeInventoryItem(4);
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
                  this.removeInventoryItem(101);
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
      },
      {
        id:605,
        name: "Zaxon",
        dialouge: [
          {
            message: "Is it 'me and him','him and I'?",
            options: [
              {
              name:"I don't know.",
              check: ()=>noCheck(),
              effect:()=> {
                return 2
              },
              },
              {
                name:"[Intelligence] I don't know.",
                check: ()=>{
                  let returnVal = filterNPCState(605);
                  if(returnVal[0].state === 1){
                    return false;
                  }
                  if(stats[2].value >= 25){
                    return true;
                  }
                  return false;
                },
                effect:()=> {
                  return 3;
                },
                },
              {
                name:"[Intelligence] ksi.",
                check: ()=>{
                  let returnVal = filterNPCState(605);
                  if(returnVal[0].state === 1){
                    return false;
                  }
                  if(stats[2].value <= 0){
                    return true;
                  }
                  return false;
                },
                effect:()=> {
                  return 1; 
              }
            },
            {
              name:`[Fight Difficulty: 30] You're not smart. You're selfish. You endangered J.G's career.`,
              check: ()=>{ 
                return this.checkTime(4);
              },
              effect: ()=>{
                let opponent = this.createOpponent("Zaxon",[30,40],[30,40],[30,40],[180,250],[Weapons[6]],1,[0,0,0,12,0,0,0,0],'zaxon.gif',true);
                this.startCombat(opponent,'actor',Weapons[6],200);
                return false;
              }
            },
            ]
          },
          {
            message: "Wow you're really stupid aren't you? Here, take this - if you find yourself in a fight - I think you might die. I'm sure even an idiot like you can learn to use it. ",
            options: [
              {
                name:"i watched the ksi movie.",
                check: ()=>noCheck(),
                effect: ()=>{
                  checkForNewNPCState(605,true);
                  setNPCState(605,1);
                  addInventoryItem(308,true,false,true);
                  return false;
                }
              }
            ]
          },
          {
            message: "Oh. That's fine. Noone in this town seems to know.",
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
            message: "Ha! I knew it! You passed my little test. You'd be surpised at how much people fail. Here, take this. I'm giving them away because noone seems to buy them. It's hard being a genius.",
            options:[
              {
                name:"Take 'Zaxon's Zappy Beater' and Exit",
                check: ()=>noCheck(),
                effect: ()=>{
                  checkForNewNPCState(605,true);
                  setNPCState(605,1);
                  addInventoryItem(308,true,false,true);
                  return false;
                }
              }
            ]
          },
        ],
      },
      {
        id:606,
        name: "The Emperor",
        dialouge: [
          {
            message: "You have five seconds to get out of my face. I don't deal with no-names.",
            options: [
            {
              name:`[StreetCred] You really haven't heard of ${player.name}?`,
              check: ()=>{
                let returnVal = filterNPCState(606);
                if(player.streetCred >= 25 && returnVal[0].state === 0){
                  return true;
                }
              },
              effect: ()=>{
                return 1;
              }
            },
            {
              name:`[Low Intelligence][Fight Difficulty: 90] Who you calling loser im out of your league, don't talk about my mom at least she actually cares for me!`,
              check: ()=>{
                if(stats[2].value <= 20){
                  return true;
                }
              },
              effect: ()=>{
                let opponent = this.createOpponent('The Emperor',[90,95],[60,70],[70,80],[1000,1500],[Weapons[11],Weapons[5],Weapons[20]],3,[100,10,15,10,10,10,10,1],'606.gif',true,150);
                this.startCombat(opponent,'bigBossTheme',Weapons[20],50);
              }
            },
            {
              name:"Exit",
              check: ()=>noCheck(),
              effect: ()=>{
                return false;
              }
            },
            {
              name:"[Quest COMPLETE] Chuck is the mole.",
              check: ()=>{
                let returnVal = filterNPCState(606);
                if(returnVal[0].state === 3){
                  return 5;
                }
              },
              effect: ()=>{
                return false;
              }
            },
            {
              name:"[Quest COMPLETE] Chuck is the mole.",
              check: ()=>{
                let returnVal = filterNPCState(606);
                if(returnVal[0].state === 4){
                  return 6;
                }
              }
            },
            {
              name:"[Quest COMPLETE] Frank is the mole.",
              check: ()=>{
                let returnVal = filterNPCState(606);
                if(returnVal[0].state === 5){
                  return 7;
                }
              }
            }
            ]
          },
          {
            message: "Hm, someone did mention your name before. Maybe you're not so useless after all. I'm The Emperor, leader of the White Lotus gang. You looking for work kid?",
            options: [
              {
                name:`I can do that.`,
                check: ()=>noCheck(),
                effect: ()=>{
                  return 2;
                }
              },
              {
                name:"No thanks.",
                check: ()=>noCheck(),
                effect: ()=>{
                  return false;
                }
              },
            ]
          },
          {
            message: "This new mayor has actually been resisting our money and is making the police come after us. Hard. We've been taking hits in our drug sales and I need to figure out a way to stop him. But first, I need people to help cripple the police department. They always seem to know where our shipments are and where we operate. I think one of our members is a mole. Find out who it is and let me know. You'll be paid handsomley. What do you say?",
            options:[
              {
                name:"Sounds interesting. I'll do it.",
                check: ()=>noCheck(),
                effect: ()=>{
                  setNPCState(606,1);
                  return 3;
                }
              },
              {
                name:"[Intelligence]Yeah for a hundred bucks.",
                check: ()=>{
                  console.log(stats[2]);
                  if(stats[2].value <= 25){
                    return true;
                  }
                },
                effect: ()=>{
                  setNPCState(606,2);
                  return 4;
                }
              },
              {
                name:"Not my type of work.",
                check: ()=>noCheck(),
                effect: ()=>{
                  return false;
                }
              },
            ]
          },
          {
            message: "Fantastic! I think it's one of the trio of Marcus, Frank, and Chuck. Talk to each of them. Find out which one is lying. Once you do, come back and tell me so we can continue forward.",
            options:[
              {
                name:"Sounds like a plan.",
                check: ()=>noCheck(),
                effect: ()=>{
                  return false;
                }
              }
            ]
          },
          {
            message: "A hundred bucks? I was going to give you more but if that's what you want - that's what you'll get. Talk to Marcus, Frank, and Chuck. Find out which is the mole and report back to me so we can move forward.",
            options:[
              {
                name:"Sounds like a plan.",
                check: ()=>noCheck(),
                effect: ()=>{
                  return false;
                }
              }
            ]
          },
          {
            message: "Yep, sounds about right. You know what they say about snitches. I'll deal with Chuck. Thanks a bunch kid. Come back some other time, might have some more work for you.",
            options:[
              {
                name:"[+$650 +20 StreetCred +5 INT] Exit",
                check: ()=>noCheck(),
                effect: ()=>{
                  stats[2].value+= 5;
                  player.money += 650;
                  player.streetCred += 20;
                  this.updatePlayerState(player); 
                  setNPCState(606,6);                 
                  return false;
                }
              }
            ]
          },
          {
            message: "A hundred bucks right? Here you go. Thanks for the help kid, come back soon - might have some other jobs for you.",
            options:[
              {
                name:"[+$100 +20 StreetCred +5 INT] Exit",
                check: ()=>noCheck(),
                effect: ()=>{
                  stats[2].value+= 5;
                  player.money += 100;
                  player.streetCred += 20;
                  this.updatePlayerState(player);
                  setNPCState(606,6);                  
                  return false;
                }
              }
            ]
          },
          {
            message: "I doubt it. But if that's your verdict, that's it.",
            options:[
              {
                name:"[+$100 +5 INT +5 LCK] Exit",
                check: ()=>noCheck(),
                effect: ()=>{
                  stats[2].value+= 5;
                  stats[4].value += 5;
                  player.money += 100;
                  player.streetCred += 20;
                  this.updatePlayerState(player);
                  setNPCState(606,6);                  
                  return false;
                }
              }
            ]
          }
        ],
      },
      {
        id:607,
        name: "Marcus",
        dialouge: [
          {
            message: "What do you want?",
            options: [
            {
              name:`[Quest] The Emperor mentioned you might know something about the mole issue?`,
              check: ()=>{
                let returnVal = filterNPCState(606);
                if(returnVal[0].state === 1 || returnVal[0].state === 2){
                  return true;
                }
              },
              effect: ()=>{
                filterNPCState(607);
                return 1;
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
            message: "Yeah someone's been leaking our info to the cops but it wasn't me! Frank will try to tell you it was me - he just dosen't like me. But it wasn't Frank either. It's Chuck. He knows where all our drug stashes are. Frank doesn't.",
            options: [
              {
                name:`Do you know about the drug stashes?`,
                check: ()=>noCheck(),
                effect: ()=>{
                  return 2;
                }
              },
            ]
          },
          {
            message: "No. I mean, I have a high position but the boss says I can't be trusted.",
            options:[
              {
                name:"[Charisma] You're lying.",
                check: ()=>{
                  if(player.stats[0].value >= 30){
                    return true;
                  }
                },
                effect: ()=>{
                  return 3;
                }
              },
              {
                name:"[Quest] Frank said you know about where all the warehouses and hideouts are. You're lying.",
                check: ()=>{
                  let returnVal = filterNPCState(607);
                  if(returnVal[0].state === 1){
                    return true;
                  }
                },
                effect: ()=>{
                  return 3;
                }
              },
              {
                name:"Okay, thanks for the info.",
                check: ()=>noCheck(),
                effect: ()=>{
                  return false;
                }
              },
            ]
          },
          {
            message: "No I'm -- okay so what if I am. I know where all the warehouses are. But it wasn't me. I just know you're going to tell the Emperor I did it if I told you that I knew because you look like that kind of person.",
            options:[
              {
                name:`[Intelligence ${stats[2].value * 3>=100?100:stats[2].value *3}%]How do I know you're not lying to me again?`,
                check: ()=>noCheck(),
                effect: ()=>{
                  let randomNum = Math.floor(Math.random() * 100);
                  if(stats[2].value*3 >= randomNum){
                    return 4;
                  }
                  return 5;
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
            message: "Because I hate the police. I've killed a few too. Really! But you know who dosen't? Chuck. I know for a fact that he's close friends with that officer standing outside the station. Talk to him. He'll tell you.",
            options:[
              {
                name:"Exit",
                check: ()=>noCheck(),
                effect: ()=>{
                  filterNPCState(610);
                  setNPCState(610,1);
                  return false;
                }
              }
            ]
          },
          {
            message: "[FAILED] I'm not lying.",
            options:[
              {
                name:"Exit",
                check: ()=>noCheck(),
                effect: ()=>{
                  filterNPCState(610);
                  setNPCState(610,1);
                  return false;
                }
              }
            ]
          }
        ],
      },
      {
        id:608,
        name: "Frank",
        dialouge: [
          {
            message: "You looking to get laid out? Then go away.",
            options: [
            {
              name:`[Quest] The Emperor mentioned you might know something about the mole issue?`,
              check: ()=>{
                let returnVal = filterNPCState(606);
                if(returnVal[0].state === 1 || returnVal[0].state === 2){
                  return true;
                }
              },
              effect: ()=>{
                return 1;
              }
            },
            {
              name:`[Quest] Those shoes you have on the ground... Are they for sale?`,
              check: ()=>{
                let returnVal = filterNPCState(611);
                if(returnVal[0].state === 1){
                  return true;
                }
              },
              effect: ()=>{
                return 4;
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
            message: "It was Marcus. He knows all the warehouses and is always lying. About everything. Sent him to the store to get me a bag of chips, comes back and says they didn't have any. I go in an hour later and they did! Liar liar liar!",
            options: [
              {
                name:`Do you know about the drug stashes?`,
                check: ()=>noCheck(),
                effect: ()=>{
                  filterNPCState(607);
                  setNPCState(607,1);
                  return 2;
                }
              },
            ]
          },
          {
            message: "I just joined in a month ago. You think the Emperor going to give me access to all that?",
            options:[
              {
                name:"[Intelligence] But there must be a reason why he suspects you to be the leaker.",
                check: ()=>{
                  if(player.stats[2].value >= 30){
                    return true;
                  }
                },
                effect: ()=>{
                  return 3;
                }
              },
              {
                name:"Okay, thanks for the info.",
                check: ()=>noCheck(),
                effect: ()=>{
                  checkForNewNPCState(608,true);
                  setNPCState(608,1);
                  return false;
                }
              },
            ]
          },
          {
            message: "Hmm, probably because I get arrested almost every week. But I don't do it on purpose! I swear! I only know Officer Robert Winston because of how much time I spend in the cell, not because of how much I talk to him or anything.",
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
            message: "These things? I found them over there in the gas station parking lot. They look like new. Smell pretty clean too. How about you give me 150 and they're yours?",
            options:[
              {
                name:"[Purchase Phoebe's Running Shoes] Sounds like a deal.",
                check: ()=>noCheck(),
                effect: ()=>{
                  if(player.money >= 150){
                    addInventoryItem(106,true,false,false);
                    player.money -= 150;
                    this.setState({playerObject:player});
                    return false;
                  }
                  return 5;
                }
              },
              {
                name:"No thanks",
                check: ()=>noCheck(),
                effect: ()=>{
                  return false;
                }
              }
            ]
          },
          {
            message: "With what money fool!?",
            options:[
              {
                name:"Exit",
                check: ()=>noCheck(),
                effect: ()=>{return false}
              }
            ]
          }
        ],
      },
      {
        id:609,
        name: "Chuck",
        dialouge: [
          {
            message: "What do you want?",
            options: [
            {
              name:`[Quest] The Emperor mentioned you might know something about the mole issue?`,
              check: ()=>{
                let returnVal = filterNPCState(606);
                if(returnVal[0].state === 1 || returnVal[0].state === 2){
                  return true;
                }
              },
              effect: ()=>{
                return 1;
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
            message: "Frank's your man. Boy always gets arrested. If you ask me, it's on purpose. He's giving the officers info in exchange for shorter sentences. He steals some fruit, gets put in the slammer for a week. Talks to his police buddies, he's out the next day. Pretty suspicious if you ask me.",
            options: [
              {
                name:`Do you know about the drug stashes?`,
                check: ()=>noCheck(),
                effect: ()=>{
                  return 2;
                }
              },
            ]
          },
          {
            message: "Yeah but what does that have to do with anything. So does Marcus but you're over here questioning me.",
            options:[
              {
                name:"[Strength] You're not telling me something. Tell me or I'll break your arms.",
                check: ()=>{
                  if(player.stats[1].value >= 30){
                    return true;
                  }
                },
                effect: ()=>{
                  return 3;
                }
              },
              {
                name:"Okay, thanks for the info.",
                check: ()=>noCheck(),
                effect: ()=>{
                  checkForNewNPCState(608,true);
                  setNPCState(608,1);
                  return false;
                }
              },
            ]
          },
          {
            message: "What? You know about it? How? I never told anyone about my friendship with Robert Winston! We were friends in high school and we've kinda kept in touch - but that's it! I don't tell him nothing! Please don't kill me.",
            options:[
              {
                name:"[STR,CHR,STCRD] You know, the Emperor already knows who did it. He just told me to find out which one of you losers would lie to him. Tell me the truth and I won't tell him you lied.",
                check: ()=>{
                  if(player.stats[1].value >= 30 && stats[0].value >= 30 && player.streetCred >= 30){
                    return true;
                  }
                },
                effect: ()=>{
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
            message: "Alright it was me. Stupid of me to try to lie. Please don't tell. The Emperor will have me killed. How about you blame Frank and I'll make it worth your while?",
            options:[
              {
                name:"[+$800 -20 StreetCred] Sounds like a plan.",
                check: ()=>noCheck(),
                effect: ()=>{
                  setNPCState(606,5);                  
                  player.money += 500;
                  player.streetCred -= 20;
                  this.setState({playerObject:player});
                  return false;
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
          }
        ],
      },
      {
        id:610,
        name: "Officer Robert Winston",
        dialouge: [
          {
            message: "Good day citizen. Do you need help?",
            options: [
            {
              name:`[Quest] Do you know Chuck?`,
              check: ()=>{
                let returnVal = filterNPCState(610);
                if(returnVal[0].state !== 0){
                  return true;
                }
              },
              effect: ()=>{
                return 1;
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
            message: "Chuck and I used to be close friends. He's gone down the wrong path in life but I still consider us friends. In fact, I think he's been using his position for good!",
            options: [
              {
                name:`So Chuck is a source of insider information correct?`,
                check: ()=>noCheck(),
                effect: ()=>{
                  return 2;
                }
              },
            ]
          },
          {
            message: "What are you talking about? Why do you care?",
            options:[
              {
                name:`[Charisma ${stats[0].value * 2>=100?100:stats[0].value *2}%]Because I'm an undercover agent. I'm looking to see if my agency can protect moles like Marcus from being ousted or found out.`,
                check: ()=>{
                  let returnVal = filterNPCState(610);
                  if(returnVal[0].state === 2){
                    return false;
                  }
                  return true;
                },
                effect: ()=>{
                  let returnVal = filterNPCState(610);
                  if(returnVal[0].state === 3){
                    return 4;
                  }
                  let randomNum = Math.floor(Math.random() * 100);
                  if(player.stats[0].value*2 >= randomNum){
                    setNPCState(610,2);
                    return 3;
                  }
                  else{
                    setNPCState(610,3);
                    return 4;
                  }
                }
              },
              {
                name:"[Police Badge] As a fellow commander, I demand to know about your information sources.",
                check:()=>checkForItem(105),
                effect: ()=>{
                  return 3;
                }
              },
              {
                name:"Nothing. Just curious is all.",
                check: ()=>noCheck(),
                effect: ()=>{
                  return false;
                }
              },
            ]
          },
          {
            message: "Of course. Chuck is our insider. I've noticed that The Emperor has labeled him as a suspect in his mole hunt. I think we should move to offer him more protection or find a new mole.",
            options:[
              {
                name:"Thank you officer.",
                check: ()=>noCheck(),
                effect: ()=>{
                  let returnVal = filterNPCState(606);
                  if(returnVal[0].state === 1){
                    setNPCState(606,3);
                    return false;
                  }
                  if(returnVal[0].state === 2){
                    setNPCState(606,4)
                    return false;
                  }
                }
              },
            ]
          },
          {
            message: "[FAILED] Do you think I'm stupid? You're not with the department. Get out of here!",
            options:[
              {
                name:"Exit",
                check: ()=>noCheck(),
                effect: ()=>{
                  return false;
                }
              },
            ]
          }
        ],
      },
      {
        id:611, //Phoebe is a potential companion
        name: "Phoebe",
        dialouge: [
          {
            message: `${checkNPCState(611,2)?"Thanks for the help. The marathon is about to start... but since I lost my shoes, I stopped prepping and now I don't think I can finish it with my current fitness. What do you think I should do?":"Hi. I'm about to run a marathon."}`,
            options: [
            {
              name:'Why are you barefoot?',
              check: ()=>{
                let returnVal = filterNPCState(611);
                if(returnVal[0].state === 0 || returnVal[0].state === 1){
                  return true;
                }
              },
              effect: ()=>{
                return 1;
              }
            },
            {
              name:"[Phoebe's Running Shoes]I found your shoes.",
              check: ()=>checkForItem(106),
              effect:()=>{
                this.removeInventoryItem(106);
                setNPCState(611,2);
                updateNPCRelationship(611,3);
                return 7;
              }
            },
            {
              name:`[50 Agility 35 Strength]${stats[1].value>=35&&stats[3].value>=50?"I've done my share of running. If you want, we can train together so you can crush the marathon.":"If you ignore my belly fat and inability to climb stairs - I could train you up to par."}`,
              check: ()=>{
                return checkNPCState(611,2);
              },
              effect:()=>{
                if(stats[1].value>=35&&stats[3].value>=50){
                  updateNPCRelationship(611,2);
                  setNPCState(611,3);
                  return 9;
                }
                return 8;
              }
            },
            {
              name:`[Luck+Relationship] Train with Phoebe`,
              check:()=>{
              let returnVal = filterNPCState(611);
              if(returnVal[0].state >= 3){
                
                return true;
              }
              return false;
              },
              effect:()=>{
                let timeCheck = this.checkTime(4);
                console.log(timeCheck);
                console.log(this.state.gameTime);
                if(timeCheck){
                  this.updateTime(false,4);
                  let luck = stats[4].value;
                  let item = filterNPCState(611);
                  let relationship = item[0].relationship;
                  luck += relationship;
                  let randomNum = Math.floor(Math.random() * 100);
                  if(luck >= randomNum){
                    stats[3].value += 1;
                    updateNPCRelationship(611,1);
                    this.setState({playerObject:player});
                    return 10;
                    }
                  return 11;
                  }
                  return 16;
                }
            },
            {
              name:`[Charisma ${stats[0].value>=100?100:stats[0].value}%] Flirt with Phoebe`,
              check: ()=>{
                checkNPCRelationship(611,5);
              },
              effect: ()=>{
                let randomNum = Math.floor(Math.random() * 100);
                if(stats[0].value>=randomNum){
                  updateNPCRelationship(611,1);
                  return 12;
                }
                  updateNPCRelationship(611,-1);
                  return 13;
              }
            },
            {
              name:`[Agility] I'd say you're more than ready to tackle the marathon.`,
              check: ()=>{ //Add this in later. Right now it doesn't do anything since there is no quest.
                let item = filterNPCState(611);
                if(item[0].state >= 3 && stats[3].value >= 100){
                  return false; 
                }
                return false;
              },
              effect: ()=>{
                setNPCState(611,4);
                return 14;
              }
            },
            {
              name:`[100 AGI,50 STR,Engagement Ring,15 Relationship, CHR ${stats[0].value-20}%] Propose to Phoebe`,
              check:()=>{
                let agilityCheck = false;
                let strengthCheck = false;
                let ringCheck = false;
                let relationshipCheck = false;
                let stateCheck = checkNPCState(611,3);

                if(stats[3].value >= 100){
                  agilityCheck = true;
                }
                if(stats[1].value >= 50){
                  strengthCheck = true;
                }
                if(checkForItem(115)){
                  ringCheck = true;
                }
                if(checkNPCRelationship(611,15)){
                  relationshipCheck = true;
                }
                console.log({agilityCheck,strengthCheck,ringCheck,relationshipCheck,stateCheck});
                if(agilityCheck && strengthCheck && ringCheck && relationshipCheck && stateCheck){
                  return true;
                }
              },
              effect:()=>{
                let randomNum = Math.floor(Math.random() * 100);
                if(stats[0].value-20 >= randomNum){
                  return 14;
                }
                return 15;
              }
            },
            {
              name:`[Fight Difficulty: 40 -Relationship] Marathon, marathon, just shut up would you? Nobody cares!`,
              check: ()=>{ //Add this in later. Right now it doesn't do anything since there is no quest.
                return this.checkTime(4);
              },
              effect: ()=>{
                updateNPCRelationship(611,-1);
                let opponent = this.createOpponent("Phoebe",[30,40],[50,70],[30,45],[250,350],[Weapons[2],Weapons[12],Weapons[9]],2,[10,1,0,10,0,0,0,0],'611.gif',true,100);
                this.startCombat(opponent,'bigBossTheme',this.state.consumableItems[11],400);
                return false;
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
            message: "Oh right! So I was at the park - training for my marathon - when I realized my marathon running shoes went missing! I read some articles online about how barefoot training is better for marathon running so I tried it. Ah, how am I going to run my marathon now?",
            options: [
              {
                name:`I can try to find your shoes.`,
                check: ()=>noCheck(),
                effect: ()=>{
                  setNPCState(611,1);
                  return 2;
                }
              },
              {
                name:`[Running Shoes]I have these shoes - brand new - you can have them.`,
                check: ()=>checkForItem(12),
                effect: ()=>{
                  this.removeInventoryItem(12);
                  setNPCState(611,2);
                  updateNPCRelationship(611,2);
                  return 6;
                }
              },
              {
                name:`[Intelligence+Charisma ${(stats[0].value+stats[2].value)}%]According to scientific research - there's plenty of evidence to suggest that running while barefoot is better than with shoes because it connects the body with nature to give you a spiritual boost.`,
                check: ()=>noCheck(),
                effect: ()=>{
                  let randomNum = Math.floor(Math.random() * 100);
                  if((stats[0].value+stats[2].value) >= randomNum){
                    updateNPCRelationship(611, 1);
                    setNPCState(611,2);
                    return 4;
                  }
                  else{
                    updateNPCRelationship(611,-1);
                    return 5;
                  }
                }
              
              }
            ]
          },
          {
            message: "Wow really? You're so sweet! I lost them when practicing marathon distance running around here. I took them off near the gas station and when I came back they were gone.",
            options:[
              {
                name:`Wow you're pretty stupid for leaving them out in the open like that.`,
                check: ()=>noCheck(),
                effect: ()=>{
                  updateNPCRelationship(611,-1);
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
            message: "[-1 Phoebe Relationship]Rude! You try training for a marathon! All the preperation is really stressful and I don't need someone like you to ruin my mood anymore than it already is.",
            options:[
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
            message: "[+1 Phoebe Relationship] Really? Well it does make sense. Alright, I'll run the marathon without the shoes. Thanks for the advice!",
            options:[
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
            message: "[-1 Phoebe Relationship] I'm not stupid you stupid! If I run the marathon barefoot I'll slice open my foot and bleed out in the middle of the road. And I won't finish my marathon. What's wrong with you?",
            options:[
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
            message: "[+2 Phoebe Relationship] Whoa, new in box? Really? Aw that's super sweet of you! I can't thank you enough!",
            options:[
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
            message:"[+3 Phoebe Relationship] Wow! You actually found them! This is great! Now nothing will stop me from marathon domination! Hahahahahahahahahahahahahahahahaha!",
            options:[
              {
                name:"Glad I could help",
                check: ()=>noCheck(),
                effect: ()=>{
                  return false;
                }
              }
            ]
          },
          {
            message:"Uhhh... sorry but I kinda want to do well at the marathon.",
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
            message:`"[+2 Phoebe Relationship] You're really a peach you know? ${checkNPCRelationship(611,5)?"Oops, did I say that? I mean... uh. Train me. Please? Call me? I mean... call me to let me know when you're ready to start.":"Thanks for the help. Come back and we can train together when you're ready!"}`,
            options:[
              {
                name:"Glad I could help",
                check: ()=>noCheck(),
                effect: ()=>{
                  return false;
                }
              }
            ]
          },
          {
            message:`"[+1 Agility +1 Relationship] Wow that was an incredible workout! Laps around the whole city? I didn't even know I had it in me! You're really good at this.`,
            options:[
              {
                name:"Glad I could help",
                check: ()=>noCheck(),
                effect: ()=>{
                  return false;
                }
              }
            ]
          },
          {
            message:`That was tiring and I feel fitter but I can't help but feel that we could have done a bit more...`,
            options:[
              {
                name:"Glad I could help",
                check: ()=>noCheck(),
                effect: ()=>{
                  return false;
                }
              }
            ]
          },
          {
            message:`[+1 Phoebe Relationship] Heehee, oh hush you! ${checkNPCRelationship(10)?"I don't know. I guess you're okay too.":"You really make me feel special! Maybe I feel the same way about you."}`,
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
            message:`[-1 Phoebe Relationship] Uh... thanks I guess? ${checkNPCRelationship(10)?"You're really sweet but I don't think we're at that state in our relationship just yet.":"We have a pretty strong bond but... I'm not really feeling it."}`,
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
            message:`I really can't believe it. When I met you I was nothing. Just some barefoot girl, fresh out of college, looking to add some sort of meaning to my life by running a marathon. First the shoes, then the help training, and then the support you gave me when I actually finished it. You were a train that led me to my goals. And I really can't thank you enough for that. Well... maybe I can. Yes! Yes! I'll marry you! Here's to hoping that our new life together is full of joy and more marathons!`,
            options:[
              {
                name:"Marry Phoebe",
                check: ()=>noCheck(),
                effect: ()=>{
                  this.updatePlayerCompanion(0);
                  return false;
                }
              }
            ]
          },
          {
            message:`I'm really sorry but I can't do this right now. It's not you - it's me. I just need some more time to really uh get used to you.`,
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
            message:`I'd rather not run around this late. Let's try again tomorrow.`,
            options:[
              {
                name:"Exit.",
                check: ()=>noCheck(),
                effect: ()=>{
                  return false;
                }
              }
            ]
          }
        ],
      },
      {
        id:612,
        name: "Sgt. Forge",
        dialouge: [
          {
            message: `${checkNPCState(612,1,true)?"For the record, I didn't need your help. I was just sleeping.":"[He appears to be injured and unconcious]"}`,
            options: [
            {
              name:`[Intelligence] Use Medical Knowledge to heal him`,
              check: ()=>{
                if(stats[2].value >= 50 && checkNPCState(612,0)){
                  return true;
                }
                return false;
              },
              effect: ()=>{
                setNPCState(612,1);
                player.streetCred += 5;
                this.setState({playerObject:player});
                return 1;
              }
            },
            {
              name:`[AGI+++, STR+] Ask Forge to train you for $115`,
              check:()=>{
                if(checkNPCState(612,1,true) && this.checkTime(6)){
                  return true;
                }
                return false;
              },
              effect:()=>{
                this.updateTime(false,6);
                if(player.money >= 115){
                  this.updatePlayerStat(0,1,0,3,0,0);
                  player.money-=115;
                  this.setState({playerObject:player});
                  return 5;
                }
                return 6;
              }
            },
            {
              name:"[Quest] I defeated Henry the Strong Guy for you.",
              check: ()=>checkNPCState(612,2),
              effect: ()=>{
                if(handleBountyList(612)){
                  return 3;
                }
                return 4;
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
            message: "[+5 StreetCred] Goodness, I must have taken quite a beating. I'm not getting up from here. Say, you think you can help me get a bit of revenge? I have some high tech weapons you can have if you help.",
            options: [
              {
                name:`You want me to beat up whoever beat you up?`,
                check: ()=>noCheck(),
                effect: ()=>{
                  return 2;
                }
              },
              {
                name:"No thanks. I don't do drama",
                check: ()=>noCheck(),
                effect: ()=>{
                  return false;
                }
                
              }
            ]
          },
          {
            message: "If you can dish out some pain to that strong guy at the local gym... this plasma gun is yours. Be warned though. That guy is strong. And fast. He'll pummel you in a flash if you're not ready.",
            options:[
              {
                name:`Okay, I'll do it.`,
                check: ()=>noCheck(),
                effect: ()=>{
                  let list = this.state.bountyList;
                  list.push({name:"Henry the Strong Guy", complete:false, id:612});
                  this.setState({bountyList:list});
                  setNPCState(612,2);
                  return false;
                }
              },
              {
                name:"No thanks.",
                check: ()=>noCheck(),
                effect: ()=>{
                  return false;
                }
              },
            ]
          },
          {
            message: "Great job soldier. A promise is a promise. Here you go.",
            options:[
              {
                name:"Thank you sergeant.",
                check: ()=>noCheck(),
                effect: ()=>{
                  addInventoryItem(309,true,false,true);
                  return false;
                }
              },
            ]
          },
          {
            message: "No you didn't. Stop the lies.",
            options:[
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
            message: "[+1 Strength, +3 Agility] Well there you go. Now leave me alone.",
            options: [
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
            message: "No. Not until you get enough money to make it worth my time.",
            options: [
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
    ]

    let chosenNPC = NPCData.filter((npcs)=>{
      return npcs.id === npcId;
    });
    let npc = chosenNPC[0];

    return npc;
  }

  startCombat = (opponent,theme,bonusReward=null, chance=1000,) => {
    let bountyList = this.state.bountyList;
    let themeFile = `./audio/themes/${theme}.mp3`;
    let found = bountyList.filter((item)=>{
      return item.name === opponent.name;
    });

    let jsxObject = 
    <Combat 
    handleDeath={this.handleDeath}
    checkForSkin={this.checkForSkin}
    addSkin = {this.addSkin}
    checkForItem = {this.checkForItem}
      addInventoryItem={this.addInventoryItem}
      bonusRewardChance={chance}
      shopId={this.state.activeStore}
      theme={themeFile}
      editAmmo={this.editAmmo}
      bonusReward={bonusReward}
      updateBountyList={this.updateBountyList}
      bountyObject = {found[0] !== undefined?found[0]:null}
      player={this.state.playerObject}
      opponent={opponent}
      updatePlayerState={this.updatePlayerState}
      updateGameState={this.updateGameState}
      updateTime={this.updateTime}
      canChump={this.state.canChump}
    />

    this.setState({gameScreen:jsxObject});
  }

  handleDeath = (killer=false) =>{
    let death = <Death 
      days={this.state.currentDay}
      playerData={this.state.playerObject}
      updateGameState={this.updateGameState}
      retrieveSave={this.retrieveSave}
      killer={killer}
      />
    this.setState({gameScreen:death});
  }

  updateBountyList = (bountyObject) => {
    let id = bountyObject.id;
    let bountyList = this.state.bountyList;
    bountyList.filter((item,i)=>{
      if(id === item.id){
        bountyList.splice(i,1);
        bountyList.push(bountyObject);
        this.setState({bountyList});
      }
      return id === item.id;
    })
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
      removeInventoryItem={this.removeInventoryItem}
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
      equipWeapon={this.equipWeapon}
      removeWeapon={this.removeWeapon}
      />,
      ],
      <Interface 
      resetActiveStore={this.resetActiveStore}
      editAmmo={this.editAmmo}
      goToJail={this.goToJail}
      time={this.state.gameTime}
      updatePlayerState={this.updatePlayerState}
      jobData={this.state.activeJob}
      storeData={this.state.activeStore}
      updateGameState = {this.updateGameState}
      playerData = {this.state.playerObject}
      jobOptions={this.state.jobOptions}
      checkTime={this.checkTime}
      updateTime={this.updateTime}
      />,
      <Combat 
      editAmmo={this.editAmmo}
      player={this.state.playerObject}
      opponent={this.state.opponentObject}
      updatePlayerState={this.updatePlayerState}
      updateGameState={this.updateGameState}
      updateTime={this.updateTime}
      canChump={this.state.canChump}
      />,
      <Jail />,
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
