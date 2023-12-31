import express from 'express'
var router = express.Router()
import uuid from 'uuid'
import User from '../db/Model/user'
import store from '../store'
import jwt from 'jsonwebtoken'
/* GET users listing. */
router
    .post('/login', async function (req, res, next) {
        const { username, password } = req.body
        const users = await User.find({ username, password })
        if (users.length) {
            const { username, password, id } = users[0]
            var token = jwt.sign({ username, password, id }, 'gigibo', { expiresIn: 60 * 60 * 24 * 7 })
            res.cookie('access_token', token)
            res.cookie('userId', id)
            res.cookie('username', username)
            return res.send('ok')
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
            console.log('userInfo', userInfo)
            var token = jwt.sign(userInfo, 'gigibo', { expiresIn: 60 * 60 * 24 * 7 })
            res.cookie('access_token', token)
            res.cookie('userId', userId)
            res.cookie('username', username)
            await User.insertMany(userInfo)
            return res.send('ok')
        }
    })

export default router
