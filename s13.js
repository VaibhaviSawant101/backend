const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const PORT = process.env.PORT || 3500;
const {logger, logEvents} = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');

//custom middleware logger
/*
app.use((req, res, next)=>{
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
    console.log(`${req.method} ${req.path}`);
    next();
});
*/
app.use(logger);

//Cross origin resource sharing
const whitelist = ['https://www.google.com', 'http://127.0.0.1:5500', 'http://localhost:3500'];
const corsOptions = {
    origin : (origin, callback)=>{
        if(whitelist.indexOf(origin) !== -1 || !origin){
            callback(null, true);
        }
        else{
            callback(new Error("Not allowed by CORS"));
        }
    },
    optionSuccessStatus : 200
}
app.use(cors(corsOptions));
//app.use(cors());

//built-in middleware to handle urlencoded data
//in other words, form data:
//'content-type':application/x-www-form-urlencoded'
app.use(express.urlencoded({extended:false}));

//built-in middleware for json
app.use(express.json());

//serve static files
app.use(express.static(path.join(__dirname, './public')));
app.use('/subdir',express.static(path.join(__dirname, './public')));

app.use('/', require('./routes/root'));
app.use('/subdir', require('./routes/subdir'));
app.use('/employees', require('./routes/api/employees'));
/*

app.get('^/$|/index(.html)?', (req, res)=>{
    //res.send("Hello World!");
    //res.sendFile('./views/index.html', {root:__dirname});
    res.sendFile(path.join(__dirname, 'views', 'index.html'));

});

app.get('/new-page(.html)?', (req, res)=>{
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));

});

app.get('/old-page(.html)?', (req, res)=>{
    //this gives 302 by default redirect but if u want to specify 301 then
    //res.redirect('/new-page.html');
    res.redirect(301, '/new-page.html');

});

//Route handling - chain function
app.get('/hello(.html)?', (req, res, next)=>{
    console.log("attempted to load hello.html");
    next();
}, (req, res)=>{
    res.send("Hello World!!");
});
*/
app.use(errorHandler);

app.all('*', (req, res)=>{
    res.status(404).
    if(req.accepts('html'))
    {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    }
    if( req.accepts('json'))
    {
        res.json({error: '404 Not Found'});
    }
    else
    {
        res.type('txt').send("404 not found")
    }
})

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});