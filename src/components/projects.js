import React, { useState, useEffect, useRef } from "react";
import "../styles/projects.css";
import { IoMdRefresh } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import NotificationPopup from "./NotificationPopup";
import { IoCloseCircle } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
// import { FaArrowLeft } from "react-icons/fa";
// import { IoClose } from "react-icons/io5";
import {
  FaUserAlt,
  FaFolderOpen,
  FaArrowLeft,
  FaFileAlt,
  FaUser,
} from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { RiSearchLine } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { RiFolder3Line } from "react-icons/ri";
import { IoReturnUpBackSharp } from "react-icons/io5";
import CreateProjectForm from "./Projectform";
import request from "superagent";
import axios from "axios";
import Loader from "react-js-loader";


const Projects = ({ toggleForm, typeForm }) => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [breadcrumbTrail, setBreadcrumbTrail] = useState(["Home", "Clients"]);
  const [expandedClient, setExpandedClient] = useState(null);
  const [expandedProject, setExpandedProject] = useState(null);
  const [nameButton, setNameButton] = useState("Clients");
  const [isError, setIsError] = useState("");
  const [selectedModel, setSelectedModel] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageList, setImageList] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [preLoader, setPreLoader] = useState(false);

  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    targetItem: null,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const closeNotification = () => {
    setErrorMessage(null);
  };
  const token = localStorage.getItem("token");
  const ContextMenu = ({ x, y, onDelete, onClose }) => {
    const menuRef = useRef();

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          onClose();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [onClose]);

    return (
      <div
        ref={menuRef}
        className="context-menu"
        style={{ top: `${y}px`, left: `${x}px` }}
      >
        <ul>
          <li className="deleteContext" onClick={onDelete}>
            <MdDeleteOutline /> Delete
          </li>
        </ul>
      </div>
    );
  };
  // const [clients,setClients]

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

  async function parseClientData(data) {
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
    // window.location.reload();
  }

  async function fetchClients() {
    const data = await fetchClientData();
    const clients = await parseClientData(data);

    console.log(clients);

    // return clients;
  }

  async function reloadClients() {
    // const data = await fetchClientData();
    // const clients = await parseClientData(data);

    // console.log(clients);
    window.location.reload();
    // return clients;
  }
  useEffect(() => {
    // Fetch data from API when component mounts for the first time
    fetchClients();
  }, []);

  useEffect(() => {
    // Store clients data in local storage
    localStorage.setItem("clients", JSON.stringify(clients));
    // window.location.reload();
  }, [clients]);
  // ------------------------------------------------
  useEffect(() => {
    updateNameButton();
    console.log(nameButton);
  }, [breadcrumbTrail]);

  const updateNameButton = () => {
    const length = breadcrumbTrail.length;
    if (length === 2) {
      setNameButton("Clients");
    } else if (length === 3) {
      setNameButton("Projects");
    } else if (length === 4) {
      setNameButton("Models");
    }
  };

  const handleClientClick = (client) => {
    setSelectedClient(client);
    setSelectedProject(null); // Reset project when client changes
    setBreadcrumbTrail(["Home", "Clients", client.clientName]);
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setBreadcrumbTrail((prevTrail) => [...prevTrail, project.projectName]);
  };

  const handleBackClick = () => {
    if (selectedProject) {
      setSelectedProject(null); // Go back to client view
      setBreadcrumbTrail((prevTrail) => prevTrail.slice(0, -1));
    } else if (selectedClient) {
      setSelectedClient(null); // Go back to main client view
      setBreadcrumbTrail(["Home", "Clients"]);
    }
  };

  const handleBreadcrumbClick = (index) => {
    if (index === 0) {
      setSelectedClient(null);
      setSelectedProject(null);
      setBreadcrumbTrail(["Home"]);
    } else if (index === 1) {
      setSelectedClient(null);
      setSelectedProject(null);
      setBreadcrumbTrail(["Home", "Clients"]);
    } else if (index === 2 && selectedClient) {
      setSelectedProject(null);
      setBreadcrumbTrail(["Home", "Clients", selectedClient.clientName]);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const toggleDeleteMenu = (e) => {
    e.preventDefault();
    console.log("rightClickedPressed");
  };
  const renderBreadcrumb = () => {
    const iconMapping = {
      Home: { icon: IoHomeOutline, label: "Home" },
      Clients: { icon: FaUserAlt, label: "Clients" },
      Projects: { icon: FaFolderOpen, label: "Projects" },
      Models: { icon: RiFolder3Line, label: "Models" },
    };

    return breadcrumbTrail.map((item, index) => {
      const { icon: Icon, label } = iconMapping[item] || {};
      return (
        <div
          key={index}
          className="breadcrumbs-project-page"
          onClick={() => handleBreadcrumbClick(index)}
        >
          {index !== 0 && <IoIosArrowForward />}
          {Icon && (
            <div style={{ marginRight: "5px", paddingBottom: "3px" }}>
              <Icon style={{ color: "rgb(13, 25, 114)" }} />
            </div>
          )}{" "}
          {/* Render icon if available */}
          {label || item}{" "}
          {/* Render label if available, otherwise render item */}
        </div>
      );
    });
  };
  const handleContextMenu = (event, item) => {
    event.preventDefault();
    setContextMenu({
      visible: true,
      x: event.clientX,
      y: event.clientY,
      targetItem: item,
    });
  };

  const handleDelete = async () => {
    // Implement the delete functionality here
    console.log(
      "Deleting:",
      contextMenu.targetItem.projectName,
      "client: ",
      selectedClient.clientName
    );
    const formData = new FormData();
    formData.append("client_name", selectedClient.clientName);
    formData.append("project_name", contextMenu.targetItem.projectName);
    try {
      const response = await axios.post(
        "https://xssvwicjvk.ap-south-1.awsapprunner.com/delete-project",
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
    } catch (error) {
      setIsError(error.message);
    } finally {
      setIsError("Deleted Successfully");
      setErrorMessage("Deleted Successfully");
      console.log("Deletedd finally");
      window.location.reload();
    }

    setContextMenu({ ...contextMenu, visible: false });
  };
  const ImagePopup = ({
    images,
    currentIndex,
    onClose,
    setCurrentImageIndex,
  }) => {
    const handleNext = () => {
      const nextIndex = (currentImageIndex + 1) % imageList.length;
      setCurrentImageIndex(nextIndex);
    };

    const handlePrev = () => {
      const prevIndex =
        (currentImageIndex - 1 + imageList.length) % imageList.length;
      setCurrentImageIndex(prevIndex);
    };

    return (
      <div className="image-popup">
        <div className="popup-overlay" onClick={onClose}></div>
        <div className="popup-content-wrapper">
          <IoClose className="closee-button" onClick={onClose} />

          <div className="popup-content">
            <button className="prev-button" onClick={handlePrev}>
              <FaArrowLeft />
            </button>
            <img
              src={`data:image/png;base64,${images[currentIndex].base64}`}
              alt={images[currentIndex].name}
            />
            <button className="next-button" onClick={handleNext}>
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const handleModelClick = async (model) => {
    setSelectedModel(model);
    setImageList([]);
  };

  const handleFolderClick = async (folderType) => {
    try {
      setTwoFolder(true);
      setPreLoader(true);
      let folderName;
      if (folderType === "input") {
        folderName = "input_folder";
      } else if (folderType === "output") {
        folderName = "output_folder";
      }

      const response = await request
        .get("https://xssvwicjvk.ap-south-1.awsapprunner.com/get-images")
        .set("Content-Type", "application/json")
        .query({
          folder_name: `${selectedClient.clientName}/${selectedProject.projectName}/${selectedModel}/${folderName}`,
        });

      const imageData = response.body;

      // Transform the API response data into the desired format
      const images = Object.keys(imageData).map((key) => ({
        name: key,
        base64: imageData[key],
      }));

      // Update the state with the fetched image data
      setImageList(images);
    } catch (error) {
      console.error("Error fetching images: ", error);
    }
    finally{
      setPreLoader(false);
    }
  };

  const openImagePopup = (index) => {
    setCurrentImageIndex(index);
    setIsPopupOpen(true);
  };
  const [twoFolder, setTwoFolder] = useState(false);

  const renderFolders = () => {
    let filteredItems;

    if (selectedClient) {
      if (selectedProject) {
        if (selectedModel) {
          {
            console.log(imageList);
          }
          if (twoFolder) {
            return (
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
                      title="Populating Images"
                      size={100}
                    />
                  </div>
                ) : (
                  <>
                    <div
                      className="back-button"
                      onClick={() => setTwoFolder(false)}
                    >
                      <IoReturnUpBackSharp className="back-icon" />
                      <span className="folder-name">Back</span>
                    </div>
                    <div className="image-grid">
                      {imageList.map((image, index) => (
                        <div
                          key={index}
                          className="image-item"
                          onClick={() => openImagePopup(index)}
                        >
                          <img
                            src={`data:image/png;base64,${image.base64}`}
                            alt={image.name}
                          />
                          <span className="image-name">...{(image.name).slice(-15)}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </>
            );
          } else {
            return (
              <>
                <div
                  className="back-button"
                  onClick={() => setSelectedModel(null)}
                >
                  <IoReturnUpBackSharp className="back-icon" />
                  <span className="folder-name">Back</span>
                </div>
                <div
                  className="folder-item"
                  onClick={() => handleFolderClick("input")}
                >
                  <FaFolderOpen className="folder-icon" />
                  <span className="folder-name">Input Images</span>
                </div>
                <div
                  className="folder-item"
                  onClick={() => handleFolderClick("output")}
                >
                  <FaFolderOpen className="folder-icon" />
                  <span className="folder-name">Output Images</span>
                </div>
              </>
            );
          }
        } else {
          filteredItems = selectedProject.models.filter((model) =>
            model.toLowerCase().includes(searchQuery.toLowerCase())
          );
          return (
            <>
              <div className="back-button" onClick={handleBackClick}>
                <IoReturnUpBackSharp className="back-icon" />
                <span className="folder-name">Back</span>
              </div>
              {filteredItems.map((model, index) => (
                <div
                  key={index}
                  className="folder-item"
                  onClick={() => handleModelClick(model)}
                >
                  <RiFolder3Line className="folder-icon" />
                  <span className="folder-name">{model}</span>
                </div>
              ))}
            </>
          );
        }
      } else {
        filteredItems = selectedClient.projects.filter((project) =>
          project.projectName.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return (
          <>
            <div className="folder-item" onClick={handleBackClick}>
              <IoReturnUpBackSharp className="back-icon" />
              <span className="folder-name">Back</span>
            </div>
            {filteredItems.map((project, index) => (
              <div
                key={index}
                className="folder-item"
                onClick={() => handleProjectClick(project)}
                onContextMenu={(e) =>
                  handleContextMenu(e, project, selectedClient)
                }
              >
                <FaFolderOpen className="folder-icon" />
                <span className="folder-name">{project.projectName}</span>
              </div>
            ))}
          </>
        );
      }
    } else {
      filteredItems = clients.filter((client) =>
        client.clientName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return filteredItems.map((client, index) => (
        <div
          key={index}
          className="folder-item"
          onClick={() => handleClientClick(client)}
          // onContextMenu={(e) => handleContextMenu(e, client)}
        >
          <FaFolderOpen className="folder-icon" />
          <span className="folder-name">{client.clientName}</span>
        </div>
      ));
    }
  };
  const toggleClient = (clientName) => {
    setExpandedClient(expandedClient === clientName ? null : clientName);
    setExpandedProject(null); // Close all projects when a new client is clicked
  };

  // Toggle the expanded state of a project
  const toggleProject = (projectName) => {
    setExpandedProject(expandedProject === projectName ? null : projectName);
  };
  const renderSidebar = () => {
    return (
      <div className="sidebar-wrapper">
        <h6>Explorer</h6>
        <ul>
          {clients.map((client) => (
            <li key={client.clientName}>
              <div
                className="client-sidebar"
                onClick={() => toggleClient(client.clientName)}
              >
                <FaFolderOpen
                  style={{ color: "rgb(13, 25, 114)" }}
                  className="icon"
                />
                {client.clientName}
              </div>
              {expandedClient === client.clientName && (
                <ul className="projects-sidebar">
                  {client.projects.map((project) => (
                    <li key={project.projectName}>
                      <div
                        className="project-sidebar"
                        onClick={() => toggleProject(project.projectName)}
                      >
                        <FaFolderOpen
                          style={{ color: "rgb(13, 25, 114)" }}
                          className="icon"
                        />
                        {project.projectName}
                      </div>
                      {expandedProject === project.projectName && (
                        <ul className="models">
                          {project.models.map((model) => (
                            <li key={model} className="model">
                              <FaFileAlt
                                style={{ color: "rgb(13, 25, 114)" }}
                                className="icon-model"
                              />
                              {model}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="projects-page-layout">
      {errorMessage && (
        <div className="error-message">
          <NotificationPopup
            message={errorMessage}
            duration={3000}
            onClose={closeNotification}
          />
        </div>
      )}
      <div>{renderSidebar()}</div>
      {/* <div className="border">
        <hr></hr>
      </div> */}
      <div className="projects-wrapper">
        <div className="header-project">
          <div className="left-section-projects">
            <span className="projects-head">{nameButton}</span>
            <div className="breadcrums-project-holder">
              <div>
                <IoMdRefresh onClick={reloadClients} className="reload-icon" />
              </div>

              {renderBreadcrumb()}
            </div>

            {/* <BreadcrumbComponent activeStep={1} /> */}
          </div>
          <div className="search-bar">
            <div className="search-bar-wrapper">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                className="input-search-projects"
                onChange={handleSearchChange}
              />
              <RiSearchLine />
            </div>
          </div>
          <div className="right-project-header">
            <div className="project-button">
              {/* {console.log("parentClient ",selectedClient.clientName, " parentProject: ", selectedProject.projectName)} */}
              <CreateProjectForm
                nameB={nameButton}
                toggleForm={toggleForm}
                typeForm={typeForm}
                parentClient={selectedClient ? selectedClient.clientName : null}
                parentProject={
                  selectedProject ? selectedProject.projectName : null
                }
              />
            </div>
          </div>
        </div>

        <div className="folders-container">{renderFolders()}</div>
      </div>
      {contextMenu.visible && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onDelete={handleDelete}
          onClose={() => {
            setContextMenu((prevState) => ({
              ...prevState,
              visible: false,
            }));
          }}
        />
      )}
      {isPopupOpen && (
        <ImagePopup
          images={imageList}
          currentIndex={currentImageIndex}
          onClose={() => setIsPopupOpen(false)}
          setCurrentImageIndex={setCurrentImageIndex}
        />
      )}
    </div>
  );
};

export default Projects;
