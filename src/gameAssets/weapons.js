let Weapons = [
    {
        name:"Wooden Baseball Bat",
        description: "Strong and heavy, this is sure to bust some heads.",
        price: 100,
        isWeapon: true,
        isConsumable:false,
        effect: () => {
        return {damage: 15, apCost: 5}
        },
    },//0
    {
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
        name:"Plastic Baseball Bat",
        description: "The plastic is pretty tough but it's still a toy.",
        price: 35,
        isWeapon: true,
        effect: () => {
        return {damage: 5, apCost: 5}
      } 
      },//3
      {
        name:"Steel Baseball Bat",
        description: "Lightweight and powerful, use this to hit it out of the park!",
        price: 500,
        isWeapon: true,
        effect: () => {
        return {damage: 30, apCost: 7}
      }
    },//4
    {
      name:"Dull Machete",
      description: "Might as well use a butter knife.",
      price: 100,
      isWeapon: true,
      effect: () => {
      return {damage: 6, apCost: 4}
    },
  },//5
  {
    name:"Tribal Machete",
    description: "Used for slicing through leaves and jungle snakes, now can be used to carve open anything you want!",
    price: 500,
    isWeapon: true,
    effect: () => {
    return {damage: 25, apCost: 5}
  },
},//5
]

export default Weapons;