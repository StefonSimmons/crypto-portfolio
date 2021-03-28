import { api } from './apiConfig'

export const createAccount = async (userInfo) => {
  const res = await api.post('/signUp', userInfo)
  console.log(res)
  return res
}