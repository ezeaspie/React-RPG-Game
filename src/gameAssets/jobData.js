const Jobs = [
    {
        id: 403,
        name: "Gas Station Employee",
        requirements: [
            {name:"Charisma", value:1},
            {name:"Strength", value:1},
            {name:"Intelligence", value:0},
            {name:"Agility",value:0},
            {name:"Luck", value:0},
            {name:"Street Cred", value:0},
            {name:"Money", value:0},
        ],//chr,str,int,lck,sC,mon
        increment:0,
        shiftTime:4,
        promotion: [
            {
                name:"Store Clerk",
                pay: 5,
            },
        ],
    },
    {
        id: 404,
        name: "Teacher",
        requirements: {
            charisma:20,
            streetCred:0,
            strength:0,
            intelligence:20,
            luck:0,
            money:0,
        },
        increment:20,
        shiftTime:4,
        promotion: [
            {
                name:"Subsitute Teacher",
                pay: 10,
            },
            {
                name:"Teacher Assistant",
                pay: 15,
            },
            {
                name:"English Teacher",
                pay: 20,
            },
            {
                name:"Department Dean",
                pay: 25,
            },
            {
                name:"Principal",
                pay: 35,
            },
            {
                name:"District Superintendent",
                pay: 45,
            },
        ], 
    }
]

export default Jobs;