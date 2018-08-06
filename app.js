const createError = require('http-errors');

const express = require('express');

const path = require('path');

const cookieParser = require('cookie-parser');

const logger = require('morgan');

const bodyParser = require('body-parser');

let login = require('./routes/login');

let user = require('./routes/user');

let journey = require('./routes/journey');

let busRoute = require('./routes/busRoute');

let journeyRoute = require('./routes/journey-route');

let busStop = require('./routes/busStop');

let app = express();


//Set up mongoose connection
let mongoose = require('mongoose');

let mongoDB = 'mongodb://127.0.0.1:27017/BRSA';

mongoose.connect(mongoDB);

mongoose.Promise = global.Promise;

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'pug');

app.use(logger('dev'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/login', login);

app.use('/user', user);

app.use('/journey', journey);

app.use('/busRoute', busRoute);

app.use('/journeyRoute', journeyRoute);

app.use('/busStop', busStop);

// catch 404 and forward to error handler
app.use(function(req, res, next)
{
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next)
{
  // set locals, only providing error in development
  res.locals.message = err.message;

  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);

  res.render('error');
});

module.exports = app;
