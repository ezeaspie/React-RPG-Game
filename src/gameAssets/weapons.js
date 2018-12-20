import React from 'react';


let lightMelee = new Audio('./audio/effects/punch.mp3');
let heavyMelee = new Audio('./audio/effects/kick.mp3');
let smallBullet = new Audio('./audio/effects/pistol.mp3');
let smallBulletAuto = new Audio('./audio/effects/rifle2.mp3');
let medBullet = new Audio('./audio/effects/rifle2.mp3');
let heavyBullet = new Audio('./audio/effects/rifleHeavy.mp3');
let energySmall = new Audio('./audio/effects/energy.mp3');
let energyMed = new Audio('./audio/effects/energy2.mp3');
let energyHeavy = new Audio('./audio/effects/energy3.mp3');
let taser = new Audio('./audio/effects/taser.mp3');
let maxineShotgun = new Audio('./audio/effects/taser3.mp3');
let exSmall = new Audio('./audio/effects/explosionS.mp3');
let exLarge = new Audio('./audio/effects/explosionL.mp3');

let WeaponFactory = (id,name,description,price,damage,apCost,accuracy,isMelee,audio="",rarity=0,ammoId=null,ammoCost=null) => {
  let ammoNames=[
  "Light Bullets","Medium Bullets","Heavy Bullets",'Batteries','Energy Cells','Power Charges','Cherry Bombs','Explosive Shells'
  ]

  let rarityTiers=['Common','Uncommon','Rare','Ultra Rare','Legendary']

  let weaponObject = {
    id,
    name,
    audio,
    damage,
    rarity,
    apCost,
    accuracy,
    description: <div>{description}<p>{damage} DMG | {apCost} AP | {accuracy} ACC</p>{!isMelee?<p>x{ammoCost} {ammoNames[ammoId]}</p>:null}<p>{rarityTiers[rarity]}</p></div>,
    price,
    isMelee,
    isWeapon: true,
    ammoId,
    ammoCost,
    isConsumable: false,
    effect: () => {
      return {damage, apCost,accuracy}
    }
  }
  return weaponObject;
}

let Weapons = [];
let plasmaP = {
  id:309,
  name:"Plasma Pistol",
  damage: 4,
  apCost: 5,
  accuracy: 90,
  description: <div><p>1 in 5 chance of a charged bolt for 3x damage.</p><p>5 DMG | 3 AP</p></div>,
  price: 1000,
  isWeapon: true,
  rarity:'Ultra Rare',
  audio:energyMed,
  isMelee:false,
  ammoId:3,
  ammoCost:3,
  isConsumable:false,
  effect: ()=>{
    let randomNum = Math.floor(Math.random() * 100);
    if(20>=randomNum){
      return {damage:12, apCost: 15,accuracy:90}
    }
    return {damage: 4, apCost: 5,accuracy:90}
  },
}

Weapons.push(  WeaponFactory(301,"Wooden Baseball Bat",<p>Strong and heavy, perfect for head busting</p>,150,10,10,90,true,heavyMelee,1))
Weapons.push(    WeaponFactory(302,"Brass Knuckles",<p>For when your punches need that extra... punch</p>,100,4,5,95,true,lightMelee,0))
Weapons.push(    WeaponFactory(303,"Spiked Knuckles",<p>Skewer your opponents using only your knuckles!</p>,250,6,6,95,true,lightMelee,2))
Weapons.push(    WeaponFactory(304,"Plastic Baseball Bat",<p>Plastic is pretty tough but it's still a toy</p>,70,4,5,90,true,lightMelee,0))
Weapons.push(    WeaponFactory(306,"Steel Baseball Bat",<p>Just like the ones in the big leagues, hit it out of the park with this powerful bat!</p>,300,15,14,90,true,heavyMelee,2)); //REWARD
Weapons.push(    WeaponFactory(307,"Sledgehammer",<p>Who said you can only use this to smash concrete?</p>,500,25,22,85,true,heavyMelee,3)) //REWARD
//id 5 ^
Weapons.push(    WeaponFactory(308,"Zaxon's Zappy Beeter",<p>Wow this thing sucks</p>,500,5,5,80,false,energySmall,3,3,4));
Weapons.push(plasmaP); //QUEST REWARD
Weapons.push(   WeaponFactory(310,"Maxine's Taser Shotgun",<p>Maxine Rubin's modified taser shotgun fires three electrical projectiles, dealing big damage on contact.</p>,5000,50,5,80,false,maxineShotgun,4,4,3)) //REWARD
Weapons.push(   WeaponFactory(311,"Standard Pistol",<p>Small sidearm used by low level police and personal safety.</p>,250,3,3,80,false,smallBullet,0,0,1));
Weapons.push(WeaponFactory(312,"Short Rifle",<p>A medium sized rifle that is used by farmers to ward off predators and tresspassers.</p>,500,10,8,85,false,medBullet,1,1,2));
//10^
Weapons.push(WeaponFactory(313,"Single Shotgun",<p>Close range weapon that deals big damage... if it hits.</p>,750,20,10,65,false,exSmall,2,2,1));
Weapons.push(WeaponFactory(314,"Small Taser",<p>Small sidearm that delivers an electric shock if the prongs hit.</p>,500,5,4,90,false,taser,1,3,3));
Weapons.push(WeaponFactory(315,"Laser Rifle",<p>New technology has allowed a powerful heat laser be fired with extreme accuracy... at the cost of lots and lots of batteries.</p>,1200,14,7,90,false,energyMed,2,4,4));
Weapons.push(WeaponFactory(316,"Gauss Rifle",<p>A prototype energy rifle that builds a charge through the coils before releasing a powerful energy bolt!</p>,5000,35,15,85,false,energyHeavy,3,5,1));
Weapons.push(WeaponFactory(317,"Bomb Launcher",<p>Load up some cherry bombs and have a blast!</p>,500,20,10,75,false,exSmall,3,6,1));
//15^
Weapons.push(WeaponFactory(318,"Portable Mortar",<p>How this works is beyond our understanding.</p>,5000,60,20,85,false,exLarge,4,7,1));
Weapons.push(WeaponFactory(319,"Light Machine Gun",<p>Large Magazine that deals lots of damage and eats lot of ammo very quickly.</p>,1000,3,1,75,false,smallBulletAuto,2,0,1));
Weapons.push(WeaponFactory(320,"Assault Rifle",<p>A fast firing rifle used in war and combat settings.</p>,2500,11,6,85,false,smallBulletAuto,2,1,1));
Weapons.push(WeaponFactory(307,"Alex Sandro's Sledge",<p>Crafted especailly to maul and power it's way through even the thickest of armor, Alex Sandro's sledge is a terrifying presence on the battlefield.</p>,5000,50,40,90,true,heavyBullet,4));
Weapons.push(WeaponFactory(308,"Emperor's Rifle",<p>A gun worthy of a mob boss - equipped with explosive rounds and plated with gold, dispatch your rivals in style!</p>,5000,15,8,90,false,exSmall,4,1,2))
//20^



export default Weapons;