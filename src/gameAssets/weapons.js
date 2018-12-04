import React from 'react';

let WeaponFactory = (id,name,description,price,damage,apCost,accuracy,isMelee,modifier=null) => {
  let weaponObject = {
    id,
    name,
    description: <div>{description}<p>{damage} DMG | {apCost} AP | {accuracy} ACC</p></div>,
    price,
    isMelee,
    modifier,
    isWeapon: true,
    isConsumable: false,
    effect: () => {
      return {damage, apCost,accuracy}
    }
  }
  return weaponObject;
}

let Weapons = [
  WeaponFactory(301,"Wooden Baseball Bat",<p>Strong and heavy, perfect for head busting</p>,150,15,15,95,true),
  WeaponFactory(302,"Brass Knuckles",<p>For when your punches need that extra... punch</p>,100,3,6,95,true),
  WeaponFactory(303,"Spiked Knuckles",<p>Skewer your opponents using only your knuckles!</p>,250,5,7,95,true),
  WeaponFactory(303,"Plastic Baseball Bat",<p>Plastic is pretty tough but it's still a toy</p>,70,5,10,95,true),
  WeaponFactory(303,"Steel Baseball Bat",<p>Made of heavy metal, this will be sure to hit it out the park!</p>,500,30,25,95,true),
    {
      id:306,
      name:"Dull Machete",
      description: "Might as well use a butter knife.",
      price: 100,
      isWeapon: true,
      isConsumable:false,
      effect: () => {
      return {damage: 6, apCost: 10}
    },
  },//5
  {
    id:307,
    name:"Tribal Machete",
    description: "Used for slicing through leaves and jungle snakes, now can be used to carve open anything you want!",
    price: 500,
    isWeapon: true,
    isConsumable:false,
    effect: () => {
    return {damage: 25, apCost: 30}
    },
  },//5
  {
    id:308,
    name:"Zaxon's Zappy Beeter",
    description: <div><p>Wow this thing sucks</p><p>5 DMG | 3 AP</p></div>,
    price: 1000,
    isWeapon: true,
    isConsumable:false,
    effect: () => {
      return {damage: 5, apCost: 5}
    },
  },
  {
    id:309,
    name:"Plasma Pistol",
    description: <div><p>1 in 5 chance of a charged bolt for 3x damage.</p><p>5 DMG | 3 AP</p></div>,
    price: 1000,
    isWeapon: true,
    isConsumable:false,
    effect: ()=>{
      let randomNum = Math.floor(Math.random() * 100);
      if(20>=randomNum){
        return {damage:12, apCost: 15,accuracy:90}
      }
      return {damage: 4, apCost: 5,accuracy:90}
    },
  },
]


export default Weapons;