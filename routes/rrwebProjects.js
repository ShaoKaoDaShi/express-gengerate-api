var express = require('express')
var router = express.Router()
var RrwebProject = require('../db/Model/rrwebProject')
var { v4 } = require('uuid')

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

module.exports = router
