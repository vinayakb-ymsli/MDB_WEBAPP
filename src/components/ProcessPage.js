import React, { useState } from "react";
import Loader from "react-js-loader";
import "../styles/ProcessPage.css";
import axios from "axios";
import { IconButton } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { CloudUpload, GetApp } from "@material-ui/icons";
import { useLocation } from "react-router-dom";
import ImageSlider from "react-image-comparison-slider";

const ProcessPage = () => {
  const { state } = useLocation();
  const image = state.data;
  const [uploadedImage, setUploadedImage] = useState(image);
  const [processedImage, setProcessedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isError, setIsError] = useState("");
  const [showInfoSlider, setInfoSlider] = useState(true);

  const processImage = async () => {
    setIsError("");
    setIsLoading(true);
    setLoader(true);
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
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(file);
    setProcessedImage(null);
  };

  const downloadProcessedImage = () => {
    if (processedImage) {
      const link = document.createElement("a");
      link.download = "processed_image.png";
      link.href = processedImage;
      link.click();
    }
  };

  const handleMouseEnter = () => {
    setInfoSlider(false);
  };

  const handleMouseLeave = () => {
    setInfoSlider(true);
  };

  return (
    <div className="main">
      <div className="project">
        Image Name:{" "}
        <div className="project-name">
          {uploadedImage ? uploadedImage.name : "No image selected"}
        </div>
      </div>
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
        className="slider-holder"
        style={{ width: 700, height: 450 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {!processedImage ? (
          <div className="image-container" >
            {uploadedImage && <img src={URL.createObjectURL(uploadedImage)} style={{ width: 700, height: 450 }} />}
          </div>
        ) : (
          // <Loader
          //   type="bubble-loop"
          //   bgColor="blue"
          //   color="black"
          //   title={"Processing Image"}
          //   size={100}
          // />
          
          
          <ImageSlider
            image1={URL.createObjectURL(uploadedImage)}
            image2={processedImage}
            leftLabelText={"Input Image"}
            rightLabelText={"Processed Image"}
            sliderColor="white"
            handleColor="rgb(0, 3, 59)"
            handleBackgroundColor="white"
          />
        )}
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
