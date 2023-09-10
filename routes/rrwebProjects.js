var express = require('express')
var router = express.Router()
var RrwebProject = require('../db/Model/rrwebProject')
var { v4 } = require('uuid')

/* GET home page. */
router.post('/getAll', async function (req, res, next) {
  const userId = req.body.userId
  console.log(userId)
  const projects = await RrwebProject.find({ userId: userId })
  console.log(projects)
  res.send(projects)
})

router.post('/addOne', async function (req, res, next) {
  // const projects = await RrwebProject.find()
  const { projectName, url, userId } = req.body
  // console.log(req.body)
  await RrwebProject.insertMany({ projectName: projectName, projectId: v4(), dingDingBot: { url }, userId })
  res.send({ status: 'ok' })
})

router.post('/updateOne', async function (req, res, next) {
  const { projectName, url, projectId } = req.body
  console.log('🚀 ~ file: rrwebProjects.js:25 ~ projectId:', projectId)
  console.log(url)
  const result = await RrwebProject.updateOne({ projectId: projectId }, { projectName: projectName, dingDingBot: { url } })
  console.log('🚀 ~ file: rrwebProjects.js:27 ~ result:', result)

  res.send({ status: 'ok' })
})

module.exports = router
