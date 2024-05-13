import React, { useState } from 'react'
import "../styles/InfoPopup.css";
// import tempImage from "/images/upload.png"


function InfoPopup({title = "test graph", image = <img src="/images/kv_pc.jpg" alt="" />, details = "this is the details of the graph"}, open=false){

    const [popUp, setpopUp] = useState(false)
    function closePopup(){
        if( popUp == true){
            setpopUp(false)
        }
    }
  return (
    <>
    {popUp && 
    <div className="popup">
        <div className="infoContainer">
        <div className="title">
            <h1>
                {title}
            </h1>
                
        </div>
            <div className="details_box">
            {details}
            </div>
        </div>
        <div className="imageContainer">
            {image}
            <button onClick={closePopup}> close </button>
  
        </div>
        {/* <div className="cancelButton">
            <button> close </button>
        </div> */}
    </div>
    }
    </>
  )
}

export default InfoPopup