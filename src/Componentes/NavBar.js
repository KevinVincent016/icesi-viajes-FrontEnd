import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../image-removebg-preview (1).png';
import CryptoJS from 'crypto-js';

function Navbar() {
  const location = useLocation();
  const secretKey = 'IcEvIaJeS';

  const handleLogout = (e) => {
    localStorage.removeItem('token')
  };

  const encryptedToken = localStorage.getItem('token');
  let user = null;

  if (encryptedToken) {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      user = JSON.parse(decryptedData);
    } catch (error) {
      console.error("Error parsing token:", error);
    }
  }

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
    }else {
      return (
        <div className="header">
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo" />
            <span className="company-name">ICESI VIAJES</span>
          </div>
          <div className="menu-container">
            <ul className="menu">
            {user && user.idRol === 1 && (
                    <>
                      <li><Link to="/main" className="inicio">Inicio</Link></li>
                      <li className="dropdown-parent"> 
                      <span className="usuarios">Usuarios</span>
                        <div className="submenu">
                          <Link to="/ver-usuarios" className="nav-link">Ver Usuarios</Link>
                          <Link to="/anadir-usuarios" className="nav-link">Añadir Usuarios</Link>
                          <Link to="/modificar-usuarios/" className="nav-link">Modificar Usuarios</Link>
                        </div>
                      </li>
                      <li className="dropdown-parent"> 
                      <span className="planes">Planes</span>
                        <div className="submenu">
                          <Link to="/ver-planes" className="nav-link">Ver Planes</Link>
                          <Link to="/anadir-planes" className="nav-link">Añadir Planes</Link>
                          <Link to="/modificar-planes" className="nav-link">Modificar Planes</Link>
                        </div>
                      </li>
                      <li className="dropdown-parent"> 
                      <span className="destinos">Destinos</span>
                        <div className="submenu">
                          <Link to="/ver-destinos" className="nav-link">Ver Destinos</Link>
                          <Link to="/anadir-destinos" className="nav-link">Añadir Destinos</Link>
                          <Link to="/modificar-destinos" className="nav-link">Modificar Destinos</Link>
                        </div>
                      </li>
                      <li><Link to="/añadir-servicios" className="servicios">Servicios</Link></li>
                      <li className="dropdown-parent"> 
                      <span className="reservas">Reservas</span>
                        <div className="submenu">
                          <Link to="/ver-reservas" className="nav-link">Ver Reservas</Link>
                          <Link to="/anadir-reservas" className="nav-link">Añadir Reservas</Link>
                          <Link to="/modificar-reservas" className="nav-link">Modificar Reservas</Link>
                        </div>
                      </li>
                      <li><Link to="/reportes" className="nav-link">Reportes</Link></li>
                      <li><Link to="/ayuda" className="help-button">Ayuda</Link></li>
                      <li><Link to="/" className="nav-link" onClick={handleLogout}>Logout</Link></li>
                    </>
                  )}
            {user && user.idRol === 2 && (
                    <>
                      <li><Link to="/main" className="inicio">Inicio</Link></li>
                      <li><Link to="/ver-planes" className="planes">Ver planes</Link></li>
                      <li><Link to="/ver-destinos" className="nav-link">Ver destinos</Link></li>
                      <li><Link to="/ayuda" className="help-button">Ayuda</Link></li>
                      <li><Link to="/" className="nav-link" onClick={handleLogout}>Logout</Link></li>
                    </>
                  )}
            {user && user.idRol === 3 && (
                    <>
                      <li><Link to="/main" className="inicio">Inicio</Link></li>
                      <li className="dropdown-parent"> 
                      <span className="planes">Planes</span>
                        <div className="submenu">
                          <Link to="/ver-planes" className="nav-link">Ver Planes</Link>
                          <Link to="/anadir-planes" className="nav-link">Añadir Planes</Link>
                          <Link to="/modificar-planes" className="nav-link">Modificar Planes</Link>
                        </div>
                      </li>
                      <li className="dropdown-parent"> 
                      <span className="destinos">Destinos</span>
                        <div className="submenu">
                          <Link to="/ver-destinos" className="nav-link">Ver Destinos</Link>
                          <Link to="/anadir-destinos" className="nav-link">Añadir Destinos</Link>
                          <Link to="/modificar-destinos" className="nav-link">Modificar Destinos</Link>
                        </div>
                      </li>
                      <li className="dropdown-parent"> 
                      <span className="reservas">Reservas</span>
                        <div className="submenu">
                          <Link to="/ver-reservas" className="nav-link">Ver Reservas</Link>
                          <Link to="/anadir-reservas" className="nav-link">Añadir Reservas</Link>
                          <Link to="/modificar-reservas" className="nav-link">Modificar Reservas</Link>
                        </div>
                      </li>
                      <li><Link to="/ayuda" className="help-button">Ayuda</Link></li>
                      <li><Link to="/" className="nav-link" onClick={handleLogout}>Logout</Link></li>
                    </>
                  )}
            {user  === null && (
                    <>
                      <li><Link to="/" className="inicio">Inicio</Link></li>
                      <li><Link to="/ayuda" className="help-button">Ayuda</Link></li>
                    </>
                  )}
            </ul>
          </div>
        </div>
      );
    }
  };

  return renderNavbarContent();
}

export default Navbar;