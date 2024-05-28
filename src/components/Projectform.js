import React, { useState } from "react";
import Modal from "./Modal";
import { AiFillPlusCircle } from "react-icons/ai";
import { RxCrossCircled } from "react-icons/rx";
// import a from "next/link";
import "../styles/Projectform.css";

const CreateProjectForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    projectName: "",
    projectType: "",
    projectCompanyName: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log("Form submitted:", formData);
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="button">
        Create New Project <AiFillPlusCircle className="text-xl" />
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <form onSubmit={handleSubmit}>
          <div className="form-wrapper">
            <div className="modal-header">
              <div className="modal-title">
                Creating new projects <br />
                <div className="modal-subtitle">
                  Kindly fill the below details
                </div>
              </div>
              <RxCrossCircled
                className="modal-close-icon"
                onClick={() => setIsOpen(false)}
              />
            </div>

            <div className="input-container">
              <label className="input-label">
                Project Name <span className="star">*</span>
              </label>
              <input
                type="text"
                name="projectName"
                value={formData.projectName}
                onChange={handleChange}
                className="input-field"
                placeholder="Placeholder"
                required
              />
            </div>
            <div className="input-container">
              <label className="input-label">
                Project Type <span className="star">*</span>
              </label>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className="select-field"
                required
              >
                <option value="" disabled>
                  Placeholder
                </option>
                <option value="type1">Type 1</option>
                <option value="type2">Type 2</option>
              </select>
            </div>
            <div className="input-container">
              <label className="input-label">
                Project Company Name <span className="star">*</span>
              </label>
              <input
                type="text"
                name="projectCompanyName"
                value={formData.projectCompanyName}
                onChange={handleChange}
                className="input-field"
                placeholder="Placeholder"
                required
              />
            </div>
          </div>

          <hr />
          <div className="button-container">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="button-close"
            >
              Close
            </button>
            <a href="upload">
              <button type="submit" className="button-submit">
                Create
              </button>
            </a>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default CreateProjectForm;
