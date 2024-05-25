import React from 'react';

function AddPlanScreen() {
  return (
    <div className="create-user-container">
      <div className="fixed-left">
        <h2>Información Importante</h2>
        <p>Asegúrese de completar todos los campos correctamente para crear un nuevo plan.</p>
        <p>Seleccione los destinos adecuados y proporcione fechas de inicio y finalización válidas.</p>
      </div>
      <div className="scrollable-right">
        <form className="create-user-form">
          <div className="form-group">
            <label htmlFor="planName">Nombre del Plan</label>
            <input type="text" id="planName" name="planName" required />
          </div>
          <div className="form-group">
            <label htmlFor="destinations">Destinos del Plan</label>
            <select id="destinations" name="destinations" required>
              <option value="destino1">Destino 1</option>
              <option value="destino2">Destino 2</option>
              <option value="destino3">Destino 3</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Fecha de Inicio</label>
            <input type="date" id="startDate" name="startDate" required />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">Fecha de Finalización</label>
            <input type="date" id="endDate" name="endDate" required />
          </div>
          <div className="form-group">
            <label htmlFor="price">Precio</label>
            <input type="number" id="price" name="price" required />
          </div>
          <div className="form-group">
            <label htmlFor="duration">Duración</label>
            <input type="text" id="duration" name="duration" required />
          </div>
          <div className="form-group">
            <label htmlFor="images">Imágenes de los Destinos</label>
            <input type="file" id="images" name="images" multiple required />
          </div>
          <button type="submit">Crear Plan</button>
        </form>
      </div>
    </div>
  );
}

export default AddPlanScreen;
