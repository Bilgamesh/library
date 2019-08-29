const debug = require('debug')('app:admin-routes');
const mongoose = require('mongoose');
const Book = mongoose.model('Book');

const adminController = () => {
  const books = [
    {
      title: 'War and Peace',
      genre: 'Historical Fiction',
      author: 'Lev Tolstoy',
      bookId: 656,
      read: false,
    },
    {
      title: 'Holy Bible',
      genre: 'Religion',
      author: 'God',
      bookId: 1923820,
      read: false,
    },
    {
      title: 'Time Machine',
      genre: 'Science Fiction',
      author: 'H. G. Wells',
      bookId: 2493,
      read: false,
    },
  ];

  const addBooksToDb = async (req, res) => {
    try {
      await Book.collection.insert(books);
      return res.json(response);
    } catch (err) {
      debug(err.stack);
    }
    client.close();
  };

  return {
    addBooksToDb,
  };
};
module.exports = adminController;
