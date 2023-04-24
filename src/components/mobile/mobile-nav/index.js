import React from "react";
import "./_mobile-nav.scss";
import HamburgerMenu from "./HamburgerMenu";
import LogoTitle from "./LogoTitle";
import UserInfo from "./UserInfo";
import Deposit from "./Deposit";
import Marquee from "./Marquee";

export const MobileNav = (props) => {
  return (
    <div className="nav">
      <div className="nav-title">
        <div className="nav-subtitle left">
          <HamburgerMenu />
          <LogoTitle />
        </div>
        <div className="nav-subtitle right">
          <UserInfo 
            player={props.player} 
          />
          <Deposit />
        </div>
      </div>
      <Marquee 
        player={props.player} 
        gameState={props.gameState}
        intermissionState={props.intermissionState}
        betConfirmed={props.betConfirmed}
      />
    </div>
  );
};
