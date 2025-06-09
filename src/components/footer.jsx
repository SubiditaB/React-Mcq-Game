// src/components/Footer.jsx
import React from 'react';
import './Footer.css'; // Import Footer-specific styles

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; {currentYear} React Quiz App. All rights reserved.</p>
        <p>Built with ❤️ and React.</p>
      </div>
    </footer>
  );
}

export default Footer;