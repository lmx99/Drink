var express = require('express');
var app = express();



var routes = require('./include/routes.js');
app.use(routes);

module.exports = app;