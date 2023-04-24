import React from "react";
import "./_money-menu.scss";
import CashFlow from "./CashFlow";
import { BuyStock } from "./BuyStock";

export const MoneyMenu = (props) => {
  return (
    <div className="money-menu-wrapper">
      <BuyStock 
        player={props.player}
        setPlayer={props.setPlayer}
        gameState={props.gameState}
        totalBet={props.totalBet}
        intermissionState={props.intermissionState} 
        betConfirmed={props.betConfirmed}
       />
      <CashFlow 
        totalBet={props.totalBet} 
        setTotalBet={props.setTotalBet}
        setBetPopulated={props.setBetPopulated}
        player={props.player}
        setPlayer={props.setPlayer}
      />
    </div>
  );
};
