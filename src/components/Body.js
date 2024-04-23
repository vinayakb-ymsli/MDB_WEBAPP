import React from 'react'
import Banner from './Banner'
import './Body.css' 

export default function Body({ufile, dfile, setuFile, setdFile}) {

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setuFile(selectedFile);
    };
 
    return (
        <>
            <Banner />

            <div className="bkgimg">
                <img src="/images/kv_pc.jpg" alt="" />
            </div>

            <div className="intropage">
                <div className="machineimg">
                    <img src="/images/kv_main01.png" alt="" />
                </div>

                <div className="introtext">
                    <h3>
                        Cell picking & imaging System
                    </h3>

                    <h1>
                        CELL HANDLER
                    </h1>

                    <h3>
                        Advancing cell research into a new era
                    </h3>

                </div>

                <div className="uploadbutton">
                    <label for="images" class="drop-container" id="dropcontainer">
                        <span class="drop-title">Drop files here</span>
                        or
                        <input type="file" id="images" accept="image/*" required />
                    </label>

                </div>
            </div>

        </>
    )
}
