import React, {useState, useEffect} from 'react';
import defaultPlanImage from '../backgroundimage.png';
import PlanCard from '../Componentes/PlanCard';

function MainScreen() {

  const [usuario, setUsuario] = useState('');

  const planExample = [
    {
      id: 1,
      codigo: 'D0001',
      nombre: 'Plan 1',
      valor: '100.0',
      imageSrc: '...'
    },
    {
      id: 2,
      codigo: 'D0002',
      nombre: 'Plan Basico',
      valor: '100.0',
      imageSrc: '...'
    },
    {
      id: 3,
      codigo: 'D0004',
      nombre: 'Plan Vacaciona bahamas',
      valor: '100.0',
      imageSrc: '...'
    },
    {
      id: 4,
      codigo: 'D0004',
      nombre: 'Plan Full San Andres',
      valor: '350000.0',
      imageSrc: '...'
    },
    // Otros planes...
  ];

  useEffect(() => {
    const user = localStorage.getItem('token');
    console.log('Nombre de usuario desde localStorage:', JSON.parse(user));
    setUsuario(JSON.parse(user));
  }, []);

  return (
    <div className="main-container">
      <div className="left-quadrant">
        <div ckassName="bienvenida">
          <span>Bienvenido</span>
          <br />
          {usuario ? usuario.nombre + " " + usuario.apellido : 'Usuario'}
          <br />
          <span>Rol: {}</span>
        </div>
        <h2 className="plan-title">Planes Agregados <span className="recently">Recientemente</span></h2>
        <div className="recent-plans">
          <div className="recent-plans-grid">
            {planExample.map(plan => (
              <PlanCard
                key={plan.id}
                codigo={plan.codigo}
                nombre={plan.nombre}
                valor={plan.valor}
                imageSrc={plan.imageSrc || defaultPlanImage}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Otros cuadrantes aquí */}
    </div>
  );
}

export default MainScreen;
