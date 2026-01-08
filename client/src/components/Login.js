import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Loading from "./Loading";

const Login = () => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!mobile.trim() || !password) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      await login(mobile, password);
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loading />}
      <div className="auth-container">
        <div className="auth-form">
          <h2>Login to Expense Tracker</h2>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={onSubmit}>
            <div className="form-control">
              <label htmlFor="mobile">Mobile Number</label>
              <input
                id="mobile"
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Enter your mobile number"
              />
            </div>
            <div className="form-control">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
            <button type="submit" className="btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
