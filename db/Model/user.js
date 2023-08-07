const mongoose = require('mongoose')
const { Schema } = mongoose
const userSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  token: String,
})

const User = mongoose.model('User', userSchema)

export default User
