import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdPerson } from "react-icons/io";
import { FaLock } from "react-icons/fa6";
import NotificationPopup from "./NotificationPopup";
import { useAuth } from "./Authcontext";

const LoginPage = () => {
  const { setIsLoggedIn, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password, (success) => {
        if (success) {
          console.log("logged in");
          navigate("/");
          window.location.reload();
        } else {
          setErrorMessage("Invalid username or password");
        }
      });
    } catch (error) {
      setErrorMessage("An error occurred during login");
      console.error("Login error: ", error);
    }
  };

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(!showForgotPassword);
  };

  const handleResetPassword = () => {
    console.log("Reset password email sent to:", email);
    setShowNotification(true);
    setShowForgotPassword(false);
  };

  const closeNotification = () => {
    setShowNotification(false);
  };

  const closeWrongPassword = () => {
    setErrorMessage(null);
  };

  return (
    <div className="auth-page">
      <div className="input-intro">
        <h1>CELL HANDLER™</h1>
        <span className="text-info-auth">
          The CELL HANDLER™ is an automated system for selecting and isolating
          spheroids/organoids or single cells individually. The integration of
          sophisticated picking and imaging technology enables precise cell
          isolation that is unattainable by conventional methods. The CELL
          HANDLER™ can enhance the efficiency of drug discovery and biomedical
          research through the expansion of options in cell-based screening,
          cell quality management and cell line development.
        </span>

        <div className="login-section">
          <div className="auth-container">
            <div className="heading-form-login">
              {showForgotPassword ? "Forgot Password" : "Login Here"}
            </div>
            {errorMessage && (
              <div className="error-message">
                <NotificationPopup
                  message={errorMessage}
                  duration={3000}
                  onClose={closeWrongPassword}
                />
              </div>
            )}
            {!showForgotPassword ? (
              <form>
                <div className="input-wrapper">
                  <div className="inputcontainerLogin">
                    <div className="icon">
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

                <div className="input-wrapper">
                  <div className="inputcontainerLogin">
                    <div className="icon">
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
                  <div className="input-wrapper">
                    <div className="inputcontainerLogin">
                      <div className="icon">
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
                      />
                    </div>
                  </div>
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
