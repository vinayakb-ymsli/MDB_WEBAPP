import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { FaUserAlt, FaFolderOpen } from "react-icons/fa";
import { RiFolder3Line } from "react-icons/ri";
import "../styles/Breadcrumbs.css";

const BreadcrumbComponent = ({ activeStep }) => {
  return (
    <div className="breadcrumb-container">
      <a href="/">
        <div className={`breadcrumb-item ${activeStep === 1 ? "active" : ""}`}>
          <IoHomeOutline /> Home
        </div>
      </a>

      <IoIosArrowForward className="breadcrumb-separator" />

      <a href="/clients">
        <div className={`breadcrumb-item ${activeStep === 2 ? "active" : ""}`}>
          <FaUserAlt /> Clients
        </div>
      </a>

      <IoIosArrowForward className="breadcrumb-separator" />

      <a href="/projects">
        <div className={`breadcrumb-item ${activeStep === 3 ? "active" : ""}`}>
          <FaFolderOpen /> Projects
        </div>
      </a>

      <IoIosArrowForward className="breadcrumb-separator" />

      <div className={`breadcrumb-item ${activeStep === 4 ? "active" : ""}`}>
        <RiFolder3Line /> Models
      </div>
    </div>
  );
};

export default BreadcrumbComponent;
