import React, { useState } from "react";
import Loader from "react-js-loader";
import "../styles/ProcessPage.css";
import axios from "axios";

const ProcessPage = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
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
        <h2>Uploaded Image</h2>
        <div className="image-container">
          {uploadedImage && <img src={URL.createObjectURL(uploadedImage)} />}
        </div>
        <div className="buttonsContainer">
          {!isLoading && (
            <input
              type="file"
              className="inputTag"
              accept="image/*"
              onChange={handleImageUpload}
            />
          )}
          {!isLoading && <button onClick={processImage}>Process Image</button>}
        </div>
      </div>
      <div className="right">
        <h2>Processed Image</h2>
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
                <button onClick={downloadProcessedImage}>Download</button>
              </div>
            )
          )}
        </div>
        <h3 style={{ color: "red" }}>{isError}</h3>
      </div>
    </div>
  );
};

export default ProcessPage;
