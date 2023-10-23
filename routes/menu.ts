import express from 'express'
var router = express.Router()
import store from '../store'
/* GET users listing. */
router.post('/', function (req, res, next) {
    if (req.body) {
        console.log('🚀 ~ file: users.js:7 ~ router.post ~ req.body:', req.body, req.params, req.query, req.headers.authorization, req.cookies)
    }
    const { username } = req.body || {}
    if (username === 'vue') {
        return res.send({ menuList: [store.vue, store.rrweb, store.main, store.errorDashboard, store.uploadSourceMap] })
    }
    if (username === 'react') {
        return res.send({ menuList: [store.react, store.rrweb, store.errorDashboard, store.uploadSourceMap] })
    }

    if (username === 'admin') {
        const arr = []
        for (let [key, value] of Object.entries(store)) {
            arr.push(value)
        }
        console.log(arr)
        return res.send({
            menuList: arr,
        })
    }
    res.send({ menuList: [] })
})

export default router
