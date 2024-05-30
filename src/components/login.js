import React, { createContext, useContext, useState } from "react";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import "../styles/auth.css";
import { IoMdPerson } from "react-icons/io";
import { FaLock } from "react-icons/fa6";
import NotificationPopup from "./NotificationPopup";
import { useAuth } from "./Authcontext";

// Login component
const LoginPage = () => {
  const {setIsLoggedIn,isLoggedIn} =useAuth();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedInLocal, setisLoggedInLocal] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // New state for error message
  const cred ={
    user:"ravi",pass:"123"
  };

  const handleLogin = () => {
    // Implement your login logic here
    // For simplicity, let's just check if email and password are not empty
    if (email==cred.user && password==cred.pass) {
      setisLoggedInLocal(true);
      console.log(email,password)
      console.log(login)
      console.log(isLoggedIn)
      setIsLoggedIn(true)
      login(email,password)
      navigate("/");
    }
    else{
      setErrorMessage("Invalid username or password");
      console.log("Invalid id pass")
      console.log(isLoggedIn)
      login(email,password)
      setIsLoggedIn(false)
    }
  };

  // if (isLoggedInLocal) {
  //   // Redirect to dashboard if already logged in
  //   return <Navigate to="/dashboard" />;
  // }

  const handleForgotPasswordClick = () => {
    // Show the forgot password fields
    setShowForgotPassword(!showForgotPassword);
  };

  const handleResetPassword = () => {
    // Implement logic to send reset password email
    // For now, let's just log the email
    console.log("Reset password email sent to:", email);
    setShowNotification(true);
    setShowForgotPassword(false)
  };
  const closeNotification = () => {
    setShowNotification(false);
  };
  const closeWrongPassword =() =>{
    setErrorMessage(null)
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
            <div className="heading-form-login">
              {showForgotPassword ? "Forgot Password" : "Login Here"}
            </div>
            {errorMessage && <div className="error-message"><NotificationPopup
          message={errorMessage}
          duration={3000}
          onClose={closeWrongPassword}
        /></div>}
            {!showForgotPassword ? (
              <form>
                {/* Email and Password input fields */}
                <div class="input-wrapper">
                  <div class="inputcontainerLogin">
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
                      className="inputLogin"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div class="input-wrapper">
                  <div class="inputcontainerLogin">
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
                      className="inputLogin"
                      style={{ border: "none", margin: "0" }}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                {/* Forgot Password link */}
                <div className="forgot">
                  <span
                    onClick={handleForgotPasswordClick}
                    style={{
                      color: "rgb(13, 25, 114)",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    Forgot Password?
                  </span>
                </div>

                {/* Login button */}
                <button
                  style={{
                    backgroundColor: "rgb(13, 25, 114)",
                    width: "100%",
                    fontWeight: "bold",
                    letterSpacing: "2px",
                  }}
                  type="button"
                  onClick={handleLogin}
                >
                  LOGIN
                </button>
              </form>
            ) : (
              <div>
                <form>
                  {/* Email input field for password reset */}
                  <div class="input-wrapper">
                    <div class="inputcontainerLogin">
                      <div class="icon">
                        <IoMdPerson
                          style={{
                            color: "rgb(13, 25, 114)",
                            fontSize: "larger",
                          }}
                        />
                      </div>
                      <input
                        style={{ border: "none", margin: "0" }}
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />{" "}
                    </div>
                  </div>
                  {/* Reset Password button */}
                  <button
                    style={{
                      backgroundColor: "rgb(13, 25, 114)",
                      width: "100%",
                      fontWeight: "bold",
                    }}
                    type="button"
                    onClick={handleResetPassword}
                  >
                    Reset Password
                  </button>
                </form>
                <p>
                  Remember your password?{" "}
                  <span
                    onClick={handleForgotPasswordClick}
                    style={{
                      color: "rgb(13, 25, 114)",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    Login
                  </span>
                </p>
              </div>
            )}

            {/* Register link */}
            {!showForgotPassword && (
              <p>
                Don't have an account?{" "}
                <Link
                  style={{
                    color: "rgb(13, 25, 114)",
                    textDecoration: "underline",
                  }}
                  to="/register"
                >
                  Register
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="machineimg">
        <img src="/images/kv_main01.png" alt="" />
      </div>
      {showNotification && (
        <NotificationPopup
          message="Reset email sent to your email address."
          duration={3000}
          onClose={closeNotification}
        />
      )}
    </div>
  );
};

export default LoginPage;
