import React, { useState } from "react";
import "./Body.css";
import { useNavigate } from "react-router-dom";


export default function Body() {
  const navigate = useNavigate();

  const [uploadedImage, setUploadedImage] = useState(null);
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setUploadedImage(selectedFile);
    console.log(selectedFile);
    navigate("/process", { state: { image: selectedFile } });
  };

  return (
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
              <input
                onChange={handleFileChange}
                type="file"
                id="images"
                accept="image/*"
                required
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
