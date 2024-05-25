import React from 'react';
import backgroundImage from '../backgroundimage.png';

function MainScreen() {
  return (
    <div className="main-container">
      <div className="left-quadrant">
        <h2 className="plan-title">Planes Agregados <span className="recently">Recientemente</span></h2>
        <div className="recent-plans">
          <div className="plan">
            <img src={backgroundImage} alt="Plan 1" />
            <div className="plan-overlay">
              <button className="select-button">Seleccionar</button>
            </div>
            <div className="plan-details">
              <h3>Plan 1</h3>
              <p>$100</p>
            </div>
          </div>
          <div className="plan">
            <img src={backgroundImage} alt="Plan 2" />
            <div className="plan-overlay">
              <button className="select-button">Seleccionar</button>
            </div>
            <div className="plan-details">
              <h3>Plan 2</h3>
              <p>$150</p>
            </div>
          </div>
          <div className="plan">
            <img src={backgroundImage} alt="Plan 3" />
            <div className="plan-overlay">
              <button className="select-button">Seleccionar</button>
            </div>
            <div className="plan-details">
              <h3>Plan 3</h3>
              <p>$120</p>
            </div>
          </div>
        </div>
      </div>
      {/* Otros cuadrantes aquí */}
    </div>
  );
}

export default MainScreen;
