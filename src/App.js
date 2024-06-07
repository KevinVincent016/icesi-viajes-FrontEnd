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
import ViewUsers from './Pantallas/ViewUsers.js';
import ModifyUser from './Pantallas/ModifyUser.js';
import AñadirServicio from './Pantallas/añadirServicio.js';
import PlanDetailsPage from './Pantallas/PlanDetailsPage.js';
import DestinoDetailsPage from './Pantallas/DestinoDetailsPage.js';
import ModifyPlans from './Pantallas/ModifyPlan.js';
import ModifyDest from './Pantallas/ModifyDest.js';
import ViewReservas from './Pantallas/ViewReservas';
import AddReservas from './Pantallas/addReservas';
import ModifyReservas from './Pantallas/ModifyReservas';

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
          <Route path="/ver-usuarios" element={<ViewUsers />} />
          <Route path="/modificar-usuarios/:id" element={<ModifyUser />} />
          <Route path="/modificar-usuarios/" element={<ModifyUser />} />
          <Route path="/añadir-servicios/" element={<AñadirServicio />} />
          <Route path="/PlanDetailsPage/:id" element={<PlanDetailsPage />} />
          <Route path="/DestinoDetailsPage/:id" element={<DestinoDetailsPage />} />
          <Route path="/modificar-planes/:id" element={<ModifyPlans />} />
          <Route path="/modificar-planes/" element={<ModifyPlans />} />
          <Route path="/modificar-destinos/" element={<ModifyDest />} />
          <Route path="/ver-reservas" element={<ViewReservas />} />
          <Route path="/anadir-reservas" element={<AddReservas />} />
          <Route path="/modificar-reservas" element={<ModifyReservas />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
