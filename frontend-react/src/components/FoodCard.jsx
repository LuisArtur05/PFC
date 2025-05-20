import React, { useState } from 'react';
import { Alert } from "react-bootstrap";
import './FoodCard.css';

export default function FoodCard({ nombre, cantidad, fecha, onSelect, isSelected, className = '', onGuardar, onEliminar }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNombre, setEditedNombre] = useState(nombre || "");
  const [editedCantidad, setEditedCantidad] = useState(cantidad || 1);
  const [editedFecha, setEditedFecha] = useState(() => {
    if (!fecha) return new Date().toISOString().split("T")[0];
    // Si ya es string con formato válido
    if (/^\d{4}-\d{2}-\d{2}$/.test(fecha)) return fecha;
    // Si viene en formato dd/mm/yyyy, lo convertimos:
    if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(fecha)) {
      const [day, month, year] = fecha.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
    // Si no coincide, devolvemos hoy
    return new Date().toISOString().split("T")[0];
  });

  const [validationError, setValidationError] = useState(null);

  const handleSave = () => {
    const today = new Date().toISOString().split("T")[0];

    if (!editedNombre.trim()) {
      setValidationError("El nombre no puede estar vacío.");
      return;
    }

    if (!editedCantidad || editedCantidad < 1) {
      setValidationError("La cantidad debe ser mayor o igual a 1.");
      return;
    }

    if (!editedFecha || editedFecha < today) {
      setValidationError("La fecha no puede ser anterior a hoy.");
      return;
    }

    setIsEditing(false);
    setValidationError(null); // limpia el error

    if (onGuardar) {
      onGuardar({
        nombre: editedNombre,
        cantidad: editedCantidad,
        fecha: editedFecha,
      });
    }
  };


  const handleCancel = () => {
    setIsEditing(false);
    setEditedNombre(nombre);
    setEditedCantidad(cantidad);
    setEditedFecha(fecha);
  };

  return (
    <div
      className={`card food-card mb-3 ${isSelected ? 'expanded' : ''} ${className}`}
      onClick={onSelect}
      style={{ cursor: 'pointer' }}
    >
      <div className="card-body">
        {isEditing ? (
          // Modo Edición
          <div className="d-flex flex-column gap-2">

            {isEditing && validationError && (
              <Alert variant="danger" onClose={() => setValidationError(null)} dismissible>
                {validationError}
              </Alert>
            )}

            <input
              type="text"
              className="form-control"
              value={editedNombre}
              onChange={(e) => setEditedNombre(e.target.value)}
            />
            <input
              type="number"
              className="form-control"
              value={editedCantidad}
              onChange={(e) => setEditedCantidad(parseInt(e.target.value))}
            />
            <input
              type="date"
              className="form-control"
              value={editedFecha}
              onChange={(e) => setEditedFecha(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
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
            <p className="card-text">Cantidad: {cantidad}</p>
            <p className="card-text"><small className="text-muted">Caduca: {fecha}</small></p>

            {isSelected && (
              <div className="mt-3 d-flex gap-2 justify-content-center">
                <button className="btn btn-outline-primary btn-sm" onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}>Editar</button>
                <button className="btn btn-outline-danger btn-sm" onClick={(e) => { e.stopPropagation(); if (onEliminar) onEliminar(); }}>Eliminar</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
