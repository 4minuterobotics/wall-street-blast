import React from "react";
import TableHeader from "./TableHeader";

const StockInfo = (props) => {
  let intermissionState = props.intermissionState;
  let betConfirmed = props.betConfirmed;
  let totalBet = props.totalBet
  let gameState = props.gameState;
  let player = props.player;
  let setPlayer = props.setPlayer;
  
  const open = parseInt(totalBet) / 3;
  let labels = gameState.labels
  
  const handleClick = (e) => {
    e.preventDefault();
    if (!gameState.busted[e.target.name]) {
      player.cashout[e.target.name] = gameState.blasts[e.target.name];
      setPlayer(JSON.parse(JSON.stringify(player)));
    }
  }
    
  return (
    <div className="stock-info-wrapper">
      <TableHeader />
      {Object.values(gameState.busted).map((bustStatus, index)=>(
        <div key={index} className={`stock-${index+1}`}>
          <div className="stock-name">
            {labels[index].split('').map((letter, idx)=>(
              <div key={idx}>{letter}</div>
            ))}
          </div>
          <div className={`stock-number-1 ${
            player.cashout[labels[index]] && betConfirmed ? 'green' 
            : gameState.busted[labels[index]] && betConfirmed ? 'red'
            : '' 
          }`}>
            {open ? `$${open.toFixed(2)}` : '---'}
          </div>
          <div className={`stock-number-2 ${
            player.cashout[labels[index]] && betConfirmed ? 'green' 
            : gameState.busted[labels[index]] && betConfirmed ? 'red'
            : '' 
          }`}>
            {
              intermissionState || !betConfirmed ? `---`
              : player.cashout[labels[index]] ? `$${(open*player.cashout[labels[index]]-open).toFixed(2)}`
              : `$${(open*gameState.blasts[labels[index]]-open).toFixed(2)}`
            }
          </div>
          <div className="stock-number-3">
            {
              intermissionState || !betConfirmed ? '---' 
              : `$${(open*gameState.blasts[labels[index]]-open).toFixed(2)}`
            }
          </div>
          <div className="stock-button">
            <button name={labels[index]}
              disabled={intermissionState || !betConfirmed || bustStatus} 
              className={
                intermissionState || !betConfirmed ? 'stock-close'
                : bustStatus && !player.cashout[labels[index]] ? 'stock-bust'
                : player.cashout[labels[index]] ? 'stock-cashed-out'
                : 'stock-open'
              } 
              onClick={handleClick}>
              {
                intermissionState || !betConfirmed ? 'CLOSE' 
                : bustStatus && !player.cashout[labels[index]] ? 'BUST'
                : player.cashout[labels[index]] ? `${player.cashout[labels[index]]}x`
                : 'CLOSE'
              }
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StockInfo;