import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from './Componentes/NavBar.js'; 
import Login from './Pantallas/Login';
import MainScreen from './Pantallas/MainScreen'; 

function App() {
  return (
    <Router>
      <div>
        <Navbar /> {/* Aquí se utiliza el componente Navbar */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/main" element={<MainScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
