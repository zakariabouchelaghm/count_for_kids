import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavbarComponent  from './navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import About  from "./pages/about"; 
import Activities from "./pages/activities";
import Home from "./pages/home";
function App() {
  
  return (
    <>
    <NavbarComponent/>
     <div style={{ paddingTop: '70px' }}>
    <Routes>
      <Route path="/pages/home" element={<Home/>} />
      <Route path="/pages/about" element={<About />} />
      <Route path="/pages/activities" element={<Activities />} />
      
    </Routes>
    </div>
    </>
  )
}

export default App
