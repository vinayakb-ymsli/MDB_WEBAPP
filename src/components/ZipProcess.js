import React, { useState } from 'react'
import "../styles/ZipProcess.css";
import ThumbImage from './ThumbImage';
import Loader from './Loader';
import { useLocation } from "react-router-dom";
import Image from './Image';

function ZipProcess() {
    const { state } = useLocation();
    const [pageLoader, setpageLoader] = useState(false)
    const [viewMore, setviewMore] = useState(false)

    const SetViewbutton = () =>{
        if (viewMore == true){
            setviewMore(false)
            console.log("hi")
        }
        else{
            setviewMore(true)
        }
    }


    

    return (<>

        {pageLoader?
        <>
        <Loader/>
        </>
        :
         <div className="mainContainer">

         <div className="leftNavRow">
            
             <ThumbImage/>
             <ThumbImage/>
             <ThumbImage/>
             <ThumbImage/>
             <ThumbImage/>
             <ThumbImage/>
             <ThumbImage/>
             <ThumbImage/>
             <ThumbImage/>
 
         </div>

         <div className="inputImageRow">
         <Image/>
         </div>

         <div className="ProcessedImageRow">
            <Image/>

            <button onClick={SetViewbutton}>View Details </button>
            {viewMore?
            <div className="details">

            </div>
            :<></>
            }

         </div>
     </div>}
    </>
    )
}

export default ZipProcess