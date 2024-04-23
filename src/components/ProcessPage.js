import React, { useState } from "react";
import Loader from "react-js-loader";

import "../styles/ProcessPage.css";
import { useLocation } from "react-router-dom";

const ProcessPage = () => {
  const { state } = useLocation();
  const uploadedImagePre = state.image;
  const [uploadedImage, setUploadedImage] = useState(
    URL.createObjectURL(uploadedImagePre)
  );

  const [processedImage, setProcessedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const processImage = () => {
    // Assuming you have an API call to process the image
    setIsError("");
    setIsLoading(true);

    // Mock API call

    // const formData = new FormData();
    // formData.append("image", selectedFile);

    // // Send FormData using Axios
    // axios.post("your_api_endpoint", formData)
    //   .then((response) => {
    //     setIsLoading(false);
    //     console.log("Response:", response.data);
    //   })
    //   .catch((error) => {
    //     // Handle error
    //     setIsError(error)
    //     console.error("Error:", error);
    //   });

    setTimeout(() => {
      // Mock processed image URL
      const processedImageUrl = "url_of_processed_image";
      setProcessedImage(processedImageUrl);
      setIsLoading(false);
    }, 2000); // Simulating a delay of 2 seconds
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
    setProcessedImage(null);
  };

  return (
    <div className="main">
      <div className="bkgimg">
        <img src="/images/kv_pc.jpg" alt="" />
      </div>
      <div className="left">
        <h2>Uploaded Image</h2>
        <div className="image-container">
          {uploadedImage && <img src={uploadedImage} />}
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
  );
};

export default ProcessPage;
