const mongoose = require('mongoose')
const { Schema } = mongoose
/*
errorInfo: { message: e.message, stack: e.error.stack },
  events:{
    type: Number,
    data: Object,
    timestamp:Number
  }
*/
const rrwebEventsSchema = new Schema({
  projectId: String,
  errorInfo: Object,
  events: Array,
  isDeal: {
    type:String,
    default:false,
  },
})
// [{
//   type: Number,
//   data: Object,
//   timestamp: Number,
// }]
const RrwebEvents = mongoose.model('RrwebEvents', rrwebEventsSchema)

module.exports = RrwebEvents
