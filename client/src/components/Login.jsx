import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

export default function Login({ loginAccount, setUser }) {
  const history = useHistory()
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: ""
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const user = await loginAccount(userCredentials)
    setUser(user)
    history.push('/')
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserCredentials({
      ...userCredentials,
      [name]: value
    })
  }

  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        <input type="text" name="username" value={userCredentials.username} placeholder="Username" onChange={handleChange} />
        <input type="password" name="password" value={userCredentials.password} placeholder="Password" onChange={handleChange} />
        <input type="submit" className="auth-submit-btn" value="Login"/>
      </form>
      <Link to="/create-account">
        <h4 className="account-msg">Create Account Instead?</h4>
      </Link>
    </>
  )
}
