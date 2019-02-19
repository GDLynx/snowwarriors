const http = require("http"); 

const port =  3000; 

let num = 0; 
let enemyHealth = 100; 

const server = http.createServer((req, res) => { 
    // console.log(`Listening on port ${port}`)
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "text/json");    
    switch (req.url) { 
        case "/":         
            if (req.method == "GET" || req.method == "get") { 
                if (enemyHealth <= 0) { 
                    enemyHealth = 100; 
                } 
                // may be extracted to game object 
                res.write(JSON.stringify(
                    { 
                        content: num, 
                        enemy: 
                            { 
                                health: enemyHealth, exists: enemyHealth > 0 ? true : false 
                            } 
                    }
                )); 
                res.end();
            } else if (req.method == "POST" || req.method == "post") { 
                let body = '';
                req.on('data', data => {
                    body += data;
                    if (body.length > 1e6) req.connection.destroy();
                });

                req.on('end', () => {
                    // console.log(JSON.parse(body).content); 
                    enemyHealth -= JSON.parse(body).damage; 
                    /* 
                    if (enemyHealth <= 0) { 
                        enemyHealth = 100; 
                    } 
                    */ 
                }); 
                num++; 
            }
            break; 
    }
}); 

server.listen(port); 

/* 
    game: 
        {  
            player:  {
                    count: 0, 
                    health: 100, 
                    coins: 0
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
                name: 0 
            }, 
            canDispenseCoins: false 
        }

    routes [ - actions]; 
        /update - triggered by setInterval, this route will also determine whether the client should dispense coins 
            [still unsure about how they will be removed] 
                                        [where yeti is the number of yetis]
        /removeEnemyHealthYeti - yetiDamage * yeti 
        /removeEnemyHealthSnowWizard - enemy.health - snowWizardDamage * snowWizard 
        /removeEnemyHealthSnowangel  - enemy.health - snowAngelDamage * snowAngel 
        /removeEnemyHealthSnowQueen - enemy.health - snowQueenDamage * snowQueen  
        /removeHealthOnTap - enemy.health - 10 
*/ 