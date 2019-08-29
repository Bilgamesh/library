const express = require('express');

const adminController = require('../controllers/admin-controller');

const adminRouter = express.Router();

const router = () => {
  const { addBooksToDb } = adminController();

  adminRouter.route('/').get(addBooksToDb);
  return adminRouter;
};
module.exports = router;
