import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { CiFileOn } from "react-icons/ci";
import { BsUpload } from "react-icons/bs";
import { TbFileAnalytics } from "react-icons/tb";
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

      <a href="/">
        <div className={`breadcrumb-item ${activeStep === 2 ? "active" : ""}`}>
          <CiFileOn /> Projects
        </div>
      </a>

      <IoIosArrowForward className="breadcrumb-separator" />

      <a href="/upload">
        <div className={`breadcrumb-item ${activeStep === 3 ? "active" : ""}`}>
          <BsUpload /> File Upload
        </div>
      </a>

      <IoIosArrowForward className="breadcrumb-separator" />

      <a href="/report">
        <div className={`breadcrumb-item ${activeStep === 4 ? "active" : ""}`}>
          <TbFileAnalytics /> Generate Report
        </div>
      </a>
    </div>
  );
};

export default BreadcrumbComponent;
