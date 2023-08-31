const mongoose = require('mongoose')
const { Schema } = mongoose
/*
  errorType: String
  errorAddress: String
  events:{
    type: Number,
    data: Object,
    timestamp:Number
  }
*/
const rrwebEventsSchema = new Schema({
  errorInfo: Object,
  events: Array,
})
// [{
//   type: Number,
//   data: Object,
//   timestamp: Number,
// }]
const RrwebEvents = mongoose.model('RrwebEvents', rrwebEventsSchema)

module.exports = RrwebEvents
