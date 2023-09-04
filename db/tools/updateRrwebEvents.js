require('../index')
var RrwebProject = require("../Model/rrwebProject")
var RrwebEvents = require("../Model/rrwebEvents")

async function main(){
  const project = await RrwebProject.findOne({projectName:"qiankun-base"})
  // RrwebEvents.create()
  console.log(project)
  RrwebEvents.init()
  RrwebEvents.updateMany({},{isDeal:false}).then((value)=>{
    console.log("value",value)
  }).catch((err)=>{
    console.log("error",err)
  })
}
setTimeout(main,1000)