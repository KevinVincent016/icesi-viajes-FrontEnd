import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Reportes.css';
import DestinoCard from '../Componentes/DestinoCard';
import PlanCard from '../Componentes/PlanCard';
import defaultPlanImage from '../backgroundimage.png';

function Reportes() {
  const [destinoPopular, setDestinoPopular] = useState(null);
  const [planPopular, setPlanPopular] = useState(null);
  const [clientesTop, setClientesTop] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5430/api/destinos/frecuente`)
      .then(response => setDestinoPopular(response.data))
      .catch(error => console.error(error));

    axios.get(`http://localhost:5430/api/planes/masReservado`)
      .then(response => setPlanPopular(response.data))
      .catch(error => console.error(error));

    axios.get(`http://localhost:5430/api/clientes/top3ClientesConMasReservas`)
      .then(response => setClientesTop(response.data))
      .catch(error => console.error(error));
  }, []);
  console.log('destnos ' + destinoPopular)
  return (
    <div className="reportes-container">
      <h1>Reportes</h1>
      
      <h2 className='tituloReporte'>Destino más popular</h2>
      <div className='destinoPopular-container'>
        {destinoPopular && destinoPopular.map((destino, index) => (<DestinoCard
                  id={destino.idDest}
                  key={destino.id}
                  codigo={destino.codigo}
                  nombre={destino.nombre}
                  imageSrc={destino.imageSrc || defaultPlanImage}
                />))}
      </div>
      
      <h2 className='tituloReporte'>Plan más reservado</h2>
      <div className='planPopular-container'>
        {planPopular && <PlanCard
                id={planPopular.idPlan}
                key={planPopular.id}
                codigo={planPopular.codigo}
                nombre={planPopular.nombre}
                valor={planPopular.valorTotal}
                imageSrc={planPopular.imageSrc || defaultPlanImage}
              />}
      </div>
      
      <h2 className='tituloReporte'>Top 3 clientes con más reservas</h2>
      <div className='clientesTop-container'>
        {clientesTop && clientesTop.map((cliente, index) => (
          <div className='cliente-card' key={index}>
            <h3>{cliente.nombre} {cliente.primerApellido} {cliente.segundoApellido}</h3>
            <p><strong>Número de Identificación:</strong> {cliente.numeroIdentificacion}</p>
            <p><strong>Teléfono:</strong> {cliente.telefono1}</p>
            <p><strong>Correo:</strong> {cliente.correo}</p>
            <p><strong>Sexo:</strong> {cliente.sexo}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reportes;
