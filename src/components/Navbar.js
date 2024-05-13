import React, { useState } from "react";
import "../styles/Navbar.css"; // Import CSS file for styling if needed
import InfoPopup from "./InfoPopup";
import { FaUser, FaSignInAlt } from "react-icons/fa";
// import img from "../images/yamaha.png";


const Navbar = ({setisBlurr}) => {

  const [popUp, setpopUp] = useState(false)
  const [image, setimage] = useState(false)
  const [details, setdetails] = useState(false)
  const [title, settitle] = useState(false)
  // let clicked_details = ""
  // let clicked_title = ""
  // let clicked_image = ""

  const handleFalsePositive = () => {
    console.log("False Positive");
  }
  function closePopup(){
      if( popUp == true){
          setpopUp(false)
          setisBlurr(false)
      }
  }
  function openPopup(clicked_details, clicked_image, clicked_title){
    setisBlurr(true)
    setpopUp(true)
    setdetails(clicked_details)
    settitle(clicked_title)
    setimage(clicked_image)
  }

  return (<>
    <div className="navbarContainer">
      <img className="banner" src="/images/Banner.png" />
      <div className="logo_bkg">
        <img className="logo" src="/images/yamaha.png" />
        {/* <img src={img} alt="logo" /> */}
      </div>
      <div className="secondNav">
        <div className="left-section">
          <div className="dropdown">
            <h6 className="dropbtn"><a href="/" style={{color:"white", textDecoration:"None"}}>Home</a></h6>
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
            <a href="#" onClick={handleFalsePositive}>False Positive comparison</a>
            <a href="#" onClick={()=>openPopup( "Cell Segmentation is a task of splitting a microscopic image domain into segments, which represent individual instances of cells. It is a fundamental step in many biomedical studies, and it is regarded as a cornerstone of image-based cellular research. Cellular morphology is an indicator of a physiological state of the cell, and a well-segmented image can capture biologically relevant morphological information.", 
            "/images/CellSegmentation.png",
            "Number Of cell Segmented")} >Number of cells segmented</a>
            <a href="#">Inference time graph</a>
            <a href="#" onClick={()=>openPopup( "The region of interest (often abbreviated ROI) is a sample within a data set identified for a particular purpose. The concept of a ROI is commonly used in many application areas. For example, in medical imaging, the boundaries of a tumor may be defined on an image or in a volume, for the purpose of measuring its size", 
            "/images/ROI.png",
            "ROI: Region Of Interest")}>Region of Interest comparison</a>

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
            <a href="#" onClick={()=>openPopup( "The F1 score is a metric used in machine learning to evaluate the performance of classification models. It’s particularly useful when the classes are imbalanced. The F1 score is the harmonic mean of precision and recall, which are two critical measures in classification tasks:", 
            "/images/Acuuracy.png",
            "Accuracy",
            )}>
              Accuracy</a>
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

          <div className="dropdown">
            <h6 className="dropbtn">Help</h6>
          </div>
        </div>
        <div className="right-section">
          {/* Use buttons with icons */}
          <button className="icon-button" onClick={() => {}}>
            <FaUser /> Admin
          </button>
          <button className="icon-button" onClick={() => {}}>
            <FaSignInAlt /> Login
          </button>
          <a className="jp-link" href="https://global.yamaha-motor.com/jp/">Japanese Site</a>
        </div>
      </div>
      {popUp && 
    <div className="popup">
        <div className="infoContainer">
        <div className="title">
            <h2>
                {title}
            </h2>
                
        </div>
            <div className="details_box">
            {details}
            </div>
        </div>
        <div className="imageContainer">
            <img src={image} alt="" />
            <button onClick={closePopup}> close </button>
  
        </div>
        {/* <div className="cancelButton">
            <button> close </button>
        </div> */}
    </div>
    }
    </div>
    </div>
    </div>
    </>
  );
};

export default Navbar;
