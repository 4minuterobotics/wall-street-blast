import React from "react";
import "./_position-button.scss";

const OpenPositionButton = (props) => {
  let intermissionState = props.intermissionState;
  let betConfirmed = props.betConfirmed;
  let setBetConfirmed = props.setBetConfirmed;
  let betPopulated = props.betPopulated;
  let player = props.player;
  // let setPlayer = props.setPlayer;
  let gameState = props.gameState;
  let setBetPopulated = props.setBetPopulated;
  let setTotalBet = props.setTotalBet
  let updatePlayer = props.updatePlayer
  
  let labels = gameState.labels

  let buttonClass
  let buttonText
  let buttonDisabled
  
  if (intermissionState) {
    buttonText = !betConfirmed ? 'Open Position' : 'Cancel Position';
    buttonClass = !betConfirmed ? 'open-position-button' : 'cancel-position-button';
    buttonDisabled = !betPopulated;
  } else {
    buttonText = !betConfirmed ? '...Wait for next round...' : 'Sell Everything';
    buttonClass = 'open-position-button';
    buttonDisabled = labels.every((stock)=>{
      return gameState.busted[stock] || player.cashout[stock];
    })
  }

  // TODO: Ask Raymour what should position button look like when pressed?
  
  const handleClick = (e) => {
    e.preventDefault();
    if (intermissionState) {
      if (betPopulated) {
        if (!betConfirmed) {
          setBetConfirmed(true);
        } else {
          setBetConfirmed(false);
          setTotalBet(0)
          setBetPopulated(false)
        }
      }
    } else {
      if (betPopulated && betConfirmed) {
        labels.forEach((stock)=>{
          if (!gameState.busted[stock] && !player.cashout[stock]) {
            player.cashout[stock] = gameState.blasts[stock];
          }
        });
        updatePlayer();
      }
    }
  }
  
  return (
    <div className="position-button-wrapper">
      <button disabled={buttonDisabled} className={buttonClass} onClick={handleClick} >
        {buttonText}
      </button>
    </div>
  );
};

export default OpenPositionButton;