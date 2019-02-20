const http2 = require("http2"); 
const fs = require("fs"); 
const events = require('./events');
// const EventEmitter = require('events');

// class MyEmitter extends EventEmitter {}

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


const server = http2.createServer((req, res) => { 
    console.log(__dirname); 
    // console.log(`Listening on port ${port}`)
    res.setHeader("Access-Control-Allow-Origin", "https://gdlynx.github.io");
    // res.setHeader("Content-Type", "text/json");    
    res.setHeader("Content-Type", "text/event-stream");    
    res.setHeader("Access-Control-Allow-Credentials", "true"); 
    if (req.method == "GET" || req.method == "get") { 
        switch (req.url) { 
            case "/": 
                /* 
                console.log("accepting request"); 
                game.enemy.image = "https://images.pexels.com/photos/38438/rattlesnake-toxic-snake-dangerous-38438.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"; 
                res.write(JSON.stringify(game)); 
                res.end();
                */ 
                // console.log("subscribing"); 
                game.enemy.image = "https://images.pexels.com/photos/38438/rattlesnake-toxic-snake-dangerous-38438.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"; 
                fs.readFile('./index.html', (err, html) => { 
                    console.log("Reading HTML"); 
                    res.writeHeader(200, {"Content-Type": "text/html"}); 
                    res.write(html); 
                    res.end(); 
                }); 
                // events.subscribe(req, res); 
                // events.publish(game); 

                /* 
                const myEmitter = new MyEmitter();
                myEmitter.on('event', () => {
                    console.log('an event occurred!');
                }); 
                myEmitter.emit('event');
                */ 
               // console.log("root"); // WAS ALWAYS OUTPUT 
                break; 
            case "/removeHealthOnTap": 
                console.log("Removing health"); 
                game.enemy.health -= 10;  
                events.subscribe(req, res); 
                events.publish(game);
                // console.log(game.enemy); 
                // will likekly also need to detect and handle the enemy's death 
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
        / - triggered by setInterval, this route will also determine whether the client should dispense coins 
            [still unsure about how they will be removed] 
        /removeEnemyHealthYeti - yetiDamage * yeti 
                                    [where yeti is the number of yetis]
        /removeEnemyHealthSnowWizard - enemy.health - snowWizardDamage * snowWizard 
        /removeEnemyHealthSnowangel  - enemy.health - snowAngelDamage * snowAngel 
        /removeEnemyHealthSnowQueen - enemy.health - snowQueenDamage * snowQueen  
        /removeHealthOnTap - enemy.health - 10 
*/ 