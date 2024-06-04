import {
  BrowserRouter as Router,
  Route,
  Routes,
  Redirect,
  Navigate,
} from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar";
import Body from "./components/Body";
import { useState ,useEffect} from "react";
import ProcessPage from "./components/ProcessPage";
import ZipProcess from "./components/ZipProcess";
import InfoPopup from "./components/InfoPopup";
import LoginPage from "./components/login";
import RegisterPage from "./components/register";
import Projects from "./components/projects";
import "./App.css";
import { AuthProvider } from "./components/Authcontext";
import { useAuth } from "./components/Authcontext";
import Navforms from "./components/Navforms";

function App() {
  const { isLoggedIn } = useAuth();
  console.log(isLoggedIn)
  const [isBlurr, setisBlurr] = useState(false);
  useEffect(()=>{
    
  },[isLoggedIn])

  return (
    <div className="wholeBody">
      <AuthProvider>
        <Router>
          <Navbar setisBlurr={setisBlurr} />
          <div className={isBlurr ? "bkg_blurr" : ""}>
            <Routes>
              {/* Route to the DashboardPage if logged in, otherwise to LoginPage */}
              <Route
                path="/"
                element={
                  isLoggedIn ? <Body /> : <LoginPage />
                }
              />
              {/* Route to the ProcessPage */}
              <Route
                path="/process"
                element={isLoggedIn ? <ProcessPage /> : <LoginPage />}
              />
              {/* Route to the ZipProcess */}
              <Route
                path="/zipprocess"
                element={isLoggedIn ? <ZipProcess /> : <LoginPage />}
              />
              {/* Route to the LoginPage */}
              <Route path="/login" element={<LoginPage />} />
              {/* Route to the RegisterPage */}
              <Route path="/register" element={<RegisterPage />} />
              {/* Redirect any unmatched route to the home page */}
              <Route path="*" element={<Navigate to="/" />} />
              {/* Route to the Projects page */}
              <Route
                path="/projects"
                element={isLoggedIn ? <Projects /> : <LoginPage />}
              />
              {/* Route to add client in Projects */}
              <Route
                path="/projects/addclient"
                element={
                  isLoggedIn ? (
                    <Projects toggleForm={true} typeForm="client" />
                  ) : (
                    <LoginPage />
                  )
                }
              />
              {/* Route to add project in Projects */}
              <Route
                path="/projects/addproject"
                element={
                  isLoggedIn ? (
                    <Navforms typeForm="project" />
                  ) : (
                    <LoginPage />
                  )
                }
              />
              {/* Route to add model in Projects */}
              <Route
                path="/projects/addmodel"
                element={
                  isLoggedIn ? (
                    <Navforms typeForm="model" />
                  ) : (
                    <LoginPage />
                  )
                }
              />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
