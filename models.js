const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = {
  username: { type: String, required: true },
  email: { type: String, required: true },
  password_digest: { type: String, required: true },
}
const timestamps = { timestamps: true }

const User = new Schema(userSchema, timestamps)

module.exports = mongoose.model('users', User)