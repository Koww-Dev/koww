"use strict";

const mongoose = require('../database');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  userName: {
    type: String,
    required: true,
    unique: true
  },
  idKow: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  name: {
    type: String,
    required: true
  },
  github: {
    type: String
  },
  cep: {
    type: String
  },
  tecnologias: [{
    type: String
  }],
  isPremiun: {
    type: Boolean,
    default: false
  },
  idProject: [{
    type: String,
    required: true
  }]
});
const User = mongoose.model('User', UserSchema);
module.exports = User;