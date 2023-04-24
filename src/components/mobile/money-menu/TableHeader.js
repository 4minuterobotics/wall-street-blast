import React from "react";
import "./_money-menu.scss";
import Vector from "../../../images/stock.svg";

const TableHeader = () => {
  return (
    <div className="table-header-wrapper">
      <div className="table-header-col">
        <img src={Vector} alt="vector" />
      </div>
      <div className="table-header-col">OPEN</div>
      <div className="table-header-col">PNL</div>
      <div className="table-header-col">MAX GAIN</div>
      <div className="table-header-col">CASHOUT</div>
    </div>
  );
}

export default TableHeader;