const {format} = require('date-fns');
const {v4:uuid} = require('uuid');

const fs = require('fs');
const fsPromise = require('fs').promises;
const path = require('path');

const s8 = async (message, logName)=>{
    const dateTime = `${format(new Date(), 'yyyy MM dd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    console.log(logItem);
    try{
        if(!fs.existsSync(path.join(__dirname, 'logs')))
        {
            await fsPromise.mkdir(path.join(__dirname, 'logs'));
        }
        await fsPromise.appendFile(path.join(__dirname, 'logs', logName), logItem);
    }catch(err){
        console.log(err);
    }
}

module.exports = s8;