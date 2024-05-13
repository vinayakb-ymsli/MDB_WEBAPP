import React, { useState } from "react";
import "./Body.css";
import { useNavigate } from "react-router-dom";
import JSZip from "jszip";
import upload from "../images/upload.png";
import Loader from "react-js-loader";
import axios from "axios";

const Body = () => {
  const navigate = useNavigate();

  const [uploadedImage, setUploadedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setUploadedImage(selectedFile);
    console.log(selectedFile);
    navigate("/process", { state: { image: selectedFile } });
  };

  const handleZipChange = async (e) => {
    const selectedFile = e.target.files[0];
    const zipFileName = selectedFile.name; // Get the name of the zip file
    if (selectedFile.type !== "application/x-zip-compressed") {
      alert("Please select a zip file.");
      return;
    }
    setIsLoading(true);
    setIsError("");
    console.log(selectedFile);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const response = await axios.post(
        "https://dvegmk6pcy.ap-south-1.awsapprunner.com/upload_zip",
        formData
      );
      setIsLoading(false);
      navigate("/zipprocess", { state: { data: response.data, zipFileName } }); // Pass zipFileName along with response.data
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  

  return isLoading ? (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "600px",
      }}
    >
      <Loader
        type="bubble-loop"
        bgColor="blue"
        color="black"
        title={"Processing Image"}
        size={100}
      />
    </div>
  ) : (
    <div className="mainContainer">
      <div className="bkgimg">
        {/* <img src="/images/kv_pc.jpg" alt="" /> */}
      </div>

      <div className="intropage">
        <div className="introtext">
          <h1 className="introHeading">CELL HANDLER™</h1>
          <h6 className="introInfo">
            The CELL HANDLER™ is an automated system for selecting and isolating
            spheroids/organoids or single cells individually. The integration of
            sophisticated picking and imaging technology enables precise cell
            isolation that is unattainable by conventional methods. The CELL
            HANDLER™ can enhance the efficiency of drug discovery and biomedical
            research through the expansion of options in cell-based screening,
            cell quality management and cell line development.
          </h6>

          <div className="uploadBoxes">
            <div className="uploadbutton">
              <label
                htmlFor="images"
                className="drop-container"
                id="dropcontainer"
              >
                <div className="uploadContainerDash">
                  <div>
                    <img
                      src={upload}
                      alt="upload"
                      style={{ width: "65px", height: "65px" }}
                    />
                  </div>
                  <div>Drag and Drop Your image here</div>
                </div>
                <div className="orText">OR</div>
                
                <div className="displayCaption">
                  <input
                    onChange={handleFileChange}
                    type="file"
                    id="images"
                    accept="image/*"
                    required
                    title="Upload an image file"
                  />
                </div>
              </label>
            </div>
            <div className="uploadbutton">
              <label
                htmlFor="zip"
                className="drop-container"
                id="dropcontainer"
              >
                <div className="uploadContainerDash">
                  <img
                    src={upload}
                    alt="upload"
                    style={{ width: "75px", height: "75px" }}
                  />
                  <span>Drag and Drop your zip file here</span>
                </div>
                <div className="orText">OR</div>
                
                <input
                  onChange={handleZipChange}
                  type="file"
                  id="zip"
                  accept=".zip"
                  required
                />
              </label>
            </div>
          </div>
        </div>

        <div className="machineimg">
          <img src="/images/kv_main01.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Body;
