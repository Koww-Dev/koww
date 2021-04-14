const mongoose = require('../database');

const DocumentProjectSchema = new mongoose.Schema({
  idDocument: {
    type: String,
    required: true
  },

  wiki: {
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
          items: [{ type: String }]
        }
      }
    ],
    version: {
      type: String
    }
  },

  Roadmap: {
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
          items: [{ type: String }]
        }
      }
    ],
    version: {
      type: String
    }
  },

  ToDo : [
    {
      type: String,
    }
  ],

  Documentation: {
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
          items: [{ type: String }]
        }
      }
    ],
    version: {
      type: String
    }
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
          items: [{ type: String }]
        }
      }
    ],
    version: {
      type: String
    }
  }
});

const DocumentProject = mongoose.model('Projects', DocumentProjectSchema);

module.exports = User;