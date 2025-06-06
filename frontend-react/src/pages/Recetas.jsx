import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import BurguerMenu from "../components/BurguerMenu";
import HeaderRecetas from "../components/HeaderRecetas";
import RecetaCard from "../components/RecetaCard";
import AddRecetaForm from "../components/AddRecetaForm";
import { Collapse } from "react-bootstrap";
import { getRecetasPorUsuario, eliminarReceta, actualizarReceta } from "../services/recetasService";

const Recetas = () => {
  const [recetas, setRecetas] = useState([]);
  const [selectedReceta, setSelectedReceta] = useState(null);
  const [showForm, setShowForm] = useState(false);

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

      // Prepara el objeto con los campos que espera el backend
      const { nombre, instrucciones, tiempo_preparacion, dificultad, precio } = recetaEditada;
      const actualizado = {
        nombre,
        instrucciones,
        tiempo_preparacion,
        dificultad,
        precio,
      };

      await actualizarReceta(usuarioId, recetaEditada.id_receta, actualizado);
      await refreshRecetas();
      setSelectedReceta(null);
    } catch (error) {
      console.error("Error al actualizar receta:", error);
    }
  };

  const handleAddReceta = (nuevaReceta) => {
    setRecetas((prev) => [...prev, nuevaReceta]);
    setShowForm(false);
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

          <div className="row flex-grow-1 justify-content-center overflow-auto bg-white">
            <div className="col-md-8 p-4">
              {recetas.map((receta) => (
                <RecetaCard
                  key={receta.id_receta}  // aquí el cambio clave
                  receta={receta}
                  isSelected={selectedReceta?.id_receta === receta.id_receta}
                  onSelect={() =>
                    setSelectedReceta(selectedReceta?.id_receta === receta.id_receta ? null : receta)
                  }
                  onEliminar={() => handleDelete(receta)}
                  onGuardar={handleGuardar}
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
