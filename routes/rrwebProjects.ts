import express from 'express'
var router = express.Router()
import RrwebProject from '../db/Model/rrwebProject'
import { v4 } from 'uuid'
import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'sourcemaps/') // 上传文件的目标目录
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) // 上传文件的文件名
    },
})

const upload = multer({ storage: storage })

/* GET home page. */
router.post('/getAll', async function (req, res, next) {
    const userId = req.body.userId
    const projects = await RrwebProject.find({ userId: userId })
    res.send(projects)
})

router.post('/addOne', async function (req, res, next) {
    const { projectName, url, userId } = req.body
    await RrwebProject.insertMany({ projectName: projectName, projectId: v4(), dingDingBot: { url }, userId })
    res.send({ status: 'ok' })
})

router.post('/updateOne', async function (req, res, next) {
    const { projectName, url, projectId } = req.body
    const result = await RrwebProject.updateOne({ projectId: projectId }, { projectName: projectName, dingDingBot: { url } })
    res.send({ status: 'ok' })
})

router.post('/uploadSourceMap', upload.single('file'), async function (req, res, next) {
    console.log('upload')
    console.log('ok')
    // const result = await RrwebProject.updateOne({ projectId: projectId }, { projectName: projectName, dingDingBot: { url } })
    res.send({ status: 'ok' })
})

export default router
