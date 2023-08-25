var express = require('express');
var router = express.Router();
let RrwebEvents = require("../db/Model/rrwebEvents")

/* GET home page. */
router.post('/save', function(req, res, next) {
  const error = req.body
  RrwebEvents.insertMany(error)
  res.send({ok:true})
});

router.post('/get', function(req, res, next) {
  RrwebEvents.find({}).then((values)=>{
    console.log(values)
    res.send(values)
  })

});

module.exports = router;
