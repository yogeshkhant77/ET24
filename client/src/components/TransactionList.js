import React, { useContext, useEffect } from "react";
import Transaction from "./transaction";
import { GlobalContext } from "../context/GlobalState";

const TransactionList = () => {
  const { transactions, getTransactions } = useContext(GlobalContext);

  useEffect
(() => {
    getTransactions();
  }
, []);


  return (
    <>
      <h3>History</h3>
      <ul id="list" className="list">
        {transactions.map((transaction) => (
          <Transaction key={transaction.id} transaction={transaction} />
        ))}
      </ul>
    </>
  );
};

export default TransactionList;
