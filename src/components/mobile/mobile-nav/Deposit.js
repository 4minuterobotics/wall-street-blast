import React from "react";
import "./_mobile-nav.scss";
import PlusSign from "../../../images/plus.svg";

const Deposit = () => {
  return (
    <div className="deposit-wrapper">
      <img alt="add bet" id="text-logo" src={PlusSign} />
    </div>
  );
};

export default Deposit;
