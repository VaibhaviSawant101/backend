const {format} = require('date-fns');
const {v4: uuid} = require('uuid');

console.log(format(new Date(), 'yyyy MM dd\tHH:mm:ss'));
console.log("hello");
console.log(uuid());
console.log(uuid());
console.log("Hello I am bunny");