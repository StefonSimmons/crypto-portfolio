import axios from 'axios'

const baseURL = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE}`
const config = {
  headers: {
    "Authorization": `Bearer ${process.env.REACT_APP_AIRTABLE_KEY}`
  }
}

export const getAirtableCrypto = async () => {
  const res = await axios.get(`${baseURL}/crypto`, config)
  return res
}

export const getAirtableNetWorth = async () => {
  const res = await axios.get(`${baseURL}/networth`, config)
  return res
}

export const postAirtableNetworth = async (info, id) => {
  console.log({ fields: info })
  await axios.put(`${baseURL}/networth/${id}`, { fields: info }, config)
}
