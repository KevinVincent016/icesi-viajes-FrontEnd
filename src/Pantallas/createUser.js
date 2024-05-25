import React from 'react';


function CreateUser() {
  return (
    <div className="create-user-container">
      <div className="fixed-left">
        <h2>Información Importante</h2>
        <p>Asegúrese de completar todos los campos correctamente para crear un nuevo usuario.</p>
        <p>Elija el tipo de identificación adecuado y proporcione un correo electrónico válido.</p>
        <p>El rol determina el nivel de acceso del usuario dentro del sistema.</p>
      </div>
      <div className="scrollable-right">
        <form className="create-user-form">
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input type="text" id="nombre" name="nombre" required />
          </div>
          <div className="form-group">
            <label htmlFor="apellido">Apellido</label>
            <input type="text" id="apellido" name="apellido" required />
          </div>
          <div className="form-group">
            <label htmlFor="tipoIdentificacion">Tipo de Identificación</label>
            <select id="tipoIdentificacion" name="tipoIdentificacion" required>
              <option value="cedula">Cédula</option>
              <option value="pasaporte">Pasaporte</option>
              <option value="tarjetaDeIdentidad">Tarjeta de Identidad</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="numeroIdentificacion">Número de Identificación</label>
            <input type="text" id="numeroIdentificacion" name="numeroIdentificacion" required />
          </div>
          <div className="form-group">
            <label htmlFor="sexo">Sexo</label>
            <select id="sexo" name="sexo" required>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="correo">Correo</label>
            <input type="email" id="correo" name="correo" required />
          </div>
          <div className="form-group">
            <label htmlFor="rol">Rol</label>
            <select id="rol" name="rol" required>
              <option value="admin">Admin</option>
              <option value="viewer">Viewer</option>
              <option value="agente">Agente</option>
            </select>
          </div>
          <button type="submit">Crear Usuario</button>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
