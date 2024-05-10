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
  const [showInfoTip, toggleInfo] = useState(false);

  const SetViewbutton = () => {
    if (viewMore === true) {
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
        <div className="mainContainer">
          <div className="bkgimg">
            <img src="/images/kv_pc.jpg" alt="" />
          </div>
          <div className="leftNavRow">
            <div className="headingLeft">Uploaded Images</div>

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
          </div>

          <div className="ProcessedImageRow">
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
                  {/* <div className="labelButtons">Get Info</div> */}
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
          </div>
        </div>
      )}
    </>
  );
}

export default ZipProcess;
