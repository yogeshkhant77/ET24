import React from "react";
import spendingLogo from "../spending.png";

const Header = () => {
  return (
    <h1 className="header">
      <img src={spendingLogo} alt="logo" className="header-logo" />
      Expense Tracker
    </h1>
  );
};

export default Header;
