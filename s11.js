const http = require('http');
const fsPromise = require('fs').promises;
const path = require('path');
const os = require('os');
const homeDir = os.homedir();

const PORT = process.env.PORT || 3000;

const serveFile = async (response) =>{
    const data = await fsPromise.readFile(path.join(homeDir, 'Desktop', 'RockPaperScissor', 'index.html'));
    response.end(data);
}

const server = http.createServer((req, res)=>{
    console.log('Request method '+ req.method);
    console.log('Request url '+ req.url);
    console.log('Request headers '+req.headers);
    console.log('Request Content-Type '+req.headers['Content-Type']);

    //Handle different routes
    if(req.method === 'GET' && req.url === '/'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        serveFile(res);
    }
    else if(req.method === 'GET' && req.url === '/about'){
        res.writeHead(200, {'Content-Type':'text/plain'});
        res.end('About Page\n');
    }
    else{
        res.writeHead(404, {'Content-Type':'text/plain'});
        res.end("Page not Found\n");
    }
});

server.listen(PORT, ()=>{
    console.log('Server is running on port '+PORT);
})