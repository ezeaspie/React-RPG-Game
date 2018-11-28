import React from 'react';

const staticItems = [
    {
        name:"Packing Supplies",
        id:101,
        description: <div><p>This bundle includes Packing Tape, 3 different sized boxes, and a roll of bubble-wrap.</p></div>,
        price: 50,
        isConsumable:false,
        effect: () => {
          return false;
        },
      },
      {
        name:"Liberty Stamp",
        id:102,
        description: <div><p>A special kind of stamp that only a special kind of person would even consider buying.</p></div>,
        price: 2000,
        isConsumable:false,
        effect: () => {
          return false;
        },
    },
        {
            name:"Passport",
            id:103,
            description: <div><p>This passport lets you go to the airport or bus station to catch a ride to far-away places you otherwise would never be able to visit.</p></div>,
            price: 800,
            isConsumable:false,
            effect: () => {
              return false;
            },
        },
        {
          name:"Antiqued Sewing Machine",
          id:104,
          price:500,
          description: <div><p>A fine piece of machinery, from quite some time ago.</p></div>,
          isConsumable:false,
          effect: () => {
            return false;
          },
        },
        {
          name:"NorthWest Police High Commander Badge",
          id:105,
          price:250,
          description:<div><p>Looks to be the real thing, as long as you place your finger over the 'Made in China' engraving on the back.</p></div>,
          isConsumable:false,
          effect: ()=> {
            return false;
          }
        },
        {
          name:"Phoebe's Running Shoes",
          id:106,
          price:1500,
          description:<div><p>Unique and elegant, these look quite valuable and rare.</p></div>,
          isConsumable:false,
          effect: ()=> {
            return false;
          }
        }

]

export default staticItems;