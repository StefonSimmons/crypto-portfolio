const PORT = process.env.PORT || 3000
const app = require("./app")
const db = require("./db")

const { getCrypto, createAccount } = require("./controllers")

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`)
})

app.get('/apiResponse?:symbols', getCrypto)
app.post('/signUp', createAccount)