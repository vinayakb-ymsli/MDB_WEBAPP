import React, { useState } from "react";
import Loader from "react-js-loader";
import "../styles/ProcessPage.css";
import axios from "axios";
import { IconButton } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { CloudUpload, GetApp } from "@material-ui/icons";
import { useLocation } from "react-router-dom";
import ImageSlider from "react-image-comparison-slider";
import ProcessButton from "./ProcessButton";
import { hover } from "@testing-library/user-event/dist/hover";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";

const ProcessPage = () => {
  const { state } = useLocation();
  try {
    if (state.data == null) {
      var image = sessionStorage.getItem("image");
    } else {
      var image = state.data;
      sessionStorage.setItem("image", image);
    }
  } catch {
    var image = null;
  }
  const modelsList = [
    { id: 0, label: "Istanbul, TR (AHL)" },
    { id: 1, label: "Paris, FR (CDG)" },
  ];
  const [isProcessPageOpen, setProcessPageOpen] = useState(false);
  const [processPageItems, setProcessPageItems] = useState(modelsList);
  const [selectedProcessPageItem, setSelectedProcessPageItem] = useState(null);

  const toggleProcessPageDropdown = () =>
    setProcessPageOpen(!isProcessPageOpen);

  const handleProcessPageItemClick = (id) => {
    selectedProcessPageItem === id
      ? setSelectedProcessPageItem(null)
      : setSelectedProcessPageItem(id);
    setProcessPageOpen(!isProcessPageOpen);
  };
  const [uploadedImage, setUploadedImage] = useState(image);
  const [processedImage, setProcessedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isError, setIsError] = useState("");
  const [showInfoSlider, setInfoSlider] = useState(true);
  const [showLoaderSlider, setLoaderSlider] = useState(false);
  const [togglePreview, setPreview] = useState(true);
  const [hoverOnInput, setHoverOnInput] = useState(false);
  const [fullscreenImageType, setFullscreenImageType] = useState("input");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = (type) => {
    setIsFullscreen(!isFullscreen);
    setFullscreenImageType(type);
  };
  const processImage = async () => {
    setPreview(false);
    setIsError("");
    setIsLoading(true);
    setLoader(true);
    setLoaderSlider(true);
    try {
      const formData = new FormData();
      formData.append("image", uploadedImage);

      const response = await axios.post(
        "https://dvegmk6pcy.ap-south-1.awsapprunner.com/upload",
        formData
      );

      const processedImage = `data:image/png;base64, ${response?.data?.image}`;
      setProcessedImage(processedImage);
    } catch (error) {
      setIsError(error.message);
    } finally {
      setIsLoading(false);
      setLoader(false);
      setLoaderSlider(false);
    }
  };
  const handleMouseEnterInput = () => {
    setHoverOnInput(true);
  };

  const handleMouseLeaveInput = () => {
    setHoverOnInput(false);
  };
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(file);
    setProcessedImage(null);
    setPreview(true);
  };

  const downloadImage = (imageType) => {
    const imageToDownload =
      imageType === "input" ? uploadedImage : processedImage;
    if (imageToDownload) {
      const link = document.createElement("a");
      link.download =
        imageType === "input"
          ? `input_image_${
              uploadedImage ? uploadedImage.name : "No image selected"
            }`
          : `processed_image_${
              uploadedImage ? uploadedImage.name : "No image selected"
            }`;
      if (imageType == "input") {
        link.href = URL.createObjectURL(imageToDownload);
      } else {
        link.href = imageToDownload;
      }

      link.click();
    }
  };

  const downloadSingleProcessedImage = () => {
    const imageToDownload = processedImage;
    const link = document.createElement("a");
    link.download = `processed_image_${
      uploadedImage ? uploadedImage.name : "No image selected"
    }`;

    link.href = imageToDownload;

    link.click();
  };
  const handleMouseEnter = () => {
    setInfoSlider(false);
  };

  const handleMouseLeave = () => {
    setInfoSlider(true);
  };

  const [selectedOption, setSelectedOption] = useState("slider");

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="main">
      {isFullscreen && (
        <div className="fullscreen-over">
          <div className="fullscreen-image-contain">
            <img
              src={
                fullscreenImageType == "input"
                  ? URL.createObjectURL(uploadedImage)
                  : processedImage
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
              onClick={() => downloadImage(fullscreenImageType)}
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
      <div className="project-process">
        Image Name:{" "}
        <div className="project-name-process">
          {uploadedImage ? uploadedImage.name : "No image selected"}
        </div>
        {(!isLoading && togglePreview)  && (
         <div className="process-page-dropdown-wrapper">
          <div className="process-page-dropdown">
            <div
              className="process-page-dropdown-header"
              onClick={toggleProcessPageDropdown}
            >
              {selectedProcessPageItem !== null
                ? processPageItems.find(
                    (item) => item.id === selectedProcessPageItem
                  ).label
                : "Select your model"}
              <i
                className={`fa fa-chevron-right process-page-icon ${
                  isProcessPageOpen && "process-page-open"
                }`}
              ></i>
            </div>
            <div
              className={`process-page-dropdown-body ${
                isProcessPageOpen && "process-page-open"
              }`}
            >
              {processPageItems.map((item) => (
                <div
                  className="process-page-dropdown-item"
                  onClick={() => handleProcessPageItemClick(item.id)}
                  key={item.id}
                >
                  <span
                    className={`process-page-dropdown-item-dot ${
                      item.id === selectedProcessPageItem &&
                      "process-page-selected"
                    }`}
                  >
                    •{" "}
                  </span>
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>)}
        
      </div>

      {processedImage && (
        <div className="toggles">
          <label className="toggles-label">
            <input
              className="toggles-input"
              type="radio"
              value="slider"
              checked={selectedOption === "slider"}
              onChange={(e) => handleOptionChange(e.target.value)}
            />
            Slider
          </label>
          <label className="toggles-label">
            <input
              className="toggles-input"
              type="radio"
              value="input"
              checked={selectedOption === "input"}
              onChange={(e) => handleOptionChange(e.target.value)}
            />
            Input
          </label>
          <label className="toggles-label">
            <input
              className="toggles-input"
              type="radio"
              value="processed"
              checked={selectedOption === "processed"}
              onChange={(e) => handleOptionChange(e.target.value)}
            />
            Processed
          </label>
        </div>
      )}

      {/* <div className="dropdown-menu">
        
      </div> */}
      {/* <div className="bkgimg">
        <img src="/images/kv_pc.jpg" alt="" />
      </div> */}
      {/* <div className="left">
        <div className="headingCenter">Input Image</div>
        <div className="image-container">
          {uploadedImage && <img src={URL.createObjectURL(uploadedImage)} />}
        </div>
        <div className="buttonsContainer">
          {!isLoading && (
            <IconButton
              component="label"
              htmlFor="upload-image"
              style={{ color: "#00033b" }}
            >
              <div className="buttonWithLabels">
                <CloudUpload />
                <input
                  type="file"
                  id="upload-image"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                />
                <div className="labelButtons">Choose Image</div>
              </div>
            </IconButton>
          )}
          {!isLoading && (
            <IconButton onClick={processImage} style={{ color: "green" }}>
              <div className="buttonWithLabels">
                <div className="labelButtons">Process Image</div>
                <ArrowForwardIcon />
              </div>
            </IconButton>
          )}
        </div>
      </div>
      <div className="right">
        <div className="headingCenter">Processed Image</div>
        
        <div className="image-container">
          {loader ? (
            <Loader
              type="bubble-loop"
              bgColor="blue"
              color="black"
              title={"Processing Image"}
              size={100}
            />
          ) : (
            processedImage && (
              <div>
                <img src={processedImage} alt="Processed" />
                
              </div>
            )
          )}
        </div>
        {processedImage && (
          <div>
            <IconButton
              onClick={downloadProcessedImage}
              style={{ color: "#00033b" }}
            >
              <div className="buttonWithLabels">
                <GetApp />
                <div className="labelButtons">Download Image</div>
              </div>
            </IconButton>
          </div>
        )}
        <h3 style={{ color: "red" }}>{isError}</h3>
      </div> */}
      <div
        className="slider-holder-single"
        style={{ width: 700, height: 390 }}
        // onMouseEnter={handleMouseEnter}
        // onMouseLeave={handleMouseLeave}
      >
        {togglePreview ? (
          <div className="image-container">
            {uploadedImage && (
              <div>
                <div
                // onMouseEnter={handleMouseEnterInput}
                // onMouseLeave={handleMouseLeaveInput}
                >
                  <div
                    className="fullscreenLeft"
                    onClick={() => toggleFullscreen("input")}
                  >
                    <FullscreenIcon style={{ color: "black" }} />
                  </div>
                  <img
                    src={URL.createObjectURL(uploadedImage)}
                    style={{ width: 700, height: 390 }}
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          // <Loader
          //   type="bubble-loop"
          //   bgColor="blue"
          //   color="black"
          //   title={"Processing Image"}
          //   size={100}
          // />

          <React.Fragment>
            {/* Preloader while processed image is loading */}
            {!processedImage ? (
              <div className="image-container">
                {uploadedImage && (
                  <div className="loaderHolder">
                    <Loader
                      type="bubble-loop"
                      bgColor="blue"
                      color="black"
                      title={"Processing Image"}
                      size={100}
                    />
                  </div>
                )}
              </div>
            ) : (
              <>
                {selectedOption == "slider" && (
                  <>
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
                      image1={processedImage}
                      image2={URL.createObjectURL(uploadedImage)}
                      leftLabelText={"Input Image"}
                      rightLabelText={"Processed Image"}
                      sliderColor="white"
                      handleColor="rgb(0, 3, 59)"
                      handleBackgroundColor="white"
                    />
                  </>
                )}
                {selectedOption == "input" && (
                  <>
                    <img
                      src={URL.createObjectURL(uploadedImage)}
                      style={{ width: 700, height: 390 }}
                    />
                  </>
                )}
                {selectedOption == "processed" && (
                  <>
                    <img
                      src={processedImage}
                      style={{ width: 700, height: 390 }}
                    />
                  </>
                )}
              </>
            )}
            {/* {isLoading && (
              
            )}
            {!isLoading && ()} */}
          </React.Fragment>
        )}
      </div>
      <div className="buttonsContainerSingle">
        {!isLoading && (
          <div className="firstRowButtons">
            <ProcessButton onClick={processImage} isProcessed={togglePreview} />
            {processedImage ? (
              <div>
                <button onClick={downloadSingleProcessedImage}>
                  Download Processed Image <GetApp></GetApp>
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        )}
        {!isLoading && (
          <IconButton
            component="label"
            htmlFor="upload-image"
            style={{ color: "#00033b" }}
          >
            <div className="buttonWithLabels">
              <CloudUpload />
              <input
                type="file"
                id="upload-image"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
              <div className="labelButtons">Choose another Image</div>
            </div>
          </IconButton>
        )}
      </div>
      {!showInfoSlider && (
        <div className="info">
          {/* <div>
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
          </div> */}
        </div>
      )}
    </div>
  );
};

export default ProcessPage;
