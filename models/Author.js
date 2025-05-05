const mongoose = require('mongoose');
const { Schema } = mongoose;

const AuthorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: false,
  },

  birthDate: {
    type: Date,
    required: true,
  },

  nacionality: {
    type: String,
    required: true,
  },

  Books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: false,
    },
  ],
});

const authorModel = mongoose.model('authorModel', AuthorSchema);

module.exports = authorModel;
