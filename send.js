#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var ex = 'ex';
    var q = 'hello';
    var msg = 'Hello World!';
    
    ch.assertExchange(ex, 'direct', {durable:false})
    ch.assertQueue(q, {durable: false});
    ch.sendToQueue(q, Buffer.from(msg));
    console.log(" [x] Sent %s", msg);
  });
  setTimeout(function() { conn.close(); process.exit(0) }, 500);
});
