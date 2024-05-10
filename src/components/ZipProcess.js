import React, { useState } from "react";
import "../styles/ZipProcess.css";
import ThumbImage from "./ThumbImage";
import Loader from "./Loader";
import { useLocation } from "react-router-dom";
import Image from "./Image";
import jsonData from "./test.json";

function ZipProcess() {
  const { state } = useLocation();
  const { original_images, processed_images, image_details } = state.data;
  const [pageLoader, setpageLoader] = useState(false);
  const [viewMore, setviewMore] = useState(false);
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
            <Image
              key={"pi" + selected}
              input_image={processed_images[parseInt(selected)]}
              image_details={image_details}
            />

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
