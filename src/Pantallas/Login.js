import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import backgroundImage from '../backgroundimage.png';

function Login() {
  const navigate = useNavigate(); 

  const handleLogin = () => {
   

    navigate('/main');
  };

  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="login-container">
        <h1>Bienvenido</h1>
        <form>
        <input className="login-input" type="text" placeholder="Usuario" />
          <input className="login-input" type="password" placeholder="Contraseña" />
          <button className="login-button" type="button" onClick={handleLogin}>Iniciar sesión</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
