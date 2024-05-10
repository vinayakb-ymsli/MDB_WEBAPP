import React, { useState } from "react";
import "../styles/ZipProcess.css";
import ThumbImage from "./ThumbImage";
import Loader from "./Loader";
import { useLocation } from "react-router-dom";
import Image from "./Image";
import jsonData from "./test.json";
import { Tooltip } from "react-tooltip";

function ZipProcess() {
  const { state } = useLocation();
  const { original_images, processed_images, image_details } = state.data;
  const [pageLoader, setpageLoader] = useState(false);
  const [viewMore, setviewMore] = useState(false);
  const [imageDetails, showimageDetails] = useState(true);
  const keys = Object.keys(jsonData.processed_images);
  const firstKey = keys[0];
  console.clear();
  console.log(original_images);

  // console.log(firstKey)
  const [selectedImage, setselectedImage] = useState(113);
  const [selected, setselected] = useState(firstKey);

  const SetViewbutton = () => {
    if (viewMore == true) {
      setviewMore(false);
      console.log("hi");
      console.log(jsonData.original_images);
    } else {
      setviewMore(true);
    }
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
      link.download = "processed_image.png";
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

  return (
    <>
      {pageLoader ? (
        <>
          <Loader />
        </>
      ) : (
        <div className="mainContainer">
          <div className="leftNavRow">
            {Object.keys(original_images).map((key) => (
              // Render each image using an img tag
              <ThumbImage
                key={key}
                imageId={key}
                input_image={original_images[key]}
                setImage={setImage}
              />
            ))}
          </div>

          <div className="inputImageRow">
            <Image
              key={"oi_" + selected}
              input_image={original_images[selected]}
              image_details={undefined}
            />
            <div className="buttonsPrevNext">
              <button onClick={setPreviousImage}>Previous</button>
              <button onClick={setNextImage}>Next</button>
            </div>
          </div>

          <div className="ProcessedImageRow">
            <div>
              <Image
                key={"pi" + selected}
                input_image={processed_images[parseInt(selected)]}
                image_details={image_details}
              />
              {!!showimageDetails && (
                <Tooltip
                  id="image-tooltip"
                  place="bottom"
                  variant="info"
                  html={`Dimension : ${image_details.image_dimensions} <br>
        Name : ${image_details.model_name}`}
                />
              )}
            </div>

            <div className="buttonsPrevNext">
              <button onClick={downloadProcessedImage}>Download</button>
              <button onClick={showInfo}>Image Info</button>
            </div>

            {/* <button onClick={SetViewbutton}>View Details </button>
                    {viewMore ?
                        <div className="details">

                        </div>
                        : <></>
                    } */}
          </div>
        </div>
      )}
    </>
  );
}

export default ZipProcess;
