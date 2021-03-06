const mongoose = require('mongoose')

let MONGODB_URI = process.env.PROD_MONGODB || 'mongodb://127.0.0.1:27017/cryptoAppDB'

mongoose
  .connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log(`Successfully connected to MongoDB at ${MONGODB_URI}`)
  })
  .catch(e => {
    console.error('Connection error', e.message)
  })

const db = mongoose.connection

module.exports = db 