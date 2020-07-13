var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
const mongoose = require('mongoose');
var fs = require('fs');
const fileUpload = require('express-fileupload');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/registerRouter');
var loginRouter = require('./routes/loginRouter');
var offerRouter = require('./routes/admin/offerRouter');
var blogRouter = require('./routes/admin/blogRouter');
var sliderRouter = require('./routes/admin/dashboardRouter');
var authRouter = require('./routes/authRoute');
let productRouter = require('./routes/admin/productRoute');
let serviceRouter = require('./routes/admin/servicesRoute');
let adminRouter = require('./routes/admin/adminRouter')
var app = express();

const DB_PASSWORD = 'moulik123';
const DB_NAME = 'laundry';
const DB_HOST_NAME = 'c1ph3r';
const server = `mongodb+srv://${DB_HOST_NAME}:${DB_PASSWORD}@laundry.3m5pn.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
// const uri = `mongodb://${DB_HOST_NAME}:${DB_PASSWORD}@laundry.3m5pn.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(server, { useNewUrlParser: true }, () => {
  console.log("DB Connected");
}).catch((error) => {
  console.log(error);
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  // Allowed headers
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Content-Type", "application/json");

  // Allowed request methods
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE"
  );
  next();
});

// if (!fs.existsSync('./uploads')) {
//   fs.mkdirSync('./uploads');
// }

// if (!fs.existsSync('./temp')) {
//   fs.mkdirSync('./temp');
// }

// app.use(express.static('uploads'));
// app.use(fileUpload({
//   useTempFiles: true,
//   tempFileDir: './temp/'
// }));

// function getAccessTokenFromHeader(request) {
//   const authorizationHeader = request.headers.authorization;
//   let token;
//   if (authorizationHeader) {
//     token = request.headers.authorization.split(' ')[1];
//   }
//   return token;
// }

// function authorizationMiddleware(request, response, nextHandler) {
//   const accessToken = getAccessTokenFromHeader(request);

//   try {
//     const tokenPayload = jwt.verify(accessToken, JWT_SECRET_KEY);
//     if (tokenPayload.type !== 'access') {
//       throw new Error('wrong token type');
//     }
//     console.log(tokenPayload);
//     response.locals.user = tokenPayload;
//     nextHandler();
//   } catch (error) {
//     response.status(401).send(error.message);
//   }
// }

// app.use(function (request, response, nextHandler) {
//   const accessToken = getAccessTokenFromHeader(request);

//   try {
//     const tokenPayload = jwt.verify(accessToken, JWT_SECRET_KEY);
//     if (tokenPayload.type !== 'access') {
//       throw new Error('wrong token type');
//     }
//     console.log(tokenPayload);
//     response.locals.user = tokenPayload;
//     nextHandler();
//   } catch (error) {
//     response.status(401).send(error.message);
//   };
// });


app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
// app.use('/admin/offer', offerRouter);
// app.use('/admin/blog', blogRouter);
// app.use('/admin/upload', sliderRouter);
app.use('/auth', authRouter);
// app.use('/product', productRouter);
// app.use('/services', serviceRouter);
app.use('/admin', adminRouter);

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
