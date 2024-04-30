import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '/Users/juanfelipe/Desktop/IcesiViajesFrontEndGithub/icesi-viajes-FrontEnd/src/backgroundimage.png';

function Login() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Verificar si hay una sesión activa almacenada en el almacenamiento local
    const isLoggedInFromStorage = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(isLoggedInFromStorage);
    if (isLoggedInFromStorage) {
      // Si hay una sesión activa, redirige al usuario a MainScreen
      navigate('/login');
    }
  }, []); // Solo se ejecuta una vez al cargar el componente

  const handleLogin = () => {
    // Lógica de inicio de sesión aquí

    // Marcar al usuario como conectado y almacenar el estado en el almacenamiento local
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);

    // Redirige al usuario a MainScreen después de iniciar sesión exitosamente
    navigate('/main');
  };

  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="login-container">
        <h1>Bienvenido</h1>
        <form>
          <input type="text" placeholder="Usuario" />
          <input type="password" placeholder="Contraseña" />
          <button type="button" onClick={handleLogin}>Iniciar sesión</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
