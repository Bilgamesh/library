const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const User = require('./model/user-model');
const Book = require('./model/book-model');

const app = express();

const defaultPort = 3000;
mongoose.connect('mongodb://localhost/libraryApp');

const port = process.env.PORT || defaultPort;

const nav = [
  { link: '/books/', title: 'Books' }, { link: '/authors/', title: 'Authors' },
];

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'library' }));
app.use('/css', express.static(path.join(__dirname, '/public/css')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

require('./src/config/passport.js')(app);

const adminRouter = require('./src/routes/admin-routes')();
const bookRouter = require('./src/routes/book-routes')(Book, nav);
const authRouter = require('./src/routes/auth-routes')(User, nav);

app.use((req, res, next) => {
  if (req.user) {
    res.locals.loggedIn = true;
  } else {
    res.locals.loggedIn = false;
  }
  next();
});

app.use('/books/', bookRouter);
app.use('/admin/', adminRouter);
app.use('/auth/', authRouter);

app.get('/', (req, res) => {
  res.render('index', { nav, title: 'Library', loggedIn: res.locals.loggedIn });
});

app.listen(port, () => {
  debug(`Server is running on port ${chalk.green(port)}`);
});
