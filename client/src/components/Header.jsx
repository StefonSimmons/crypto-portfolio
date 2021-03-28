import React from 'react'
import { Link, useHistory } from "react-router-dom"
import mainLogo from "../assets/moon-transparent.png"
import { logout } from "../services/authentication"

export default function Header({ user, setReload }) {
  const history = useHistory()

  const logoutAccount = () => {
    logout()
    setReload(curr => !curr)
    history.push('/')
  }

  return (
    <header className="header">
      <Link to="/">
        <img src={mainLogo} alt="rocket to bitcoin" />
      </Link>
      <button>{user ? user.username : "Celebrate"}</button>
      <nav>
        <Link to="/hodl-portfolio">HODL PORT</Link>
        <Link to="/trade-portfolio">TRADE PORT</Link>
      </nav>
      { user
        ? <h1 className="header-login" onClick={logoutAccount}>Logout</h1>
        : <Link to="/login">
          <h1 className="header-login">Login</h1>
        </Link>
      }
    </header>
  )
}
