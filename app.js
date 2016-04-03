
var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session');

require('./include/xframe.js');

var router = require(ROOT_DIR+'/include/routes.js')({verbose:true}),
    app = express();


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: '123455'
}));
app.use(express.static(path.join(__dirname, 'public')));
//route to different kind of subApp;
app.use(function(req, res, next){
  //console.log(path.join(__dirname, 'public'));
  //console.log(req.body);
  //TEST
  next();
});
//init all control route
app.use(router);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json(err);
    /*res.render('error', {
      message: err.message,
      error: err
    });*/
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.end('topAppPro');
  /*res.render('error', {
    message: err.message,
    error: {}
  });*/
});


module.exports = app;
