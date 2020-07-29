const createError = require('http-errors'),
  express = require('express'),
  logger = require('morgan'),
  mongoose = require('mongoose'),
  fs = require('fs'),
  fileUpload = require('express-fileupload'),
  path = require('path');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/authRoute');
let adminRouter = require('./routes/admin/adminRouter');
let userRouter = require('./routes/usersRoute');
let orderRouter = require('./routes/orderRoute');
let distanceRouter = require('./routes/distance');
let dashboardRouter = require('./routes/dashboard');

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

// cors
app.use('*', (req, res, next) => {
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

app.use('/resources', express.static(path.join(__dirname, 'uploads'), {
  etag: true,
  lastModified: true,
  setHeaders: (res, path) => {
    res.setHeader('Cache-Control', 'max-age=604800')
  }
}));

// app.use(express.static('uploads'));
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: './temp/'
}));


// app.use((req, res, next) => authorizationMiddleware(req, res, next));
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.post('/upload', (req, res) => uploadFile(req, res));
app.use('/users', userRouter);
app.use('/orders', orderRouter);
app.use('/distance', distanceRouter);
app.use('/dashboard', dashboardRouter);

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
