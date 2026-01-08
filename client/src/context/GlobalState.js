import React, { createContext, useReducer, useEffect, useContext } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";
import { AuthContext } from "./AuthContext";

// API base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// Load transactions from localStorage or use empty array
const loadTransactions = () => {
  try {
    const stored = localStorage.getItem("expenseTracker_transactions");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error loading transactions from localStorage:", error);
    return [];
  }
};

const initialState = {
  transactions: loadTransactions(),
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const { token } = useContext(AuthContext);

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(
        "expenseTracker_transactions",
        JSON.stringify(state.transactions)
      );
    } catch (error) {
      console.error("Error saving transactions to localStorage:", error);
    }
  }, [state.transactions]);

  // Get authorization header with token
  const getAuthHeader = () => {
    return {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  };

  //actions

  async function getTransactions() {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/v1/transactions`,
        getAuthHeader()
      );
      dispatch({
        type: "GET_TRANSACTIONS",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response?.data?.error || "Error fetching transactions",
      });
    }
  }

  async function deleteTransaction(id) {
    try {
      await axios.delete(
        `${API_BASE_URL}/api/v1/transactions/${id}`,
        getAuthHeader()
      );

      dispatch({
        type: "DELETE_TRANSACTION",
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response?.data?.error || "Error deleting transaction",
      });

      return;
    }
  }

  //add transaction
  async function addTransaction(transaction) {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/v1/transactions`,
        transaction,
        getAuthHeader()
      );
      dispatch({
        type: "ADD_TRANSACTION",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response?.data?.error || "Error adding transaction",
      });
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        error: state.error,
        getTransactions,
        loading: state.loading,
        deleteTransaction,
        addTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
