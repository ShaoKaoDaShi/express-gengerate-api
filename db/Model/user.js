const mongoose = require('mongoose')
const { Schema } = mongoose
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  id:String,
  password: String,
})

const User = mongoose.model('User', userSchema)

module.exports = User
