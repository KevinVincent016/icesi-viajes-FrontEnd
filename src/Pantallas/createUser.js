import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CryptoJS from 'crypto-js';

function CreateUser() {
  const secretKey = 'IcEvIaJeS';
  const navigate = useNavigate();

  const encryptedToken = localStorage.getItem('token');
  const [userU, setUserU] = useState('');

  useEffect(() => {
    if (encryptedToken) {
      try {
        const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        const user = JSON.parse(decryptedData);
        setUserU(user.loginU);
      } catch (error) {
        console.error("Error parsing token:", error);
      }
    }
  }, [encryptedToken]);

  const rolesMap = {
    admin: 1,
    viewer: 2,
    agente: 3
  };

  const [userData, setUserData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    loginU: '',
    passwordU: '',
    idRol: rolesMap['admin']
  });

  useEffect(() => {
    setUserData(prevData => ({
      ...prevData,
      usuCreador: userU,
      usuModificador: userU
    }));
  }, [userU]);

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    const idRol = rolesMap[value] || userData.idRol;
    setUserData({
      ...userData,
      [name]: value,
      idRol: idRol
    });
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userData)
    try {
      const response = await axios.post('http://localhost:5430/api/user/crear', userData);
      console.log(response.data);
      alert('Usuario creado exitosamente');
      navigate('/main');
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      if (error.response) {
        setMessage('Error al crear el usuario: ' + error.response.data);
      } else if (error.request) {
        setMessage('Error al crear el usuario: no se recibió respuesta del servidor');
      } else {
        setMessage('Error al crear el usuario: ' + error.message);
      }
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: '1', padding: '20px', backgroundColor: '#f0f0f0' }}>
        <h2>Información Importante</h2>
        <p>Asegúrese de completar todos los campos correctamente para crear un nuevo usuario.</p>
        <p>Añada correctamente su nombre y apellido, tambien proporcione un correo electrónico válido.</p>
        <p>El rol determina el nivel de acceso del usuario dentro del sistema.</p>
      </div>
      <div style={{ flex: '1', padding: '20px', overflowY: 'auto' }}>
        <div className="login-message">
          {message && <p style={{ color: 'red', fontWeight: 'bold' }}>{message}</p>}
        </div>
        <form className="create-user-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input type="text" id="nombre" name="nombre" value={userData.nombre} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="apellido">Apellido</label>
            <input type="text" id="apellido" name="apellido" value={userData.apellido} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="correo">Correo</label>
            <input type="email" id="correo" name="correo" value={userData.correo} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="rol">Rol</label>
            <select id="rol" name="rol" value={userData.rol} onChange={handleChange} required>
              <option value="admin">Admin</option>
              <option value="viewer">Viewer</option>
              <option value="agente">Agente</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="loginU">Login</label>
            <input type="text" id="loginU" name="loginU" value={userData.loginU} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="passwordU">Password</label>
            <input type="password" id="passwordU" name="passwordU" value={userData.passwordU} onChange={handleChange} required />
          </div>
          <button type="submit">Crear Usuario</button>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
