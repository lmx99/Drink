var express = require('express');
var app = express();



var routes = require('./include/routes');
app.use(function (req,res,next) {
	console.log(req.params[0]);
	console.log('finance');
});

module.exports = app;