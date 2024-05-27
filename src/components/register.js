import { React, useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import "../styles/auth.css";
import { IoMdPerson } from "react-icons/io";
import { FaLock } from "react-icons/fa6";

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
            <div className="heading-form-login">Register here</div>
            <form>
              <div class="input-wrapper">
                <div class="input-container">
                  <div class="icon">
                    <IoMdPerson
                      style={{
                        color: "rgb(13, 25, 114)",
                        fontSize: "larger",
                      }}
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Email"
                    style={{ border: "none", margin: "0" }}
                    className="input-log"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div class="input-wrapper">
                <div class="input-container">
                  <div class="icon">
                    <FaLock
                      style={{
                        color: "rgb(13, 25, 114)",
                        fontSize: "larger",
                      }}
                    />
                  </div>
                  <input
                    type="password"
                    placeholder="Password"
                    style={{ border: "none", margin: "0" }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <button
                style={{
                  backgroundColor: "rgb(13, 25, 114)",
                  width: "100%",
                  fontWeight: "bold",
                  letterSpacing: "2px",
                }}
                type="button"
                onClick={handleRegister}
              >
                REGISTER
              </button>
            </form>
            <p>
              Already have an account?{" "}
              <Link
                style={{
                  color: "rgb(13, 25, 114)",
                  textDecoration: "underline",
                }}
                to="/login"
              >
                Login
              </Link>
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
