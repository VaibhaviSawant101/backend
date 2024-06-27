const fs = require('fs');
/*
const rs = fs.createReadStream("./demo.txt", {encoding:'utf8'});
const ws = fs.createWriteStream('./demo2.txt');

/*
rs.on('data', (dataChunk)=>{
    ws.write(dataChunk);
})
*/

//rs.pipe(ws);

//to check whether dir is present or not
/*
if(!fs.existsSync('./new')){
fs.mkdir('./new', (err)=>{
    if (err) throw err;
    console.log("directory created");
});}
*/
if(fs.existsSync('./new')){
fs.rmdir('./new', (err)=>{
    if (err) throw err;
    console.log("directory removed");
});}
