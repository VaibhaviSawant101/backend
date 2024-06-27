const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromise = require('fs').promises;
const s8 = require('./s8');
const EventEmitter = require('events');
class Emitter extends EventEmitter {};

//initialize the object
const myEmitter = new Emitter();
myEmitter.on('log', (msg, fileName)=>{
    s8(msg, fileName);
});

const PORT = process.env.PORT || 3500;

const serveFile = async (filePath, contentType, response) =>{
    try{
        const rawData = await fsPromise.readFile(filePath, 
            !contentType.includes('image') ? 'utf-8' : '');
        const data = contentType === 'appication/json' ? JSON.parse(rawData) : rawData;
        response.writeHead(
            filePath.includes('404.html')?404:200, {'Content-Type':contentType});
        response.end(
            contentType === 'application/json' ? JSON.stringify(data) : data
        );

    }
    catch(err)
    {
        console.log(err);
        myEmitter.emit('log', `${err.name} : ${err.message}`, 'errLog.txt');
        response.statusCode = 500;
        response.end();
    }
}

const server = http.createServer((req, res)=>{
    console.log(req.url, req.method);
    myEmitter.emit('log', `${req.url}\t${req.method}`, 'reqLog.txt');
    const extension = path.extname(req.url);
    let contentType;

    switch(extension){
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/jpeg';
            break;
        case '.txt':
            contentType = 'text/plain';
            break;
        default:
            contentType = 'text/html';
            break;         
    }

    let filePath =
    contentType === 'text/html' && req.url === '/' ?
        path.join(__dirname, 'views', 'index.html') :
        contentType === 'text/html' && req.url.slice(-1) === '/' ?
        path.join(__dirname, 'views', req.url, 'index.html') :
        contentType === 'text/html' ?
        path.join(__dirname, 'views', req.url):
        path.join(__dirname, req.url);
    
        //makes .html extension not required in the browser
    if(!extension && req.url.slice(-1) !== '/'){
        filePath += '.html';
    }

    const fileExists = fs.existsSync(filePath);
    if(fileExists){
        //serve the file
        serveFile(filePath, contentType, res);
    }
    else{
        //404
        //301 redirect
        switch(path.parse(filePath).base){
            case 'old-page.html':
                res.writeHead(301, {"Location" : "/new-page.html"});
                res.end();
                break;
            case 'www-page.html':
                res.writeHead(301, {"Location" : "/"});
                res.end();
                break;
            default:
                //serve a 404 response
                serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);
        }
    }
    /*
    let p;

    switch(req.url)


    {
        case '/':
            res.statusCode = 200;
            p = path.join(__dirname, 'views', 'index.html');
            fs.readFile(path, 'utf-8', (err, data)=>{
                res.end(data);
            });
            break;
    }
    */
});

server.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`);
});
