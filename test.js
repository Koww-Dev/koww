const User = require('./models/User');
const Project = require('./models/Projects')

// User.create({
//   email: 'Kevson',
//   userName: 'kevson123',
//   idKow: '321649875654',
//   password: '12341234',
//   name: 'Kevson Filipe'
// })
//   .then((response) => console.log(response, '1'))
//   .then(() => User.db.close())
//   .catch(error => console.log(error))

Project.create({
  userId: 'Kevson',
  idProject: '128374128734128734axczxc',
  name: 'Hello World',
  technologies: [
    'javascript',
    'react'
  ],
  description: 'sldkflsdknflk'
}).then((response) => console.log(response, '1'))
  .then(() => User.db.close())
  .catch(error => console.log(error))