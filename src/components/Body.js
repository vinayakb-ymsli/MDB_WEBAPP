import React from 'react'
import Banner from './Banner'
import './Body.css'

export default function Body() {
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
                <button>
                        Upload
                </button>
                </div>
            </div>


            {/* <div className="holder">

                <div className="upload">
                    <h1>+</h1>
                    <div className="imageupload">
                        upload
                    </div>
                </div>

                <div className="divider">
                    
                </div>

                <div className="download">
                    <h1>+</h1>
                </div>
            </div> */}
        </>
    )
}
