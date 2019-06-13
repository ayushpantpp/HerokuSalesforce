var express = require('express');
var path = require('path');
var herokuConn = require('./routes/heroku-connect');
var salesForceConn =  require('./routes/salesforce-connect')
var logger = require('morgan');
var bodyParser = require('body-parser');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
global.BaseUrl="http://localhost:3000";
app.use('/heroku',herokuConn);
app.use('/salesforce',salesForceConn)

module.exports = app;
