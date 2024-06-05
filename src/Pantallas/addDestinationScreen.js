import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddDestinationScreen() {

  const usuarioLogeado = localStorage.getItem('token');
  let user = null;

  if (usuarioLogeado) {
    try {
      user = JSON.parse(usuarioLogeado);
    } catch (error) {
      console.error("Error parsing token:", error);
    }
  }

  const [destinationData, setDestinationData] = useState({
    nombre: '',
    descripcion: '',
    id_tide: '',
    usuCreador: user.loginU
  });

  const [tiposDestino, setTiposDestino] = useState([]);

  const navigate = useNavigate();

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDestinationData({
      ...destinationData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5430/api/destinos/crear', destinationData);
      console.log(response.data);
      navigate('/main');
    } catch (error) {
      console.error('Error al crear el destino:', error);
      alert('Error al crear el destino');
    }
  };

  return (
    <div className="create-user-container">
      <div className="fixed-left">
        <h2>Información Importante</h2>
        <p>Asegúrese de completar todos los campos correctamente para crear un nuevo destino.</p>
        <p>Proporcione el nombre y la ubicación del destino, así como una descripción detallada.</p>
      </div>
      <div className="scrollable-right">
        <form className="create-user-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre del Destino</label>
            <input type="text" id="nombre" name="nombre" value={destinationData.nombre} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="descripcion">Descripción</label>
            <textarea id="descripcion" name="descripcion" value={destinationData.descripcion} onChange={handleChange} required></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="id_tide">Tipo de Destino</label>
            <select id="id_tide" name="id_tide" value={destinationData.id_tide} onChange={handleChange} required>
              <option value="">Seleccione un tipo de destino</option>
              {tiposDestino.length > 0 && tiposDestino.map(tipo => (
                <option key={tipo.idTide} value={tipo.idTide}>{tipo.nombre}</option>
              ))}
            </select>
          </div>
          <button type="submit">Crear Destino</button>
        </form>
      </div>
    </div>
  );
}

export default AddDestinationScreen;
