var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
const path = require('path');

router.post('/',function(req,res){
    res.send("OK")
});



module.exports = router;
