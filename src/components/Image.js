import React from "react";
import "../styles/Image.css";
// import { Tooltip } from "react-tooltip";

function Image({ input_image, image_details }) {
  {
    input_image = `data:image/png;base64, ${input_image}`;
  }
  return (
    <div className="image">
      <img
        data-tooltip-id={image_details ? "image-tooltip" : ""}
        src={input_image}
        title=""
      />
      {/* {!!image_details && <Tooltip
        id="image-tooltip"
        place="bottom"
        variant="info"
        html={`Dimension : ${image_details.image_dimensions} <br>
        Name : ${image_details.model_name}`}
      />} */}
    </div>
  );
}

export default Image;
