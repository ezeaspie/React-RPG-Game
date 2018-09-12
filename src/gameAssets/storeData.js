import playerData from './playerData';

const storeObject = [
    {
        id:401,
        isShop: false,
        name:"Home",
        options: [
            {
                name: "Sleep",
                effect: () => {
                    console.log(playerData);
                    playerData.updateHealth(true,99999);
                }
            }
        ]
    },
    {
        id:402,
        isShop: true,
        name:"Shell Gas Station",
        inventory: {

        }
    }
]

export default storeObject;