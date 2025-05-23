import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import "./FoodCard.css";

export default function RecetaCard({ receta, isSelected, onSelect, onGuardar, onEliminar }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({ ...receta });
  const [validationError, setValidationError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!editedData.nombre?.trim()) {
      setValidationError("El nombre no puede estar vacío.");
      return;
    }
    if (!editedData.tiempo_preparacion || editedData.tiempo_preparacion <= 0) {
      setValidationError("El tiempo de preparación debe ser mayor a 0.");
      return;
    }
    if (!editedData.precio || isNaN(editedData.precio)) {
      setValidationError("El precio debe ser un número válido.");
      return;
    }

    setValidationError(null);
    setIsEditing(false);

    if (onGuardar) {
      onGuardar(editedData);
    }
  };

  const handleCancel = () => {
    setEditedData({ ...receta });
    setValidationError(null);
    setIsEditing(false);
  };

  return (
    <div
      className={`card receta-card mb-3 ${isSelected ? "expanded" : ""}`}
      onClick={onSelect}
      style={{ cursor: "pointer" }}
    >
      <div className="card-body">
        {isEditing ? (
          <div className="d-flex flex-column gap-2">
            {validationError && (
              <Alert variant="danger" onClose={() => setValidationError(null)} dismissible>
                {validationError}
              </Alert>
            )}
            <input
              className="form-control"
              name="nombre"
              value={editedData.nombre}
              onChange={handleChange}
              placeholder="Nombre"
            />
            <textarea
              className="form-control"
              name="descripcion"
              value={editedData.descripcion}
              onChange={handleChange}
              placeholder="Descripción"
            />
            <textarea
              className="form-control"
              name="instrucciones"
              value={editedData.instrucciones}
              onChange={handleChange}
              placeholder="Instrucciones"
            />
            <input
              type="number"
              className="form-control"
              name="tiempo_preparacion"
              value={editedData.tiempo_preparacion}
              onChange={handleChange}
              placeholder="Tiempo de preparación (min)"
            />
            <input
              className="form-control"
              name="dificultad"
              value={editedData.dificultad}
              onChange={handleChange}
              placeholder="Dificultad"
            />
            <input
              type="number"
              className="form-control"
              name="precio"
              value={editedData.precio}
              onChange={handleChange}
              placeholder="Precio (€)"
            />
            <div className="d-flex gap-2 justify-content-center mt-2">
              <button
                className="btn btn-success btn-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSave();
                }}
              >
                Guardar
              </button>
              <button
                className="btn btn-secondary btn-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCancel();
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <>
            <h5 className="card-title">{receta.nombre}</h5>
            {receta.descripcion && <p className="card-text">{receta.descripcion}</p>}
            {receta.instrucciones && (
              <p className="card-text">
                <strong>Instrucciones:</strong> {receta.instrucciones}
              </p>
            )}
            {receta.tiempo_preparacion && (
              <p className="card-text">
                <small>Tiempo: {receta.tiempo_preparacion} min</small>
              </p>
            )}
            {receta.dificultad && (
              <p className="card-text">
                <small>Dificultad: {receta.dificultad}</small>
              </p>
            )}
            {receta.precio && (
              <p className="card-text">
                <small>Precio: {receta.precio} €</small>
              </p>
            )}
            {isSelected && (
              <div className="mt-3 d-flex gap-2 justify-content-center">
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditing(true);
                  }}
                >
                  Editar
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onEliminar) onEliminar();
                  }}
                >
                  Eliminar
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
