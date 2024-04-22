import React from 'react'
import Banner from './Banner'
import './Body.css'

export default function Body() {
    return (
        <>
            <Banner />

            <div className="holder">

                <div className="bkgimg">
                    <img src="/images/kv_pc.jpg" alt="" />
                </div>

                <div className="upload">
                    <h1>+</h1>
                    {/* <div className="imageupload">
                        upload
                    </div> */}
                </div>

                <div className="divider">

                </div>

                <div className="download">
                    <h1>+</h1>
                </div>
            </div>
        </>
    )
}
