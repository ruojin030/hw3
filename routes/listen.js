var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();



router.post('/listen',function(req, res){
    var key = req.body.key
    var ex = 'hw3'
    console.log(key)
    amqp.connect('amqp://localhost', function(err, conn) {
        conn.createChannel(function(err, ch){
            if(err){
                return req.send("error")
            }
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



module.exports = router;