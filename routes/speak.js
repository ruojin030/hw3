var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();



router.post('/speak',function(req,res){
    var key = req.body.key
    var msg = req.body.msg
    console.log("key is "+ key +" msg is "+ msg)

    amqp.connect('amqp://localhost', function(err, conn) {
    conn.createChannel(function(err, ch) {
    var ex = 'hw3';

    ch.assertExchange(ex, 'direct', {durable: false});
    ch.publish(ex, key,new Buffer(msg));
    console.log(" [x] Sent %s: '%s'", key, msg);
  });

  setTimeout(function() { conn.close(); process.exit(0) }, 500);
});
})


module.exports = router;
