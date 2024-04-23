import React from "react";
import "../styles/Navbar.css"; // Import CSS file for styling if needed
import img from "../images/logo.png";
const Navbar = () => {
  return (
    <div className="navbarContainer">
      <div className="navbar">
        <div className="left-section">
          <img src={img} alt="logo" />
          <span>The Cell picking & imaging system. CELL HANDLER™</span>
        </div>
        <div className="right-section">
          <a href="https://global.yamaha-motor.com/">Home</a>
          <a href="https://global.yamaha-motor.com/news/">News</a>
          <a href="https://global.yamaha-motor.com/jp/">Japanese Site</a>
        </div>
      </div>
      <div>
        <img className="banner" src="/images/Banner.png" />
      </div>
    </div>
  );
};

export default Navbar;
