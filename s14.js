const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const PORT = process.env.PORT || 3500;
const {logger, logEvents} = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const corsOptions = require('./config/corsOption');

app.use(logger);
app.use(cors(corsOptions));

app.use(express.urlencoded({extended:false}));

app.use(express.json());

app.use(express.static(path.join(__dirname, './public')));

app.use('/', require('./routes/root'));
app.use('/employees', require('./routes/api/employees'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));

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

app.use(errorHandler);

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});