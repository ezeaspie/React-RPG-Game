import React from 'react';

let WeaponFactory = (id,name,description,price,damage,apCost,accuracy,isMelee,ammoId=null,ammoCost=null) => {
  let ammoNames=[
  "Light Bullets","Medium Bullets","Heavy Bullets",'Batteries','Energy Cells','Power Charges','Cherry Bombs','Explosive Shells'
  ]

  let weaponObject = {
    id,
    name,
    damage,
    apCost,
    accuracy,
    description: <div>{description}<p>{damage} DMG | {apCost} AP | {accuracy} ACC</p>{!isMelee?<p>x{ammoCost} {ammoNames[ammoId]}</p>:null}</div>,
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
  isMelee:false,
  isConsumable:false,
  effect: ()=>{
    let randomNum = Math.floor(Math.random() * 100);
    if(20>=randomNum){
      return {damage:12, apCost: 15,accuracy:90}
    }
    return {damage: 4, apCost: 5,accuracy:90}
  },
}

Weapons.push(  WeaponFactory(301,"Wooden Baseball Bat",<p>Strong and heavy, perfect for head busting</p>,/*150*/20,15,15,95,true))
Weapons.push(    WeaponFactory(302,"Brass Knuckles",<p>For when your punches need that extra... punch</p>,100,3,6,95,true))
Weapons.push(    WeaponFactory(303,"Spiked Knuckles",<p>Skewer your opponents using only your knuckles!</p>,250,5,7,95,true))
Weapons.push(    WeaponFactory(304,"Plastic Baseball Bat",<p>Plastic is pretty tough but it's still a toy</p>,70,5,10,95,true))
Weapons.push(    WeaponFactory(306,"Ssd",<p>Made of heavy metal, this will be sure to hit it out the park!</p>,500,30,25,95,true))
Weapons.push(    WeaponFactory(307,"koc",<p>Made of heavy metal, this will be sure to hit it out the park!</p>,500,30,25,95,true))
Weapons.push(    WeaponFactory(308,"Zaxon's Zappy Beeter",<p>Wow this thing sucks</p>,500,5,5,90,true))
Weapons.push(plasmaP);
Weapons.push(   WeaponFactory(310,"Maxine's Taser Shotgun",<p>Maxine Rubin's modified taser shotgun fires three electrical projectiles, dealing big damage on contact.</p>,5000,50,5,80,false,4,3))




export default Weapons;