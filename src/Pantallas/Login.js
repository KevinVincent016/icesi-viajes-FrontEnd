import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom'; 
import backgroundImage from '../backgroundimage.png';
import axios from 'axios';
import CryptoJS from 'crypto-js';

const secretKey = 'IcEvIaJeS';

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
    setMessage('');
  };
 
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log(loginData);
      const response = await axios.post('http://localhost:5430/api/user/logear', loginData);
      const usuario = response.data;
      console.log('Usuario autenticado:', usuario);
      
      const encryptedToken = CryptoJS.AES.encrypt(JSON.stringify(usuario), secretKey).toString();

      localStorage.setItem('token', encryptedToken);
      console.log('token: ', localStorage.getItem('token'))
      
      /*
      1 = Admin
      2 = Viewer
      3 = Agente
      */
    
      if(usuario){
        console.log('validacion: ', usuario.idRol)
        navigate('/main');
      }
      
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
          {message && <p style={{color: 'red', fontWeight: 'bold'}}>{message}</p>}
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
