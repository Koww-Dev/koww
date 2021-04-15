"use strict";

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://kowworking:123456789$@cluster0.wxksg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: false
});
mongoose.Promise = global.Promise;
module.exports = mongoose;