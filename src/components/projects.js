import React, { useState,useEffect } from "react";
import "../styles/projects.css";

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
import clients from "./ClientList"; // Import the clients array

const Projects = ({toggleForm,typeForm}) => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [breadcrumbTrail, setBreadcrumbTrail] = useState(["Home", "Clients"]);
  const [expandedClient, setExpandedClient] = useState(null);
  const [expandedProject, setExpandedProject] = useState(null);
  const [nameButton, setNameButton] = useState("Clients");

  useEffect(() => {
    updateNameButton();
    console.log(nameButton)
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
  const renderFolders = () => {
    let filteredItems;

    if (selectedClient) {
      if (selectedProject) {
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
              <div key={index} className="folder-item">
                <RiFolder3Line className="folder-icon" />
                <span className="folder-name">{model}</span>
              </div>
            ))}
          </>
        );
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
        <h5>Explorer</h5>
        <ul>
          {clients.map((client) => (
            <li key={client.clientName}>
              <div
                className="client-sidebar"
                onClick={() => toggleClient(client.clientName)}
              >
                <FaFolderOpen className="icon" />
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
                        <FaFolderOpen className="icon" />
                        {project.projectName}
                      </div>
                      {expandedProject === project.projectName && (
                        <ul className="models">
                          {project.models.map((model) => (
                            <li key={model} className="model">
                              <FaFileAlt className="icon" />
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
      <div className="sidebar-wrapper">{renderSidebar()}</div>
      <div className="border"><hr></hr></div>
      <div className="projects-wrapper">
        <div className="header-project">
          <div className="left-section-projects">
            <span className="projects-head">Clients</span>
            <div className="breadcrums-project-holder">
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
              <CreateProjectForm nameB={nameButton} toggleForm={toggleForm} typeForm={nameButton}  />
            </div>
          </div>
        </div>

        <div className="folders-container">{renderFolders()}</div>
      </div>
    </div>
  );
};

export default Projects;
