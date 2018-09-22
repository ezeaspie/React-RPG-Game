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
      },
      },//3
]

export default Weapons;