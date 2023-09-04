const mongoose = require('mongoose')
const { Schema } = mongoose

const rrwebProjectSchema = new Schema({
  projectId: String,
  projectName: {
    type:String,
    unique: true,
  },
  dingDingBot: Object,
})
const RrwebProject = mongoose.model('rrwebProject', rrwebProjectSchema)

module.exports = RrwebProject
