const fs = require('fs');
/*
fs.readFile('./demo.txt', (err, data)=>{
    if(err) throw err;
    console.log(data.toString());
});
*/
const path = require('path');
/*
fs.readFile('./demo.txt', 'utf8',(err, data)=>{
    if(err) throw err;
    console.log(data);
});
*/
/*
fs.readFile(path.join(__dirname, 'demo.txt'), 'utf8', (err, data)=>{
    if(err) throw err;
    console.log(data);
})

console.log("Hello");
//This statement runs first as readFile asynchronous nature of node js

*/

/*
fs.writeFile(path.join(__dirname, 'demo.txt'), 'Nice to meet you.',(err)=>{
    if(err) throw err;
    console.log("Write Complete");
})
*/
/*
fs.appendFile(path.join(__dirname, 'demo.txt'), 'Testing text', (err)=>{
    if(err) throw err;
    console.log("Append complete");
});
*/

//This is nothing but callback hell
fs.readFile(path.join(__dirname, 'demo.txt'), 'utf8', (err, data)=>{
    if(err) throw err;
    console.log(data);
    fs.writeFile(path.join(__dirname, 'demo.txt'), 'Nice to meet you.',(err)=>{
        if(err) throw err;
        console.log("Write Complete");
        fs.appendFile(path.join(__dirname, 'demo.txt'), 'Testing text', (err)=>{
            if(err) throw err;
            console.log("Append complete");
            fs.rename(path.join(__dirname, 'demo.txt'),path.join(__dirname, 'demo1.txt'),(err)=>{
                if(err) throw err;
            });
        });
    })
})


//exit an uncaught errors
process.on('uncaughtException', err =>{
    console.error(`There was an uncaught error: ${err}`);
    process.exit(1);
});