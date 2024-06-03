import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { AiFillPlusCircle } from "react-icons/ai";
import { RxCrossCircled } from "react-icons/rx";
import "../styles/Projectform.css";
import request from "superagent";

const CreateForm = ({ nameB, toggleForm, typeForm }) => {
  const [isOpen, setIsOpen] = useState(false);
  let token = localStorage.getItem("token");
  const [projectFormData, setProjectFormData] = useState({
    projectName: "",
    folderName: "",
    description: "",
  });

  const [clientFormData, setClientFormData] = useState({
    fullClientName: "",
    folderName: "",
    description: "",
  });

  const [modelFormData, setModelFormData] = useState({
    modelName: "",
    modelType: "",
    modelFile: null,
  });

  useEffect(() => {
    if (toggleForm) {
      setIsOpen(true);
    }
  }, [toggleForm]);

  const handleProjectChange = (e) => {
    setProjectFormData({
      ...projectFormData,
      [e.target.name]: e.target.value,
    });
    console.log("client form ", projectFormData);
  };

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    console.log("Project Form submitted:", projectFormData);
    setIsOpen(false);
  };

  const handleClientChange = (e) => {
    setClientFormData({
      ...clientFormData,
      [e.target.name]: e.target.value,
    });
    console.log("client form ", clientFormData);
  };
  const handleClientSubmit = async (e) => {
    e.preventDefault();
    console.log("Client Form submitted:", clientFormData);
    console.log(token);
  
    setIsOpen(false);
  
    try {
      const response = await request
        .post("https://ejmnmassds.ap-south-1.awsapprunner.com/create-client")
        .send({"client_name":clientFormData.folderName})  // Ensure clientFormData is the payload
        .set("Content-Type", "application/json")
        .set("Authorization", `${token}`);
  
      console.log("Response:", response.body);
    } catch (error) {
      console.error("Error:", error.response ? error.response.body : error.message);
    }
  };

  const handleModelChange = (e) => {
    const { name, value, files } = e.target;
    setModelFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
    console.log("client form ", modelFormData);
  };

  const handleModelSubmit = (e) => {
    e.preventDefault();
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
            Folder Name <span className="star">*</span>
          </label>
          <input
            name="folderName"
            value={projectFormData.folderName}
            onChange={handleProjectChange}
            className="select-field"
            required
          ></input>
        </div>
        <div className="input-container">
          <label className="input-label">
            Description <span className="star">*</span>
          </label>
          <input
            type="text"
            name="description"
            value={projectFormData.description}
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
            Full Client Name<span className="star">*</span>
          </label>
          <input
            type="text"
            name="fullClientName"
            value={clientFormData.fullClientName}
            onChange={handleClientChange}
            className="input-field"
            placeholder="Placeholder"
            required
          />
        </div>
        <div className="input-container">
          <label className="input-label">
            Folder Name<span className="star">*</span>
          </label>
          <input
            type="text"
            name="folderName"
            value={clientFormData.folderName}
            onChange={handleClientChange}
            className="input-field"
            placeholder="Placeholder"
            required
          />
        </div>
        <div className="input-container">
          <label className="input-label">
            Description <span className="star">*</span>
          </label>
          <input
            type="text"
            name="description"
            value={clientFormData.description}
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
            Model File <span className="star">*</span>
          </label>
          <input
            type="file"
            name="modelFile"
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
