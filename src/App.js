import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from './Componentes/NavBar.js'; 
import Login from './Pantallas/Login';
import MainScreen from './Pantallas/MainScreen'; 
import HelpPage from './Pantallas/HelpPage';
import CreateUser from './Pantallas/createUser';
import AddPlanScreen from './Pantallas/addPlanScreen';
import AddDestinationScreen from './Pantallas/addDestinationScreen';
import ViewDestinationsScreen from './Pantallas/ViewDestinationsScreen';
import ViewPlanScreen from './Pantallas/ViewPlanScreen';

function App() {
  return (
    <Router>
      <div>
        <Navbar /> 
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/main" element={<MainScreen />} />
          <Route path="/ayuda" element={<HelpPage />} />
          <Route path="/anadir-usuarios" element={<CreateUser />} />
          <Route path="/anadir-planes" element={<AddPlanScreen />} />
          <Route path="/anadir-destinos" element={<AddDestinationScreen />} />
          <Route path="/ver-destinos" element={<ViewDestinationsScreen />} />
          <Route path="/ver-planes" element={<ViewPlanScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
