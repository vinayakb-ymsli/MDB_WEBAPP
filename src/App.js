import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Body from './components/Body';
import { useState } from 'react';



function App() {

  const [loader, setloader] = useState(false);
  const [ufile, setuFile] = useState(null);
  const [dfile, setdfile] = useState(null)




  return (
    <>
    <Navbar/>
    <Body ufile ={ufile} dfile = {dfile} setuFile={setuFile} setdfile = {setdfile}/>
    {/* <div className="App">
     <h1>hellow wolrd</h1>
    </div> */}
    </>
  );
}

export default App;
