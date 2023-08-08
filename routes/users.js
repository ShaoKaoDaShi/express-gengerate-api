var express = require('express')
var router = express.Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
  if (req.body) {
    console.log('🚀 ~ file: users.js:7 ~ router.get ~ req.body:', req.body, req.params, req.query, req.headers.authorization,req.cookies
    )
  }
  console.log('get')
  res.send({ status: 'ok' })
}).post('/', function (req, res, next) {
  if (req.body) {
    console.log('🚀 ~ file: users.js:7 ~ router.post ~ req.body:', req.body, req.params, req.query,req.headers.authorization,req.cookies)
  }
  console.log('post')
  res.send({ status: 'ok' })
})

module.exports = router
