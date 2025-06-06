import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import BurguerMenu from "../components/BurguerMenu";
import Header from "../components/Header";
import { Collapse, Button } from "react-bootstrap";
import AddProductoForm from "../components/AddProductoForm";
import {
    getAlimentosPorUsuario_lista,
    getAlimentosPorUsuario,
    eliminarAlimento,
    actualizarLista_A_Nevera,
} from "../services/alimentosService";
import { toast } from "react-toastify";


const Lista = () => {
    const usuarioId = parseInt(localStorage.getItem("usuarioId"));
    const [alimentos, setAlimentos] = useState([]);
    const [alimentosPrevios, setAlimentosPrevios] = useState([]);
    const [selectedItems, setSelectedItems] = useState(new Set());
    const [showForm, setShowForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchAlimentos = async () => {
        try {
            const [lista, nevera] = await Promise.all([
                getAlimentosPorUsuario_lista(usuarioId),
                getAlimentosPorUsuario(usuarioId),
            ]);

            setAlimentos(lista);

            const combinados = [...lista, ...nevera];
            const unicosPorNombre = combinados.reduce((acc, current) => {
                const yaExiste = acc.find(
                    (item) => item.nombre.toLowerCase() === current.nombre.toLowerCase()
                );
                if (!yaExiste) acc.push(current);
                return acc;
            }, []);
            setAlimentosPrevios(unicosPorNombre);
        } catch (error) {
            console.error("Error al cargar alimentos:", error);
        }
    };

    useEffect(() => {
        fetchAlimentos();
    }, []);

    const toggleSelection = (id) => {
        setSelectedItems((prev) => {
            const newSet = new Set(prev);
            newSet.has(id) ? newSet.delete(id) : newSet.add(id);
            return newSet;
        });
    };

    const handleAddClick = () => setShowForm(true);
    const handleCancelForm = () => {
        setShowForm(false);
        fetchAlimentos();
    };

    const handleEliminar = async (id) => {
        await eliminarAlimento(id);
        fetchAlimentos();
    };

    const handleMoverANevera = async (id) => {
        await actualizarLista_A_Nevera(usuarioId, id);
        fetchAlimentos();
    };

    const handleMoverSeleccionados = async () => {
        const ids = Array.from(selectedItems);
        try {
            await Promise.all(ids.map((id) => actualizarLista_A_Nevera(usuarioId, id)));
            toast.success(`¡${ids.length} producto${ids.length > 1 ? "s" : ""} añadido${ids.length > 1 ? "s" : ""} a la nevera!`);
            setSelectedItems(new Set());
            fetchAlimentos();
        } catch (error) {
            toast.error("Error al mover productos a la nevera");
            console.error(error);
        }
    };


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
                    <Header
                        title="Lista de la Compra"
                        onAddClick={handleAddClick}
                        search={searchTerm}
                        onSearchChange={setSearchTerm}
                    />


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
                            <AddProductoForm
                                onCancel={handleCancelForm}
                                onSuccess={fetchAlimentos}
                                alimentosPrevios={alimentosPrevios}
                            />
                        </div>
                    </Collapse>

                    {selectedItems.size > 0 && (
                        <div
                            className="fixed-bottom-bar d-flex justify-content-between align-items-center"
                            style={{
                                position: "fixed",
                                bottom: "20px",
                                left: "20px",
                                right: "20px",
                                background: "white",
                                borderRadius: "16px",
                                boxShadow: "0 2px 16px rgba(0,0,0,0.15)",
                                padding: "16px 24px",
                                zIndex: 1050,
                            }}
                        >
                            <div>
                                <strong>{selectedItems.size}</strong> producto{selectedItems.size > 1 ? "s" : ""} seleccionado{selectedItems.size > 1 ? "s" : ""}
                                <span className="text-muted ms-3">
                                    Total:{" "}
                                    <strong>
                                        {alimentos
                                            .filter((a) => selectedItems.has(a.id_alimento))
                                            .reduce((sum, item) => sum + (item.precio || 0), 0)
                                            .toFixed(2)}{" "}
                                        €
                                    </strong>
                                </span>
                            </div>
                            <div className="d-flex gap-2">
                                <Button variant="success" size="sm" onClick={handleMoverSeleccionados}>
                                    Comprar
                                </Button>
                                <Button
                                    variant="outline-secondary"
                                    size="sm"
                                    onClick={() => setSelectedItems(new Set())}
                                >
                                    Cancelar
                                </Button>
                            </div>
                        </div>
                    )}


                    <div className="row g-3 p-3">
                        {alimentos
                            .filter((producto) =>
                                producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                            .map((producto) => {
                                const isSelected = selectedItems.has(producto.id_alimento);
                                const isSingleSelected = selectedItems.size === 1 && isSelected;

                                return (
                                    <div
                                        key={producto.id_alimento}
                                        className="col-12 col-sm-6 col-md-4 col-lg-3"
                                    >
                                        <div
                                            className={`card p-3 h-100 shadow-sm border-0 rounded-4 position-relative ${isSelected ? "border-success border-2 bg-light-subtle" : ""}`}
                                            style={{
                                                cursor: "pointer",
                                                transform: isSelected ? "scale(0.98)" : "scale(1)",
                                                transition: "transform 0.2s",
                                            }}
                                            onClick={() => toggleSelection(producto.id_alimento)}
                                        >
                                            {isSelected && (
                                                <span
                                                    className="position-absolute top-0 end-0 m-2 bg-success text-white rounded-circle d-flex justify-content-center align-items-center"
                                                    style={{
                                                        width: "24px",
                                                        height: "24px",
                                                        fontSize: "0.8rem",
                                                        fontWeight: "bold",
                                                        boxShadow: "0 0 6px rgba(0,0,0,0.2)"
                                                    }}
                                                >
                                                    ✓
                                                </span>
                                            )}
                                            <div>
                                                <h6 className="fw-bold mb-1">{producto.nombre}</h6>
                                                <p className="text-muted mb-1">Cantidad: {producto.cantidad}</p>
                                                {producto.precio && (
                                                    <p className="text-muted mb-1">Precio: {producto.precio} €</p>
                                                )}
                                                {producto.proveedor && (
                                                    <p className="text-muted mb-1">Proveedor: {producto.proveedor}</p>
                                                )}
                                            </div>

                                            {isSingleSelected && (
                                                <div className="d-flex justify-content-between mt-3">
                                                    <button
                                                        className="btn btn-outline-success btn-sm flex-fill me-1"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleMoverANevera(producto.id_alimento);
                                                        }}
                                                    >
                                                        Añadir a nevera
                                                    </button>
                                                    <button
                                                        className="btn btn-outline-danger btn-sm flex-fill ms-1"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleEliminar(producto.id_alimento);
                                                        }}
                                                    >
                                                        Eliminar
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                    </div>

                    {alimentos.length === 0 ? (
                        <div className="text-center text-muted w-100 py-5">
                            No tienes ningún alimento en tu lista
                        </div>
                    ) : (
                        alimentos.filter((producto) =>
                            producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
                        ).length === 0 && (
                            <div className="text-center text-muted w-100 py-5">
                                No hay coincidencias con <strong>"{searchTerm}"</strong>
                            </div>
                        )
                    )}

                </div>
            </div>
        </div>
    );
};

export default Lista;
