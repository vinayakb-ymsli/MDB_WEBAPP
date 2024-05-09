import React from 'react'
import "../styles/Image.css";

function Image({ key, input_image,setImage}) {
  {input_image = `data:image/png;base64, ${input_image}`}
  return (
    <div className='image'>{key}
        <img onClick={setImage(key)} src={input_image} />
      </div>
  )
}

export default Image