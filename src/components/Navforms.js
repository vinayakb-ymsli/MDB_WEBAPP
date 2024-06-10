import Body from "./Body";
import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { AiFillPlusCircle } from "react-icons/ai";
import { RxCrossCircled } from "react-icons/rx";
import "../styles/Projectform.css";
import request from "superagent";
import NotificationPopup from "./NotificationPopup";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Navforms = ({ typeForm, parentClient, parentProject }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  useEffect(() => {
    const clientsData = localStorage.getItem("clients");
    if (clientsData) {
      setClients(JSON.parse(clientsData));
    }
  }, []);
  const closeNotification = () => {
    setErrorMessage(null);
  };
  let token = localStorage.getItem("token");
  const [projectFormData, setProjectFormData] = useState({
    clientName: "",
    projectName: "",
    folderName: "",
    description: "",
  });
  const [modelFormData, setModelFormData] = useState({
    clientName: "",
    projectName: "",
    modelName: "",
    modelType: "",
    modelFile: null,
  });
  const handleProjectChange = (e) => {
    setProjectFormData({
      ...projectFormData,
      [e.target.name]: e.target.value,
    });
    console.log("client form ", projectFormData);
  };

  useEffect(() => {
    if (modelFormData.clientName !== "") {
      const selectedClient = clients.find(
        (client) => client.clientName === modelFormData.clientName
      );
      if (selectedClient) {
        setProjects(selectedClient.projects);
      }
    }
  }, [modelFormData.clientName, clients]);

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    console.log("Project Form submitted:", projectFormData);
    setIsOpen(false);

    try {
      const response = await request
        .post("https://xssvwicjvk.ap-south-1.awsapprunner.com/create-project")
        .send({
          client_name: projectFormData.clientName,
          project_name: projectFormData.folderName.toUpperCase(),
        })
        .set("Content-Type", "application/json")
        .set("Authorization", `${token}`);

      console.log("Response:", response.body);
      setErrorMessage("Created Project Successfully");
      window.location.href = "/projects";
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.body : error.message
      );
    }
  };

  const handleModelChange = async (e) => {
    const { name, value, files } = e.target;
    setModelFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
    console.log("client form ", modelFormData);
  };

  const handleModelSubmit = async (e) => {
    e.preventDefault();
    console.log("Model Form submitted:", modelFormData);
    setIsOpen(false);

    try {
      const formData = new FormData();
      formData.append("client_name", modelFormData.clientName);
      formData.append("project_name", modelFormData.projectName);
      formData.append("model_name", modelFormData.modelName.toUpperCase());
      formData.append("model_file", modelFormData.modelFile);
      const response = await axios.post(
        "https://xssvwicjvk.ap-south-1.awsapprunner.com/create-model",
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
      // const response = await request
      //   .post("https://xssvwicjvk.ap-south-1.awsapprunner.com/create-model")
      //   .send({
      //     client_name: modelFormData.clientName,
      //     project_name: modelFormData.projectName,
      //     model_name: modelFormData.modelName.toUpperCase(),
      //   })
      //   .set("Content-Type", "application/json")
      //   .set("Authorization", `${token}`);

      console.log("Response:", response.body);
      setErrorMessage("Created Project Successfully");
      window.location.href = "/projects";
      // setTimeout(function () {
      //   window.location.reload();
      // }, 200);
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.body : error.message
      );
    }
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
            Select Client <span className="star">*</span>
          </label>
          <select
            name="clientName"
            value={projectFormData.clientName}
            onChange={handleProjectChange}
            className="input-field"
            required
          >
            <option value="" disabled>
              Select a client
            </option>
            {clients.map((client, index) => (
              <option key={index} value={client.clientName}>
                {client.clientName}
              </option>
            ))}
          </select>
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
            Select Client <span className="star">*</span>
          </label>
          <select
            name="clientName"
            value={modelFormData.clientName}
            onChange={handleModelChange}
            className="input-field"
            required
          >
            <option value="" disabled>
              Select a client
            </option>
            {clients.map((client, index) => (
              <option key={index} value={client.clientName}>
                {client.clientName}
              </option>
            ))}
          </select>
        </div>
        {modelFormData.clientName && (
          <div className="input-container">
            <label className="input-label">
              Select Project <span className="star">*</span>
            </label>
            <select
              name="projectName"
              value={modelFormData.projectName}
              onChange={handleModelChange}
              className="input-field"
              required
            >
              <option value="" disabled>
                Select a client
              </option>
              {projects.map((project, index) => (
                <option key={index} value={project.projectName}>
                  {project.projectName}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* <div className="input-container">
          <label className="input-label">
            Project Name <span className="star">*</span>
          </label>
          <input
            type="text"
            name="projectName"
            value={modelFormData.projectName}
            onChange={handleModelChange}
            className="input-field"
            placeholder="Placeholder"
            required
          />
        </div> */}
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
    <div>
      {errorMessage && (
        <div className="error-message">
          <NotificationPopup
            message={errorMessage}
            duration={3000}
            onClose={closeNotification}
          />
        </div>
      )}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {console.log("navform: ", typeForm)}
        {typeForm === "project" ? renderProjectForm() : renderModelForm()}
      </Modal>
      <Body />
    </div>
  );
};

export default Navforms;
