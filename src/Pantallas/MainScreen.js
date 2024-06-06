import React, {useState, useEffect} from 'react';
import defaultPlanImage from '../backgroundimage.png';
import PlanCard from '../Componentes/PlanCard';

function MainScreen() {

  const [usuario, setUsuario] = useState('');
  const [planes, setPlanes] = useState([]);
  

  useEffect(() => {
    const user = localStorage.getItem('token');
    console.log('Nombre de usuario desde localStorage:', JSON.parse(user));
    setUsuario(JSON.parse(user));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5430/api/planes/ultimos`)
      .then(response => response.json())
      .then(data => {
        setPlanes(data);
      })
      .catch(error => console.error('Error fetching plans:', error));
  }, []);

  return (
    <div className="main-container">
      <div className="left-quadrant">
        <div className="bienvenida">
          <span>Bienvenido</span>
          <br />
          {usuario ? usuario.nombre + " " + usuario.apellido : 'Usuario'}
        </div>
        <h2 className="plan-title">Planes Agregados <span className="recently">Recientemente</span></h2>
        <div className="recent-plans">
          <div className="recent-plans-grid">
            {planes.map(plan => (
              <PlanCard
                key={plan.id}
                codigo={plan.codigo}
                nombre={plan.nombre}
                valor={plan.valorTotal}
                imageSrc={plan.imageSrc || defaultPlanImage}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainScreen;
