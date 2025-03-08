import React from "react";
import "../cssFiles/Navbar.css";
import { FaPlus } from "react-icons/fa6";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

export default function Navbar() {
  return (
    <>
      <div className="nav-container">
        <div className="nav-logo">
          <h3 className="flogo">DEEPSHIT</h3>
        </div>

        <div className="newchatBtn">
          <a data-tooltip-id="my-tooltip" data-tooltip-content="New Chat">
            <button>
              <Tooltip id="my-tooltip" />
              <FaPlus /> New Chat
            </button>
          </a>
        </div>

        <div className="nav-history">
          <h7 className="day">Today's Chat</h7>
          <h7 className="chat">{}</h7>

        </div>
      </div>
    </>
  );
}
