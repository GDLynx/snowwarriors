const http = require("http"); 
const { parse } = require('querystring');
let num = 0; 
const port =  3000; 
const server = http.createServer((req, res) => { 
    console.log(`Listening on port ${port}`)
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "text/json");    
    switch (req.url) { 
        case "/":         
            console.log("Connection success"); 
            if (req.method == "GET" || req.method == "get") { 
                res.write(JSON.stringify(
                    { 
                        content: num
                    }
                )); 
                res.end();
            } else if (req.method == "POST" || req.method == "post") { 
                let body = [];
                req.on('data', (chunk) => {
                    body.push(chunk);
                }).on('end', () => {
                    body = Buffer.concat(body).toString();
                    let json = JSON.stringify(body); 
                    let parsedJSON = JSON.parse(json); 
                    console.log(parsedJSON.includes("yeti")); 
                    if (parsedJSON.includes("yeti")) { 
                        console.log("yay yet"); 
                    } else if (parsedJSON.includes("snow-wizard")) { 
                        console.log(parsedJSON); 
                        console.log("yay snow wizard"); 
                    }
                });
                num++; 
            }
            break; 
    }
}); 

function collectRequestData(request, callback) {
    let body = '';
    request.on('data', chunk => {
        body += chunk.toString();
    });
    request.on('end', () => {
        callback(parse(body));
    });
}

server.listen(port); 
