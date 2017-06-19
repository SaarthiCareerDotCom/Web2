var express = require('express');
var constants = require('../common/constants');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var api = require('./routes/api');

// Create our app
var app = express();
app.set('PORT', process.env.PORT || constants.PORT);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'client')));

app.use('/api', api);

app.use(function (req, res, next){
  if (req.headers['x-forwarded-proto'] === 'https') {
    res.redirect('http://' + req.hostname + req.url);
  } else {
    next();
  }
});

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
  res.send({'message':err.message,'error':err});
});

app.listen(app.get('PORT'), function () {
  console.log('Express server is up on port ' + app.get('PORT'));
});
