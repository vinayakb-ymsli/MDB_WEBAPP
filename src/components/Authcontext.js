import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return JSON.parse(localStorage.getItem("isLoggedIn")) || false;
  });

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  const login = async (username, password) => {
    try {
      const response = await axios.post(
        "https://ejmnmassds.ap-south-1.awsapprunner.com/login",
        { username, password }
      );

      if (response.data) {
        setIsLoggedIn(true);
      } else {
        throw new Error("Authentication failed");
      }
    } catch (error) {
      console.error("Error authenticating:", error);
      throw error;
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
