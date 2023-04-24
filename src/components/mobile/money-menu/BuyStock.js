import React from "react";
import StockInfo from "./StockInfo";

export const BuyStock = (props) => {
  return (
    <div className="buy-stock-wrapper">
      <StockInfo 
        gameState={props.gameState}
        player={props.player}
        setPlayer={props.setPlayer}
        totalBet={props.totalBet} 
        intermissionState={props.intermissionState} 
        betConfirmed={props.betConfirmed}
      />
    </div>
  );
};
