import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useContext(AuthContext);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !mobile.trim() || !password) {
      setError("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (mobile.length !== 10) {
      setError("Mobile number must be 10 digits");
      return;
    }

    setLoading(true);
    try {
      await register(username, mobile, password);
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Register to Expense Tracker</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={onSubmit}>
          <div className="form-control">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
          <div className="form-control">
            <label htmlFor="mobile">Mobile Number</label>
            <input
              id="mobile"
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter your 10 digit mobile number"
            />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password (min 6 characters)"
            />
          </div>
          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
