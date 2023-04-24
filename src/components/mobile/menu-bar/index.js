import React from "react";
import "./_menu-bar.scss";
import RocketShip from "../../../images/rocket-ship.svg";
import Chat from "../../../images/chat.svg";
import Timer from "../../../images/timer.svg";
import Gear from "../../../images/gear.svg";

export const MenuBar = () => {
  return (
    <div className="menu-bar-wrapper">
      <div className="menu-bar left">
        <div className="menu-icon">
          <img src={RocketShip} alt="rocket ship" />
        </div>
        <div className="menu-icon">
          <img src={Chat} alt="chat window" />
        </div>
        <div className="menu-icon">
          <img src={Timer} alt="timer history" />
        </div>
      </div>
      <div className="menu-bar right">
        <div className="menu-icon">
          <img src={Gear} alt="gear" />
        </div>
      </div>
    </div>
  );
};
