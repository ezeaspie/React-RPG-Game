import React from 'react';

let Weapons = [
    {
      id:301,
        name:"Wooden Baseball Bat",
        description: <p>"Strong and heavy, this is sure to bust some heads."</p>,
        price: 100,
        isWeapon: true,
        isConsumable:false,
        effect: () => {
        return {damage: 15, apCost: 5}
        },
    },//0
    {
      id:302,
        name:"Brass Knuckles",
        description: "For when your punches need a little extra ... punch",
        price: 50,
        isWeapon: true,
        isConsumable:false,
        effect: () => {
        return {damage: 3, apCost: 2}
        },
      },//1
      {
        id:303,
        name:"Spiked Knuckles",
        description: "Slice your way through your opponents using only your fists!",
        price: 100,
        isWeapon: true,
        isConsumable:false,
        effect: () => {
        return {damage: 5, apCost: 3}
        },
      },//2
      {
        id:304,
        name:"Plastic Baseball Bat",
        description: "The plastic is pretty tough but it's still a toy.",
        price: 35,
        isWeapon: true,
        isConsumable:false,
        effect: () => {
        return {damage: 5, apCost: 5}
      } 
      },//3
      {
        id:305,
        name:"Steel Baseball Bat",
        description: "Lightweight and powerful, use this to hit it out of the park!",
        price: 500,
        isWeapon: true,
        isConsumable:false,
        effect: () => {
        return {damage: 30, apCost: 7}
      }
    },//4
    {
      id:306,
      name:"Dull Machete",
      description: "Might as well use a butter knife.",
      price: 100,
      isWeapon: true,
      isConsumable:false,
      effect: () => {
      return {damage: 6, apCost: 4}
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
    return {damage: 25, apCost: 5}
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
  return {damage: 5, apCost: 3}
},
},
]

export default Weapons;