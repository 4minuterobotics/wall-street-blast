import React from "react";
import "./_blast.scss";
import RoundTimer from "./RoundTimer";
import BlastsMultiplier from "./BlastsMultiplier";
import BlastChart from "./BlastChart";


export const Blast = (props) => {
  return (
    <div className="blast-wrapper">
      <BlastsMultiplier gameState={props.gameState} player={props.player} />
      {(props.intermissionState) && (<RoundTimer intermissionTime={props.intermissionTime} />)}
      <BlastChart gameState={props.gameState} />
    </div>
  );
};
