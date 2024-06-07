import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Reportes.css';

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

  return (
    <div>
      <h1>Reportes</h1>
      <h2 className='tituloReporte'>Destino más popular</h2>
      {destinoPopular && <p className='resultadoReporte'>{destinoPopular.nombre}</p>}
      <h2 className='tituloReporte'>Plan más reservado</h2>
      {planPopular && <p className='resultadoReporte'>{planPopular.nombre}</p>}
      <h2 className='tituloReporte'>Top 3 clientes con más reservas</h2>
      {clientesTop && clientesTop.map((cliente, index) => <p className='resultadoReporte' key={index}>{cliente.nombre}</p>)}
    </div>
  );
}

export default Reportes;