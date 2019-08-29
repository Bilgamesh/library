const express = require('express');
const bookController = require('../controllers/book-controller');
const bookService = require('../services/goodreads-service');

const bookRouter = express.Router();

const router = (Book, nav) => {
  const { getIndex, getById, middleware } = bookController(Book, bookService, nav);

  bookRouter.use(middleware);

  bookRouter.route('/').get(getIndex);

  bookRouter.route('/:id/').get(getById);

  return bookRouter;
};
module.exports = router;
