import { React, useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import "../styles/auth.css";

// Register component
const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    // Implement your register logic here
    // For simplicity, let's just alert the user with the entered email and password
    alert(`Registered with email: ${email} and password: ${password}`);
  };

  return (
    <div className="page">
      <div className="auth-container">
        <h2>Register</h2>
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
          <button type="button" onClick={handleRegister}>
            Register
          </button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
