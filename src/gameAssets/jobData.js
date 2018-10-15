const Jobs = [
    {
        id: 443,
        name: "Gas Station Employee",
        requirements: [
            {name:"Charisma", value:5},
            {name:"Strength", value:5},
            {name:"Intelligence", value:0},
            {name:"Agility",value:0},
            {name:"Luck", value:0},
            {name:"Street Cred", value:0},
            {name:"Money", value:0},
        ],//chr,str,int,lck,sC,mon
        increment:10,
        shiftTime:4,
        promotion: [
            {
                name:"Store Clerk",
                pay: 5,
            },
            {
                name:"CEO of Youtube",
                pay: 10,
            }
        ],
    },
    {
        id: 403,
        name: "Teacher",
        requirements: [
            {name:"Charisma", value:3},
            {name:"Strength", value:0},
            {name:"Intelligence", value:3},
            {name:"Agility",value:0},
            {name:"Luck", value:0},
            {name:"Street Cred", value:0},
            {name:"Money", value:0},
        ],
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