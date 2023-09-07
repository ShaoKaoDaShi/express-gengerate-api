var express = require('express')
var router = express.Router()
var RrwebProject = require('../db/Model/rrwebProject')
var {v4} = require('uuid')

/* GET home page. */
router.post('/getAll', async function (req, res, next) {
  const projects = await RrwebProject.find()

  res.send(projects)
})

router.post('/addOne', async function (req, res, next) {
  // const projects = await RrwebProject.find()
  const {projectName, url } = req.body
// console.log(req.body)
  RrwebProject.insertMany({projectName:projectName, projectId:v4(), dingDingBot:{url}})
  res.send({status:"ok"})
})

module.exports = router