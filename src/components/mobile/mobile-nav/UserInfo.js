import React from "react";
import "./_mobile-nav.scss";

const UserInfo = (props) => {
  let balance = `${props.player.balance.toFixed(2)}`;
  let split = balance.split('.');
  let dollars = split[0].split('').reverse();
  let result = split[1].split('');
  result.unshift('.');

  for (let i=0; i<dollars.length; i++) {
    if (i !== 0 && i%3 === 0) {
      result.unshift(',');
    }
    result.unshift(dollars[i]);
  }

  let bankroll = '$' + result.join('');

  return (
    <div className="user-info">
      <div className="bankroll">{bankroll}</div>
      <div className="username">{props.player.username}</div>
    </div>
  );
}

export default UserInfo;