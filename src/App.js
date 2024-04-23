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

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/process" element={<ProcessPage />} />
      </Routes>
    </Router>
  );
}

export default App;
