// src/components/Navbar.jsx
import React from 'react';
import './Navbar.css'; // Import Navbar-specific styles

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-brand">
          React Quiz App
        </a>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <a href="#about" className="navbar-link">About</a>
          </li>
          <li className="navbar-item">
            <a href="#contact" className="navbar-link">Contact</a>
          </li>
          {/* Add more navigation items here if needed */}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;