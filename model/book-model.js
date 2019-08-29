const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookModel = new Schema(
  {
    title: { type: String },
    author: { type: String },
    genre: { type: String },
    read: { type: Boolean, default: true },
    bookId: { type: Number },
  },
);
module.exports = mongoose.model('Book', bookModel);
