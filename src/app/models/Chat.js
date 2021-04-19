import mongoose from '../../database';

const ChatSchema = new mongoose.Schema({
  idChat: {
    type: String,
    required: true,
  },

  idProject: {
    type: String,
    required: true,
  },

  message: [
    {
      idEmail: {
        type: String,
        required: true,
      },

      name: {
        type: String,
        required: true,
      },

      textMessage: {
        type: String,
        required: true,
      },

      dataTime: {
        date: {
          type: String,
          required: true,
        },
        time: {
          type: String,
          required: true,
        },
      },
    },
  ],
});

const Chat = mongoose.model('Chat', ChatSchema);

export default Chat;
