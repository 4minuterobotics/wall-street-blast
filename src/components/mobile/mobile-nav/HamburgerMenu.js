import React from "react";
import "./_mobile-nav.scss";
import Hamburger from "../../../images/hamburger.svg";

const HamburgerMenu = () => {
  return (
    <div className="hamburger-menu">
      <img alt="menu" id="text-logo" src={Hamburger} />
    </div>
  );
}

export default HamburgerMenu;