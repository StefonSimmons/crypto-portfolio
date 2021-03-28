const axios = require("axios")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

require('dotenv').config()
const TOKEN_KEY = process.env.TOKEN_KEY

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
const createAccount = async (req, res) => {
  const { username, email, password } = req.body
  const password_digest = await bcrypt.hash(password, 11)

  try {
    const newAccount = new User({
      username,
      email,
      password_digest
    })
    await newAccount.save()

    const payload = {
      id: newAccount._id,
      username: newAccount.username,
      email: newAccount.email
    }
    const token = jwt.sign(payload, TOKEN_KEY)

    res.status(201).json({ newAccount, token })

  } catch (error) {
    console.error(`Error in Account Creation: ${error.message}`)
  }
}

module.exports = { getCrypto, createAccount }