var express = require('express');
var path = require('path');
var logger = require('morgan');
var port = 80


var app = express()
var listens = require('./routes/listen')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/listen', listens)
app.listen(port)

module.exports = app;