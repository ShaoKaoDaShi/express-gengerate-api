var express = require('express')
var router = express.Router()
var axios = require('axios')
let RrwebEvents = require('../db/Model/rrwebEvents')
const RrwebProject = require('../db/Model/rrwebProject')

/* GET home page. */
router.post('/save', async function (req, res, next) {
  const error = req.body
  const project = await RrwebProject.findOne({ projectName: error.projectName })
  error.projectId = project.projectId
  RrwebEvents.insertMany(error)
  axios.post('https://oapi.dingtalk.com/robot/send?access_token=a6b6ca5fb0456352000d565b90b4d23c7871b0df92a37136751d8933f6de98d1', {
    msgtype: 'text',
    text: {
      content: '监控报警: ' + error.errorInfo.message,
    },
  })
  res.send({ ok: true })
})

router.post('/get', async function (req, res, next) {
  const { projectName } = req.body
  const project = await RrwebProject.findOne({ projectName })
  const values = await RrwebEvents.find({ projectId: project.projectId }).select('-events')
  res.send(values)
})

router.post('/getEventsFromErrors', async function (req, res, next) {
  const { projectId, message } = req.body
  console.log(req.body)
  const values = await RrwebEvents.find({ projectId: projectId, isDeal: false })
  const results = values.filter((item) => item.errorInfo.message === message)
  console.log(results)
  if (results.length < 1) return res.send()
  const value = results[results.length - 1]
  res.send(value)
})

// router.post('/get', function(req, res, next) {
//   RrwebEvents.find({}).then((values)=>{
//     console.log(values)
//     res.send(values)
//   })

// });

module.exports = router
