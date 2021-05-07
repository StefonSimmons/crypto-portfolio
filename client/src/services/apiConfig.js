// Making an instance of axios to call my express app (cmc and auth).
// https://coinmarketcap.com/api/documentation/v1/#section/Quick-Start-Guide
// "Secure your API Key by routing calls through your own backend service."

import axios from "axios"

const expressAPI = process.env.NODE_ENV === "development"
  ? "http://localhost:3000"
  : "https://crypto-app-api-1.herokuapp.com/"

export const api = axios.create({baseURL: expressAPI})