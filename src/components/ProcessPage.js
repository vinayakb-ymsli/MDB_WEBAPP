import React, { useState } from "react";
import Loader from "react-js-loader";
import "../styles/ProcessPage.css";
import axios from "axios";
import { IconButton } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { CloudUpload, GetApp } from "@material-ui/icons";
import { useLocation } from "react-router-dom";

const ProcessPage = () => {
  const {state} = useLocation();
  const image =state.data
  const [uploadedImage, setUploadedImage] = useState(image);
  const [processedImage, setProcessedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isError, setIsError] = useState("");

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

  return (
    <div className="main">
      <div className="bkgimg">
        <img src="/images/kv_pc.jpg" alt="" />
      </div>
      <div className="left">
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
        {/* <h3>Processed Image</h3> */}
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
                {/* <button onClick={downloadProcessedImage}>Download</button> */}
              </div>
            )
          )}
        </div>
        {processedImage && (
          <div>
          <IconButton onClick={downloadProcessedImage} style={{ color: "#00033b" }}>
          <div className="buttonWithLabels">
            <GetApp />
            <div className="labelButtons">Download Image</div>
            </div>
          </IconButton>
        </div>
        )}
        <h3 style={{ color: "red" }}>{isError}</h3>
      </div>
    </div>
  );
};

export default ProcessPage;
