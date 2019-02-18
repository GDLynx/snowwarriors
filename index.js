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
                }); 
                num++; 
            }
            break; 
    }
}); 

server.listen(port); 
