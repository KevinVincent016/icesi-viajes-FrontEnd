import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../image-removebg-preview (1).png'; // Ajusta la ruta de la imagen según tu estructura de archivos

function Navbar() {
  return (
    <div className="header">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
        <span className="company-name">ICESI VIAJES</span>
      </div>
      <Link to="/login" className="help-button">Ayuda</Link>
    </div>
  );
}

export default Navbar;
