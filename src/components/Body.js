import React, { useState } from "react";
import "./Body.css";
import { useNavigate } from "react-router-dom";
import JSZip from "jszip";
import upload from "../images/upload.png";

const Body = () => {
  const navigate = useNavigate();
  const [uploadedZip, setUploadedZip] = useState(null);
  console.log("WE GO");
  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    const fileReader = new FileReader();
    if (selectedFile.type !== "application/x-zip-compressed") {
      alert("Please select a zip file.");
      return;
    }
    fileReader.onload = async () => {
      try {
        const zip = await JSZip.loadAsync(fileReader.result);

        const fileNames = Object.keys(zip.files);
        const imagesList = Object.values(zip.files);

        const imageFiles = fileNames.filter((name) =>
          name.match(/\.(jpg|jpeg|png)$/i)
        );

        const extractedContent = [];
        for (const fileName of fileNames) {
          const fileData = await zip.file(fileName).async("blob");
          extractedContent.push({ fileName, fileData });
        }

        setUploadedZip(selectedFile);
        navigate("/process", { state: { zip: extractedContent } });
      } catch (error) {
        console.log("END");
        return;
      }
    };

    fileReader.readAsArrayBuffer(selectedFile);
  };

  return (
    <div className="mainContainer">
      <div className="bkgimg">
        <img src="/images/kv_pc.jpg" alt="" />
      </div>

      <div className="intropage">

        <div className="introtext">
          <h1>CELL HANDLER™</h1>
          <h6>The CELL HANDLER™ is an automated system for selecting and isolating spheroids/organoids or single cells individually.
            The integration of sophisticated picking and imaging technology enables precise cell isolation that is unattainable by conventional methods.
            The CELL HANDLER™ can enhance the efficiency of drug discovery and biomedical research through the expansion of options in cell-based screening, cell quality management and cell line development.</h6>

          <div className="uploadBoxes">
            <div className="uploadbutton">
              <label
                htmlFor="images"
                className="drop-container"
                id="dropcontainer"
              >
              <img src={upload} alt="upload" style={{width: "75px", height: "75px"}}/>
              <span>Drag and Drop Your image here</span>
                <input
                  onChange={handleFileChange}
                  type="file"
                  id="images"
                  accept=".jpg"
                  required
                  title="Upload an image file"

                />
              </label>
            </div>
            <div className="uploadbutton">
              <label
                htmlFor="images"
                className="drop-container"
                id="dropcontainer"
              >
              <img src={upload} alt="upload" style={{width:"75px", height:"75px"}}/>
              <span>Drag and Drop Your zip file here</span>
                <input
                  onChange={handleFileChange}
                  type="file"
                  id="images"
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

        <div className="descriptor">
          {/* <div className="introtext">
            <h3>Cell picking & imaging System</h3>
            <h1>CELL HANDLER</h1>
            <h3>Advancing cell research into a new era</h3>
          </div> */}

          {/* <div className="uploadbutton">
            <label
              htmlFor="images"
              className="drop-container"
              id="dropcontainer"
            >
              <input
                onChange={handleFileChange}
                type="file"
                id="images"
                accept=".zip"
                required
              />
            </label>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Body;
