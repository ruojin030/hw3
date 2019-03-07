var express = require('express');
var path = require('path');
var logger = require('morgan');
var amqp = require('amqplib/callback_api');
var longpoll = require("express-longpoll")
var port = 80


var app = express()

amqp = require('amqplib/callback_api')

var lis = require("./routes/listen")
var speak = require('./routes/speak')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/listen', lis)
app.use('/speak',speak)
app.post('/',function(req, res){
    res.send("OK")
})

app.listen(port);


module.exports = app;