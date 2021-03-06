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

// CREATE ACCOUNT
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

// LOGIN
const login = async (req, res) => {
  const { username, password } = req.body
  try {
    const account = await User.findOne({ username })
    const matched = await bcrypt.compare(password, account.password_digest)
    if (matched) {
      const payload = {
        id: account._id,
        username: account.username,
        email: account.email
      }
      const token = jwt.sign(payload, TOKEN_KEY)

      res.status(201).json({ account, token })
    } else {
      res.json({ error: "unauthorized" })
    }
  } catch (error) {
    console.error(`Error Logging In: ${error.message}`)
  }
}

// VERIFY
const verify = async (req, res) => {
  const { token } = req.body
  try {
    const payload = jwt.verify(token, TOKEN_KEY)
    const account = await User.findById(payload.id)
    // console.log(account)
    res.json(account)
  } catch (error) {
    console.error(`Error Verifying User: ${error.message}`)
  }

}

module.exports = { getCrypto, createAccount, login, verify }