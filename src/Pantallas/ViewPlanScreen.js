import React, {useState, useEffect} from 'react';
import defaultPlanImage from '../backgroundimage.png';
import PlanCard from '../Componentes/PlanCard';
import '../styles/ViewPlanScreen.css';

function ViewPlanScreen() {

  const [planes, setPlanes] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5430/api/planes/obtenerPlanes`)
      .then(response => response.json())
      .then(data => {
        setPlanes(data);
      })
      .catch(error => console.error('Error fetching plans:', error));
  }, []);

  return (
    <div className="main-container">
      <div className="left-quadrant">
        <h2 className="plan-title">Todos los Planes</h2>
        <div className="all-plans">
          <div className="all-plans-grid">
            {planes.map(plan => (
              <PlanCard
                id={plan.idPlan}
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

export default ViewPlanScreen;