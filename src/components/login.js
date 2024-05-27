import React, { createContext, useContext, useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import "../styles/auth.css";

// Login component
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Implement your login logic here
    // For simplicity, let's just check if email and password are not empty
    if (email && password) {
      setIsLoggedIn(true);
    }
  };

  if (isLoggedIn) {
    // Redirect to dashboard if already logged in
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="page">
      <div className="input-intro">
        <h1 className="">CELL HANDLER™</h1>
        <h6 className="">
          The CELL HANDLER™ is an automated system for selecting and isolating
          spheroids/organoids or single cells individually. The integration of
          sophisticated picking and imaging technology enables precise cell
          isolation that is unattainable by conventional methods. The CELL
          HANDLER™ can enhance the efficiency of drug discovery and biomedical
          research through the expansion of options in cell-based screening,
          cell quality management and cell line development.
        </h6>
      </div>

      <div className="auth-container">
        <h2>Login</h2>
        <form>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" onClick={handleLogin}>
            Login
          </button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
