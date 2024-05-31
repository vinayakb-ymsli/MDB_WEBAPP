import React, { createContext, useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Initialize isLoggedIn from localStorage if available, or default to false
    return JSON.parse(localStorage.getItem("isLoggedIn")) || false;
  });

  useEffect(() => {
    // Update localStorage whenever isLoggedIn changes
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  const login = async (username, password) => {
    setIsLoggedIn(true)
    try {
      const response = await axios.post(
        "https://ejmnmassds.ap-south-1.awsapprunner.com/login",
        {
          username,
          password,
        }
        
      );

      console.log(response);
      if (response.data) {
        setIsLoggedIn(true);
      } else {
        console.log("Authentication failed");
      }
    } catch (error) {
      console.error("Error authenticating:", error);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
