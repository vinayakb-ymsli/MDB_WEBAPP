import React, { createContext, useContext, useState,useEffect } from "react";
import { Navigate } from "react-router-dom";

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
  const cred = {
    user: "ravi",
    pass: "123",
  };
  const login = (email, password) => {
    // Implement your login logic here
    // For simplicity, let's just check if email and password are not empty
    if (email==cred.user && password==cred.pass) {
      setIsLoggedIn(true);
      
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
