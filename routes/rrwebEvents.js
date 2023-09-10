var express = require('express')
var router = express.Router()
var axios = require('axios')
const path = require('path')
const fs = require('fs')
const { SourceMapConsumer } = require('source-map')
let RrwebEvents = require('../db/Model/rrwebEvents')
const RrwebProject = require('../db/Model/rrwebProject')

async function decodeErrorStack(stack) {
  const stackList = stack.split('\n').map((item) => item.trim().replace(')', '').split('/').pop())
  const [filename, line, column] = stackList[1].split(':')
  // 读取对应的sourcemap
  let rawSourceMap = null
  try {
    rawSourceMap = fs.readFileSync(path.resolve(__dirname, '../sourcemaps', filename + '.map'), 'utf-8')
  } catch (error) {
    console.error(error)
    return stack
  }
  const consumer = await new SourceMapConsumer(rawSourceMap)
  // 解析错误堆栈中的源代码位置
  console.log(stack)
  const parsedStack = stack.replace(/(\S+) \((.+):(\d+):(\d+)\)/g, (match, name, file, line, column) => {
    const originalPosition = consumer.originalPositionFor({
      line: parseInt(line, 10),
      column: parseInt(column, 10),
    })
    if (originalPosition.source) {
      const source = originalPosition.source.replace(/(\W+)\/(.+)/g, (match, $1, $2) => {
        // console.log($1, $2)
        return $2
      })
      return `${name} (${source}:${originalPosition.line}:${originalPosition.column})`
    }

    return match
  })

  console.log(parsedStack)
  return parsedStack
}

/* GET home page. */
router.post('/save', async function (req, res, next) {
  const error = req.body
  const project = await RrwebProject.findOne({ projectName: error.projectName })
  error.projectId = project.projectId
  const parsedStack = await decodeErrorStack(error.errorInfo.stack)
  error.errorInfo.stack = parsedStack
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
