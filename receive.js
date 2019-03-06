#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var qu = 'hello';
    var ex = 'ex';

    ch.assertExchange(ex, 'direct', {durable:false})
    ch.assertQueue(qu, function (err,q){
      console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
      ch.bindQueue(q.queue, ex, qu);

      ch.consume(q, function(msg) {
        console.log(" [x] Received %s", msg.content.toString());
      }, {noAck: true});
    });
    
  });
});
