const debug = require('debug')('app:auth-controller');
const passport = require('passport');
const { hash, genSalt } = require('bcrypt');

const authController = (User, nav) => {
  const getSignInPage = (req, res) => {
    res.render('signin', { nav, title: 'Sign In' });
  };

  const authenticateLocal = () => passport.authenticate('local', { successRedirect: '/auth/profile/', failureRedirect: '/' });

  const signOut = (req, res) => {
    debug('signing out');
    req.logout();
    res.redirect('/');
  };

  const createAccount = async (req, res) => {
    debug(req.body);
    try {
      const salt = await genSalt(16);
      const password = await hash(req.body.password, salt);
      const user = new User({ username: req.body.username, password });
      debug(user);
      user.save();
      req.login(user, () => {
        res.end();
        res.redirect('/auth/profile/');
      });
    } catch (err) {
      debug(err);
    }
  };

  const middleware = (req, res, next) => {
    if (req.user) { next(); } else { res.redirect('/'); }
  };

  const displayProfile = (req, res) => {
    res.json(req.user);
  };

  return {
    getSignInPage,
    authenticateLocal: authenticateLocal(),
    signOut,
    createAccount,
    middleware,
    displayProfile,
  };
};

module.exports = authController;
