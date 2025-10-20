var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Panggil file koneksi database
require("./app_toko_online/models/db")


// Perbaikan Ke Dua
var indexRouter = require('./app_toko_online/routes/index'); 
var usersRouter = require('./app_toko_online/routes/users');
var productRouter = require("./app_toko_online/routes/product"); // letakan di atas agar rapi
var engine = require('ejs-blocks'); // menggunakan ejs blocks
var app = express();
var apiProductRouter = require("./app_toko_online/routes/api/product");
var apiUserRouter = require("./app_toko_online/routes/api/user");
var apiOrderRouter = require("./app_toko_online/routes/api/order");

// view engine setup
app.set('views', path.join(__dirname, './app_toko_online', 'views')); // Perbaikan Satu
app.engine('ejs', engine); //daftarkan engine ejs blocks
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Serving bootstrap
app.use(
  '/bootstrap',
  express.static(path.join(__dirname, 'node_modules/bootstrap/dist'))
);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/product", productRouter);
app.use("/api/produk", apiProductRouter); // daftarkan route api
app.use("/api/user", apiUserRouter);
app.use("/api/order", apiOrderRouter);

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
  res.render('error');
});



module.exports = app;
