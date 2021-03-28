const axios = require("axios")
require('dotenv').config()

const User = require("./models")

// ===================================
//  Crypto Controller
// ===================================
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
    res.status(500).json({ error: err.message })
  }
}

// ===================================
//  Auth Controllers
// ===================================
const createUser = async (req, res) => {
  try {
    
  } catch (error) {
    console.error(`Error: ${error.message}`)
  }
}

module.exports = { getCrypto }