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
import ImageSlider from "react-image-comparison-slider";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";
import axios from "axios";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import ProcessButton from "./ProcessButton";

function ZipProcess() {
  const { state } = useLocation();
  try {
    var data = state.data;
    var data = JSON.stringify(data);
    var zipFileName = state.zipFileName;
    sessionStorage.setItem("zipFileName", zipFileName);
    sessionStorage.setItem("data", data);
  } catch {
    var data = sessionStorage.getItem("data", data);
    var zipFileName = sessionStorage.getItem("zipFileName");
  }

  var { original_images, processed_images, image_details } = JSON.parse(data);
  // const zipFileName = state.zipFileName;
  const [pageLoader, setpageLoader] = useState(false);
  const [viewMore, setviewMore] = useState(false);
  const [showInfoSlider, setInfoSlider] = useState(true);
  const [imageDetails, showimageDetails] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenImageType, setFullscreenImageType] = useState("input");
  debugger;
  console.log(processed_images);
  const keys = Object.keys(processed_images);
  const firstKey = keys[0];
  console.clear();
  console.log(processed_images);

  // console.log(firstKey)
  // const [selectedImage, setselectedImage] = useState(113);
  const [selected, setselected] = useState(firstKey);
  console.log(selected);
  const [showInfoTip, toggleInfo] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  const [selectedOption, setSelectedOption] = useState("slider");
  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const toggleFullscreen = (type) => {
    setIsFullscreen(!isFullscreen);
    setFullscreenImageType(type);
  };
  const SetViewbutton = () => {
    if (viewMore === true) {
      setviewMore(false);
      console.log("hi");
      console.log(jsonData.original_images);
    } else {
      setviewMore(true);
    }
  };
  const handleMouseEnter = () => {
    setInfoSlider(false);
  };

  const handleMouseLeave = () => {
    setInfoSlider(true);
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
  const downloadImage = (imageData, filename) => {
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
    link.download = `${filename.slice(0, -4)}_${selected}.png`;
    link.href = imageUrl;
    link.click();

    // Clean up by revoking the temporary URL
    URL.revokeObjectURL(imageUrl);
  };

  let input_image = `data:image/png;base64, ${
    original_images[parseInt(selected)]
  }`;
  let processed_image = `data:image/png;base64, ${
    processed_images[parseInt(selected)]
  }`;

  const handleZipChange = async (e) => {
    const selectedFile = e.target.files[0];
    const zipFileName = selectedFile.name; // Get the name of the zip file
    if (selectedFile.type !== "application/x-zip-compressed") {
      alert("Please select a zip file.");
      return;
    }
    setIsLoading(true);
    setIsError("");
    console.log(selectedFile);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const response = await axios.post(
        "https://dvegmk6pcy.ap-south-1.awsapprunner.com/upload_zip",
        formData
      );
      setIsLoading(false);
      // navigate("/zipprocess", { state: { data: response.data, zipFileName } }); // Pass zipFileName along with response.data
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const modelsList = [
    { id: 0, label: "Tensorflow" },
    { id: 1, label: "PyTorch" },
  ];
  const projectsList = [
    { id: 0, label: "Project 1" },
    { id: 1, label: "Project 2" },
  ];
  const [isProcessPageOpen, setProcessPageOpen] = useState(false);
  const [isProjectsOpen, setProjectsOpen] = useState(false);
  const [processPageItems, setProcessPageItems] = useState(modelsList);
  const [projectsItems, setProjectItems] = useState(projectsList);
  const [selectedProcessPageItem, setSelectedProcessPageItem] = useState(null);
  const [selectedProjectsItem, setSelectedProjectsItem] = useState(null);

  const toggleProjectsDropdown = () => setProjectsOpen(!isProjectsOpen);
  const toggleProcessPageDropdown = () =>
    setProcessPageOpen(!isProcessPageOpen);

  const handleProcessPageItemClick = (id) => {
    selectedProcessPageItem === id
      ? setSelectedProcessPageItem(null)
      : setSelectedProcessPageItem(id);
    setProcessPageOpen(!isProcessPageOpen);
  };

  const handleProjectsItemClick = (id) => {
    selectedProjectsItem === id
      ? setSelectedProjectsItem(null)
      : setSelectedProjectsItem(id);
    setProjectsOpen(!isProjectsOpen);
  };
  const toggleIsLoading=()=>{
    setIsLoading(!isLoading);
  }
  return (
    <>
      {!isLoading ? (
        <div className="mainContainerOne">
          <div className="before-process-header">
            <div className="project">
              File name:{" "}
              <div className="project-name">{zipFileName.slice(0, -4)}</div>
            </div>
            <div className="parameter-wrapper">
              Select Project:{" "}
              <div className="process-page-dropdown-wrapper">
                <div className="process-page-dropdown">
                  <div
                    className="process-page-dropdown-header"
                    onClick={toggleProjectsDropdown}
                  >
                    {selectedProjectsItem !== null
                      ? `
                      ${
                        projectsItems.find(
                          (item) => item.id === selectedProjectsItem
                        ).label
                      }`
                      : "Select your parameters"}
                    <MdOutlineKeyboardArrowRight
                      className={`process-page-icon ${
                        isProjectsOpen && "process-page-open"
                      }`}
                    ></MdOutlineKeyboardArrowRight>
                  </div>
                  <div
                    className={`process-page-dropdown-body ${
                      isProjectsOpen && "process-page-open"
                    }`}
                  >
                    {projectsItems.map((item) => (
                      <div
                        className="process-page-dropdown-item"
                        onClick={() => handleProjectsItemClick(item.id)}
                        key={item.id}
                      >
                        <span
                          className={`process-page-dropdown-item-dot ${
                            item.id === selectedProjectsItem &&
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
              </div>
              Select Model:{" "}
              <div className="process-page-dropdown-wrapper">
                <div className="process-page-dropdown">
                  <div
                    className="process-page-dropdown-header"
                    onClick={toggleProcessPageDropdown}
                  >
                    {selectedProcessPageItem !== null
                      ? `${
                          processPageItems.find(
                            (item) => item.id === selectedProcessPageItem
                          ).label
                        }`
                      : "Select your parameters"}
                    <MdOutlineKeyboardArrowRight
                      className={`process-page-icon ${
                        isProcessPageOpen && "process-page-open"
                      }`}
                    ></MdOutlineKeyboardArrowRight>
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
              </div>
            </div>
          </div>

          <div className="before-process-leftNavRow ">
            {/* <div className="headingLeft">Uploaded Images</div> */}
            <div className="before-process-image-table">
              {Object.keys(original_images).map((key) => (
                <ThumbImage
                  key={key}
                  imageId={key}
                  input_image={original_images[key]}
                  setImage={setImage}
                  isSelected={parseInt(key) === parseInt(selected)}
                />
              ))}
            </div>
            Preview of zipped Images
          </div>
          <div className="before-process-button" ><ProcessButton onClick={toggleIsLoading} isProcessed={true} /></div>
          
        </div>
      ) : (
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
            // <div className="mainContainer">
            <div className="mainContainerOne">
              <div className="project">
                File name:{" "}
                <div className="project-name">{zipFileName.slice(0, -4)}</div>
              </div>

              {/* {!pageLoader && (<div className="dropdownViewer">
            <select
              value={selectedOption}
              onChange={(e) => handleOptionChange(e.target.value)}
            >
              <option value="slider">Slider</option>
              <option value="input">Input</option>
              <option value="processed">Processed</option>
            </select>
          </div>)} */}

              {/* {!pageLoader && (
            <div className="radioButtonViewer">
              <label>
                <input 
                  type="radio"
                  value="slider"
                  checked={selectedOption === "slider"}
                  onChange={(e) => handleOptionChange(e.target.value)}
                />
                Slider
              </label>
              <label>
                <input 
                  type="radio"
                  value="input"
                  checked={selectedOption === "input"}
                  onChange={(e) => handleOptionChange(e.target.value)}
                />
                Input
              </label>
              <label>
                <input
                  type="radio"
                  value="processed"
                  checked={selectedOption === "processed"}
                  onChange={(e) => handleOptionChange(e.target.value)}
                />
                Processed
              </label>
            </div>
          )} */}

              {!pageLoader && (
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

              <div className="leftNavRow">
                {/* <div className="headingLeft">Uploaded Images</div> */}
                <div className="image-table">
                  {Object.keys(original_images).map((key) => (
                    <ThumbImage
                      key={key}
                      imageId={key}
                      input_image={original_images[key]}
                      setImage={setImage}
                      isSelected={parseInt(key) === parseInt(selected)}
                    />
                  ))}
                </div>
              </div>
              <div className="buttonsPrevNext">
                <div className="buttonHolder">
                  <div className="buttonWithLabels">
                    <IconButton onClick={setPreviousImage}>
                      <ArrowBack style={{ color: "rgb(13, 25, 114)" }} />
                    </IconButton>
                  </div>
                  <div className="labelButtons">
                    Previous <br></br> Image
                  </div>
                </div>

                {isFullscreen && (
                  <div className="fullscreen-overlay">
                    <div className="fullscreen-image-container">
                      <img
                        src={
                          fullscreenImageType === "input"
                            ? input_image
                            : processed_image
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
                        onClick={() => {
                          const imageData =
                            fullscreenImageType === "input"
                              ? original_images[parseInt(selected)]
                              : processed_images[parseInt(selected)];
                          const filename =
                            fullscreenImageType === "input"
                              ? "input_image.png"
                              : "processed_image.png";
                          downloadImage(imageData, filename);
                        }}
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
                <React.Fragment>
                  {selectedOption == "slider" && (
                    <div
                      className="slider-holder"
                      style={{ width: 700, height: 400, position: "relative" }}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
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
                        image1={processed_image}
                        image2={input_image}
                        leftLabelText={"Input Image"}
                        rightLabelText={"Processed Image"}
                        sliderColor="white"
                        handleColor="rgb(0, 3, 59)"
                        handleBackgroundColor="white"
                      />
                      <div className="image-name">
                        <div className="image-name"> {selected}.jpg</div>
                      </div>
                    </div>
                  )}
                  {selectedOption == "input" && (
                    <>
                      <img
                        src={input_image}
                        style={{ width: 700, height: 400 }}
                      />
                    </>
                  )}
                  {selectedOption == "processed" && (
                    <>
                      <img
                        src={processed_image}
                        style={{ width: 700, height: 400 }}
                      />
                    </>
                  )}
                </React.Fragment>
                <div className="buttonHolder">
                  <div className="buttonWithLabels">
                    <IconButton onClick={setNextImage}>
                      <ArrowForward style={{ color: "rgb(13, 25, 114)" }} />
                    </IconButton>
                  </div>
                  <div className="labelButtons">
                    Next <br></br> Image
                  </div>
                </div>
                {/* <IconButton onClick={setNextImage}>
              <div className="buttonWithLabels">
                <div className="labelButtons">Next Image</div>
                <ArrowForward />
              </div>
            </IconButton> */}
              </div>
              <div className="downloadZipPage">
                <button
                  onClick={() => {
                    const imageData = processed_images[parseInt(selected)];
                    const filename = "processed_image.png";
                    downloadImage(imageData, filename);
                  }}
                >
                  Download Processed Image <GetApp></GetApp>
                </button>
              </div>
              {/* {!!showInfoTip && (
            <Tooltip
              id="image-tooltip"
              place="left"
              variant="info"
              html={`Dimension : ${image_details.image_dimensions} <br>
        Name : ${image_details.model_name} <br>
        Type : ${image_details.model_type} <br>
        Upload Date : ${image_details.model_upload_date}`}
            />
          )} */}
              {!showInfoSlider && (
                <div className="info">
                  <div>
                    <strong>Dimension:</strong> {image_details.image_dimensions}
                  </div>
                  <div>
                    <strong>Name:</strong> {image_details.model_name}
                  </div>
                  <div>
                    <strong>Type:</strong> {image_details.model_type}
                  </div>
                  <div>
                    <strong>Upload Date:</strong>{" "}
                    {image_details.model_upload_date}
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
      ;
    </>
  );
}

export default ZipProcess;
