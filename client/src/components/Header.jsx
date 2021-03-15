import React from 'react'
import { Link } from "react-router-dom"

export default function Header() {
  return (
    <header className="header">
      <h1>Logo</h1>
      <button>Light</button>
      <nav>
        <Link to="/all">ALL</Link>
        <Link to="/hodl-portfolio">HODL PORT</Link>
        <Link to="/trade-portfolio">TRADE PORT</Link>
      </nav>
      <h1>Login</h1>
    </header>
  )
}
