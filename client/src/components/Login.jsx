import React from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <>
      <form className="login-form">
        <input type="text" placeholder="Username" />
        <input type="text" placeholder="Password" />
      </form>
      <Link to="/create-account">
        <h4 className="account-msg">Create Account Instead?</h4>
      </Link>
    </>
  )
}