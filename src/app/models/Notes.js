import mongoose from '../../database';

const NotesSchema = new mongoose.Schema({
  projectsId: {
    type: String,
    required: true,
  },

  name: {
    type: String,
  },

  notes: {
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

const Notes = mongoose.model('Notes', NotesSchema);

export default Notes;
