const { addHours } = require('date-fns')
const time = addHours(new Date(), -2);
console.log(time.toString());