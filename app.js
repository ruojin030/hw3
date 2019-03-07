var express = require('express');
var path = require('path');
var logger = require('morgan');
var amqp = require('amqplib/callback_api');
var longpoll = require("express-longpoll")
var port = 80


var app = express()

amqp = require('amqplib/callback_api')


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/listen',function(req, res){
    var key = JSON.parse(req.body.key)
    var ex = 'hw3'
    amqp.connect('amqp://localhost', function(err, conn) {
        conn.createChannel(function(err, ch){
            ch.assertExchange(ex, 'direct', {durable:false})
            console.log("Waiting for logs")
            console.log("Key arr is "+key)
            ch.assertQueue('',{exclusive:true},function(err,q){
                for(i = 0; i<key.length;i++){
                    ch.bindQueue(q.queue, ex, key[i]);
                    console.log('key is '+key[i]);
                }
                ch.consume(q.queue, function(msg){
                    console.log(" [x] %s: '%s'", msg.fields.routingKey, msg.content.toString());
                    res.send({'msg':msg})
                },{noAck:true})
            });
        });    
   });
});

app.post('/speak',function(req,res){
    var key = req.body.key
    var msg = req.body.msg
    amqp.connect('amqp://localhost', function(err, conn) {
    conn.createChannel(function(err, ch) {
    var ex = 'hw3';
    var m = msg

    ch.assertExchange(ex, 'direct', {durable: false});
    ch.publish(ex, key,m);
    console.log(" [x] Sent %s: '%s'", key, m);
  });

  setTimeout(function() { conn.close(); process.exit(0) }, 500);
});
})

app.listen(port);


module.exports = app;