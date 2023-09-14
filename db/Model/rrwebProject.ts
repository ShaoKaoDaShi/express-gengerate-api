import mongoose from 'mongoose'
const { Schema } = mongoose
const dingDingBot = new Schema({ url: String, keyword: String })
const rrwebProjectSchema = new Schema({
    projectId: String,
    projectName: {
        type: String,
        unique: true,
    },
    dingDingBot: dingDingBot,
    userId: String,
})
const RrwebProject = mongoose.model('rrwebProject', rrwebProjectSchema)
export default RrwebProject
