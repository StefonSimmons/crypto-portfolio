const express = require("express")
const cors = require("cors")
const app = express()
const logger = require('morgan')

app.use(cors())
app.use(logger('dev'))
app.use(express.json())

module.exports = app