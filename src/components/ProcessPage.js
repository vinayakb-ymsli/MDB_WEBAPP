import React, { useState, useEffect } from "react";
import Loader from "react-js-loader";
import "../styles/ProcessPage.css";
import axios from "axios";
import { IconButton } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { CloudUpload, GetApp } from "@material-ui/icons";
import { useLocation } from "react-router-dom";
import ImageSlider from "react-image-comparison-slider";
import ProcessButton from "./ProcessButton";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import request from "superagent";

const ProcessPage = () => {
  const { state } = useLocation();
  let image;
  try {
    if (state.data == null) {
      image = sessionStorage.getItem("image");
    } else {
      image = state.data;
      sessionStorage.setItem("image", image);
    }
  } catch {
    image = null;
  }

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
  const [clients, setClients] = useState([]);

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
  const toggleProcessPageDropdown = () =>
    setProcessPageOpen(!isProcessPageOpen);

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
  // -------------------------------------------
  async function fetchClientData() {
    try {
      const response = await request
        .get("https://ejmnmassds.ap-south-1.awsapprunner.com/contents")
        .set("Content-Type", "application/json")
        .query({
          folder_name: "",
        });

      const data = response.body;
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
    // return data
  }

  function parseClientData(data) {
    const clients = {};

    data.forEach((path) => {
      const parts = path.split("/").filter((part) => part);

      // if (parts.length === 1) {
      //   // Skip root directories (e.g., "Model_files/")
      //   return;
      // }

      const [clientName, projectName, modelName] = parts;

      if (!clients[clientName]) {
        clients[clientName] = {};
      }

      if (projectName) {
        if (!clients[clientName][projectName]) {
          clients[clientName][projectName] = new Set();
        }

        if (modelName) {
          clients[clientName][projectName].add(modelName);
        }
      }
    });

    const result = Object.keys(clients).map((clientName) => ({
      clientName,
      projects: Object.keys(clients[clientName]).map((projectName) => ({
        projectName,
        models: Array.from(clients[clientName][projectName]),
      })),
    }));

    console.log(result);
    setClients(result);
  }

  async function fetchClients() {
    const data = await fetchClientData();
    const clients = parseClientData(data);
    console.log(clients);
    // return clients;
  }

  useEffect(() => {
    // Fetch data from API when component mounts for the first time
    fetchClients();
  }, []);

  useEffect(() => {
    // Store clients data in local storage
    localStorage.setItem("clients", JSON.stringify(clients));
  }, [clients]);

  const [uploadedImage, setUploadedImage] = useState(image);
  const [processedImage, setProcessedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isError, setIsError] = useState("");
  const [showInfoSlider, setInfoSlider] = useState(true);
  const [showLoaderSlider, setLoaderSlider] = useState(false);
  const [togglePreview, setPreview] = useState(true);
  const [hoverOnInput, setHoverOnInput] = useState(false);
  const [fullscreenImageType, setFullscreenImageType] = useState("input");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = (type) => {
    setIsFullscreen(!isFullscreen);
    setFullscreenImageType(type);
  };

  const processImage = async () => {
    setPreview(false);
    setIsError("");
    setIsLoading(true);
    setLoader(true);
    setLoaderSlider(true);
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
      setLoaderSlider(false);
    }
  };

  const handleMouseEnterInput = () => {
    setHoverOnInput(true);
  };

  const handleMouseLeaveInput = () => {
    setHoverOnInput(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(file);
    setProcessedImage(null);
    setPreview(true);
  };

  const downloadImage = (imageType) => {
    const imageToDownload =
      imageType === "input" ? uploadedImage : processedImage;
    if (imageToDownload) {
      const link = document.createElement("a");
      link.download =
        imageType === "input"
          ? `input_image_${
              uploadedImage ? uploadedImage.name : "No image selected"
            }`
          : `processed_image_${
              uploadedImage ? uploadedImage.name : "No image selected"
            }`;
      if (imageType === "input") {
        link.href = URL.createObjectURL(imageToDownload);
      } else {
        link.href = imageToDownload;
      }

      link.click();
    }
  };

  const downloadSingleProcessedImage = () => {
    const imageToDownload = processedImage;
    const link = document.createElement("a");
    link.download = `processed_image_${
      uploadedImage ? uploadedImage.name : "No image selected"
    }`;

    link.href = imageToDownload;

    link.click();
  };

  const handleMouseEnter = () => {
    setInfoSlider(false);
  };

  const handleMouseLeave = () => {
    setInfoSlider(true);
  };

  const [selectedOption, setSelectedOption] = useState("slider");

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    // Retrieve clients array from local storage
    const storedClients = JSON.parse(localStorage.getItem("clients"));
    if (storedClients) {
      setClients(storedClients);
    }
  }, []);
  // const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);

  // Function to handle client selection
  const handleClientSelection = (clientName) => {
    setSelectedClient(clientName);
    setSelectedProject(null); // Reset selected project
    setSelectedModel(null); // Reset selected model
  };

  // Function to handle project selection
  const handleProjectSelection = (projectName) => {
    setSelectedProject(projectName);
    setSelectedModel(null); // Reset selected model
  };

  // Function to handle model selection
  const handleModelSelection = (modelName) => {
    setSelectedModel(modelName);
  };

  useEffect(() => {
    // Retrieve clients array from local storage
    const storedClients = JSON.parse(localStorage.getItem("clients"));
    if (storedClients) {
      setClients(storedClients);
    }
  }, []);
  return (
    <div className="main">
      {isFullscreen && (
        <div className="fullscreen-over">
          <div className="fullscreen-image-contain">
            <img
              src={
                fullscreenImageType === "input"
                  ? URL.createObjectURL(uploadedImage)
                  : processedImage
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
              onClick={() => downloadImage(fullscreenImageType)}
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
      <div className="project-process">
        Image Name:{" "}
        <div className="project-name-process">
          {uploadedImage ? uploadedImage.name : "No image selected"}
        </div>
        Select Client:{" "}
        <div className="process-page-dropdown-wrapper">
          <div className="process-page-dropdown">
            <div className="process-page-dropdown-header">
              <select
                value={selectedClient}
                onChange={(e) => handleClientSelection(e.target.value)}
                className="process-page-dropdown-select"
              >
                <option value="">Select Client</option>
                {clients.map((client) => (
                  <option key={client.clientName} value={client.clientName}>
                    {client.clientName}
                  </option>
                ))}
              </select>
              {/* <MdOutlineKeyboardArrowRight
                className={`process-page-icon ${
                  selectedClient ? "process-page-open" : ""
                }`}
              ></MdOutlineKeyboardArrowRight> */}
            </div>
          </div>
        </div>
        {selectedClient && (
          <div className="parameter-wrapper">
            Select Project:{" "}
            <div className="process-page-dropdown-wrapper">
              <div className="process-page-dropdown">
                <div className="process-page-dropdown-header">
                  <select
                    value={selectedProject}
                    onChange={(e) => handleProjectSelection(e.target.value)}
                    className="process-page-dropdown-select"
                  >
                    <option value="">Select Project</option>
                    {clients
                      .find((client) => client.clientName === selectedClient)
                      .projects.map((project) => (
                        <option
                          key={project.projectName}
                          value={project.projectName}
                        >
                          {project.projectName}
                        </option>
                      ))}
                  </select>
                  {/* <MdOutlineKeyboardArrowRight
                    className={`process-page-icon ${
                      selectedProject ? "process-page-open" : ""
                    }`}
                  ></MdOutlineKeyboardArrowRight> */}
                </div>
              </div>
            </div>
            {selectedProject && (
              <div className="parameter-wrapper">
                Select Model:{" "}
                <div className="process-page-dropdown-wrapper">
                  <div className="process-page-dropdown">
                    <div className="process-page-dropdown-header">
                      <select
                        value={selectedModel}
                        onChange={(e) => handleModelSelection(e.target.value)}
                        className="process-page-dropdown-select"
                      >
                        <option value="">Select Model</option>
                        {clients
                          .find(
                            (client) => client.clientName === selectedClient
                          )
                          .projects.find(
                            (project) => project.projectName === selectedProject
                          )
                          .models.map((model) => (
                            <option key={model} value={model}>
                              {model}
                            </option>
                          ))}
                      </select>
                      {/* <MdOutlineKeyboardArrowRight
                        className={`process-page-icon ${
                          selectedModel ? "process-page-open" : ""
                        }`}
                      ></MdOutlineKeyboardArrowRight> */}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {processedImage && (
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

      <div className="slider-holder-single" style={{ width: 700, height: 390 }}>
        {togglePreview ? (
          <div className="image-container">
            {uploadedImage && (
              <div>
                <div>
                  <div
                    className="fullscreenLeft"
                    onClick={() => toggleFullscreen("input")}
                  >
                    <FullscreenIcon style={{ color: "black" }} />
                  </div>
                  <img
                    src={URL.createObjectURL(uploadedImage)}
                    style={{ width: 700, height: 390 }}
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          <React.Fragment>
            {!processedImage ? (
              <div className="image-container">
                {uploadedImage && (
                  <div className="loaderHolder">
                    <Loader
                      type="bubble-loop"
                      bgColor="blue"
                      color="black"
                      title={"Processing Image"}
                      size={100}
                    />
                  </div>
                )}
              </div>
            ) : (
              <>
                {selectedOption === "slider" && (
                  <>
                    <div
                      className="fullscreenLeft-single"
                      onClick={() => toggleFullscreen("input")}
                    >
                      <FullscreenIcon style={{ color: "black" }} />
                    </div>
                    <div
                      className="fullscreenRight-single"
                      onClick={() => toggleFullscreen("processed")}
                    >
                      <FullscreenIcon style={{ color: "white" }} />
                    </div>

                    <ImageSlider
                      image1={processedImage}
                      image2={URL.createObjectURL(uploadedImage)}
                      leftLabelText={"Input Image"}
                      rightLabelText={"Processed Image"}
                      sliderColor="white"
                      handleColor="rgb(0, 3, 59)"
                      handleBackgroundColor="white"
                    />
                  </>
                )}
                {selectedOption === "input" && (
                  <>
                    <img
                      src={URL.createObjectURL(uploadedImage)}
                      style={{ width: 700, height: 390 }}
                    />
                  </>
                )}
                {selectedOption === "processed" && (
                  <>
                    <img
                      src={processedImage}
                      style={{ width: 700, height: 390 }}
                    />
                  </>
                )}
              </>
            )}
          </React.Fragment>
        )}
      </div>
      <div className="buttonsContainerSingle">
        {!isLoading && (
          <div className="firstRowButtons">
            <ProcessButton onClick={processImage} isProcessed={togglePreview} />
            {processedImage ? (
              <div>
                <button onClick={downloadSingleProcessedImage}>
                  Download Processed Image <GetApp />
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        )}
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
              <div className="labelButtons">Choose another Image</div>
            </div>
          </IconButton>
        )}
      </div>
      {!showInfoSlider && (
        <div className="info">
          {/* <div>
            <strong>Dimension:</strong> {image_details.image_dimensions}
          </div>
          <div>
            <strong>Name:</strong> {image_details.model_name}
          </div>
          <div>
            <strong>Type:</strong> {image_details.model_type}
          </div>
          <div>
            <strong>Upload Date:</strong> {image_details.model_upload_date}
          </div> */}
        </div>
      )}
    </div>
  );
};

export default ProcessPage;
