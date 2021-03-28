import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

export default function CreateAccount({ createAccount }) {
  const history = useHistory()

  const [userCredentials, setUserCredentials] = useState({
    username: "",
    email: "",
    password: ""
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    await createAccount(userCredentials)
    setUserCredentials({
      username: "",
      email: "",
      password: ""
    })
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
      <form className="create-account-form" onSubmit={handleSubmit}>
        <input type="text" name="username" value={userCredentials.username} placeholder="Username" onChange={handleChange} />
        <input type="text" name="email" value={userCredentials.email} placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" value={userCredentials.password} placeholder="Password" onChange={handleChange} />
        <input type="submit" className="auth-submit-btn" value="LETS GOOO!" />
      </form>
      <Link to="/login">
        <h4 className="account-msg">Login Instead?</h4>
      </Link>
    </>
  )
}
