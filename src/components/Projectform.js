import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { AiFillPlusCircle } from "react-icons/ai";
import { RxCrossCircled } from "react-icons/rx";
import "../styles/Projectform.css";

const CreateForm = ({ nameB, toggleForm, typeForm }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Separate states for project, client, and model forms
  const [projectFormData, setProjectFormData] = useState({
    projectName: "",
    projectType: "",
    projectCompanyName: "",
  });

  const [clientFormData, setClientFormData] = useState({
    clientName: "",
    clientIndustry: "",
    clientContact: "",
  });

  const [modelFormData, setModelFormData] = useState({
    modelName: "",
    modelType: "",
    modelManufacturer: "",
  });

  useEffect(() => {
    if (toggleForm) {
      setIsOpen(true);
    }
  }, [toggleForm]);

  // Handlers for project form
  const handleProjectChange = (e) => {
    setProjectFormData({
      ...projectFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    // Handle project form submission logic
    console.log("Project Form submitted:", projectFormData);
    setIsOpen(false);
  };

  // Handlers for client form
  const handleClientChange = (e) => {
    setClientFormData({
      ...clientFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClientSubmit = (e) => {
    e.preventDefault();
    // Handle client form submission logic
    console.log("Client Form submitted:", clientFormData);
    setIsOpen(false);
  };

  // Handlers for model form
  const handleModelChange = (e) => {
    setModelFormData({
      ...modelFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleModelSubmit = (e) => {
    e.preventDefault();
    // Handle model form submission logic
    console.log("Model Form submitted:", modelFormData);
    setIsOpen(false);
  };

  const renderProjectForm = () => (
    <form onSubmit={handleProjectSubmit}>
      <div className="form-wrapper">
        <div className="modal-header">
          <div className="modal-title">
            Creating new project <br />
            <div className="modal-subtitle">Kindly fill the below details</div>
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
            value={projectFormData.projectName}
            onChange={handleProjectChange}
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
            value={projectFormData.projectType}
            onChange={handleProjectChange}
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
            value={projectFormData.projectCompanyName}
            onChange={handleProjectChange}
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
        <button type="submit" className="button-submit">
          Create
        </button>
      </div>
    </form>
  );

  const renderClientForm = () => (
    <form onSubmit={handleClientSubmit}>
      <div className="form-wrapper">
        <div className="modal-header">
          <div className="modal-title">
            Creating new client <br />
            <div className="modal-subtitle">Kindly fill the below details</div>
          </div>
          <RxCrossCircled
            className="modal-close-icon"
            onClick={() => setIsOpen(false)}
          />
        </div>

        <div className="input-container">
          <label className="input-label">
            Client Name <span className="star">*</span>
          </label>
          <input
            type="text"
            name="clientName"
            value={clientFormData.clientName}
            onChange={handleClientChange}
            className="input-field"
            placeholder="Placeholder"
            required
          />
        </div>
        <div className="input-container">
          <label className="input-label">
            Client Industry <span className="star">*</span>
          </label>
          <input
            type="text"
            name="clientIndustry"
            value={clientFormData.clientIndustry}
            onChange={handleClientChange}
            className="input-field"
            placeholder="Placeholder"
            required
          />
        </div>
        <div className="input-container">
          <label className="input-label">
            Client Contact <span className="star">*</span>
          </label>
          <input
            type="text"
            name="clientContact"
            value={clientFormData.clientContact}
            onChange={handleClientChange}
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
        <button type="submit" className="button-submit">
          Create
        </button>
      </div>
    </form>
  );

  const renderModelForm = () => (
    <form onSubmit={handleModelSubmit}>
      <div className="form-wrapper">
        <div className="modal-header">
          <div className="modal-title">
            Creating new model <br />
            <div className="modal-subtitle">Kindly fill the below details</div>
          </div>
          <RxCrossCircled
            className="modal-close-icon"
            onClick={() => setIsOpen(false)}
          />
        </div>

        <div className="input-container">
          <label className="input-label">
            Model Name <span className="star">*</span>
          </label>
          <input
            type="text"
            name="modelName"
            value={modelFormData.modelName}
            onChange={handleModelChange}
            className="input-field"
            placeholder="Placeholder"
            required
          />
        </div>
        <div className="input-container">
          <label className="input-label">
            Model Type <span className="star">*</span>
          </label>
          <input
            type="text"
            name="modelType"
            value={modelFormData.modelType}
            onChange={handleModelChange}
            className="input-field"
            placeholder="Placeholder"
            required
          />
        </div>
        <div className="input-container">
          <label className="input-label">
            Model Manufacturer <span className="star">*</span>
          </label>
          <input
            type="text"
            name="modelManufacturer"
            value={modelFormData.modelManufacturer}
            onChange={handleModelChange}
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
        <button type="submit" className="button-submit">
          Create
        </button>
      </div>
    </form>
  );

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="button-project-form">
        Create {nameB} <AiFillPlusCircle className="text-xl" />
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {console.log(typeForm, nameB)}
        {typeForm === "project"
          ? renderProjectForm()
          : typeForm === "client"
          ? renderClientForm()
          : nameB === "Projects"
          ? renderProjectForm()
          : nameB === "Clients"
          ? renderClientForm()
          : renderModelForm()}
      </Modal>
    </>
  );
};

export default CreateForm;
