import React from 'react';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer>
      <div className="footer_logo">
        <img src="../public/logo.png" alt="Logo" />
      </div>
      <div className="footer_message">
        <p className="footer_message_text">Our mission is to promote tourism in Berea and showcase its unique attractions.</p>
      </div>
      <div className="footer_socials">
        <ul>
          <li><a href="https://www.facebook.com">Facebook</a></li>
          <li><a href="https://www.linkedin.com">LinkedIn</a></li>
          <li><a href="https://www.instagram.com">Instagram</a></li>
          <li><a href="https://www.example.com">X</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;