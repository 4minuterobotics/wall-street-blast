import React from "react";
import "./_money-menu.scss";

const DisplayWrapper = (props) => {
  let totalBet = props.totalBet;
  let setTotalBet = props.setTotalBet;
  let setBetPopulated = props.setBetPopulated;
  let player = props.player;
  let setPlayer = props.setPlayer;

  const onBetChange = (event) => {
    let bet = parseInt(event.target.value.substring(1));
    if (bet === 0) {
      setTotalBet(bet || 0);
      setBetPopulated(false)
    } else if (isNaN(bet)){
      setTotalBet(0);
    } else {
      setTotalBet(bet);
      setBetPopulated(true);
    }
    player.bet = totalBet;
    setPlayer(JSON.parse(JSON.stringify(player)))
  };

  return (
    <div className="display-wrapper">
      <input
        type="text"
        className="bet-display total-bet-input"
        placeholder="---"
        value={"$" + totalBet}
        onChange={onBetChange}
        inputMode='numeric'
      />
      <input
        type="text"
        className="bet-display total-profit-input"
        placeholder="$0.00"
        value={"$0.00"}
        readOnly={true}
      />
    </div>
  );
};

const TotalsWrapper = () => {
  return (
    <div className="totals-wrapper">
      <div className="total-bet">Total Bet</div>
      <div className="total-profit">Total Profit</div>
    </div>
  );
};

export const CashFlow = (props) => {
  return (
    <div className="cash-flow-wrapper">
      <DisplayWrapper
        player={props.player}
        setPlayer={props.setPlayer}
        totalBet={props.totalBet}
        setTotalBet={props.setTotalBet}
        setBetPopulated={props.setBetPopulated}
      />
      <TotalsWrapper />
    </div>
  );
};

export default CashFlow;
