import React, { useState, useEffect } from "react";
import "../styles/ZipProcess.css";
import ThumbImage from "./ThumbImage";
import Loader from "react-js-loader";
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
import { AiOutlineFileZip } from "react-icons/ai";

function ZipProcess() {
  const [res_data, setResData] = useState(null);
  const [selected, setselected] = useState(0);
  const { state } = useLocation();
  const inputFile = state.data;
  const zipFileName=inputFile.name
  const [preLoader, setPreLoader] = useState(false);
  const [original_images, setOriginalImages] = useState({});
  const [processed_images, setProcessedImages] = useState({});
  const [image_details, setImageDetails] = useState({});
  const [keys, setKeys] = useState([]);
  const [input_image, setInputImage] = useState("");
  const [processed_image, setProcessedImage] = useState("");
  const [pageLoader, setpageLoader] = useState(false);
  const [viewMore, setviewMore] = useState(false);
  const [showInfoSlider, setInfoSlider] = useState(true);
  const [imageDetails, showimageDetails] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenImageType, setFullscreenImageType] = useState("input");
  const [showInfoTip, toggleInfo] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [selectedOption, setSelectedOption] = useState("slider");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setPreLoader(true);
        const selectedFile = inputFile;
        const zipFileName = selectedFile.name;

        if (selectedFile.type !== "application/x-zip-compressed") {
          alert("Please select a zip file.");
          return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);
        const response = await axios.post(
          "https://dvegmk6pcy.ap-south-1.awsapprunner.com/upload_zip",
          formData
        );

        sessionStorage.setItem("zipFileName", zipFileName);
        sessionStorage.setItem("data", JSON.stringify(response.data));
        setResData(response.data);
      } catch (error) {
        alert(error.message);
      } finally {
        setPreLoader(false);
      }
    };

    if (inputFile) {
      fetchData();
    }
  }, [inputFile]);

  useEffect(() => {
    if (res_data) {
      const originalImages = res_data.original_images;
      const processedImages = res_data.processed_images;
      const imageDetails = res_data.image_details;
      const keys = Object.keys(processedImages);
      const firstKey = keys[0];
      
      setOriginalImages(originalImages);
      setProcessedImages(processedImages);
      setImageDetails(imageDetails);
      setKeys(keys);
      setselected(firstKey);
      
      setInputImage(`data:image/png;base64, ${originalImages[firstKey]}`);
      setProcessedImage(`data:image/png;base64, ${processedImages[firstKey]}`);
    }
  }, [res_data]);

  const handleZipChange = () => {
    setIsLoading(true);
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const toggleFullscreen = (type) => {
    setIsFullscreen(!isFullscreen);
    setFullscreenImageType(type);
  };

  const handleMouseEnter = () => {
    setInfoSlider(false);
  };

  const handleMouseLeave = () => {
    setInfoSlider(true);
  };

  const setImage = (key) => {
    setselected(key);
    setInputImage(`data:image/png;base64, ${original_images[key]}`);
    setProcessedImage(`data:image/png;base64, ${processed_images[key]}`);
  };

  const setPreviousImage = () => {
    const index = keys.indexOf(selected);
    if (index > 0) {
      setselected(keys[index - 1]);
      setImage(keys[index - 1]);
    }
  };

  const setNextImage = () => {
    const index = keys.indexOf(selected);
    if (index < keys.length - 1) {
      setselected(keys[index + 1]);
      setImage(keys[index + 1]);
    }
  };

  const downloadImage = (imageData, filename) => {
    const base64String = imageData.replace("data:image/png;base64,", "");
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "image/png" });
    const imageUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `${filename.slice(0, -4)}_${selected}.png`;
    link.href = imageUrl;
    link.click();
    URL.revokeObjectURL(imageUrl);
  };

  const modelsList = [
    { id: 0, label: "Tensorflow" },
    { id: 1, label: "PyTorch" },
  ];
  const projectsList = [
    { id: 0, label: "Project 1" },
    { id: 1, label: "Project 2" },
  ];

  const clientsList = [
    { id: 0, label: "YMSLI" },
    { id: 1, label: "Google" },
  ];
  
  const [isProcessPageOpen, setProcessPageOpen] = useState(false);
  const [isProjectsOpen, setProjectsOpen] = useState(false);
  const [isClientsOpen, setClientsOpen] = useState(false); 
  const [processPageItems, setProcessPageItems] = useState(modelsList);
  const [projectsItems, setProjectItems] = useState(projectsList);
  const [clientItems, setClientItems] = useState(clientsList);
  const [selectedClientItem, setSelectedClientItem] = useState(null);
  const [selectedProcessPageItem, setSelectedProcessPageItem] = useState(null);
  const [selectedProjectsItem, setSelectedProjectsItem] = useState(null);

  const toggleClientsDropdown = () => setClientsOpen(!isClientsOpen);
  const toggleProjectsDropdown = () => setProjectsOpen(!isProjectsOpen);
  const toggleProcessPageDropdown = () => setProcessPageOpen(!isProcessPageOpen);

  const handleClientItemClick = (id) => {
    selectedClientItem === id
      ? setSelectedClientItem(null)
      : setSelectedClientItem(id);
      setClientsOpen(!isClientsOpen);
  };

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
  return (
    <>
      {!isLoading ? (
        <div className="mainContainerOne">
          <div className="before-process-header">
            <div className="project">
              File name: <div className="project-name">{zipFileName}</div>
            </div>
            <div className="parameter-wrapper">
            Select Client:{" "}
            <div className="process-page-dropdown-wrapper">
              <div className="process-page-dropdown">
                <div
                  className="process-page-dropdown-header"
                  onClick={toggleClientsDropdown}
                >
                  {selectedClientItem !== null 
                    ? `${
                      clientItems.find(
                        (item) => item.id === selectedClientItem
                      ).label
                    }`
                    : "Select your parameters"}
                  <MdOutlineKeyboardArrowRight
                    className={`process-page-icon ${
                      isClientsOpen && "process-page-open"
                    }`}
                  ></MdOutlineKeyboardArrowRight>
                </div>
                <div
                  className={`process-page-dropdown-body ${
                    isClientsOpen && "process-page-open"
                  }`}
                >
                  {clientItems.map((item) => (
                    <div
                      className="process-page-dropdown-item"
                      onClick={() => handleClientItemClick(item.id)}
                      key={item.id}
                    >
                      <span
                        className={`process-page-dropdown-item-dot ${
                          item.id === selectedClientItem &&
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
          <div className="file-name-wrapper">
            <div className="before-process-leftNavRow ">
              {/* <div className="headingLeft">Uploaded Images</div> */}
              {/* ZipFile Slected */}
              <div className="name-holder">
                <AiOutlineFileZip className="zip-file-icon" />{" "}
                <div>{zipFileName}</div>
              </div>
              Please select your paramters
            </div>
            <div className="before-process-button">
              <ProcessButton onClick={handleZipChange} isProcessed={true} />
            </div>
          </div>
        </div>
      ) : (
        <>
          {preLoader ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "600px",
                width: "100%",
                backgroundColor: "white",
              }}
            >
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
                File name: <div className="project-name">{zipFileName}</div>
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
                  {console.log(original_images)}
                  {original_images &&
                    Object.keys(original_images).map((key) => (
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
