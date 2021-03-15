import React from 'react'
import { Link } from "react-router-dom"
import mainLogo from "../assets/moon-transparent.png"

export default function Header() {
  return (
    <header className="header">
      <img src={mainLogo} alt="rocket to bitcoin"/>
      <button>Light</button>
      <nav>
        <Link to="/all">ALL</Link>
        <Link to="/hodl-portfolio">HODL PORT</Link>
        <Link to="/trade-portfolio">TRADE PORT</Link>
      </nav>
      <h1 className="header-login">Login</h1>
    </header>
  )
}
