import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import BurguerMenu from "../components/BurguerMenu";
import Header from "../components/Header";
import RecetaCard from "../components/RecetaCard";
import AddRecetaForm from "../components/AddRecetaForm";
import { getRecetasPorUsuario } from "../services/RecetasService";
import { Collapse } from "react-bootstrap";

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

  const handleEdit = (recetaEditada) => {
    setRecetas(prev => prev.map(r => r.id === recetaEditada.id ? recetaEditada : r));
  };

  const handleDelete = (recetaAEliminar) => {
    setRecetas(prev => prev.filter(r => r.id !== recetaAEliminar.id));
    setSelectedReceta(null);
  };

  const handleAddClick = () => setShowForm(true);
  const handleCancelForm = () => setShowForm(false);
  const handleAddReceta = (nuevaReceta) => setRecetas(prev => [...prev, nuevaReceta]);

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
          <Header title="Recetas" onAddClick={handleAddClick} />

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
                  key={receta.id}
                  receta={receta}
                  isSelected={selectedReceta?.id === receta.id}
                  onSelect={() =>
                    setSelectedReceta(
                      selectedReceta?.id === receta.id ? null : receta
                    )
                  }
                  onEdit={handleEdit}
                  onDelete={() => handleDelete(receta)}
                />
              ))}
            </div>
          </div>

          <div className="row border p-3 bg-white">
            <div className="col"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recetas;
