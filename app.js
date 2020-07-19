const createError = require('http-errors'),
  express = require('express'),
  logger = require('morgan'),
  mongoose = require('mongoose'),
  fs = require('fs'),
  fileUpload = require('express-fileupload'),
  { authorizationMiddleware } = require('./controllers/Middleware');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/authRoute');
let adminRouter = require('./routes/admin/adminRouter');
const { uploadFile } = require('./controllers/UploadController');

var app = express();

const DB_PASSWORD = 'moulik123';
const DB_NAME = 'laundry';
const DB_HOST_NAME = 'c1ph3r';
const server = `mongodb+srv://${DB_HOST_NAME}:${DB_PASSWORD}@laundry.3m5pn.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

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

if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

if (!fs.existsSync('./temp')) {
  fs.mkdirSync('./temp');
}

app.use(express.static('uploads'));
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: './temp/'
}));

// app.use((req, res, next) => authorizationMiddleware(req, res, next));
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.post('/upload', (req, res) => uploadFile(req, res));

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
