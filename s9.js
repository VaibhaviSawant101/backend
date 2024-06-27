const s8 = require('./s8');

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {};

const myEmitter = new MyEmitter();
//add listener for the s8 function
myEmitter.on('log', (msg)=>{
    s8(msg);
});

setTimeout(()=>{
    //emit event
    myEmitter.emit('log', 'Log event emitted!');
}, 2000);
