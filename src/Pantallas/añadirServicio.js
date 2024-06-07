import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AñadirServicio() {
    const usuarioLogeado = localStorage.getItem('token');
    const [userU, setUserU] = useState(null);
  
    useEffect(() => {
      if (usuarioLogeado) {
        try {
          const user = JSON.parse(usuarioLogeado);
          setUserU(user.loginU);
        } catch (error) {
          console.error("Error parsing token:", error);
        }
      }
    }, [usuarioLogeado]);
  
    const [serviceData, setServiceData] = useState({
      nombre: '',
      descripcion: '',
      hospedajes: false,
      comidas: false,
      transportes: false,
      usuarioCreador: userU || '',
    });
  
    // Update serviceData when userU changes
    useEffect(() => {
      setServiceData((prevData) => ({
        ...prevData,
        usuarioCreador: userU,
      }));
    }, [userU]);
  
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      const newValue = type === 'checkbox' ? checked : value;
      setServiceData({
        ...serviceData,
        [name]: newValue,
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(serviceData)
      try {
        const response = await axios.post('http://localhost:5430/api/servicios/crearServicio', serviceData);
        console.log(response.data);
        navigate('/main');
      } catch (error) {
        console.error('Error al crear el servicio:', error);
        alert('Error al crear el servicio');
      }
    };

  return (
    <div className="create-service-container">
      <div className="fixed-left">
        <h2>Información Importante</h2>
        <p>Asegúrese de completar todos los campos correctamente para crear un nuevo servicio.</p>
        <p>Proporcione el nombre y la descripción del servicio, así como el tipo correspondiente.</p>
      </div>
      <div className="scrollable-right">
        <form className="create-service-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre del Servicio</label>
            <input type="text" id="nombre" name="nombre" value={serviceData.nombre} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="descripcion">Descripción</label>
            <textarea id="descripcion" name="descripcion" value={serviceData.descripcion} onChange={handleChange} required></textarea>
          </div>
          <div className="form-group">
            <label>Tipo de Servicio:</label>
            <div>
              <label>
                <input type="checkbox" name="hospedajes" checked={serviceData.hospedajes} onChange={handleChange} />
                Hospedajes
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" name="comidas" checked={serviceData.comidas} onChange={handleChange} />
                Comidas
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" name="transportes" checked={serviceData.transportes} onChange={handleChange} />
                Transportes
              </label>
            </div>
          </div>
          <button type="submit">Crear Servicio</button>
        </form>
      </div>
    </div>
  );
}

export default AñadirServicio;
