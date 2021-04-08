// const mongoose = require('mongoose');

// mongoose.connect('mongodb+srv://kowworking:123456789$@cluster0.wxksg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { 
//   useNewUrlParser: true, useUnifiedTopology: true
// }).then(() => {
//     console.log("Conectado")
// }).catch((err) => {
//     console.log("error" + err)
// })

const User = require('./models/User');

const email = 'ayrton@gmail.com'

User.create({
  email,
  idKow: 'skudhgfshdbffghjghjg',
  password: 'sdhfbsdhfbsd',
  name: 'allam',
  userName: 'jsdkjfnbsjkdbf',
}).then((response) => {
  console.log(response);
}).catch((error) => {
  console.log(error)
})

User.findOne({ email }).select('+password')