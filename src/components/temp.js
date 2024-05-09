import React, { useState } from "react";
import "./Body.css";
import { useNavigate } from "react-router-dom";
import Loader from "react-js-loader";
import axios from "axios";

export default function Body() {
  const navigate = useNavigate();
  const [git, setgit] = useState(second)
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
        "https://ty2e2cc7bt.ap-south-1.awsapprunner.com/upload_zip",
        formData
      );
      setIsLoading(false);
      // navigate("/processBatch", { state: { data: response.data } });
      navigate("/zipprocess", { state: { data: response.data } });
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
        <img src="/images/kv_pc.jpg" alt="" />
      </div>

      <div className="intropage">
        <div className="machineimg">
          <img src="/images/kv_main01.png" alt="" />
        </div>

        <div className="descriptor">
          <div className="introtext">
            <h3>Cell picking & imaging System</h3>

            <h1>CELL HANDLER</h1>

            <h3>Advancing cell research into a new era</h3>
          </div>

          <div className="uploadbutton">
            <label for="images" class="drop-container" id="dropcontainer">
              <h2>Upload Single Image</h2>
              <input
                onChange={handleFileChange}
                type="file"
                id="images"
                accept="image/*"
                required
              />
            </label>
          </div>
          <br></br>
          <div className="uploadbutton">
            <label for="zip" class="drop-container" id="dropcontainer">
              <h2>Upload Batch (ZIP)</h2>
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
    </div>
  );
}
