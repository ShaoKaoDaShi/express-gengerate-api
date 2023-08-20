var express = require('express')
var router = express.Router()
var store = require('../store')
/* GET users listing. */
router.post('/', function (req, res, next) {
  const { username } = req.body || {}
  res.cookie('access_token', 'hahaha').cookie("username", username)
  // res.cookie('access_token', 'hahaha')

  if (username === 'vue') {
    return res.send({ menuList: [store.vue] })
  }
  if (username === 'react') {
    return res.send({ menuList: [store.react] })
  }

  if (username === 'admin') {
    return res.send({ menuList: [store.react, store.vue] })
  }
  res.send({menuList:[]})
})

module.exports = router
