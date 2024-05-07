import React, { useState } from "react";
import Loader from "react-js-loader";

import "../styles/ProcessPage.css";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ProcessPage = () => {
  const { state } = useLocation();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const imageObjects = state.zip.map((img) =>
    URL.createObjectURL(img.fileData)
  );

  const [uploadedImage, setUploadedImage] = useState(
    imageObjects[selectedImageIndex]
  );

  const [processedImage, setProcessedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  const processImage = async () => {
    setIsError("");
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", state.zip[selectedImageIndex]["fileData"]);
      const response = await axios.post(
        "https://ty2e2cc7bt.ap-south-1.awsapprunner.com/upload",
        formData
      );
      console.log("result", response.data);
      const processedImage = `data:image/png;base64, ${response?.data?.image}`;
      setProcessedImage(processedImage);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageSelect = (index) => {
    setSelectedImageIndex(index);
    setUploadedImage(imageObjects[index]);
    setProcessedImage(null);
  };

  return (
    <div className="main">
      <div className="bkgimg">
        <img src="/images/kv_pc.jpg" alt="" />
      </div>

      <div className="pageContainer">
        <div className="selectingContainer">
          {[...Array(5)].map((_, index) => (
            <img
              className="selectionImage"
              key={index}
              src={imageObjects[index]}
              onClick={() => handleImageSelect(index)}
              style={{ opacity: index < imageObjects.length ? 1 : 0.5 }}
            />
          ))}
        </div>
        <div className="image-container-selector">
          <h2>Selected Image</h2>
          <div className="image-container">
            {uploadedImage && <img src={uploadedImage} />}
          </div>
          <div className="buttonsContainer">
            {!isLoading && (
              <button onClick={processImage}>Process Image</button>
            )}
          </div>
        </div>
        <div className="right">
          <h2>Processed Image</h2>
          <div className="image-container">
            {isLoading ? (
              <Loader
                type="bubble-loop"
                bgColor="blue"
                color="black"
                title={"Processing Image"}
                size={100}
              />
            ) : (
              processedImage && <img src={processedImage} alt="Processed" />
            )}
          </div>
          <h3 style={{ color: "red" }}>{isError}</h3>
        </div>
      </div>
    </div>
  );
};

export default ProcessPage;
