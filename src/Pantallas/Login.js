import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom'; 
import backgroundImage from '../backgroundimage.png';
import axios from 'axios';

function Login() {
  const navigate = useNavigate(); 

  const [loginData, setLoginData] = useState({
    login: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
 
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log(loginData);
      const response = await axios.post('http://localhost:5430/api/user/logear', loginData);
      const usuario = response.data;
      console.log('Usuario autenticado:', usuario);

      // Almacenar el token de autenticación en el localStorage
      localStorage.setItem('token', usuario.token);

      // Redirigir al usuario a la pantalla de inicio
      navigate('/main');
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
      if (error.response && error.response.status === 401) {
        setMessage('Credenciales inválidas');
      } else {
        setMessage('Error de inicio de sesión');
      }
    }
  };

  

  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="login-container">
        <div className="login-message">
          <h1>Bienvenido</h1>
          <label>{message}</label>
        </div>
        <div className="login-form">
          <form onSubmit={handleLogin}>
              <input
                className="login-input"
                type="text"
                name="login"
                value={loginData.login}
                onChange={handleChange}
                placeholder="Usuario"
              />
              <input
                className="login-input"
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                placeholder="Contraseña"
              />
              <button className="login-button" type="submit">Iniciar sesión</button>
            </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
