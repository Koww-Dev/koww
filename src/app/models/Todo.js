import mongoose from '../../database';

const TodoSchema = new mongoose.Schema({
  projectsId: {
    type: String,
    required: true,
  },

  name: {
    type: String,
  },

  Todo: {
    time: {
      type: Number,
    },

    blocks: [
      {
        typeEditor: {
          type: String,
        },

        data: {
          text: {
            type: String,
          },
          level: {
            type: Number,
          },
          style: {
            type: String,
          },
          items: [{ type: String }],
        },
      },
    ],
    version: {
      type: String,
    },
  },
});

const Todo = mongoose.model('Todo', TodoSchema);

export default Todo;
