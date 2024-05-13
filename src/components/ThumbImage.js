import React from 'react';
import "../styles/ThumbImage.css";

function ThumbImage({ imageId, input_image, setImage, isSelected }) {
  input_image = `data:image/png;base64, ${input_image}`;

  return (
    <div className={`thumbimage ${isSelected ? 'selected' : ''}`}>
      <img onClick={() => setImage(parseInt(imageId))} src={input_image} alt={`Image ${imageId}`} />
      <div className='imageName'>{imageId}</div>
    </div>
  );
}

export default ThumbImage;
