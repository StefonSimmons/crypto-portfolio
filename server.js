const express = require("express")
const cors = require("cors")
const app = express()
const axios = require("axios")
require('dotenv').config()
const PORT = process.env.PORT || 3000

app.use(cors())


app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`)
})

const getCrypto = async (req, res) => {
  const symbols = req._parsedUrl.query
  try {
    const domain = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbols}`
    const config = {
      headers: {
        "X-CMC_PRO_API_KEY": `${process.env.API_KEY}`
      }
    }
    const resp = await axios.get(domain, config)
    resp ? res.json(resp.data) : res.status(404).json({ message: "Crypto not found!" })
    
  } catch (err) {
    res.status(500).json({error: err.message})
  }
}


app.get('/apiResponse?:symbols', getCrypto)