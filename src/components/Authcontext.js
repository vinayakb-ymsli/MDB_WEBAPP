import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import request from 'superagent';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return JSON.parse(localStorage.getItem("isLoggedIn")) || false;
  });

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  const login = async (username, password) => {
    setIsLoggedIn(true)
    let token = ""
    let response =""
      const data=JSON.stringify({
        "username": username,
        "password": password
    })

      // const response = await axios.post( 
      //   "http://127.0.0.1:8000/login",
      //   { username, password }
      // );
      // const response = await axios.get(
      //   "http://127.0.0.1:8000/contents", 
      //   data,{
      //     headers: {
      //       'Content-Type': 'application/json'
      //     }
      //   }
      // );
      response = await request
      .post('http://127.0.0.1:8000/login')
      .send(data)
      .set('Content-Type', 'application/json')
      .then(response => console.log(response.body))
      .then(token=response.body)
      .catch(err => console.log(err))
      .then();
      
  //     if (token) {
  //       setIsLoggedIn(true);
  //       console.log(token)
  //     } else {
  //       throw new Error("Authentication failed");
  //     }

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
