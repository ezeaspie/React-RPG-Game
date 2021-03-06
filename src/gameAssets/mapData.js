const mapData = [
    {
        name: "NorthWest",
        layout: [
            [6  ,409,222,19 ,15 ,22 ,19 ,15 ,250,251,252,19 ,15 ,1  ,9  ,5  ,5  ,12 ,5  ,5],//0
            [6  ,223,224,30 ,29 ,210,30 ,29 ,253,408,254,30 ,29 ,1  ,2  ,299,299,19 ,17 ,15],//1
            [6  ,225,410,16 ,20 ,22 ,16 ,18 ,18 ,18 ,18 ,18 ,20 ,1  ,2  ,299,406,16 ,18 ,20],//2
            [14 ,5  ,5  ,12 ,14  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,14 ,7  ,9  ,5  ,5  ,5  ,5  ,14],//3
            [22 ,21 ,22 ,19 ,17 ,17 ,17 ,15 ,226,227,228,229,230,1  ,2  ,603,210,21 ,210,21],//4
            [245,246,247,30 ,28 ,28 ,28 ,29 ,231,232,233,234,235,1  ,2  ,299,299,299,299,210],//5
            [248,414,249,16 ,18 ,18 ,18 ,20 ,236,237,238,411,239,1  ,2  ,299,413,299,299,21],//6
            [3  ,3  ,610,3  ,3  ,3  ,3  ,10 ,3  ,3  ,3  ,3  ,3  ,7  ,9  ,3  ,3  ,3  ,3  ,3],//7
            [8  ,4  ,4  ,4  ,4  ,8  ,4  ,4  ,4  ,4  ,4  ,4  ,4  ,7  ,9  ,4  ,4  ,4  ,8  ,4],//8
            [6  ,21 ,210,21 ,210,6  ,210,21 ,210,21 ,210,21 ,210,1  ,2  ,22 ,210,21 ,6  ,21],//9
            [19 ,17 ,15 ,211,212,6  ,607,22 ,22 ,22 ,240,241,242,1  ,2  ,210,214,215,6  ,22],//10
            [16 ,18 ,20 ,402,23 ,6  ,210,21 ,210,21 ,243,405,244,1  ,2  ,21 ,412,216,611,21],//11
            [22 ,22 ,6  ,1  ,10 ,10 ,3  ,3  ,3  ,3  ,3  ,3  ,3  ,7  ,9  ,5  ,5  ,5  ,14 ,5],//12
            [5  ,5  ,14 ,7  ,2  ,4  ,4  ,8  ,4  ,4  ,4  ,4  ,4  ,7  ,2  ,24 ,24 ,24 ,24 ,24],//13
            [22 ,210,22 ,1  ,2  ,208,209,6  ,217,218,219,605,210,1  ,2  ,24 ,24 ,24 ,24 ,24],//14
            [205,206,204,1  ,2  ,401,207,6  ,220,404,221,604,210,1  ,2  ,24 ,24,24 ,24 ,24],//15
            [201,403,202,1  ,9  ,5  ,5  ,14 ,5  ,5  ,5  ,5  ,5  ,7  ,2  ,407,213,24 ,24 ,24],//16
            [606,12 ,5  ,7  ,2  ,210,22 ,22 ,210,210,22 ,22 ,210,1  ,9  ,5  ,5  ,5  ,5  ,5],//17
            [22 ,19 ,15 ,1  ,602,22 ,22 ,22 ,22 ,22 ,299,299,22 ,1  ,2  ,24 ,24 ,25 ,25 ,25],//18
            [210,16 ,20 ,601,2  ,210,22 ,608,609,0  ,415,299,210,1  ,2  ,24 ,24 ,27 ,612,25],//19
        ],
    },
    {
        name: "SweetWater Ridge",
        layout: [
            [409,299,299,0  ,0  ,0  ,0  ,0  ,299,299,299,0  ,0  ,1  ,2  ,299,299,0  ,0  ,0],//0
            [0  ,299,299,0  ,0  ,0  ,0  ,0  ,299,408,299,0  ,0  ,1  ,2  ,299,299,0  ,0  ,0],//1
            [0  ,299,410,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,1  ,2  ,299,406,0  ,0  ,0],//2
            [5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,7  ,2  ,0  ,0  ,0  ,0  ,0],//3
            [0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,299,299,299,299,299,1  ,2  ,607,0  ,0  ,0  ,0],//4
            [299,299,299,0  ,0  ,0  ,0  ,0  ,299,299,299,299,299,1  ,2  ,299,299,299,299,0],//5
            [299,414,299,610,0  ,0  ,0  ,0  ,299,299,299,411,299,1  ,2  ,299,413,299,299,0],//6
            [3  ,3  ,3  ,3  ,3  ,3  ,3  ,3  ,3  ,3  ,3  ,3  ,3  ,7  ,9  ,3  ,3  ,3  ,3  ,3],//7
            [4  ,4  ,4  ,4  ,4  ,4  ,4  ,4  ,4  ,4  ,4  ,4  ,4  ,7  ,9  ,4  ,4  ,4  ,4  ,4],//8
            [0  ,0  ,0  ,603,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,1  ,2  ,0  ,0  ,0  ,0  ,0],//9
            [0  ,0  ,0  ,299,299,0  ,0  ,0  ,0  ,0  ,299,299,299,1  ,2  ,0  ,299,299,0  ,0],//10
            [0  ,0  ,0  ,402,299,0  ,0  ,0  ,0  ,0  ,299,404,299,1  ,2  ,0  ,412,299,0  ,0],//11
            [0  ,0  ,0  ,1  ,3  ,3  ,3  ,3  ,3  ,3  ,3  ,3  ,3  ,7  ,2  ,0  ,0  ,0  ,0  ,0],//12
            [0  ,0  ,0  ,1  ,2  ,4  ,4  ,4  ,4  ,4  ,4  ,4  ,4  ,7  ,2  ,0  ,0  ,0  ,0  ,0],//13
            [0  ,0  ,0  ,1  ,2  ,208,209,0  ,299,299,299,605,0  ,1  ,2  ,0  ,0  ,0  ,0  ,0],//14
            [205,206,204,1  ,2  ,401,207,0  ,299,404,299,604,0  ,1  ,2  ,299,299,299,0  ,0],//15
            [201,403,202,1  ,9  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,5  ,7  ,2  ,299,407,299,0  ,0],//16
            [5  ,5  ,5  ,7  ,2  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,1  ,9  ,5  ,5  ,5  ,5  ,5],//17
            [606,0  ,0  ,1  ,602,0  ,0  ,0  ,0  ,0  ,299,299,0  ,1  ,2  ,0  ,0  ,0  ,0  ,0],//18
            [0  ,0  ,0  ,601,2  ,0  ,0  ,608,609,0  ,415,299,0  ,1  ,2  ,0  ,0  ,0  ,0  ,0],//19
        ],
    }
]

export default mapData;