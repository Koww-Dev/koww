const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://kowworking:GY4mYTl0Si3chek5@kowworking-tests.wxksg.mongodb.net/Kowworking-tests?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: false });
mongoose.Promise = global.Promise;

module.exports = mongoose;
