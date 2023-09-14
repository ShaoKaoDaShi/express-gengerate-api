import fs from 'fs'
import path from 'path'
require('../index')
const { SourceMapConsumer } = require('source-map')
const RrwebEvents = require('../Model/rrwebEvents')

async function main() {
    const {
        errorInfo: { stack },
    } = await RrwebEvents.findOne({ 'errorInfo.message': 'Uncaught Error: source map test' }).select(['errorInfo.stack'])

    const stackList = stack.split('\n').map((item) => item.trim().replace(')', '').split('/').pop())
    const [filename, line, column] = stackList[1].split(':')
    const rawSourceMap = fs.readFileSync(path.resolve(__dirname, '../../sourcemaps', filename + '.map'), 'utf-8')
    const consumer = await new SourceMapConsumer(rawSourceMap)
    // 解析错误堆栈中的源代码位置
    // console.log(stack.match(,))
    console.log(new RegExp(/(\S+) \((.+):(\d+):(\d+)\)/).exec(stack))

    const parsedStack = stack.replace(/(\S+) \((.+):(\d+):(\d+)\)/g, (match, name, file, line, column) => {
        // 匹配file路径
        console.log(
            file.replace(/(\S+):\/\/(\S+?)\/(.+)/g, (match, type, url, filepath) => {
                return filepath
            }),
        )
        console.log(name)
        const originalPosition = consumer.originalPositionFor({
            line: parseInt(line, 10),
            column: parseInt(column, 10),
        })
        if (originalPosition.source) {
            // console.log(originalPosition.source)
            const source = originalPosition.source.replace(/(\W+)\/(.+)/g, (match, $1, $2, line, column) => {
                // console.log($1, $2)
                return $2
            })
            return `${name} (${source}:${originalPosition.line}:${originalPosition.column})`
        }

        return match
    })

    console.log(parsedStack)
}
main()
