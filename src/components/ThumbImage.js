import React from 'react'
import "../styles/ThumbImage.css";

function ThumbImage({ imageId, input_image, setImage }) {
  {input_image = `data:image/png;base64, ${input_image}`}
  // console.log(input_image)
  return (
    <div className='thumbimage'>
        <img onClick={() => setImage(parseInt(imageId))} src={input_image} />
        <div className='imageName'>{imageId}</div>
      </div>
  )
}

export default ThumbImage