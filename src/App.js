import React from 'react';
import './App.css';

import backgroundImage from '/Users/juanfelipe/Desktop/IcesiViajesFrontEndGithub/icesi-viajes-FrontEnd/src/backgroundimage.png';
import logo from '/Users/juanfelipe/Desktop/IcesiViajesFrontEndGithub/icesi-viajes-FrontEnd/src/image-removebg-preview (1).png';

function App() {
  return (
    <div>
      <div className="header">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
          <span className="company-name">ICESI VIAJES</span>
        </div>
        <span className="help-button">Ayuda</span>
      </div>
      <div className="App" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="login-container">
          <h1>Bienvenido</h1>
          <form>
            <input type="text" placeholder="Usuario" />
            <input type="password" placeholder="Contraseña" />
            <button type="submit">Iniciar sesión</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
