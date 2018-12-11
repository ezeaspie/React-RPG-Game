import React from 'react';

let itemFactory=(id,name,description,price)=>{
  return{
    name,
    id,
    price,
    description:<div>{description}</div>,
    isConsumable:false,
    isAmmo:false,
    ammoPurchaseInfo:null,
    effect:()=>{return false}
  }
}

let ammoFactory=(id,name,description,price,ammoId,amount)=>{
  return{
    name,
    id,
    price,
    description:<div>{description}</div>,
    isConsumable:false,
    isAmmo:true,
    ammoPurchaseInfo:{id:ammoId,amount},
    effect:()=>{return false}
  }
}

const staticItems = [
  itemFactory(101,"Packing Supplies",<p>This bundle includes Packing Tape, 3 different sized boxes, and a roll of bubble wrap.</p>,50),
  itemFactory(102,"Liberty Stamp",<p>A special kind of stamp that only a special kind of person would even consider buying.</p>,2000),
  itemFactory(103,"Passport",<p>This passport lets you go to the airport or bus station to catch a ride to far-away places you otherwise would never be able to visit.</p>,800),
  itemFactory(104,"Antique Sewing Machine",<p>A fine piece of machinery, from quite some time ago.</p>,500),
  itemFactory(105,"High Commander Badge",<p>Looks to be the real thing, as long as you place your finger over the 'Made in China' engraving on the back.</p>,250),
  itemFactory(106,"Phoebe's Running Shoes",<p>Unique and elegant, these look quite valuable and rare.</p>,1500),
  //^id = 5
  ammoFactory(107,"Light Bullet Pack",<p>A pack of five small bullets, for use with most small guns.</p>,10,0,5),
  ammoFactory(108,"Medium Bullet Pack",<p>A pack of five medium sized bullets, for use with most guns and rifles.</p>,50,1,5),
  ammoFactory(109,"Heavy Bullet Pack",<p>A set of five heavy bullets - for use with powerful high-caliber firearms.</p>,250,2,5),
  ammoFactory(110,"Battery Pack",<p>A pack of 10 AA batteries.</p>,25,3,10),
  ammoFactory(111,"Energy Cells",<p>A set of 5 small cells that contain enough power to operate a microwave.</p>,60,4,5),
  //^//id 10
  ammoFactory(112,"Power Charges", <p>Through cutting edge tech, an unstable amount of energy was stuffed into these small canisters.</p>,300,5,5,),
  ammoFactory(113,"Cherry Bombs", <p>Five bombs!</p>,50,6,5,),
  ammoFactory(114,"Explosive Shell", <p>A military grade unguided mortar shell. Keep away from children.</p>,2000,7,1),
  itemFactory(115,"Wedding Ring", <p>A dazzling ring perfect for that special someone.</p>,800),


]

export default staticItems;