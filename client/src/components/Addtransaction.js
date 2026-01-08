import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

const Addtransaction = () => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text.trim() || amount === "") {
      return;
    }

    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text: text.trim(),
      amount: +amount,
    };

    addTransaction(newTransaction);
    setText("");
    setAmount("");
  };

  return (
    <div>
      <h3>Add new transaction</h3>
      <form id="form" onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input
            id="text"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text..."
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Amount <br />
            (negative - expense, positive - income)
          </label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
          />
        </div>
        <button type="submit" className="btn">
          Add transaction
        </button>
      </form>
    </div>
  );
};

export default Addtransaction;