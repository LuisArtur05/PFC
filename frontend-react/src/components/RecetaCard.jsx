import React, { useState } from "react";
import "./FoodCard.css";

export default function RecetaCard({ receta, isSelected, onSelect, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...receta });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onEdit(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ ...receta });
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
            <input
              className="form-control"
              name="nombre"
              value={editData.nombre}
              onChange={handleChange}
              placeholder="Nombre"
            />
            <textarea
              className="form-control"
              name="descripcion"
              value={editData.descripcion}
              onChange={handleChange}
              placeholder="Descripción"
            />
            <textarea
              className="form-control"
              name="instrucciones"
              value={editData.instrucciones}
              onChange={handleChange}
              placeholder="Instrucciones"
            />
            <input
              className="form-control"
              name="tiempo_preparacion"
              value={editData.tiempo_preparacion}
              onChange={handleChange}
              placeholder="Tiempo de preparación (min)"
            />
            <input
              className="form-control"
              name="dificultad"
              value={editData.dificultad}
              onChange={handleChange}
              placeholder="Dificultad"
            />
            <input
              className="form-control"
              name="precio"
              value={editData.precio}
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
              <p className="card-text"><small>Tiempo: {receta.tiempo_preparacion} min</small></p>
            )}
            {receta.dificultad && (
              <p className="card-text"><small>Dificultad: {receta.dificultad}</small></p>
            )}
            {receta.precio && (
              <p className="card-text"><small>Precio: {receta.precio} €</small></p>
            )}

            {/* Mostrar botones solo si la tarjeta está seleccionada */}
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
                    onDelete();
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
