import mongoose from '../../database';

const ProjecSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },

  idProject: {
    type: String,
    required: true,
    unique: true,
  },

  name: {
    type: String,
    required: true,
  },

  technologies: [{ type: String, required: true }],

  description: {
    type: String,
    required: true,
  },

  participantsId: [{
    type: String,
    ref: 'User',
    unique: true,
  }],

  idDocumentProject: {
    type: String,
  },

  idVideoCall: {
    type: String,
    required: true,
  },

  idChat: {
    type: String,
    required: true,
  },
});

const Project = mongoose.model('Projects', ProjecSchema);

export default Project;
