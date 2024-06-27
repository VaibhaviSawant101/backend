const fsPromises = require('fs').promises;
const path = require('path');

const fileOps = async()=>{
    try{
        const data = await fsPromises.readFile(path.join(__dirname, 'demo.txt'), 'utf8');
        console.log(data);
        await fsPromises.writeFile(path.join(__dirname, 'demo.txt'), data);
        //to delete a file
        //await fsPromises.unlink(path.join(__dirname, 'demo.txt'));
        await fsPromises.appendFile(path.join(__dirname, 'demo.txt'), data);
        await fsPromises.rename(path.join(__dirname, 'demo.txt'), 'demo.txt');
        const newData = await fsPromises.readFile(path.join(__dirname, 'demo.txt'), 'utf8');
        console.log(newData);
    }catch(err)
    {
        console.error(err);
    }
}

fileOps();