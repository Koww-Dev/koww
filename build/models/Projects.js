"use strict";

const mongoose = require('../database');

const ProjecSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  idProject: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  technologies: [{
    type: String,
    required: true
  }],
  description: {
    type: String,
    required: true
  },
  participantsId: [{
    type: String,
    ref: 'User'
  }],
  idDocumentProject: {
    type: String
  },
  idVideoCall: {
    type: String,
    required: true
  },
  idChat: {
    type: String,
    required: true
  }
});
const Project = mongoose.model('Projects', ProjecSchema);
module.exports = Project;