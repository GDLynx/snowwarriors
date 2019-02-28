/// Setup 
const http = require("http"); 
const events = require('./events');
// const EventEmitter = require('events');

// class MyEmitter extends EventEmitter {}

const port =  3000; // port number may need to come from the envrionemnt variables 

// images [tempoary] 
// let bee = "https://images.pexels.com/photos/34220/bee-halictus-macro-pollinator.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500"; 
// let snowman = "https://images.pexels.com/photos/760110/pexels-photo-760110.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"; 
// let demon = "https://images.pexels.com/photos/208984/pexels-photo-208984.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"; 
// let wolf ="https://images.pexels.com/photos/326097/pexels-photo-326097.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"; 
let bee = "assets/snowbee.png";
let snowman = "assets/snowman.png";
let demon = "assets/snowdemon.png";
let wolf = "assets/snowwolf.png"; 

// index 0: snow bee, index 1: snow man , index 2: snow demon, index 3: snow wolf  
let enemyHealths = [100, 300, 500, 1200]; 
let enemyImages = [bee, snowman, demon, wolf]; 
let enemyNames = ["snow bee", "snow man", "snow demon", "snow wolf"]; 

let game = {  
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

/// Game Functions 
const update = (req, res, game )=> { 
    events.subscribe(req, res); 
    events.publish(game); 
}

const buyWarrior = (warrior, cost) => { // not sure why but this code failed 
    if (game.player.coins >= cost) { 
        game.player.coins -= cost; 
        warrior += 1; 
    }
}

/// Server 
const server = http.createServer((req, res) => { 
    // res.setHeader("Access-Control-Allow-Origin", "https://gdlynx.github.io/");
    // res.setHeader("Access-Control-Allow-Origin", "*");
    // req.setHeader("Access-Control-Allow-Origin", "https://gdlynx.github.io/");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Content-Type", "text/event-stream");    
    // res.setHeader("Access-Control-Allow-Credentials", "true"); 
    if (req.method == "GET" || req.method == "get") { 
        switch (req.url) { 
            case "/": 
                update(req, res, game); 
                break; 
            case "/removeHealthOnTap": 
                game.enemy.health -= 10;  
                enemyDied(); 
                update(req, res, game); 
                break; 
            case "/buyYeti": 
                // buyWarrior(game.player.warriors.yeti, 100); 
                if (game.player.coins >= 100) { 
                    game.player.coins -= 100; 
                    game.player.warriors.yeti += 1; 
                }
                update(req, res, game); 
                break; 
            case "/buySnowWizard": 
                // buyWarrior(game.player.warriors.snowWizard, 400); 
                if (game.player.coins >= 400) { 
                    game.player.coins -= 400; 
                    game.player.warriors.snowWizard += 1; 
                }
                update(req, res, game); 
                break; 
            case "/buySnowAngel": 
                // buyWarrior(game.player.warriors.snowAngel, 1200); 
                if (game.player.coins >= 1200) { 
                    game.player.coins -= 1200; 
                    game.player.warriors.snowAngel += 1; 
                }
                update(req, res, game); 
                break; 
            case "/buySnowQueen": 
                // buyWarrior(game.player.warriors.snowQueen, 3300); 
                if (game.player.coins >= 3300) { 
                    game.player.coins -= 3300; 
                    game.player.warriors.snowQueen += 1; 
                } 
                update(req, res, game); 
                break; 
            case "/removeEnemyHealthYeti": 
                game.enemy.health -= 5 * game.player.warriors.yeti; 
                enemyDied(); 
                update(req, res, game); 
                break; 
            case "/removeEnemyHealthSnowWizard": 
                game.enemy.health -= 10 * game.player.warriors.snowWizard; 
                enemyDied(); 
                update(req, res, game); 
                break;
            case "/removeEnemyHealthSnowAngel": 
                game.enemy.health -= 20 * game.player.warriors.snowAngel; 
                enemyDied(); 
                update(req, res, game); 
                break; 
            case "/removeEnemyHealthSnowQueen":
                game.enemy.health -= 50 * game.player.warriors.snowQueen; 
                enemyDied(); 
                update(req, res, game); 
                break; 
            case "/incrementPlayersCoins": 
                game.player.coins = Number(game.player.coins) + 1; 
                game.player.activeCoins -= 1; 
                update(req, res, game); 
                break; 
            case "/removeCoins":
                game.player.activeCoins = 0; 
                update(req, res, game); 
                break; 
            default: 
                break; // not sure if thsis should be here or if this should be return 
        }
    } 
}); 

server.listen(port); 
