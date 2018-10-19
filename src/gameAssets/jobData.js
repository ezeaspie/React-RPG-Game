const Jobs = [
    {
        id: 402,
        name: "Gas Station Employee",
        requirements: [
            {name:"Charisma", value:10},
            {name:"Strength", value:10},
            {name:"Intelligence", value:0},
            {name:"Agility",value:0},
            {name:"Luck", value:0},
            {name:"Street Cred", value:0},
            {name:"Money", value:0},
        ],//chr,str,int,lck,sC,mon
        increment:10,
        shiftTime:6,
        promotion: [
            {
                name:"Store Clerk",
                pay: 3,
            },
        ],
    },
    {
        id: 404,
        name: "Teacher",
        requirements: [
            {name:"Charisma", value:20},
            {name:"Strength", value:0},
            {name:"Intelligence", value:20},
            {name:"Agility",value:0},
            {name:"Luck", value:0},
            {name:"Street Cred", value:0},
            {name:"Money", value:0},
        ],
        increment:20,
        shiftTime:8,
        promotion: [
            {
                name:"Subsitute Teacher",
                pay: 7,
            },
            {
                name:"Teacher Assistant",
                pay: 10,
            },
            {
                name:"English Teacher",
                pay: 12,
            },
            {
                name:"Department Dean",
                pay: 15,
            },
            {
                name:"Principal",
                pay: 17,
            },
            {
                name:"District Superintendent",
                pay: 20,
            },
        ], 
    }
]

export default Jobs;