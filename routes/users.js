var express = require('express')
var router = express.Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
  if (req.body) {
    console.log('🚀 ~ file: users.js:7 ~ router.get ~ req.body:', req.body)
  }
  // res.setHeader('Content-Type', 'application/json')
  console.log('get')
  // res.json({data:'ok'})
  res.send({ status: 'ok' })
}).post('/', function (req, res, next) {
  if (req.body) {
    console.log('🚀 ~ file: users.js:7 ~ router.get ~ req.body:', req.body)
  }
  // res.setHeader('Content-Type', 'application/json')
  console.log('post')
  // res.json({data:'ok'})
  res.send({ status: 'ok' })
})

module.exports = router
