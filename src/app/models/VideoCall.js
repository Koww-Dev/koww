import mongoose from '../../database';

const VideoCallSchema = new mongoose.Schema({
  offer: [{ type: String }],

  answer: [{ type: String }],

  iceCandidate: [{ type: String }],

  idVideoCall: {
    type: String,
  },

  idProject: {
    type: String,
    required: true,
  },
});

const VideoCall = mongoose.model('VideoCall', VideoCallSchema);

export default VideoCall;
