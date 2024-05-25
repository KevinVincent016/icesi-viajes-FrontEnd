import React from 'react';

function AddDestinationScreen() {
  return (
    <div className="create-user-container">
      <div className="fixed-left">
        <h2>Información Importante</h2>
        <p>Asegúrese de completar todos los campos correctamente para crear un nuevo destino.</p>
        <p>Proporcione el nombre y la ubicación del destino, así como una descripción detallada.</p>
        
      </div>
      <div className="scrollable-right">
        <form className="create-user-form">
          <div className="form-group">
            <label htmlFor="destinationName">Nombre del Destino</label>
            <input type="text" id="destinationName" name="destinationName" required />
          </div>
          <div className="form-group">
            <label htmlFor="location">Ubicación</label>
            <input type="text" id="location" name="location" required />
          </div>
          <div className="form-group">
            <label htmlFor="description">Descripción</label>
            <textarea id="description" name="description" required></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="images">Imágenes del Destino</label>
            <input type="file" id="images" name="images" multiple required />
          </div>
          <button type="submit">Crear Destino</button>
        </form>
      </div>
    </div>
  );
}

export default AddDestinationScreen;
