import React from "react";
import "./_mobile-nav.scss";

const Marquee = (props) => {
  let player = props.player;
  let gameState = props.gameState;
  let intermissionState = props.intermissionState;
  let betConfirmed = props.betConfirmed;

  let leaderboard = [...gameState.players, player];
  leaderboard.sort((p1, p2) => {
    if (p1.bet === p2.bet) {
      switch (player.username) {
        case p1.username: return -1;
        case p2.username: return 1;
        default: return 0;
      }
    } else {
      return p2.bet - p1.bet;
    }
  })

  return (
    <div className="sub-bar">
      <div className="space"/>
      {leaderboard.map((user, index) => (
        <div key={index} className={`donator ${
          user.username===player.username && !intermissionState && betConfirmed ?
            player.profit > 0 ? 'green'
            : player.profit < 0 ? 'red'
          : '' : '' 
        }`}>
          {`${user.username}: $${user.bet}`}
        </div>
      ))}
    </div>
  );
}

export default Marquee;