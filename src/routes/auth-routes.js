const express = require('express');

const authController = require('../controllers/auth-controller');

const authRouter = express.Router();

const router = (User, nav) => {
  const {
    getSignInPage, authenticateLocal, signOut, createAccount, middleware, displayProfile,
  } = authController(User, nav);

  authRouter.route('/signIn/').get(getSignInPage);

  authRouter.route('/signIn/').post(authenticateLocal);

  authRouter.route('/signOut/').get(signOut);

  authRouter.route('/signUp/').post(createAccount);

  authRouter.route('/profile/').all(middleware);

  authRouter.route('/profile/').get(displayProfile);

  return authRouter;
};

module.exports = router;
