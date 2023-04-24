import React from "react";

const RoundTimer = (props) => {
  return (
    <div className="round-timer-wrapper">
      <div className="next-round-in">Next Round In</div>
      <div className={`round-timer ${props.intermissionTime > 10 ? "green" : props.intermissionTime > 5 ? "orange" : "red"}`}>
        {props.intermissionTime}s
      </div>
    </div>
  );
}

export default RoundTimer;