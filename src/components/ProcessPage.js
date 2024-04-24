import React, { useState } from "react";
import Loader from "react-js-loader";

import "../styles/ProcessPage.css";
import { useLocation } from "react-router-dom";
import axios from "axios";



const ProcessPage = () => {
  const { state } = useLocation();
  const uploadedImagePre = state.image;
  const [uploadedImage, setUploadedImage] = useState(
    URL.createObjectURL(uploadedImagePre)
  );

  const [processedImage, setProcessedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  
  const processImage = async () => {
    // Assuming you have an API call to process the image
    setIsError("");
    setIsLoading(true);
    try{

      // Mock API call
      const formData = new FormData();
      formData.append("image", state.image);
      
      // Send FormData using Axios
      const response = await axios.post("https://ty2e2cc7bt.ap-south-1.awsapprunner.com/upload", formData)
      // .then((response) => {
        //   setIsLoading(false);
        //   console.log("Response:", response.data);
        // })
        // .catch((error) => {
          //   // Handle error
          //   setIsError(error)
          //   console.error("Error:", error);
          // });
          
          // const response = await fetch("https://ty2e2cc7bt.ap-south-1.awsapprunner.com/upload",{
            //   method: 'POST',
            //   body: JSON.stringify({
              //     image: formData
              //   })
              // })
              
              // const result = await response.json();
              console.log("result",response.data);
              const processedImage = `data:image/png;base64, ${response?.data?.image}`;
              setProcessedImage(processedImage);
              // setTimeout(() => {
              //   // Mock processed image URL
              //   const processedImageUrl = "url_of_processed_image";
              //   setProcessedImage(processedImageUrl);
              //   setIsLoading(false);
              // }, 2000); // Simulating a delay of 2 seconds
            // };
          }
          catch(error) {
            alert(error.message);
          }
          finally{
    setIsLoading(false);

          }
        }
            
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
            processedImage && <img src={processedImage} alt="Processed"  height={100} width={400} />
          )}
        </div>
        <h3 style={{ color: "red" }}>{isError}</h3>
      </div>
    </div>
  );
};

export default ProcessPage;
