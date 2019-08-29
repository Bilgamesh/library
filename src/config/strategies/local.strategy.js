const passport = require('passport');
const { Strategy } = require('passport-local');
const { compare } = require('bcrypt');
const debug = require('debug')('app:local.strategy');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const util = require('util');

const localStrategy = () => {
  passport.use(new Strategy({ usernameField: 'username', passwordField: 'password' }, async (username, password, done) => {
      try {
        query = { username };
        const user = await util.promisify(User.findOne.bind(User))(query);
        const credentailsValid = user !== null && await compare(password, user.password);
        if (credentailsValid) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (err) {
        debug(err.stack);
      }
      client.close();
  }));
};
module.exports = localStrategy;
