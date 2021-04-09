const mongoose = require('../database');

const ProjecSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },

  idProject: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  technologies: [{ type: String, required: true, }],

  description: {
    type: String,
    required: true,
  },

  participantsId: [{
    type: String,
    ref: 'User', 
  }],
});

const Project = mongoose.model('Projects', ProjecSchema);

module.exports = Project;