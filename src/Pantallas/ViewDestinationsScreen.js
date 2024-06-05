import React, {useState, useEffect} from 'react';
import defaultPlanImage from '../backgroundimage.png';
import DestinoCard from '../Componentes/DestinoCard';
import '../styles/ViewDestinationsScreen.css';

function ViewDestinationsScreen() {

  const [destinos, setDestinos] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5430/api/destinos/destinos`)
      .then(response => response.json())
      .then(data => {
        setDestinos(data);
      })
      .catch(error => console.error('Error fetching destinations:', error));
  }, []);

  return (
    <div className="main-container">
      <div className="left-quadrant">
        <h2 className="destino-title">Todos los destinos</h2>
        <div className="all-destinations">
          <div className="all-destinations-grid">
            {destinos.map(destino => (
              <DestinoCard
                key={destino.id}
                codigo={destino.codigo}
                nombre={destino.nombre}
                imageSrc={destino.imageSrc || defaultPlanImage}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewDestinationsScreen;
