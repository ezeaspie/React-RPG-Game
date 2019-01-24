const Jobs = [
    {
        id: 402,
        name: "Gas Station Employee",
        requirements: [
            {name:"Charisma", value:0},
            {name:"Strength", value:0},
            {name:"Intelligence", value:0},
            {name:"Agility",value:0},
            {name:"Luck", value:0},
            {name:"Street Cred", value:0},
        ],//chr,str,int,lck,sC,mon
        increment:10,
        shiftTime:5,
        reward:null,
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
        ],
        increment:20,
        shiftTime:5,
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
    },
    {
        id: 405,
        name: "Bank Employee",
        requirements: [
            {name:"Charisma", value:0},
            {name:"Strength", value:0},
            {name:"Intelligence", value:30},
            {name:"Agility",value:0},
            {name:"Luck", value:0},
            {name:"Street Cred", value:0},
        ],
        increment:20,
        shiftTime:5,
        promotion: [
            {
                name:"Drive Thru Teller",
                pay: 7,
            },
            {
                name:"Teller",
                pay: 10,
            },
            {
                name:"Financial Advisor",
                pay: 14,
            },
            {
                name:"Bank Manager",
                pay: 20,
            },
        ], 
    },
    {
        id: 408,
        name: "Gym Worker",
        requirements: [
            {name:"Charisma", value:20},
            {name:"Strength", value:20},
            {name:"Intelligence", value:0},
            {name:"Agility",value:0},
            {name:"Luck", value:0},
            {name:"Street Cred", value:0},
        ],
        increment:15,
        shiftTime:5,
        promotion: [
            {
                name:"Locker Room Cleaner",
                pay: 5,
            },
            {
                name:"Equipment Manager",
                pay: 8,
            },
            {
                name:"Membership Salesman",
                pay: 10,
            },
            {
                name:"Yoga Instructor",
                pay: 15,
            },
            {
                name:"Personal Trainer",
                pay: 20,
            },
        ], 
    },
    {
        id: 406,
        name: "Postal Worker",
        requirements: [
            {name:"Charisma", value:0},
            {name:"Strength", value:0},
            {name:"Intelligence", value:0},
            {name:"Agility",value:20},
            {name:"Luck", value:0},
            {name:"Street Cred", value:0},
        ],
        increment:20,
        shiftTime:5,
        promotion: [
            {
                name:"Large and Heavy Parcel Carrier",
                pay: 6,
            },
            {
                name:"Mail Sorter",
                pay: 8,
            },
            {
                name:"Mailman",
                pay: 10,
            },
            {
                name:"Last Leg Courier",
                pay: 14,
            },
            {
                name:"PostMaster",
                pay: 13,
            },
        ], 
    },
    {
        id: 407,
        name: "Construction Worker",
        requirements: [
            {name:"Charisma", value:0},
            {name:"Strength", value:25},
            {name:"Intelligence", value:0},
            {name:"Agility",value:0},
            {name:"Luck", value:0},
            {name:"Street Cred", value:0},
        ],
        increment:25,
        shiftTime:6,
        promotion: [
            {
                name:"Site Grunt",
                pay: 8,
            },
            {
                name:"Foreman Assistant",
                pay: 11,
            },
            {
                name:"Foreman",
                pay: 14,
            },
            {
                name:"General Contractor",
                pay: 18,
            },
        ], 
    },
    {
        id: 409,
        name: "Drug Peddler",
        requirements: [
            {name:"Charisma", value:20},
            {name:"Strength", value:50},
            {name:"Intelligence", value:0},
            {name:"Agility",value:0},
            {name:"Luck", value:0},
            {name:"Street Cred", value:30},
        ],
        increment:25,
        shiftTime:6,
        promotion: [
            {
                name:"Cigarette Carrier",
                pay: 15,
            },
            {
                name:"Weed Dealer",
                pay: 45,
            },
            {
                name:"Crack Runner",
                pay: 60,
            },
            {
                name:"Heroin Merchant",
                pay: 80,
            },
            {
                name:"Drug Overlord",
                pay: 90,
            },
        ], 
    },
    {
        id: 411,
        name: "Car Salesman",
        requirements: [
            {name:"Charisma", value:25},
            {name:"Strength", value:0},
            {name:"Intelligence", value:0},
            {name:"Agility",value:0},
            {name:"Luck", value:0},
            {name:"Street Cred", value:0},
        ],
        increment:15,
        shiftTime:5,
        promotion: [
            {
                name:"Car Salesman",
                pay: 7,
            },
            {
                name:"Insurance and Car Salesman",
                pay: 9,
            },
            {
                name:"Insurance and Tire and Car Salesman",
                pay: 11,
            },
            {
                name:"Auto Tycoon",
                pay: 18,
            },
        ], 
    },
]

export default Jobs;