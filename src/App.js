import {
  BrowserRouter as Router,
  Route,
  Routes,
  Redirect,
} from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar";
import Body from "./components/Body";
import { useState } from "react";
import ProcessPage from "./components/ProcessPage";
import ZipProcess from "./components/ZipProcess";
// import Modal from react-Modal;


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/process" element={<ProcessPage />} />
        <Route path="/zipprocess" element={<ZipProcess />} />
      </Routes>
    </Router>
  );
}


export default App;
