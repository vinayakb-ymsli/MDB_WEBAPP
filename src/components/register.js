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
   
    <div className="auth-page">
    <div className="input-intro">
      <h1>CELL HANDLER™</h1>
      <h6>
        The CELL HANDLER™ is an automated system for selecting and isolating
        spheroids/organoids or single cells individually. The integration of
        sophisticated picking and imaging technology enables precise cell
        isolation that is unattainable by conventional methods. The CELL
        HANDLER™ can enhance the efficiency of drug discovery and biomedical
        research through the expansion of options in cell-based screening,
        cell quality management and cell line development.
      </h6>

      <div className="login-section">
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
          <button style={{backgroundColor:"rgb(13, 25, 114)"}} type="button" onClick={handleRegister}>
            Register
          </button>
        </form>
        <p>
          Already have an account? <Link  style={{color:"rgb(13, 25, 114)",textDecoration:"underline"}} to="/login">Login</Link>
        </p>
      </div>
      </div>
    </div>

    <div className="machineimg">
      <img src="/images/kv_main01.png" alt="" />
    </div>
  </div>
  
  );
};

export default RegisterPage;
