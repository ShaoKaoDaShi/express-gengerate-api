import express from 'express'
var router = express.Router()
import store from '../store'
/* GET users listing. */
router.post('/', function (req, res, next) {
    const { username } = req.body || {}
    if (username === 'vue') {
        return res.send({ menuList: [store.vue, store.rrweb, store.main, store.uploadSourceMap] })
    }
    if (username === 'react') {
        return res.send({ menuList: [store.react, store.rrweb, store.uploadSourceMap] })
    }

    if (username === 'admin') {
        return res.send({ menuList: [store.react, store.vue, store.rrweb, store.main, store.errorDashboard, store.uploadSourceMap] })
    }
    res.send({ menuList: [] })
})

export default router
