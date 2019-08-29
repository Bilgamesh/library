const debug = require('debug')('app:book-controller');
const util = require('util');

const bookController = (Book, bookService, nav) => {
  const middleware = (req, res, next) => {
    if (req.user) { next(); } else { res.redirect('/'); }
  };

  const getIndex = async (req, res) => {
    let client;
    try {
      const books = await util.promisify(Book.find.bind(Book))();
      for (let book of books) {
        book.details = await bookService.getBookById(book.bookId);
      }
      const title = 'Books';
      res.render('book-list-view', {
        nav, books, title, loggedIn: res.locals.loggedIn,
      });
    } catch (err) {
      debug(err.stack);
    }
    client.close();
  };

  const getById = async (req, res) => {
    try {
      const { id } = req.params;
      const book = await util.promisify(Book.findById.bind(Book))(id);
      const { title } = book;
      book.details = await bookService.getBookById(book.bookId);
      res.render('book-view', {
        nav, book, title, loggedIn: res.locals.loggedIn,
      });
    } catch (err) {
      debug(err.stack);
    }
    client.close();
  };

  return {
    getIndex,
    getById,
    middleware,
  };
};

module.exports = bookController;
