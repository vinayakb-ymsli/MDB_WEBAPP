import React from "react";
import "../styles/Navbar.css"; // Import CSS file for styling if needed
// import img from "../images/yamaha.png";
const Navbar = () => {
  return (
    <div className="navbarContainer">
      {/* <div className="navbar">
        <div className="left-section">
          <img src={img} alt="logo" />
          <span>The Cell picking & imaging system. CELL HANDLER™</span>
        </div>
        <div className="right-section">
          <a href="https://global.yamaha-motor.com/">Home</a>
          <a href="https://global.yamaha-motor.com/news/">News</a>
          <a href="https://global.yamaha-motor.com/jp/">Japanese Site</a>
        </div>
      </div> */}
        <img className="banner" src="/images/Banner.png" />
        <div className="logo_bkg">
          <img className="logo" src="/images/yamaha.png" /> 
          {/* <img src={img} alt="logo" /> */}
        </div>
      <div className="secondNav">
      <div className="left-section">
        <h6> Home</h6>
        <h6> Repositry</h6>
        <h6> Visualization</h6>
        <h6> Model</h6>
        <h6> Metrics</h6>
        <h6> Help</h6>
        </div>
        <div className="right-section">
          <a href="https://global.yamaha-motor.com/">Admin</a>
          <a href="https://global.yamaha-motor.com/news/">Login</a>
          <a href="https://global.yamaha-motor.com/jp/">Japanese Site</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
