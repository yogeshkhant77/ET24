import "./App.css";
import { useState, useContext } from "react";
import userIcon from "./user.png";
import Header from "./components/Header";
import Balance from "./components/Balance";
import Incomeexpenses from "./components/Incomeexpenses";
import Transactionlist from "./components/TransactionList";
import Addtransaction from "./components/Addtransaction";
import Login from "./components/Login";
import Register from "./components/Register";

import { GlobalProvider } from "./context/GlobalState";
import { AuthProvider, AuthContext } from "./context/AuthContext";

function AppContent() {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const [showRegister, setShowRegister] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="auth-page">
        {showRegister ? (
          <>
            <Register />
            <div className="auth-toggle">
              <p>
                Already have an account?{" "}
                <button
                  className="toggle-btn"
                  onClick={() => setShowRegister(false)}
                >
                  Login here
                </button>
              </p>
            </div>
          </>
        ) : (
          <>
            <Login />
            <div className="auth-toggle">
              <p>
                Don't have an account?{" "}
                <button
                  className="toggle-btn"
                  onClick={() => setShowRegister(true)}
                >
                  Register here
                </button>
              </p>
            </div>
          </>
        )}
      </div>
    );
  }
  return (
    <GlobalProvider>
      <div className="App">
        <div className="app-header-with-logout">
          <Header />
          <div className="user-greeting">
            <img src={userIcon} alt="user" className="user-icon" />
            <div className="username-text">{user?.username}</div>
          </div>
          <button className="pushable logout-btn" onClick={logout}>
            <span className="shadow"></span>
            <span className="edge"></span>
            <span className="front">Logout</span>
          </button>
        </div>
        <div className="container">
          <Balance />
          <Incomeexpenses />
          <Transactionlist />
          <Addtransaction />
        </div>
      </div>
    </GlobalProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
