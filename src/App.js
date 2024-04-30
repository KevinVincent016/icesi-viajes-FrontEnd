import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import logo from '/Users/juanfelipe/Desktop/IcesiViajesFrontEndGithub/icesi-viajes-FrontEnd/src/image-removebg-preview (1).png'; 
import Login from './Login';
import MainScreen from './MainScreen'; 

function App() {
  return (
    <Router>
      <div>
        <div className="header">
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo" />
            <span className="company-name">ICESI VIAJES</span>
          </div>
          <span className="help-button">Ayuda</span>
        </div>
        <Routes>
        <Route path="/login" element={<Login/>} />
          <Route path="/" element={<Login/>} />
          <Route path="/main" element={<MainScreen/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
