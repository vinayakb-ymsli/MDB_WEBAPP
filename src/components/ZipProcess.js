import React, { useState } from "react";
import "../styles/ZipProcess.css";
import ThumbImage from "./ThumbImage";
import Loader from "./Loader";
import { useLocation } from "react-router-dom";
import Image from "./Image";
import jsonData from "./test.json";
import { Tooltip } from "react-tooltip";
import { IconButton } from "@material-ui/core";
import { ArrowBack, ArrowForward, GetApp, Info } from "@material-ui/icons";
import ImageSlider from "react-image-comparison-slider";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";

function ZipProcess() {
  const { state } = useLocation();
    try{
      if ( state.data != null){
        var zipFileName = state.zipFileName;
        var { original_images, processed_images, image_details } = state.data;
        var keys = Object.keys(processed_images);
        var firstKey = keys[0];
        sessionStorage.setItem('zipFileName', zipFileName);
        sessionStorage.setItem('original_images', original_images);
        sessionStorage.setItem('processed_images', processed_images);
        sessionStorage.setItem('image_details', image_details);
        sessionStorage.setItem('keys', keys);
        sessionStorage.setItem('firstKey', firstKey);
        console.log(processed_images);
      }
      else{
        var zipFileName = sessionStorage.getItem('zipFileName')
        var original_images = sessionStorage.getItem('original_images')
        var processed_images = sessionStorage.getItem('zipFileNprocessed_imagesame')
        var image_details = sessionStorage.getItem('image_details')
        var keys = sessionStorage.setItem('keys', keys);
        var firstKey = sessionStorage.setItem('firstKey', firstKey);
      }
    }
  catch{
    var zipFileName = sessionStorage.getItem('zipFileName')
    var original_images = sessionStorage.getItem('original_images')
    var processed_images = sessionStorage.getItem('processed_images')
    var image_details = sessionStorage.getItem('image_details')
    var keys = sessionStorage.getItem('keys', keys);
    var firstKey = sessionStorage.getItem('firstKey', firstKey);
  }

  // const { original_images, processed_images, image_details } = data;
  // const zipFileName = state.zipFileName;
  const [pageLoader, setpageLoader] = useState(false);
  const [viewMore, setviewMore] = useState(false);
  const [showInfoSlider, setInfoSlider] = useState(true);
  const [imageDetails, showimageDetails] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenImageType, setFullscreenImageType] = useState("input");
  // const keys = Object.keys(processed_images);
  // const firstKey = keys[0];
  // console.clear();
  // console.log(original_images);

  // console.log(firstKey)
  const [selectedImage, setselectedImage] = useState(113);
  const [selected, setselected] = useState(firstKey);
  const [showInfoTip, toggleInfo] = useState(true);

  const toggleFullscreen = (type) => {
    setIsFullscreen(!isFullscreen);
    setFullscreenImageType(type);
  };
  const SetViewbutton = () => {
    if (viewMore === true) {
      setviewMore(false);
      console.log("hi");
      console.log(jsonData.original_images);
    } else {
      setviewMore(true);
    }
  };
  const handleMouseEnter = () => {
    setInfoSlider(false);
  };

  const handleMouseLeave = () => {
    setInfoSlider(true);
  };
  const setImage = (key) => {
    setselected(key);
    console.log(selected);
  };

  const setPreviousImage = () => {
    console.log(selected);
    const index = keys.indexOf(selected);
    console.log(index);
    if (index > 0) {
      setselected(keys[index - 1]);
    }
  };

  const setNextImage = () => {
    console.log(selected);
    const index = keys.indexOf(selected);
    console.log(index);
    if (index < keys.length - 1) {
      setselected(keys[index + 1]);
    }
  };
  const downloadImage = (imageData, filename) => {
    // Remove the prefix to get the base64 string only
    const base64String = imageData.replace("data:image/png;base64,", "");

    // Convert base64 to binary
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    // Create Blob object
    const blob = new Blob([byteArray], { type: "image/png" });

    // Create a temporary URL for the Blob
    const imageUrl = URL.createObjectURL(blob);

    // Create a link element and initiate download
    const link = document.createElement("a");
    link.download = `${filename.slice(0, -4)}_${selected}.png`;
    link.href = imageUrl;
    link.click();

    // Clean up by revoking the temporary URL
    URL.revokeObjectURL(imageUrl);
  };
  const downloadProcessedImage = () => {
    const imageData = processed_images[selected];
    if (imageData) {
      // Remove the prefix to get the base64 string only
      const base64String = imageData.replace("data:image/png;base64,", "");

      // Convert base64 to binary
      const byteCharacters = atob(base64String);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);

      // Create Blob object
      const blob = new Blob([byteArray], { type: "image/png" });

      // Create a temporary URL for the Blob
      const imageUrl = URL.createObjectURL(blob);

      // Create a link element and initiate download
      const link = document.createElement("a");
      link.download = `processed_image_${selected}.png`;
      link.href = imageUrl;
      link.click();

      // Clean up by revoking the temporary URL
      URL.revokeObjectURL(imageUrl);
    } else {
      console.error("Processed image data is not available.");
    }
  };

  const showInfo = () => {
    console.log(image_details);
    showimageDetails(true);
  };

  let input_image = `data:image/png;base64, ${
    original_images[parseInt(selected)]
  }`;
  let processed_image = `data:image/png;base64, ${
    processed_images[parseInt(selected)]
  }`;

  return (
    <>
      {pageLoader ? (
        <div className="loader-container">
          <Loader
            type="bubble-loop"
            bgColor="blue"
            color="black"
            title="Processing Image"
            size={100}
          />
        </div>
      ) : (
        // <div className="mainContainer">
        <div className="mainContainerOne">
          {/* <div className="bkgimg">
            <img src="/images/kv_pc.jpg" alt="" />
          </div> */}

          {/* <div className="inputImageRow">
            <div className="headingCenter">Input Image</div>
            <Image
              key={"oi_" + selected}
              input_image={original_images[selected]}
              image_details={undefined}
            />
            <div className="buttonsPrevNext">
              <IconButton onClick={setPreviousImage}>
                <div className="buttonWithLabels">
                  <ArrowBack />
                  <div className="labelButtons">Previous</div>
                </div>
              </IconButton>
              <IconButton onClick={setNextImage}>
                <div className="buttonWithLabels">
                  <div className="labelButtons">Next</div>
                  <ArrowForward />
                </div>
              </IconButton>
            </div>
          </div> */}

          {/* <div className="ProcessedImageRow">
            <div className="headingCenter">Output Image</div>
            <div>
              <Image
                key={"pi" + selected}
                input_image={processed_images[parseInt(selected)]}
                image_details={image_details}
              />
              {!!showimageDetails && (
                <Tooltip
                  id="image-tooltip"
                  place="left"
                  variant="info"
                  html={`Dimension : ${image_details.image_dimensions} <br>
        Name : ${image_details.model_name} <br>
        Type : ${image_details.model_type} <br>
        Upload Date : ${image_details.model_upload_date}`}
                />
              )}
            </div>

            <div className="buttonsPrevNext">
              <IconButton onClick={downloadProcessedImage}>
                <div className="buttonWithLabels">
                  <GetApp />
                  <div className="labelButtons">Download Image</div>
                </div>
              </IconButton>
              <IconButton onClick={showInfo}>
                <div className="buttonWithLabels">
                  
                  <Info />
                  {!!showInfoTip && (
                    <Tooltip
                      id="image-tooltip"
                      place="left"
                      variant="info"
                      html={`Dimension : ${image_details.image_dimensions} <br>
        Name : ${image_details.model_name} <br>
        Type : ${image_details.model_type} <br>
        Upload Date : ${image_details.model_upload_date}`}
                    />
                  )}
                </div>
              </IconButton>
            </div>
          </div> */}
          <div className="project">
            Project Name:{" "}
            <div className="project-name">{zipFileName.slice(0, -4)}</div>
          </div>
          <div className="leftNavRow">
            {/* <div className="headingLeft">Uploaded Images</div> */}
            <div className="image-table">
              {Object.keys(original_images).map((key) => (
                <ThumbImage
                  key={key}
                  imageId={key}
                  input_image={original_images[key]}
                  setImage={setImage}
                  isSelected={parseInt(key) === parseInt(selected)}
                />
              ))}
            </div>
          </div>
          <div className="buttonsPrevNext">
            <div className="buttonHolder">
              <div className="buttonWithLabels">
                <IconButton onClick={setPreviousImage}>
                  <ArrowBack style={{ color: "rgb(13, 25, 114)" }} />
                </IconButton>
              </div>
              <div className="labelButtons">
                Previous <br></br> Image
              </div>
            </div>

            {isFullscreen && (
              <div className="fullscreen-overlay">
                <div className="fullscreen-image-container">
                  <img
                    src={
                      fullscreenImageType === "input"
                        ? input_image
                        : processed_image
                    }
                    alt="fullscreen"
                  />
                  <div
                    className="close-button"
                    onClick={() => toggleFullscreen(null)}
                  >
                    <FullscreenExitIcon />
                  </div>
                  <div
                    className="download-button"
                    onClick={() => {
                      const imageData =
                        fullscreenImageType === "input"
                          ? original_images[parseInt(selected)]
                          : processed_images[parseInt(selected)];
                      const filename =
                        fullscreenImageType === "input"
                          ? "input_image.png"
                          : "processed_image.png";
                      downloadImage(imageData, filename);
                    }}
                  >
                    <GetApp
                      style={{
                        width: "25px",
                        height: "25px",
                        color: "rgb(0, 3, 59)",
                      }}
                    />
                    Download Image
                  </div>
                </div>
              </div>
            )}
            <div
              className="slider-holder"
              style={{ width: 700, height: 450, position: "relative" }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className="fullscreenLeft"
                onClick={() => toggleFullscreen("input")}
              >
                <FullscreenIcon style={{ color: "black" }} />
              </div>
              <div
                className="fullscreenRight"
                onClick={() => toggleFullscreen("processed")}
              >
                <FullscreenIcon style={{ color: "white" }} />
              </div>
              <ImageSlider
                image1={processed_image}
                image2={input_image}
                leftLabelText={"Input Image"}
                rightLabelText={"Processed Image"}
                sliderColor="white"
                handleColor="rgb(0, 3, 59)"
                handleBackgroundColor="white"
              />
              <div className="image-name">
                <div className="image-name"> {selected}.jpg</div>
              </div>
            </div>
            <div className="buttonHolder">
              <div className="buttonWithLabels">
                <IconButton onClick={setNextImage}>
                  <ArrowForward style={{ color: "rgb(13, 25, 114)" }} />
                </IconButton>
              </div>
              <div className="labelButtons">
                Next <br></br> Image
              </div>
            </div>
            {/* <IconButton onClick={setNextImage}>
              <div className="buttonWithLabels">
                <div className="labelButtons">Next Image</div>
                <ArrowForward />
              </div>
            </IconButton> */}
          </div>
          {/* {!!showInfoTip && (
            <Tooltip
              id="image-tooltip"
              place="left"
              variant="info"
              html={`Dimension : ${image_details.image_dimensions} <br>
        Name : ${image_details.model_name} <br>
        Type : ${image_details.model_type} <br>
        Upload Date : ${image_details.model_upload_date}`}
            />
          )} */}
          {!showInfoSlider && (
            <div className="info">
              <div>
                <strong>Dimension:</strong> {image_details.image_dimensions}
              </div>
              <div>
                <strong>Name:</strong> {image_details.model_name}
              </div>
              <div>
                <strong>Type:</strong> {image_details.model_type}
              </div>
              <div>
                <strong>Upload Date:</strong> {image_details.model_upload_date}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ZipProcess;
