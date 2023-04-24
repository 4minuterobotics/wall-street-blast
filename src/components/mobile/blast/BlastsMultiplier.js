import React from "react";
import Triangle from "./Triangle";
import BlastHistory from "../../../images/blast-history.svg";

const BlastsMultiplier = (props) => {
  let player = props.player;
  let gameState = props.gameState;

  return (
    <div className="blast-multiplier-wrapper">
      {gameState.labels.map((s, i) => (
        <div key={i} className="blast-multiplier">
          <div className="type">{s}</div>
          <div className="stats">
            <div className="left">
              <div className={`percent ${player.lastGame[s] > 0 ? 'green' : player.lastGame[s] < 0 ? 'red' : ''}`}>
                {`${player.lastGame[s] > 0 ? '+' : ''}${player.lastGame[s]}%`}
              </div>
              <div className="triangle">
                <Triangle color={`${player.lastGame[s] > 0 ? 'green' : player.lastGame[s] < 0 ? 'red' : 'black'}`} />
              </div>
            </div>
            <div className="multiplier">{gameState.lastGame[s]}x</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BlastsMultiplier;