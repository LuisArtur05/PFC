import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import BurguerMenu from "../components/BurguerMenu";
import HeaderRecetas from "../components/HeaderRecetas";
import RecetaCard from "../components/RecetaCard";
import AddRecetaForm from "../components/AddRecetaForm";
import { crearAlimento } from "../services/alimentosService";
import { Collapse } from "react-bootstrap";
import {
  getRecetasPorUsuario,
  eliminarReceta,
  actualizarReceta,
  postReceta,
} from "../services/recetasService";

const Recetas = () => {
  const [recetas, setRecetas] = useState([]);
  const [selectedReceta, setSelectedReceta] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [recetaParaAlimento, setRecetaParaAlimento] = useState(null);
  const [inputCaducidad, setInputCaducidad] = useState("");
  const [inputCantidad, setInputCantidad] = useState(1);
  const [inputUbicacion, setInputUbicacion] = useState("Frigorifico");

  useEffect(() => {
    const fetchRecetas = async () => {
      const usuarioId = localStorage.getItem("usuarioId");
      if (!usuarioId) return;

      try {
        const data = await getRecetasPorUsuario(usuarioId);


        setRecetas(data);
      } catch (error) {
        console.error("Error al obtener recetas:", error);
      }
    };

    fetchRecetas();
  }, []);

  const refreshRecetas = async () => {
    const usuarioId = localStorage.getItem("usuarioId");
    if (!usuarioId) return;
    const data = await getRecetasPorUsuario(usuarioId);
    setRecetas(data);
  };

  const handleAddClick = () => setShowForm(true);
  const handleCancelForm = () => setShowForm(false);

  const handleDelete = async (receta) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta receta?")) {
      try {
        await eliminarReceta(receta.id_receta);
        setSelectedReceta(null);
        await refreshRecetas();
      } catch (error) {
        console.error("Error al eliminar receta:", error);
      }
    }
  };

  const handleGuardar = async (recetaEditada) => {
    try {
      const usuarioId = localStorage.getItem("usuarioId");
      if (!usuarioId) throw new Error("Usuario no identificado");
      if (!recetaEditada.id_receta) throw new Error("Id de receta no definido");

      const { nombre, instrucciones, tiempo_preparacion, dificultad, precio, ingredientes } = recetaEditada;
      const actualizado = {
        nombre,
        instrucciones,
        tiempo_preparacion,
        dificultad,
        precio,
        ingredientes
      };
      await actualizarReceta(usuarioId, recetaEditada.id_receta, actualizado);
      await refreshRecetas();
      setSelectedReceta(null);
    } catch (error) {
      console.error("Error al actualizar receta:", error);
    }
  };

  const handleAddReceta = async (nuevaReceta) => {
    try {
      const usuarioId = localStorage.getItem("usuarioId");
      if (!usuarioId) throw new Error("Usuario no identificado");

      const recetaData = {
        usuario_id: parseInt(usuarioId),
        nombre: nuevaReceta.nombre,
        instrucciones: nuevaReceta.instrucciones,
        tiempo_preparacion: parseInt(nuevaReceta.tiempo_preparacion),
        dificultad: nuevaReceta.dificultad,
        precio: parseFloat(nuevaReceta.precio),
        ingredientes: nuevaReceta.ingredientes,
      };
      console.log("Enviando receta:", recetaData);
      await postReceta(recetaData);
      await refreshRecetas();
      setShowForm(false);
    } catch (error) {
      console.error("Error al agregar receta:", error);
      await refreshRecetas();
    }
  };

  const handleNeveraClick = (receta) => {
    setRecetaParaAlimento(receta);
    setInputCaducidad("");
    setInputCantidad(1);
    setInputUbicacion("Frigorifico");
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row vh-100">
        <div className="col-2 p-3 d-none d-sm-block text-center bg-light">
          <SideBar />
        </div>
        <div className="row d-block d-sm-none bg-light">
          <BurguerMenu />
        </div>

        <div className="col d-flex flex-column bg-white vw-100">
          <HeaderRecetas title="Recetas" onAddClick={handleAddClick} />

          {showForm && (
            <div
              onClick={handleCancelForm}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 1040,
              }}
            />
          )}

          <Collapse in={showForm}>
            <div
              style={{
                position: "fixed",
                top: "80px",
                right: "20px",
                width: "400px",
                background: "white",
                borderRadius: "12px",
                boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
                zIndex: 1050,
                padding: "20px",
              }}
            >
              <AddRecetaForm onAdd={handleAddReceta} onCancel={handleCancelForm} />
            </div>
          </Collapse>

          {recetaParaAlimento && (
            <div
              style={{
                position: "fixed",
                top: "80px",
                right: "20px",
                width: "400px",
                background: "white",
                borderRadius: "12px",
                boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
                zIndex: 1050,
                padding: "20px",
              }}
            >
              <h5>Guardar en Nevera</h5>
              <p><strong>Receta:</strong> {recetaParaAlimento.nombre}</p>

              <label>Fecha de caducidad</label>
              <input
                type="date"
                className="form-control mb-2"
                value={inputCaducidad}
                onChange={(e) => setInputCaducidad(e.target.value)}
              />

              <label>Cantidad</label>
              <input
                type="number"
                className="form-control mb-2"
                value={inputCantidad}
                onChange={(e) => setInputCantidad(e.target.value)}
              />

              <label>Ubicación</label>
              <select
                className="form-control mb-3"
                value={inputUbicacion}
                onChange={(e) => setInputUbicacion(e.target.value)}
              >
                <option value="Frigorifico">Frigorífico</option>
                <option value="Congelador">Congelador</option>
                <option value="Despensa">Despensa</option>
              </select>

              <button
                className="btn btn-success me-2"
                onClick={async () => {
                  try {
                    const usuarioId = localStorage.getItem("usuarioId");
                    if (!usuarioId) throw new Error("Usuario no identificado");

                    const nuevoAlimento = {
                      usuario_id: parseInt(usuarioId),
                      categoria_id: 9, // Ajusta si es necesario
                      nombre: recetaParaAlimento.nombre,
                      fecha_caducidad: inputCaducidad,
                      cantidad: parseInt(inputCantidad),
                      ubicacion: inputUbicacion,
                      precio: parseFloat(recetaParaAlimento.precio),
                      proveedor: "",
                    };

                    await crearAlimento(nuevoAlimento);
                    alert("Receta añadida a la nevera como alimento.");
                    setRecetaParaAlimento(null);
                  } catch (error) {
                    console.error("Error al crear alimento:", error);
                  }
                }}
              >
                Guardar en Nevera
              </button>

              <button
                className="btn btn-secondary mt-2"
                onClick={() => setRecetaParaAlimento(null)}
              >
                Cancelar
              </button>
            </div>
          )}

          <div className="row flex-grow-1 justify-content-center overflow-auto bg-white">
            <div className="col-md-8 p-4">
              {recetas.map((receta) => (
                <RecetaCard
                  key={receta.id_receta}
                  receta={receta}
                  isSelected={selectedReceta?.id_receta === receta.id_receta}
                  onSelect={() =>
                    setSelectedReceta(selectedReceta?.id_receta === receta.id_receta ? null : receta)
                  }
                  onEliminar={() => handleDelete(receta)}
                  onGuardar={handleGuardar}
                  onNeveraClick={handleNeveraClick}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recetas;
