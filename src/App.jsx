import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavbarComponent  from './navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import About  from "./pages/about"; 
import Numbers from "./pages/activities/numbers";
import Alphabet from "./pages/activities/alphabet";
import Home from "./pages/home";
function App() {
  
  return (
    <>
    <NavbarComponent/>
     <div style={{ paddingTop: '70px' }}>
    <Routes>
      <Route path="/pages/home" element={<Home/>} />
      <Route path="/pages/about" element={<About />} />
      <Route path="/pages/activities/numbers" element={<Numbers />} />
      <Route path="/pages/activities/alphabet" element={<Alphabet />} />
    </Routes>
    </div>
    </>
  )
}

export default App
