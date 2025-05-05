const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  resume: {
    type: String,
    required: false,
  },

  genre: {
    type: String,
    enum: ['novela', 'poesía', 'ensayo'],
    required: true,
  },

  publication: {
    type: Date,
    required: true,
  },

  available: {
    type: Boolean,
    required: true,
  },
});

const bookModel = mongoose.model('bookModel', BookSchema);

module.exports = bookModel;
