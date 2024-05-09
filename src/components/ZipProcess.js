import React, { useState } from 'react'
import "../styles/ZipProcess.css";
import ThumbImage from './ThumbImage';
import Loader from './Loader';
import { useLocation } from "react-router-dom";
import Image from './Image';
import jsonData from './test.json'

function ZipProcess() {
    const { state } = useLocation();
    const [pageLoader, setpageLoader] = useState(false)
    const [viewMore, setviewMore] = useState(false)
    const keys = Object.keys(jsonData.processed_images);
    const firstKey = keys[0];

    // console.log(firstKey)
    const [selectedImage, setselectedImage] = useState(113)


    const SetViewbutton = () =>{
        if (viewMore == true){
            setviewMore(false)
            console.log("hi")
            console.log(jsonData.original_images)
        }
        else{
            setviewMore(true)
        }
    }
 
    const setImage = (key)=>{
        setselectedImage(key)
        console.log(selectedImage)
    }
    return (<>

        {pageLoader?
        <>
        <Loader/>
        </>
        :
         <div className="mainContainer">

         <div className="leftNavRow">
            {Object.keys(jsonData.original_images).map(key => (
        // Render each image using an img tag
        <ThumbImage key={key} input_image={jsonData.original_images[key]} setImage={setImage}/>
      ))}
        </div>

         <div className="inputImageRow">
         <Image key={113} input_image={jsonData.original_images[113]} setImage={setImage}/>
         </div>

         <div className="ProcessedImageRow">
         <Image key={113} input_image={jsonData.processed_images[113]} setImage={setImage}/>

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