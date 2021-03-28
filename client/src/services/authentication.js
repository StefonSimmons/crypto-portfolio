import { api } from './apiConfig'

export const createAccount = async (userInfo) => {
  const res = await api.post('/signUp', userInfo)
  const token = res.data.token
  if (token) {
    localStorage.setItem('token', token)
  }
  return res.data.newAccount
}

export const loginAccount = async (userInfo) => {
  const res = await api.post('/login', userInfo)
  const token = res.data.token
  if (token) {
    localStorage.setItem('token', token)
  }
  return res.data.account
}