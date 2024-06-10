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
import request from "superagent";

function ZipProcess() {
  const [res_data, setResData] = useState(null);
  const [selected, setselected] = useState(0);
  const { state } = useLocation();
  const inputFile = state.data;
  const zipFileName = inputFile.name;
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
  const [buttonStatus, setButtonStatus] = useState(true);
  const [hitApi, setHitApi] = useState(false);
  const token = localStorage.getItem("token");
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
        formData.append(
          "client_name",
          selectedClient.includes("YMSLJ") ? "YMC" : selectedClient
        );
        formData.append(
          "project_name",
          selectedProject.includes("Cellular_Tx_001") ? "FMS" : selectedProject
        );
        formData.append(
          "model_name",
          selectedModel.includes("Stardist") ? "Models" : selectedModel
        );
        formData.append("zip_file", selectedFile);

        const response = await axios.post(
          "https://xssvwicjvk.ap-south-1.awsapprunner.com/upload-zip",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data; boundary=<calculated when request is sent>", // Ensure this matches your form data type
              Authorization: `${token}`, // Example of adding an Authorization header
              // Add any other headers you need
            },
          }
        );

        sessionStorage.setItem("zipFileName", zipFileName);
        sessionStorage.setItem("data", JSON.stringify(response.data));
        setResData(response.data);
      } catch (error) {
        alert(error.message);
      } finally {
        setPreLoader(false);
        setHitApi(false);
      }
    };

    if (inputFile && selectedModel != null) {
      fetchData();
    }
  }, [hitApi == true]);

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
    setHitApi(true);
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
        .get("https://xssvwicjvk.ap-south-1.awsapprunner.com/contents")
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
    setButtonStatus(false);
  };

  useEffect(() => {
    // Retrieve clients array from local storage
    const storedClients = JSON.parse(localStorage.getItem("clients"));
    if (storedClients) {
      setClients(storedClients);
    }
  }, []);

  return (
    <>
      {!isLoading ? (
        <div className="mainContainerOne">
          <div className="project-process">
            File Name: <div className="project-name-process">{zipFileName}</div>
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
                        {client.clientName.includes("YMC")
                          ? "YMSLJ"
                          : client.clientName}
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
                          .find(
                            (client) => client.clientName === selectedClient
                          )
                          .projects.map((project) => (
                            <option
                              key={project.projectName}
                              value={project.projectName}
                            >
                              {project.projectName.includes("FMS")
                                ? "Cellular_Tx_001"
                                : project.projectName}
                            </option>
                          ))}
                        <option value="" disabled>
                          Cellular_ZXB_008
                        </option>
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
                            onChange={(e) =>
                              handleModelSelection(e.target.value)
                            }
                            className="process-page-dropdown-select"
                          >
                            <option value="">Select Model</option>
                            {clients
                              .find(
                                (client) => client.clientName === selectedClient
                              )
                              .projects.find(
                                (project) =>
                                  project.projectName === selectedProject
                              )
                              .models.map((model) => (
                                <option key={model} value={model}>
                                  {model.includes("Models")
                                    ? "Stardist"
                                    : model}
                                </option>
                              ))}
                            <option disabled>Cellpose</option>
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
          <div className="file-name-wrapper">
            <div className="before-process-leftNavRow ">
              {/* <div className="headingLeft">Uploaded Images</div> */}
              {/* ZipFile Slected */}
              <div className="name-holder">
                <AiOutlineFileZip className="zip-file-icon" />{" "}
                <div>{zipFileName}</div>
              </div>
              {buttonStatus ? (
                <span style={{ textAlign: "center" }}>
                  Please select your paramters<br></br> from above dropdown
                  <span className="star">*</span>
                </span>
              ) : (
                <span style={{ textAlign: "center" }}>
                  Click on the process button <br /> to continue.
                </span>
              )}
            </div>
            <div hidden={buttonStatus} className="before-process-button">
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
                  <label
                    className={`toggles-label ${
                      selectedOption === "slider" ? "active" : ""
                    }`}
                  >
                    <input
                      className="toggles-input"
                      type="radio"
                      value="slider"
                      checked={selectedOption === "slider"}
                      onChange={(e) => handleOptionChange(e.target.value)}
                    />
                    Slider
                  </label>
                  <label
                    className={`toggles-label ${
                      selectedOption === "input" ? "active" : ""
                    }`}
                  >
                    <input
                      className="toggles-input"
                      type="radio"
                      value="input"
                      checked={selectedOption === "input"}
                      onChange={(e) => handleOptionChange(e.target.value)}
                    />
                    Input
                  </label>
                  <label
                    className={`toggles-label ${
                      selectedOption === "processed" ? "active" : ""
                    }`}
                  >
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
                  <div className="labelButtons">Previous Image</div>
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
                    </div>
                  )}
                  {selectedOption == "input" && (
                    <>
                      <img
                        src={input_image}
                        style={{ width: 700, height: 400 }}
                        className="slider-holder"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      />
                    </>
                  )}
                  {selectedOption == "processed" && (
                    <>
                      <img
                        src={processed_image}
                        style={{ width: 700, height: 400 }}
                        className="slider-holder"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
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
                  <div className="labelButtons">Next Image</div>
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
                  className="download-button-zip"
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
    </>
  );
}

export default ZipProcess;
