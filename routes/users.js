var express = require('express')
var router = express.Router()
const uuid = require('uuid')
const User = require('../db/Model/user')
const store = require('../store')
const jwt = require('jsonwebtoken')
/* GET users listing. */
router
  .post('/login', async function (req, res, next) {
    const { username, password } = req.body
    const users = await User.find({ username, password })
    if (users.length) {
      const { username, password, id } = users[0]
      var token = jwt.sign({ username, password, id }, 'gigibo', { expiresIn: 60 * 60 })
      res.cookie('access_token', token)
      return res.send({ menuList: [store.react, store.vue, store.rrweb, store.main, store.errorDashboard] })
    } else {
      res.send({ errMsg: '用户名或密码错误' })
    }
  })
  .post('/register', async function (req, res, next) {
    const { username, password } = req.body
    const userId = uuid.v4()
    const isExist = (await User.find({ username })).length
    if (isExist) {
      res.send({ errMsg: '用户名已存在' })
    } else {
      const userInfo = { username, password, id: userId }
      var token = jwt.sign(userInfo, 'gigibo', { expiresIn: 60 * 60 })
      res.cookie('access_token', token)
      User.insertMany({ ...userInfo })
      return res.send({ menuList: [store.react, store.vue, store.rrweb, store.main, store.errorDashboard] })
    }
  })

module.exports = router
