var express = require('express')
var router = express.Router()

/* GET users listing. */
router.post('/', function (req, res, next) {
  if (req.body) {
    console.log('🚀 ~ file: users.js:7 ~ router.post ~ req.body:', req.body, req.params, req.query,req.headers.authorization,req.cookies)
  }
  console.log('post')
  res.send({ status: 'ok111332211' })
})

module.exports = router
