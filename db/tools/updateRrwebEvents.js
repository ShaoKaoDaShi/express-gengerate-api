require('../index')
var RrwebProject = require('../Model/rrwebProject')
var RrwebEvents = require('../Model/rrwebEvents')

// async function main() {
//   const project = await RrwebProject.findOne({ projectName: 'qiankun-base' })
//   // RrwebEvents.create()
//   console.log(project)
//   RrwebEvents.init()
//   RrwebEvents.updateMany({}, { isDeal: false })
//     .then((value) => {
//       console.log('value', value)
//     })
//     .catch((err) => {
//       console.log('error', err)
//     })
// }
// setTimeout(main, 1000)

async function addTimestamp() {
  const project = await RrwebProject.findOne({ projectName: 'qiankun-base' })
  const events = await RrwebEvents.find({ projectId: project.projectId })
  console.log(events.length)
  for (let i = 0; i < events.length; i++) {
    const timestamp = events[i].events.pop().timestamp
    await RrwebEvents.updateOne({ _id: events[i]._id }, { timestamp: timestamp })
  }
  console.log('done============')
}
setTimeout(addTimestamp, 1000)
