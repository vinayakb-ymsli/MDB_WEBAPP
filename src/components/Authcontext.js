import React, { createContext, useContext, useState, useEffect } from "react";
import request from "superagent";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem("token");
  });

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  const login = async (username, password, callback) => {
    let token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      console.log("Already logged in with token:", token);
      if (callback) callback(true);
      return;
    }

    try {
      const response = await request
        .post("https://ejmnmassds.ap-south-1.awsapprunner.com/login")
        .send({ username, password })
        .set("Content-Type", "application/json");

      token = response.body;  // Assuming the token is in response.body.token

      if (token) {
        setIsLoggedIn(true);
        localStorage.setItem("token", token);
        console.log("Login successful, token stored:", token);
        if (callback) callback(true);
      } else {
        if (callback) callback(false);
        throw new Error("Authentication failed");
      }
    } catch (err) {
      if (callback) callback(false);
      console.error("Login error:", err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
