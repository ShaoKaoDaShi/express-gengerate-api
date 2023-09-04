require('../index')
var RrwebProject = require('../Model/rrwebProject')
var { v4 } = require('uuid')
RrwebProject.insertMany({
  projectId: v4(),
  projectName: 'qiankun-base',
  dingDingBot: { url: 'https://oapi.dingtalk.com/robot/send?access_token=a6b6ca5fb0456352000d565b90b4d23c7871b0df92a37136751d8933f6de98d1' },
})
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })
