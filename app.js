var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/registerRouter');
var loginRouter = require('./routes/loginRouter');
var offerRouter = require('./routes/admin/offerRouter');
var blogRouter = require('./routes/admin/blogRouter');
var sliderRouter = require('./routes/admin/dashboardRouter');
var app = express();

const DB_PASSWORD = 'moulik123';
const DB_NAME = 'laundry';
const DB_HOST_NAME = 'c1ph3r';
const server = `mongodb+srv://c1ph3r:${DB_PASSWORD}@laundry.3m5pn.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
// const uri = `mongodb://${DB_HOST_NAME}:${DB_PASSWORD}@laundry.3m5pn.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(server, { useNewUrlParser: true }, () => {
  console.log("DB Connected");
}).catch((error) => {
  console.log(error);
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/admin/offer', offerRouter);
app.use('/admin/blog', blogRouter);
app.use('/admin/slider', sliderRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
});

module.exports = app;
