const mongoose = require('../database');

const VideoCallSchema = new mongoose.Schema({
  offer: [{ type: String }],
  
  answer: [{ type: String }],

  iceCandidate: [{ type: String }],
  
  idVideoCall: {
    type: String,
  }
});

const VideoCall = mongoose.model('VideoCall', UserSchema);

module.exports = User;