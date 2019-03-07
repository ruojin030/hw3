var express = require('express');
var path = require('path');
var logger = require('morgan');

var app = express()
var listen = require('./routes/listen')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/listen', listen)


module.exports = app;