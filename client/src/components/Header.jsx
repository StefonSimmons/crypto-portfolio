import React from 'react'
import { Link } from "react-router-dom"
import mainLogo from "../assets/moon-transparent.png"

export default function Header({ cheerNOW }) {
  return (
    <header className="header">
      <Link to="/">
        <img src={mainLogo} alt="rocket to bitcoin" />
      </Link>
      <button>Celebrate</button>
      <nav>
        <Link to="/hodl-portfolio">HODL PORT</Link>
        <Link to="/trade-portfolio">TRADE PORT</Link>
      </nav>
      <Link to="/login">
        <h1 className="header-login">Login</h1>
      </Link>
    </header>
  )
}
