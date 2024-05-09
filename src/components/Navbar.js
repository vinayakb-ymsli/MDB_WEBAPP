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
        <div className="dropdown">
          <h6 className="dropbtn">Home</h6>
        </div>
        <div className="dropdown">
          <h6 className="dropbtn">Repository</h6>
          <div className="dropdown-content">
            <a href="#">Analytics</a>
            <a href="#">Structure</a>
            <a href="#">History</a>
            <a href="#">Add a Repository</a>
            <a href="#">Delete a Repository</a>
            <a href="#">Update a Repository</a>
            <a href="#">Filter a Repository</a>
            <a href="#">Search a Repository</a>
          </div>
        </div>

        <div className="dropdown">
          <h6 className="dropbtn">Visualization</h6>
          <div className="dropdown-content">
            <a href="#">Input Images</a>
            <a href="#">Output Images</a>
            <a href="#">False Positive comparison</a>
            <a href="#">Number of cells segmented</a>
            <a href="#">Inference time graph</a>
            <a href="#">Region of Interest comparison</a>
          </div>
        </div>

        <div className="dropdown">
          <h6 className="dropbtn">Model</h6>
          <div className="dropdown-content">
            <a href="#">Algorithms</a>
            <a href="#">Intution</a>
            <a href="#">Improvement area</a>
            <a href="#">Comparison with older models</a>
            <a href="#">Versioning</a>
          </div>
        </div>

        <div className="dropdown">
          <h6 className="dropbtn">Metrics</h6>
          <div className="dropdown-content">
            <a href="#">Accuracy</a>
            <a href="#">Precision recall</a>
            <a href="#">F1 score</a>
            <a href="#">Intersection over union</a>
            <a href="#">Area based normality</a>
            <a href="#">Weights and parameters</a>
            <a href="#">Precision curve</a>
            <a href="#">Pixel based confusion matrix</a>
            <a href="#">Pixel based sensitivity curve</a>
            <a href="#">Pixel based specificity curve</a>
            <a href="#">Picking condition</a>
          </div>
        </div>

        <div className="dropdown">
          <h6 className="dropbtn">Help</h6>
        </div>
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
