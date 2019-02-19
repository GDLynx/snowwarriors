const http = require("http"); 

const port =  3000; 

let game = {  
    player:  {
            count: 0, 
            health: 100, 
            coins: 0,
            warriors: { 
                yeti: 0, 
                snowWizard: 0, 
                snowAngel: 0, 
                snowQueen: 0 
            }
        }, 
    enemy: { 
        image: "", 
        health: 100, 
        name: "snow-wolf"
    }, 
    canDispenseCoins: false 
}


const server = http.createServer((req, res) => { 
    // console.log(`Listening on port ${port}`)
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "text/json");    
    if (req.method == "GET" || req.method == "get") { 
        switch (req.url) { 
            case "/":
                game.enemy.image = "https://images.pexels.com/photos/38438/rattlesnake-toxic-snake-dangerous-38438.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"; 
                res.write(JSON.stringify(game)); 
                res.end();
                break; 
            case "/removeEnemyHealthYeti": 
                break; 
            case "/removeEnemyHealthSnowWizard": 
                break;
            case "/removeEnemyHealthSnowAngel": 
                break; 
            case "/removeEnemyHealthYSnowQueen": 
                break; 
            default: 
                break; // not sure if thsis should be here or if this should be return 
        }
    } 
}); 

server.listen(port); 

/* 
    game: 
        {  
            player:  {
                    count: 0, 
                    health: 100, 
                    coins: 0,
                    warriors: { 
                        yeti: 0, 
                        snowWizard: 0, 
                        snowAngel: 0, 
                        snowQueen: 0 
                    }
                }, 
            enemy: { 
                image: "", 
                health: 100, 
                name: "snow-wolf" 
            }, 
            canDispenseCoins: false 
        }

    routes [ - actions]: 
        /update - triggered by setInterval, this route will also determine whether the client should dispense coins 
            [still unsure about how they will be removed] 
            [may instead be the root ["/"] index ]
        /removeEnemyHealthYeti - yetiDamage * yeti 
                                    [where yeti is the number of yetis]
        /removeEnemyHealthSnowWizard - enemy.health - snowWizardDamage * snowWizard 
        /removeEnemyHealthSnowangel  - enemy.health - snowAngelDamage * snowAngel 
        /removeEnemyHealthSnowQueen - enemy.health - snowQueenDamage * snowQueen  
        /removeHealthOnTap - enemy.health - 10 
*/ 