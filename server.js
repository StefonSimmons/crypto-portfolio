const express = require("express")
const cors = require("cors")
const app = express()
const logger = require('morgan')
const PORT = process.env.PORT || 3000
const { getCrypto } = require("./controllers")

app.use(cors())
app.use(logger('dev'))

app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`)
})



app.get('/apiResponse?:symbols', getCrypto)