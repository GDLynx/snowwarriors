const http = require("http"); 

const port =  3000; 

let num = 0; 

const server = http.createServer((req, res) => { 
    console.log(`Listening on port ${port}`)
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "text/json");    
    switch (req.url) { 
        case "/":         
            if (req.method == "GET" || req.method == "get") { 
                res.write(JSON.stringify(
                    { 
                        content: num
                    }
                )); 
                res.end();
            } else if (req.method == "POST" || req.method == "post") { 
                let body = '';
                req.on('data', function (data) {
                    body += data;
                    if (body.length > 1e6) req.connection.destroy();
                });

                req.on('end', function () {
                    console.log(JSON.parse(body).content); 
                });
                num++; 
            }
            break; 
    }
}); 

server.listen(port); 
