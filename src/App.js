import {
  BrowserRouter as Router,
  Route,
  Routes,
  Redirect, Navigate
} from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar";
import Body from "./components/Body";
import { useState } from "react";
import ProcessPage from "./components/ProcessPage";
import ZipProcess from "./components/ZipProcess";
import InfoPopup from "./components/InfoPopup";
import LoginPage from "./components/login";
import RegisterPage from "./components/register";
import './App.css'

function App() {
  const [isBlurr, setisBlurr] = useState(false);

  return (
    <div className="wholeBody">
      <Router>
        <Navbar setisBlurr={setisBlurr} />
        <div className={isBlurr ? "bkg_blurr" : ""}>
          <Routes>
            <Route path="/" element={<Body />} />
            <Route path="/process" element={<ProcessPage />} />
            <Route path="/zipprocess" element={<ZipProcess />} />
            <Route path="/login" element={<LoginPage />} /> 
            <Route path="/register" element={<RegisterPage />} /> 
            <Route path="*" element={<Navigate to="/" />} /> {/* Redirect any unmatched route to the home page */}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
