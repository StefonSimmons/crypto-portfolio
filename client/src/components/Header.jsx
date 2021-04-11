import React from 'react'
import { Link, useHistory } from "react-router-dom"
import mainLogo from "../assets/moon-transparent.png"
import { logout } from "../services/authentication"

export default function Header({ user, setVerify, setReload }) {
  const history = useHistory()

  const logoutAccount = () => {
    logout()
    setVerify(curr => !curr)
    history.push('/')
  }

  return (
    <header className="header">
      <Link to="/">
        <img src={mainLogo} alt="rocket to bitcoin" />
      </Link>
      <button onClick={() => setReload(curr => !curr)}>{user ? `${user.username} / refresh` : ""}</button>
      <nav>
        <Link to="/hodl-portfolio">HODL PORT</Link>
        <Link to="/trade-portfolio">TRADE PORT</Link>
        <a href="https://www.tradingview.com/chart/ov8EXKCF/" target="_blank" rel="noreferrer">Trading View</a>
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
