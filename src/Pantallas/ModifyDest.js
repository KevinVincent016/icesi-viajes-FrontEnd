import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';

function ModifyDest() {
  const secretKey = 'IcEvIaJeS';
  const navigate = useNavigate();
  const { id } = useParams();
  const [destinos, setDestinos] = useState([]);
  const [destino, setDestino] = useState(null);
  const [selectedDestId, setSelectedDestId] = useState(id || '');

  const encryptedToken = localStorage.getItem('token');
  const [idUser, setIdUser] = useState('');

  useEffect(() => {
    if (encryptedToken) {
      try {
        const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        const user = JSON.parse(decryptedData);
        setIdUser(user.loginU);
      } catch (error) {
        console.error("Error parsing token:", error);
      }
    }
  }, [encryptedToken]);

  useEffect(() => {
    fetch(`http://localhost:5430/api/destinos/destinos`)
      .then(response => response.json())
      .then(data => {
        setDestinos(data);
      })
      .catch(error => console.error('Error fetching destinos:', error));
  }, []);

  useEffect(() => {
    if (selectedDestId) {
      console.log("user id: " + selectedDestId);
      axios.get(`http://localhost:5430/api/destinos/buscarDestino/${selectedDestId}`)
        .then(response => {
          setDestino(response.data);
        })
        .catch(error => {
          console.error('Error al obtener el destino:', error);
        });
    }
  }, [selectedDestId]);

  const [destData, setDestData] = useState({
    codigo: '',
    fechaCreacion: '',
    fechaModificacion: '',
    usuCreador: '',
    usuModificador: '',
    estado: '',
    nombre: '',
    descripcion: '',
    idTide: ''
  });

  useEffect(() => {
    if (destino) {
      setDestData({
        codigo: destino.codigo,
        fechaCreacion: destino.fechaCreacion,
        fechaModificacion: new Date(),
        usuCreador: destino.usuCreador,
        usuModificador: idUser,
        estado: destino.estado || '',
        nombre: destino.nombre || '',
        descripcion: destino.descripcion || '',
        idTide: destino.idTide || ''
      });
    }
  }, [destino]);

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDestData({
      ...destData,
      [name]: value
    });
    setMessage('');
  };

  const [tiposDestino, setTiposDestino] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5430/api/tiposdestino')
      .then(response => {
        console.log('Tipos de destino obtenidos:', response.data);
        setTiposDestino(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los tipos de destino:', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5430/api/destinos/modificar-destino/${selectedDestId}`, destData);
      navigate('/main');
    } catch (error) {
      console.error('Error al modificar el destino:', error);
      alert('Error al modificar el destino');
    }
  };

  return (
    <div className="create-user-container">
      <div className="scrollable-right">
        <div className="login-message">
          {message && <p style={{ color: 'red', fontWeight: 'bold' }}>{message}</p>}
        </div>
        {!selectedDestId ? (
          <div className="form-group">
            <label htmlFor="userSelector">Selecciona un destino</label>
            <select
              id="userSelector"
              value={selectedDestId}
              onChange={(e) => setSelectedDestId(e.target.value)}
            >
              <option value="">-- Selecciona un destino --</option>
              {destinos.map(dest => (
                <option key={dest.idDest} value={dest.idDest}>
                  {dest.nombre}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <form className="create-user-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre del Destino</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={destData.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="descripcion">Descripción</label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={destData.descripcion}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="estado">Estado</label>
                <select id="estado" name="estado" value={destData.estado} onChange={handleChange} required>
                <option value="Activo">Activo</option>
                <option value="Suspendido">Suspendido</option>
                <option value="inactivo">inactivo</option>
                </select>
            </div>
            <div className="form-group">
              <label htmlFor="idTide">Tipo de Destino</label>
              <select
                id="idTide"
                name="idTide"
                value={destData.idTide}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione un tipo de destino</option>
                {tiposDestino.length > 0 && tiposDestino.map(tipo => (
                  <option key={tipo.idTide} value={tipo.idTide}>{tipo.nombre}</option>
                ))}
              </select>
            </div>
            <button type="submit">Modificar Destino</button>
          </form>
        )}
      </div>
      <div className="fixed-left">
        <h2>Información Importante</h2>
        <p>Asegúrese de seleccionar el destino a editar en la primera casilla</p>
        <p>Procure de completar todos los campos correctamente para modificar exitosamente el destino.</p>
      </div>
    </div>
  );
}

export default ModifyDest;
