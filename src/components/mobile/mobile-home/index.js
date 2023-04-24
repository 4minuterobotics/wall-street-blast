import React, { useState, useEffect } from "react";
import "./_home.scss";
import { MobileNav } from "../mobile-nav";
import { Blast } from "../blast";
import { MenuBar } from "../menu-bar";
import { MoneyMenu } from "../money-menu";
import OpenPosition from "../open-position";
// import {createHmac} from 'crypto-browserify'

export const MobileHome = (props) => {
  // GAME STATES INCLUDE:
  // - STARTING
  // - STARTED
  // - ENDED

  // eslint-disable-next-line
  let clientSeed =
    "000000000000000007a9a31ff7f07463d91af6b5454241d5faf282e5e0fe1b3a";

  const [player, setPlayer] = useState({ 
    username: "guest-user", 
    balance: 1000, 
    bet: 0,
    profit: 0,
    cashout: {
      AMC: false,
      GME: false,
      BBY: false
    },
    lastGame: {
      AMC: 0,
      GME: 0,
      BBY: 0
    }
  });

  const [gameState, setGameState] = useState(
    {
      state: "STARTING",
      totalPot: 0,
      players: [
        {username: 'username', bet: 200},
        {username: 'username', bet: 100},
        {username: 'username', bet: 50},
        {username: 'username', bet: 25},
        {username: 'username', bet: 10},
        {username: 'username', bet: 5},
        {username: 'username', bet: 1},
      ],
      labels: ['AMC', 'GME', 'BBY'],
      blasts: {
        AMC: 1,
        GME: 1,
        BBY: 1
      },
      busted: {
        AMC: false,
        GME: false,
        BBY: false
      },
      lastGame: { // TODO: Ask Raymour what happens when there is no player data but games are being watched
        AMC: 0,
        GME: 0,
        BBY: 0,
      }
    }
  )

  const [intermissionState, setIntermissionState] = useState(true);
  const [intermissionTime, setIntermissionTime] = useState(7);
  const [betPopulated, setBetPopulated] = useState(false);
  const [totalBet, setTotalBet] = useState("0");
  const [betConfirmed, setBetConfirmed] = useState(false);

  const [stockOneRandomTime, setStockOneRandomTime] = useState(0)
  const [stockTwoRandomTime, setStockTwoRandomTime] = useState(0)
  const [stockThreeRandomTime, setStockThreeRandomTime] = useState(0)

  const [stockOneBusted, setStockOneBusted] = useState(false)
  const [stockTwoBusted, setStockTwoBusted] = useState(false)
  const [stockThreeBusted, setStockThreeBusted] = useState(false)

  const [multiplier, setMultiplier] = useState(10)
  const [rate, setRate] = useState(1000)
  const [tick, setTick] = useState(0)
  
  // INTERMISSION
  useEffect(() => {
    if (intermissionState === true) { //game has not started
      setRandomTimers();
      if (intermissionTime >= 0) {
        countdown(); //countdown from 15 every second
      } else if (intermissionTime < 0) {
        startGame();
      }
    } else if (intermissionState === false) { //game started
      setBustTimers();
      setTick(1);
    }
    // eslint-disable-next-line
  }, [intermissionTime, intermissionState]);

  // GAME LOGIC
  useEffect(() => {
    if (!intermissionState && (!stockOneBusted || !stockTwoBusted || !stockThreeBusted)) {
      setMultiplier(multiplier+1);
      setRate(rate*0.96);
      if (!stockOneBusted || !stockTwoBusted | !stockThreeBusted) {
        setTimeout(() => { setTick(tick + 1) }, rate);
      }
    }
    // eslint-disable-next-line
  }, [tick])

  // BLAST UPDATER
  useEffect(() => {
    if (!stockOneBusted) { gameState.blasts.AMC = multiplier / 10 }
    if (!stockTwoBusted) { gameState.blasts.GME = multiplier / 10 }
    if (!stockThreeBusted) { gameState.blasts.BBY = multiplier / 10 }
    gameState.busted.AMC = stockOneBusted
    gameState.busted.GME = stockTwoBusted
    gameState.busted.BBY = stockThreeBusted
    setGameState(JSON.parse(JSON.stringify(gameState)))
    updatePlayer();
    // eslint-disable-next-line
  }, [multiplier, stockOneBusted, stockTwoBusted, stockThreeBusted])

  // RESET GAME
  useEffect(() => {
    if (stockOneBusted && stockTwoBusted && stockThreeBusted) {
      updatePlayer(true);
      resetGame();
    }
    // eslint-disable-next-line
  }, [stockOneBusted, stockTwoBusted, stockThreeBusted])

  function crashPointMVP () {
    return (Math.random()*100000) / (1 + Math.random()*10);
  }

  function setRandomTimers() {
    setStockOneRandomTime(crashPointMVP());
    setStockTwoRandomTime(crashPointMVP());
    setStockThreeRandomTime(crashPointMVP());
  }

  function unbustStocks() {
    setStockOneBusted(false);
    setStockTwoBusted(false);
    setStockThreeBusted(false);
  }

  function countdown() {
    setTimeout(() => {
      setIntermissionTime((intermissionTime) => (intermissionTime - 0.1).toFixed(1));
    }, 99);
  }

  function startGame() {
    setRandomTimers();
    setIntermissionState(false);
    subtractBet();
  }

  function setBustTimers() {
    setTimeout(bustStock1, stockOneRandomTime);
    setTimeout(bustStock2, stockTwoRandomTime);
    setTimeout(bustStock3, stockThreeRandomTime);
  }

  function bustStock1() {
    setStockOneBusted(true);
  }
  function bustStock2() {
    setStockTwoBusted(true);
  }
  function bustStock3() {
    setStockThreeBusted(true);
  }

  function subtractBet () {
    player.balance -= totalBet;
    setPlayer(JSON.parse(JSON.stringify(player)));
  }

  function updatePlayer (balance=false) {
    let revenue = 0;
    gameState.labels.forEach((label)=>{
      if (player.cashout[label]) {
        revenue += totalBet/3 * player.cashout[label];
        if (balance) {
          player.lastGame[label] = betConfirmed ? ((player.cashout[label]-totalBet/3)/(totalBet/3)).toFixed(1) : 0
        }
      }
    });
    if (balance) {player.balance += revenue;}
    player.profit = revenue-player.bet;
    setPlayer(JSON.parse(JSON.stringify(player)));
  }

  function resetGame () {
    setTimeout(()=>{
      setIntermissionState(true);
      gameState.labels.forEach((stock)=>{
        player.cashout[stock] = false;
        gameState.lastGame[stock] = gameState.blasts[stock]
      })
      setPlayer(JSON.parse(JSON.stringify(player)));
      setGameState(JSON.parse(JSON.stringify(gameState)))
      setBetConfirmed(false);
      setTotalBet(0);
      setBetPopulated(false);
      unbustStocks();
      setMultiplier(10);
      setRate(1000);
      setTick(0);
      setIntermissionTime(7);
    }, 5000)
  }

  return (
    <div className="home-wrapper">
      <MobileNav
        player={player}
        gameState={gameState}
        intermissionState={intermissionState}
        betConfirmed={betConfirmed}
      />
      <Blast
        player={player}
        gameState={gameState}
        intermissionState={intermissionState}
        intermissionTime={intermissionTime}
      />
      <MenuBar />
      <MoneyMenu
        player={player}
        setPlayer={setPlayer}
        gameState={gameState}
        setGameState={setGameState}
        totalBet={totalBet}
        setTotalBet={setTotalBet}
        setBetPopulated={setBetPopulated}
        intermissionState={intermissionState}
        betConfirmed={betConfirmed}
        setBetConfirmed={setBetConfirmed}
      />
      <OpenPosition
        intermissionState={intermissionState}
        betConfirmed={betConfirmed}
        setBetConfirmed={setBetConfirmed}
        betPopulated={betPopulated}
        setBetPopulated={setBetPopulated}
        player={player}
        setPlayer={setPlayer}
        gameState={gameState}
        setTotalBet={setTotalBet}
        updatePlayer={updatePlayer}
      />
    </div>
  );
};
