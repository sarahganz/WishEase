// Footer.jsx
import React from "react";
import "./Footer.css"; // Import your footer stylesheet

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} WishEase</p>
      </div>
    </footer>
  );
};

export default Footer;
