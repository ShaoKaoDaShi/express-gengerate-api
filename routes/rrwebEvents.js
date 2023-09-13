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
            // 获取真实的文件地址
            const source = originalPosition.source.replace(/(\W+)\/(.+)/g, (match, $1, $2) => {
                return $2
            })
            return `${name} (${source}:${originalPosition.line}:${originalPosition.column})`
        }

        return match
    })

    console.log(parsedStack)
    return parsedStack
}

// TODO 通过不同的项目id进行 error信息存储，如果stack存在并且 status已经解决，那么
router.post('/save', async function (req, res, next) {
    const error = req.body
    const project = await RrwebProject.findOne({ projectId: error.projectId })
    error.projectId = project.projectId
    // 还原成源文件的error位置
    const parsedStack = await decodeErrorStack(error.errorInfo.stack)
    error.errorInfo.stack = parsedStack
    RrwebEvents.insertMany(error)
    // 发送钉钉通知
    // TODO 限制发送频率 同一个errorstack只发送一次，不同的stack同一个钉钉通知，1分钟只能发送19次，
    axios.post('https://oapi.dingtalk.com/robot/send?access_token=a6b6ca5fb0456352000d565b90b4d23c7871b0df92a37136751d8933f6de98d1', {
        msgtype: 'text',
        text: {
            content: '监控报警: ' + error.errorInfo.stack,
        },
    })
    res.send({ ok: true })
})

router.post('/get', async function (req, res, next) {
    const { projectId } = req.body
    const values = await RrwebEvents.find({ projectId, isDeal: false }).select('-events')
    res.send(values)
})

router.post('/getEventsFromErrors', async function (req, res, next) {
    const { projectId, stack } = req.body
    console.log(req.body)
    const values = await RrwebEvents.find({ projectId: projectId, isDeal: false, 'errorInfo.stack': stack })
    if (values.length < 1) return res.send()
    const value = values[values.length - 1]
    res.send(value)
})

router.post('/updateErrorStatus', async function (req, res, next) {
    const { projectId, stack, isDeal } = req.body

    const result = await RrwebEvents.updateMany({ projectId: projectId, 'errorInfo.stack': stack }, { isDeal })
    console.log('reslut====', result)
    res.send('ok')
})

module.exports = router
