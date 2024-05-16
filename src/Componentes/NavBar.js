// Navbar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../image-removebg-preview (1).png';

function Navbar() {
  const location = useLocation();

  const renderNavbarContent = () => {
    if (location.pathname === '/') {
      return (
        <div className="header">
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo" />
            <span className="company-name">ICESI VIAJES</span>
          </div>
          <div className="menu-container">
            <Link to="/ayuda" className="help-button">Ayuda</Link>
          </div>
        </div>
      );
    } else {
      return (
        <div className="header">
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo" />
            <span className="company-name">ICESI VIAJES</span>
          </div>
          <div className="menu-container">
            <ul className="menu">
              <li><Link to="/" className="inicio">Inicio</Link></li>
              <li className="dropdown-parent"> 
                <span className="planes">Planes</span>
                <div className="submenu">
                  <Link to="/ver-planes" className="nav-link">Ver Planes</Link>
                  <Link to="/anadir-planes" className="nav-link">Añadir Planes</Link>
                  <Link to="/modificar-planes" className="nav-link">Modificar Planes</Link>
                </div>
              </li>
              <li><Link to="/ayuda" className="help-button">Ayuda</Link></li>
            </ul>
          </div>
        </div>
      );
    }
  };

  return renderNavbarContent();
}

export default Navbar;
