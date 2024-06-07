import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';

function AddPlanScreen() {
  const navigate = useNavigate();
  const secretKey = 'IcEvIaJeS';

  const [destinosDisponibles, setDestinosDisponibles] = useState([]);
  const [destinosSeleccionados, setDestinosSeleccionados] = useState([]);
  const [serviciosDisponibles, setServiciosDisponibles] = useState([]);
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState([]);

  const encryptedToken = localStorage.getItem('token');
  const [idUser, setIdUser] = useState('');
  const [usuarioU, setUsuarioU] = useState('');

  useEffect(() => {
    if (encryptedToken) {
      try {
        const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        const user = JSON.parse(decryptedData);
        setIdUser(user.loginU);
        setUsuarioU(user)
      } catch (error) {
        console.error("Error parsing token:", error);
      }
    }
  }, [encryptedToken]);

  const [planData, setPlanData] = useState({
    nombre: '',
    descripcionSolicitud: '',
    cantidadPersonas: '',
    fechaSolicitud: '',
    fechaInicioViaje: '',
    fechaFinViaje: '',
    valorTotal: '',
    estado: '',
    destinos: [],
    servicios: [],
    usuCreador: '',
    usuModificador: '',
    usuario: ''
  });

  useEffect(() => {
    setPlanData(prevData => ({
      ...prevData,
      usuCreador: idUser,
      usuModificador: idUser,
      usuario: usuarioU
    }));
  }, [idUser]);

  useEffect(() => {
    // Fetching available destinations from the backend
    axios.get('http://localhost:5430/api/destinos/destinos')
      .then(response => {
        setDestinosDisponibles(response.data);
      })
      .catch(error => console.error('Error fetching destinations:', error));

    // Fetching available services from the backend
    axios.get('http://localhost:5430/api/servicios/obtenerServicios')
      .then(response => {
        setServiciosDisponibles(response.data);
      })
      .catch(error => {
        console.error('Error fetching services:', error);
      });
  }, []);

  const handleAddDestino = (destino) => {
    setDestinosSeleccionados(prevSeleccionados => [...prevSeleccionados, destino]);
    setDestinosDisponibles(prevDisponibles => prevDisponibles.filter(d => d.idDest !== destino.idDest));
  };

  const handleDelDestino = (destino) => {
    setDestinosDisponibles(prevDisponibles => [...prevDisponibles, destino]);
    setDestinosSeleccionados(prevSeleccionados => prevSeleccionados.filter(d => d.idDest !== destino.idDest));
  };

  const handleAddServicio = (servicios) => {
    setServiciosSeleccionados(prevSeleccionados => [...prevSeleccionados, servicios]);
    setServiciosDisponibles(prevDisponibles => prevDisponibles.filter(s => s.idAdd !== servicios.idAdd));
  };

  const handleDelServicio = (servicios) => {
    setServiciosDisponibles(prevDisponibles => [...prevDisponibles, servicios]);
    setServiciosSeleccionados(serviciosSeleccionados.filter((s) => s.idAdd !== servicios.idAdd));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlanData({
      ...planData,
      [name]: value,
    });
  };

  useEffect(() => {
    setPlanData(prevData => ({
      ...prevData,
      destinos: destinosSeleccionados,
      servicios: serviciosSeleccionados
    }));
  }, [destinosSeleccionados, serviciosSeleccionados]);

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(planData);

    axios.post('http://localhost:5430/api/planes/crear', planData)
      .then(response => {
        console.log('Plan creado:', response.data);   
        alert('Plan creado exitosamente');
        navigate('/main');
      })
      .catch(error => {
        console.error('Error creating plan:', error);
      });
  };

  return (
    <div className="create-plan-container">
      <div className="fixed-left-addPlan">
        <h2>Información Importante</h2>
        <p>Asegúrese de completar todos los campos correctamente para crear un nuevo plan.</p>
        <p>Seleccione los destinos adecuados y proporcione fechas de inicio y finalización válidas.</p>
      </div>
      <div className="scrollable-right-addPlan">
        <form className="create-plan-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre del Plan</label>
            <input type="text" id="nombre" name="nombre" value={planData.nombre} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="descripcionSolicitud">Descripción Solicitud</label>
            <input type="text" id="descripcionSolicitud" name="descripcionSolicitud" value={planData.descripcionSolicitud} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="cantidadPersonas">Cantidad de Personas</label>
            <input type="number" id="cantidadPersonas" name="cantidadPersonas" value={planData.cantidadPersonas} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="fechaSolicitud">Fecha de Solicitud</label>
            <input type="date" id="fechaSolicitud" name="fechaSolicitud" value={planData.fechaSolicitud} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="fechaInicioViaje">Fecha de Inicio de Viaje</label>
            <input type="date" id="fechaInicioViaje" name="fechaInicioViaje" value={planData.fechaInicioViaje} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="fechaFinViaje">Fecha de Finalización de Viaje</label>
            <input type="date" id="fechaFinViaje" name="fechaFinViaje" value={planData.fechaFinViaje} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="valorTotal">Valor Total</label>
            <input type="number" id="valorTotal" name="valorTotal" value={planData.valorTotal} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="estado">Estado</label>
            <select id="estado" name="estado" value={planData.estado} onChange={handleChange} required>
              <option value="Activo">Activo</option>
              <option value="Suspendido">Suspendido</option>
              <option value="inactivo">inactivo</option>
            </select>
          </div>
          <div className="form-group">
            <label>Destinos Disponibles</label>
            <div className="available-destinations">
              {destinosDisponibles.map((destinos) => (
                <div key={destinos.idDest} className="destino-item">
                  <span>{destinos.nombre}</span>
                  <button type="button" onClick={() => handleAddDestino(destinos)}>Añadir</button>
                </div>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>Destinos Seleccionados</label>
            <div className="available-destinations">
              {destinosSeleccionados.map((destinos) => (
                <div key={destinos.idDest} className="destino-item">
                  <span>{destinos.nombre}</span>
                  <button type="button" onClick={() => handleDelDestino(destinos)}>Eliminar</button>
                </div>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>Servicios Disponibles</label>
            <div className="available-services">
              {serviciosDisponibles.map((servicio) => (
                <div key={servicio.idAdd} className="servicio-item">
                  <span>{servicio.nombre}</span>
                  <button type="button" onClick={() => handleAddServicio(servicio)}>Añadir</button>
                </div>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>Servicios Seleccionados</label>
            <div className="available-destinations">
              {serviciosSeleccionados.map((servicio) => (
                <div key={servicio.idAdd} className="destino-item">
                  <span>{servicio.nombre}</span>
                  <button type="button" onClick={() => handleDelServicio(servicio)}>Eliminar</button>
                </div>
              ))}
            </div>
          </div>
          <button type="submit">Crear Plan</button>
        </form>
      </div>
    </div>
  );
}

export default AddPlanScreen;
