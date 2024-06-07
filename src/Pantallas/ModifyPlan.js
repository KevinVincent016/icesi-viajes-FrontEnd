import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';

function ModifyPlan() {
  const secretKey = 'IcEvIaJeS';
  const navigate = useNavigate();
  const { id } = useParams();
  const [planes, setPlanes] = useState([]);
  const [plan, setPlan] = useState(null);
  const [selectedPlanId, setSelectedPlanId] = useState(id || '');

  const [destinosDisponibles, setDestinosDisponibles] = useState([]);
  const [destinosSeleccionados, setDestinosSeleccionados] = useState([]);
  const [serviciosDisponibles, setServiciosDisponibles] = useState([]);
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState([]);


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
    fetch(`http://localhost:5430/api/planes/obtenerPlanes`)
      .then(response => response.json())
      .then(data => {
        setPlanes(data);
      })
      .catch(error => console.error('Error fetching plans:', error));
  }, []);

  useEffect(() => {
    if (selectedPlanId) {
      console.log("plan id: " + selectedPlanId)
      axios.get(`http://localhost:5430/api/planes/buscarPlan/${selectedPlanId}`)
        .then(response => {
            setPlan(response.data);
        })
        .catch(error => {
          console.error('Error al obtener el plan:', error);
        });
    }
  }, [selectedPlanId]);

  const [planData, setPlanData] = useState({
    idPlan: '',
    codigo: '',
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
    if (plan) {
      setPlanData({
        idPlan: selectedPlanId,
        codigo: plan.codigo,
        fechaCreacion: plan.fechaCreacion,
        fechaModificacion: new Date(),
        nombre: plan.nombre || '',
        descripcionSolicitud: plan.descripcionSolicitud || '',
        cantidadPersonas: plan.cantidadPersonas || '',
        fechaSolicitud: plan.fechaSolicitud || '',
        fechaInicioViaje: plan.fechaInicioViaje || '',
        fechaFinViaje: plan.fechaFinViaje || '',
        valorTotal: plan.valorTotal || '',
        estado: plan.estado || '',
        destinos: plan.destinos || [],
        servicios: plan.servicios || [],
        usuCreador: plan.usuCreador || '',
        usuModificador: idUser || '',
        usuario: plan.usuario || '',
      });
      setDestinosSeleccionados(plan.destinos || []);
      setServiciosSeleccionados(plan.servicios || []);
    }
  }, [plan, idUser]);

  const [message, setMessage] = useState('');

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
    setDestinosSeleccionados(prevSeleccionados => {
      const newDestinos = [...prevSeleccionados, destino];
      setPlanData((prevData) => ({
        ...prevData,
        destinos: newDestinos
      }));
      return newDestinos;
    });
    setDestinosDisponibles(prevDisponibles => prevDisponibles.filter(d => d.idDest !== destino.idDest));
  };

  const handleDelDestino = (destino) => {
    setDestinosSeleccionados(prevSeleccionados => {
      const newDestinos = prevSeleccionados.filter(d => d.idDest !== destino.idDest);
      setPlanData((prevData) => ({
        ...prevData,
        destinos: newDestinos
      }));
      return newDestinos;
    });
    setDestinosDisponibles(prevDisponibles => [...prevDisponibles, destino]);
  };

  const handleAddServicio = (servicio) => {
    setServiciosSeleccionados(prevSeleccionados => {
      const newServicios = [...prevSeleccionados, servicio];
      setPlanData((prevData) => ({
        ...prevData,
        servicios: newServicios
      }));
      return newServicios;
    });
    setServiciosDisponibles(prevDisponibles => prevDisponibles.filter(s => s.idAdd !== servicio.idAdd));
  };

  const handleDelServicio = (servicio) => {
    setServiciosSeleccionados(prevSeleccionados => {
      const newServicios = prevSeleccionados.filter(s => s.idAdd !== servicio.idAdd);
      setPlanData((prevData) => ({
        ...prevData,
        servicios: newServicios
      }));
      return newServicios;
    });
    setServiciosDisponibles(prevDisponibles => [...prevDisponibles, servicio]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlanData({
      ...planData,
      [name]: value
    });
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(planData)
    console.log(plan.idPlan)
    console.log(selectedPlanId)
    try {
      await axios.put(`http://localhost:5430/api/planes/actualizarPlan/${selectedPlanId}`, planData);
      navigate('/ver-planes');
    } catch (error) {
      console.error('Error al modificar el plan:', error);
      alert('Error al modificar el plan');
    }
  };

  return (
    <div className="create-plan-container">
      <div className="scrollable-right-addPlan">
        <div className="login-message">
          {message && <p style={{ color: 'red', fontWeight: 'bold' }}>{message}</p>}
        </div>
        {!selectedPlanId ? (
          <div className="form-group">
            <label htmlFor="userSelector">Selecciona un plan</label>
            <select
              id="userSelector"
              value={selectedPlanId}
              onChange={(e) => setSelectedPlanId(e.target.value)}
            >
              <option value="">-- Selecciona un plan --</option>
              {planes.map(plan => (
                <option key={plan.idPlan} value={plan.idPlan}>
                  {plan.nombre}
                </option>
              ))}
            </select>
          </div>
        ) : (
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
            <button type="submit">Modificar Plan</button>
            </form>
        )}
      </div>
      <div className="fixed-left-addPlan">
        <h2>Información Importante</h2>
        <p>Asegúrese de seleccionar el plan que desea modificar en la primera casilla.</p>
        <p>Procure completar todos los campos correctamente para modificar exitosamente el plan.</p>
      </div>
    </div>
  );
}

export default ModifyPlan;
