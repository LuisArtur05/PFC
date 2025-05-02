import React, { useState } from "react";
import SideBar from "../components/SideBar";
import BurguerMenu from "../components/BurguerMenu";
import Header from "../components/Header";
import { Collapse } from "react-bootstrap";
import AddProductoForm from "../components/AddProductoForm";

const Lista = () => {
    const [showForm, setShowForm] = useState(false);
    const [selectedItems, setSelectedItems] = useState(new Set());

    const toggleSelection = (id) => {
        setSelectedItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };


    const handleAddClick = () => setShowForm(true);
    const handleCancelForm = () => setShowForm(false);

    // Ejemplo de productos en la lista
    const productosLista = [
        { id: 1, nombre: "Leche", cantidad: "2 litros" },
        { id: 2, nombre: "Pan", cantidad: "1 barra" },
        { id: 3, nombre: "Huevos", cantidad: "12 unidades" }
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
                    <Header title="Lista de la Compra" onAddClick={handleAddClick} />

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
                            <AddProductoForm onCancel={handleCancelForm} />
                        </div>
                    </Collapse>

                    {/* Productos de la lista */}
                    <div className="row g-3 p-3">
                        {productosLista.map((producto) => {
                            const isSelected = selectedItems.has(producto.id);
                            const isSingleSelected = selectedItems.size === 1 && isSelected;

                            return (
                                <div
                                    key={producto.id}
                                    className="col-12 col-sm-6 col-md-4 col-lg-3"
                                >
                                    <div
                                        className={`card p-3 position-relative ${isSelected ? "border-primary shadow-sm" : ""
                                            }`}
                                        style={{
                                            cursor: "pointer",
                                            transform: isSingleSelected ? "scale(0.98)" : "scale(1)",
                                            transition: "transform 0.2s",
                                        }}
                                        onClick={() => toggleSelection(producto.id)}
                                    >
                                        <h6 className="mb-1">{producto.nombre}</h6>
                                        <p className="text-muted mb-0">{producto.cantidad}</p>

                                        {isSingleSelected && (
                                            <div className="position-absolute top-50 end-0 translate-middle-y me-2 d-flex flex-column gap-2">
                                                <button className="btn btn-sm btn-outline-primary">✏️</button>
                                                <button className="btn btn-sm btn-outline-danger">🗑️</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Lista;
