import React from 'react'
import "../styles/ThumbImage.css";

function ThumbImage({ key, input_image,setImage}) {
  {input_image = `data:image/png;base64, ${input_image}`}
  return (
    <div className='thumbimage'>
        <img onClick={setImage(key)} src={input_image} />
      </div>
  )
}

export default ThumbImage