import React, { useState } from 'react';
import './FoodCard.css';

export default function FoodCard({ nombre, descripcion, fecha, onSelect, isSelected }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNombre, setEditedNombre] = useState(nombre);
  const [editedDescripcion, setEditedDescripcion] = useState(descripcion);
  const [editedFecha, setEditedFecha] = useState(fecha);

  const handleSave = () => {
    console.log("Guardado:", { editedNombre, editedDescripcion, editedFecha });
    setIsEditing(false);
    // Aquí llamarías al servicio para guardar cambios en backend si quieres
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedNombre(nombre);
    setEditedDescripcion(descripcion);
    setEditedFecha(fecha);
  };

  return (
    <div
      className={`card food-card mb-3 ${isSelected ? 'expanded' : ''}`}
      onClick={onSelect}
      style={{ cursor: 'pointer' }}
    >
      <div className="card-body">
        {isEditing ? (
          // Modo Edición
          <div className="d-flex flex-column gap-2">
            <input
              type="text"
              className="form-control"
              value={editedNombre}
              onChange={(e) => setEditedNombre(e.target.value)}
            />
            <input
              type="text"
              className="form-control"
              value={editedDescripcion}
              onChange={(e) => setEditedDescripcion(e.target.value)}
            />
            <input
              type="date"
              className="form-control"
              value={editedFecha}
              onChange={(e) => setEditedFecha(e.target.value)}
            />
            <div className="d-flex gap-2 justify-content-center">
              <button className="btn btn-success btn-sm" onClick={handleSave}>Guardar</button>
              <button className="btn btn-secondary btn-sm" onClick={handleCancel}>Cancelar</button>
            </div>
          </div>
        ) : (
          // Modo Vista
          <>
            <h5 className="card-title">{nombre}</h5>
            <p className="card-text">{descripcion}</p>
            <p className="card-text"><small className="text-muted">Caduca: {fecha}</small></p>

            {isSelected && (
              <div className="mt-3 d-flex gap-2 justify-content-center">
                <button className="btn btn-outline-primary btn-sm" onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}>Editar</button>
                <button className="btn btn-outline-danger btn-sm" onClick={(e) => { e.stopPropagation(); console.log("Eliminar"); }}>Eliminar</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
