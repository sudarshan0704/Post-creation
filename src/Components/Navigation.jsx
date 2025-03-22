import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../Stylefile/Navigation.css'
// import logo from '../assets/logo.png' // Uncomment and update path when you have a logo

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="logo">
          {/* <img src={logo} alt="PostCreator Logo" /> */}
          <span style={{color:"#4aea2e"}}>PostCreator</span>
        </Link>
        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          <Link to="/" onClick={toggleMenu}>Home</Link>
          <Link to="/about" onClick={toggleMenu}>About Us</Link>
          <Link to="/generate" onClick={toggleMenu}>Post Generate</Link>
          <Link to="/Ask" onClick={toggleMenu} style={{color:"#4aea2e",fontWeight:1000, }}>Ask-post <span style={{color:"green"}}>❓</span></Link>
        </div>
        <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  )
}