const http = require("http"); 
const events = require('./events');
// const EventEmitter = require('events');

// class MyEmitter extends EventEmitter {}

const port =  3000; 

// images [tempoary] 
let bee = "https://images.pexels.com/photos/34220/bee-halictus-macro-pollinator.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500"; 
let snowman = "https://images.pexels.com/photos/760110/pexels-photo-760110.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"; 
let demon = "https://images.pexels.com/photos/208984/pexels-photo-208984.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"; 
let wolf ="https://images.pexels.com/photos/326097/pexels-photo-326097.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"; 

// index 0: snow bee, index 1: snow man , index 2: snow demon, index 3: snow wolf  
let enemyHealths = [100, 300, 500, 1200]; 
let enemyImages = [bee, snowman, demon, wolf]; 
let enemyNames = ["snow bee", "snow man", "snow demon", "snow wolf"]; 

let game = {  
    player:  {
            count: 0, 
            health: 100, 
            coins: 2321000,
            activeCoins: 0, 
            warriors: { 
                yeti: 0, 
                snowWizard: 0, 
                snowAngel: 0, 
                snowQueen: 0 
            }
        }, 
    enemy: { 
        image: "assets/kmdrgroch.PNG", 
        health: 100, 
        name: "Kmndr Groch"
    }, 
    canDispenseCoins: false 
}

function enemyDied() { 
    if (game.enemy.health <= 0 && !game.canDispenseCoins) { 
        game.canDispenseCoins = true; 
        game.enemy.health = 100; 
        game.player.activeCoins = 10; 

        let newEnemyIndex = Math.floor(Math.random() * 4); 
        game.enemy.image = enemyImages[newEnemyIndex]; 
        game.enemy.name = enemyNames[newEnemyIndex]; 
        game.enemy.health = enemyHealths[newEnemyIndex]; 
    } else { 
        game.canDispenseCoins = false; 
        game.player.activeCoins = 0; 
    }
} 

const server = http.createServer((req, res) => { 
    // console.log(`Listening on port ${port}`)
    res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:8080");
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
                events.subscribe(req, res); 
                events.publish(game); 
                /* 
                const myEmitter = new MyEmitter();
                myEmitter.on('event', () => {
                    console.log('an event occurred!');
                }); 
                myEmitter.emit('event');
                */ 
                break; 
            case "/removeHealthOnTap": 
                game.enemy.health -= 10;  
                enemyDied(); 
                events.subscribe(req, res);
                events.publish(game);
                // console.log(game.enemy); 
                // will likekly also need to detect and handle the enemy's death 
                break; 
            case "/buyYeti": 
                if (game.player.coins >= 100) { 
                    game.player.coins -= 100; 
                    game.player.warriors.yeti += 1; 
                }
                events.subscribe(req, res);
                events.publish(game);
                break; 
            case "/buySnowWizard": 
                if (game.player.coins >= 400) { 
                    game.player.coins -= 400; 
                    game.player.warriors.snowWizard += 1; 
                }
                events.subscribe(req, res);
                events.publish(game);
                break; 
            case "/buySnowAngel": 
                if (game.player.coins >= 1200) { 
                    game.player.coins -= 1200; 
                    game.player.warriors.snowAngel += 1; 
                }
                events.subscribe(req, res);
                events.publish(game);
                break; 
            case "/buySnowQueen": 
                if (game.player.coins >= 3300) { 
                    game.player.coins -= 3300; 
                    game.player.warriors.snowQueen += 1; 
                }
                events.subscribe(req, res);
                events.publish(game);
                break; 
            case "/removeEnemyHealthYeti": 
                game.enemy.health -= 5 * game.player.warriors.yeti; 
                enemyDied(); 
                events.subscribe(req, res);
                events.publish(game);
                break; 
            case "/removeEnemyHealthSnowWizard": 
                game.enemy.health -= 10 * game.player.warriors.snowWizard; 
                enemyDied(); 
                events.subscribe(req, res);
                events.publish(game);
                break;
            case "/removeEnemyHealthSnowAngel": 
                game.enemy.health -= 20 * game.player.warriors.snowAngel; 
                enemyDied(); 
                events.subscribe(req, res);
                events.publish(game);
                break; 
            case "/removeEnemyHealthSnowQueen":
                game.enemy.health -= 50 * game.player.warriors.snowQueen; 
                enemyDied(); 
                events.subscribe(req, res);
                events.publish(game);
                break; 
            case "/incrementPlayersCoins": 
                game.player.coins = Number(game.player.coins) + 1; 
                game.player.activeCoins -= 1; 
                events.subscribe(req, res);
                events.publish(game); 
                break; 
            case "/removeCoins":
                game.player.activeCoins = 0; 
                events.subscribe(req, res);
                events.publish(game); 
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
                    activeCoins: 0, 
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
        /incrementPlayersCoins - adds one coin to player's coins (ice shards) 
*/ 