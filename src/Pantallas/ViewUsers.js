import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

function ViewUsers() {
  const navigate = useNavigate();

  const [expandedUserId, setExpandedUserId] = useState(null);
  const [usuarios, setUsuarios] = useState([]);

  const toggleExpand = (id) => {
    setExpandedUserId(expandedUserId === id ? null : id);
  };

  const handleEdit = (id) => {
    navigate(`/modificar-usuarios/${id}`);
    console.log(`Edit user with id: ${id}`);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5430/api/user/eliminar-usuario/${id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        // Si la eliminación fue exitosa, actualiza la lista de usuarios
        setUsuarios(prevUsuarios => prevUsuarios.filter(user => user.idUsua !== id));
        console.log(`Usuario con ID ${id} eliminado exitosamente`);
      } else {
        // Si ocurrió un error al eliminar, muestra un mensaje de error
        console.error(`Error al eliminar usuario con ID ${id}`);
      }
    })
    .catch(error => console.error('Error al eliminar usuario:', error));
  };

  useEffect(() => {
    fetch(`http://localhost:5430/api/user/ver-usuarios`)
      .then(response => response.json())
      .then(data => {
        setUsuarios(data);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const getRolDescription = (rol) => {
    switch (rol) {
      case 1:
        return 'Admin';
      case 2:
        return 'Viewer';
      case 3:
        return 'Agente';
      default:
        return 'Desconocido';
    }
  };

  return (
    <div className="view-users-container">
      <h2 className='usernamelist'>Lista de Usuarios</h2>
      <table className="users-table">
        <thead>
          <tr>
            <th>Nombre</th>
        
          </tr>
        </thead>
        <tbody>
          {usuarios.map((user) => (
            <React.Fragment key={user.idUsua}>
              <tr>
                <td>
                  <span>{user.nombre}</span>
                  <button className="expand-button" onClick={() => toggleExpand(user.idUsua)}>
                    {expandedUserId === user.idUsua ? '▲' : '▼'}
                  </button>
                </td>
                <td>
                <div className="actions">
                    <button className="action-button edit-button" onClick={() => handleEdit(user.idUsua)}>
                      Editar
                    </button>
                    <button className="action-button delete-button" onClick={() => handleDelete(user.idUsua)}>
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
              {expandedUserId === user.idUsua && (
                <tr>
                  <td colSpan="2">
                    <div className="user-details">
                      <p><strong>Email:</strong> {user.correo}</p>
                      <p><strong>Fecha de Creación:</strong> {user.fechaCreacion}</p>
                      <p><strong>Fecha de Modificación:</strong> {user.fechaModificacion}</p>
                      <p><strong>Rol del Usuario:</strong> {getRolDescription(user.idRol)}</p>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewUsers;
