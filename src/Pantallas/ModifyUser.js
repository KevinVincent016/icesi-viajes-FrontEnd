import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function ModifyUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [usuarios, setUsuarios] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(id || '');

  const rolesMap = {
    admin: 1,
    viewer: 2,
    agente: 3
  };

  const rolesMapReverse = {
    1: 'admin',
    2: 'viewer',
    3: 'agente'
  };

  useEffect(() => {
    fetch(`http://localhost:5430/api/user/ver-usuarios`)
      .then(response => response.json())
      .then(data => {
        setUsuarios(data);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  useEffect(() => {
    if (selectedUserId) {
      console.log("user id: " + selectedUserId)
      axios.get(`http://localhost:5430/api/user/buscar-usuario/${selectedUserId}`)
        .then(response => {
          setUsuario(response.data);
        })
        .catch(error => {
          console.error('Error al obtener el usuario:', error);
        });
    }
  }, [selectedUserId]);

  const [userData, setUserData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    loginU: '',
    passwordU: '',
    idRol: rolesMap['admin']
  });

  useEffect(() => {
    if (usuario) {
      setUserData({
        nombre: usuario.nombre || '',
        apellido: usuario.apellido || '',
        correo: usuario.correo || '',
        loginU: usuario.loginU || '',
        passwordU: usuario.passwordU || '',
        idRol: usuario.idRol || rolesMap['admin']
      });
    }
  }, [usuario]);

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
      idRol: name === 'rol' ? rolesMap[value] : userData.idRol
    });
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5430/api/user/modificar-usuario/${selectedUserId}`, userData);
      navigate('/ver-usuarios');
    } catch (error) {
      console.error('Error al modificar el usuario:', error);
      alert('Error al modificar el usuario');
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: '1', padding: '20px', overflowY: 'auto' }}>
        <div className="login-message">
          {message && <p style={{ color: 'red', fontWeight: 'bold' }}>{message}</p>}
        </div>
        {!selectedUserId ? (
          <div className="form-group">
            <label htmlFor="userSelector">Selecciona un usuario</label>
            <select
              id="userSelector"
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
            >
              <option value="">-- Selecciona un usuario --</option>
              {usuarios.map(user => (
                <option key={user.idUsua} value={user.idUsua}>
                  {user.nombre} {user.apellido} ({user.loginU})
                </option>
              ))}
            </select>
          </div>
        ) : (
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
              <select id="rol" name="rol" value={rolesMapReverse[userData.idRol]} onChange={handleChange} required>
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
            <button type="submit">Modificar Usuario</button>
          </form>
        )}
      </div>
      <div style={{ flex: '1', padding: '20px', backgroundColor: '#f0f0f0' }}>
        <h2>Información Importante</h2>
        <h3>Modificación de usuario</h3>
        <p>Asegúrese de completar todos los campos correctamente para crear un nuevo usuario.</p>
        <p>Elija el tipo de identificación adecuado y proporcione un correo electrónico válido.</p>
        <p>El rol determina el nivel de acceso del usuario dentro del sistema.</p>
      </div>
    </div>
  );
}

export default ModifyUser;
