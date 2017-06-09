// var express = require('express');
//
// // Create our app
// var app = express();
// const PORT = process.env.PORT || 3000;
//
// app.use(function (req, res, next){
//   if (req.headers['x-forwarded-proto'] === 'https') {
//     res.redirect('http://' + req.hostname + req.url);
//   } else {
//     next();
//   }
// });
//
// app.use(express.static('client'));
//
// app.listen(PORT, function () {
//   console.log('Express server is up on port ' + PORT);
// });


var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var router = require('./routes/router');
var users = require('./routes/users');

var app = express();
app.set('PORT',process.env.PORT || 3000);
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

//
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(function (req, res, next){
  if (req.headers['x-forwarded-proto'] === 'https') {
    res.redirect('http://' + req.hostname + req.url);
  } else {
    next();
  }
});
app.use(express.static(path.join(__dirname, 'client')));

app.use('/', router);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('PORT'),function(req,res){
	console.log("listening to port "+ app.get('PORT'));
});

module.exports = app;
