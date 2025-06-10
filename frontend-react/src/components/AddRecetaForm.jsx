import React, { useState } from "react";

const AddRecetaForm = ({ onAdd, onCancel }) => {
  const [nombre, setNombre] = useState("");
  const [instrucciones, setInstrucciones] = useState("");
  const [tiempoPreparacion, setTiempoPreparacion] = useState("");
  const [dificultad, setDificultad] = useState("Fácil");
  const [precio, setPrecio] = useState("");
  const [ingredientes, setIngredientes] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevaReceta = {
      nombre,
      instrucciones,
      tiempo_preparacion: parseInt(tiempoPreparacion),
      dificultad,
      precio: parseFloat(precio),
      ingredientes,
    };

    onAdd(nuevaReceta);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Nueva Receta</h4>

      <div className="mb-3">
        <label>Nombre</label>
        <input className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
      </div>

      <div className="mb-3">
        <label>Instrucciones</label>
        <textarea className="form-control" value={instrucciones} onChange={(e) => setInstrucciones(e.target.value)} required />
      </div>

      <div className="mb-3">
        <label>Tiempo de preparación (minutos)</label>
        <input type="number" className="form-control" value={tiempoPreparacion} onChange={(e) => setTiempoPreparacion(e.target.value)} required />
      </div>

      <div className="mb-3">
        <label>Dificultad</label>
        <select className="form-control" value={dificultad} onChange={(e) => setDificultad(e.target.value)}>
          <option>Fácil</option>
          <option>Media</option>
          <option>Difícil</option>
        </select>
      </div>

      <div className="mb-3">
        <label>Precio (€)</label>
        <input type="number" step="0.01" className="form-control" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
      </div>

      <div className="mb-3">
        <label>Ingredientes </label>
        <input className="form-control" value={ingredientes} onChange={(e) => setIngredientes(e.target.value)} required />
      </div>

      <div className="d-flex justify-content-end">
        <button type="button" className="btn btn-secondary me-2" onClick={onCancel}>Cancelar</button>
        <button type="submit" className="btn btn-primary">Guardar</button>
      </div>
    </form>
  );
};

export default AddRecetaForm;
