import React from 'react'
import { Link } from 'react-router-dom'

export default function CreateAccount() {
  return (
    <>
      <form className="create-account-form">
        <input type="text" placeholder="Username" />
        <input type="text" placeholder="Email" />
        <input type="text" placeholder="Password" />
      </form>
      <Link to="/login">
        <h4 className="account-msg">Login Instead?</h4>
      </Link>
    </>
  )
}
