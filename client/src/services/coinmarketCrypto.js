import { api } from "./apiConfig"

export const getCoinMarketData = async (symbols) => {
  const symbolsStr = symbols.join(',')
  const res = await api.get(`/apiResponse?${symbolsStr}`)
  return res
}
