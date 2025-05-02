import React, { useState } from "react";
import SideBar from "../components/SideBar";
import BurguerMenu from "../components/BurguerMenu";
import Header from "../components/Header";
import { Collapse } from "react-bootstrap";
import AddRecetaForm from "../components/AddRecetaForm";

const Recetas = () => {
    const [showForm, setShowForm] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleAddClick = () => setShowForm(true);
    const handleCancelForm = () => setShowForm(false);

    // Ejemplo de recetas
    const recetas = [
        { id: 1, nombre: "Ensalada César", ingredientes: "Lechuga, pollo, parmesano" },
        { id: 2, nombre: "Tortilla Española", ingredientes: "Patata, huevo, cebolla" }
    ];

    return (
        <div className="container-fluid vh-100">
            <div className="row vh-100">
                <div className="col-2 p-3 d-none d-sm-block bg-light">
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
                            <AddRecetaForm onCancel={handleCancelForm} />
                        </div>
                    </Collapse>

                    {/* Recetas */}
                    <div className="row flex-grow-1 p-3">
                        {recetas.map(receta => (
                            <div
                                key={receta.id}
                                className="card mb-3 p-3"
                                style={{ cursor: "pointer" }}
                                onClick={() => setSelectedItem(receta)}
                            >
                                <h5>{receta.nombre}</h5>
                                <p className="text-muted">{receta.ingredientes}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Recetas;
