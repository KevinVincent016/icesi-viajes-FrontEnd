import React, {useState, useEffect} from 'react';
import defaultPlanImage from '../backgroundimage.png';
import PlanCard from '../Componentes/PlanCard';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function ModifyUser() {

  const navigate = useNavigate();
  const { id } = useParams();
  const [usuario, setUsuario] = useState([])

  const rolesMap = {
    admin: 1,
    viewer: 2,
    agente: 3
  };  

  useEffect(() => {
    axios.get(`http://localhost:5430//api/user/buscar-usuario/${id}`)
      .then(response => {
        setUsuario(response.data);
      })
      .catch(error => {
        console.error('Error al obtener el usuario:', error);
      });
  }, [id]);

  const [userData, setUserData] = useState({
    nombre: '',
    apellido: '',
    tipoIdentificacion: 'cedula',
    numeroIdentificacion: '',
    sexo: 'masculino',
    correo: '',
    loginU: '',
    passwordU: '',
    idRol: rolesMap['admin']
  });

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
    try {
      await axios.put(`http://localhost:5430/api/user/modificar-usuario/${id}`, userData);
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
            <label htmlFor="tipoIdentificacion">Tipo de Identificación</label>
            <select id="tipoIdentificacion" name="tipoIdentificacion" value={userData.tipoIdentificacion} onChange={handleChange} required>
              <option value="cedula">Cédula</option>
              <option value="pasaporte">Pasaporte</option>
              <option value="tarjetaDeIdentidad">Tarjeta de Identidad</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="numeroIdentificacion">Número de Identificación</label>
            <input type="text" id="numeroIdentificacion" name="numeroIdentificacion" value={userData.numeroIdentificacion} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="sexo">Sexo</label>
            <select id="sexo" name="sexo" value={userData.sexo} onChange={handleChange} required>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
            </select>
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
      <div style={{ flex: '1', padding: '20px', backgroundColor: '#f0f0f0' }}>
        <h2>Información Importante</h2>
        <h3>Modificacion de usuario</h3>
        <p>Asegúrese de completar todos los campos correctamente para crear un nuevo usuario.</p>
        <p>Elija el tipo de identificación adecuado y proporcione un correo electrónico válido.</p>
        <p>El rol determina el nivel de acceso del usuario dentro del sistema.</p>
      </div>
    </div>
  );
}

export default ModifyUser;
