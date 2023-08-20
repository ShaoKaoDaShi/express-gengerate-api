var express = require('express')
var router = express.Router()
var store = require('../store')
/* GET users listing. */
router.post('/', function (req, res, next) {
  if (req.body) {
    console.log('🚀 ~ file: users.js:7 ~ router.post ~ req.body:', req.body, req.params, req.query, req.headers.authorization, req.cookies)
  }
  const { username } = req.body || {}
  if (username === 'vue') {
    return res.send({ menuList: [store.vue] })
  }
  if (username === 'react') {
    return res.send({ menuList: [store.react] })
  }

  if (username === 'admin') {
    return res.send({ menuList: [store.react, store.vue] })
    // return res.send({ menuList: [{ key: 'home' }, { key: 'reactLogo' }, { key: 'antLogo' }] })

  }
  res.send({ menuList: [] })
})

module.exports = router