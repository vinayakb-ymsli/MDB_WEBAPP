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
import InfoPopup from "./components/InfoPopup";
import './App.css'

// import Modal from react-Modal test ;


function App() {

  const [isBlurr, setisBlurr] = useState(false)
  return (
    <div className="wholeBody">
    <Router>
      <Navbar setisBlurr={setisBlurr}/>
      <div className={isBlurr?"bkg_blurr":""}>
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/process" element={<ProcessPage />} />
        <Route path="/zipprocess" element={<ZipProcess />} />
        {/* <Route path="/InfoPopup" element={<InfoPopup />} /> */}
      </Routes>
      </div>
    </Router>
    </div>
  );
}


export default App;
