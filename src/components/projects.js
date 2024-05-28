import React from "react";
import "../styles/projects.css";
import { FaFolderOpen } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import BreadcrumbComponent from "./Breadcrumbs";
import CreateProjectForm from "./Projectform";

const Projects = () => {
  const folderNames = ["Project A", "Project B", "Project C", "Project D"];
  return (
    <div className="projects-wrapper">
      <div className="header-project">
        <div>
          <span className="projects-head">Projects</span>
          <BreadcrumbComponent activeStep={2} />
        </div>

        <div className="project-button">
         
          <CreateProjectForm />
        </div>
      </div>
      <div className="folders-container">
        {folderNames.map((folder, index) => (
          <div key={index} className="folder-item">
            <FaFolderOpen className="folder-icon" />
            <span className="folder-name">{folder}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
