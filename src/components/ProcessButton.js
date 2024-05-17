import { useState } from "react";
import "../styles/button.css"; // Import the CSS file
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const ProcessButton = ({ onClick, isProcessed }) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return isProcessed ? (
    <div
      className={`buttonProcess`}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="">Process Image</div>
      <div className="iconProcess">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="share 1">
            <path
              id="Vector"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7 3.25H3.25V16.75H16.75V13H15.25V15.25H4.75V4.75H7V3.25ZM16.75 3.25H10V4.75H14.19L8.47 10.47L9.53 11.53L15.25 5.81V10H16.75V3.25Z"
              fill="white"
            />
          </g>
        </svg>
      </div>
    </div>
  ) : (
    // Return null or an empty element if isProcessed is false
    null
  );
};

export default ProcessButton;
