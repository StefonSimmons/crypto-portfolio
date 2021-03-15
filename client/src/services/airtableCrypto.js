import axios from 'axios'

export const getAirtableInputs = async () => {
  const baseURL = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE}/crypto-usd`
  const config = {
    headers: {
      "Authorization": `Bearer ${process.env.REACT_APP_AIRTABLE_KEY}`
    }
  }
  const res = await axios.get(baseURL, config)
  return res
}