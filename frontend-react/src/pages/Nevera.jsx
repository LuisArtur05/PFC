import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import ZonasNevera from "../components/ZonasNevera";
import AddAlimentoForm from "../components/AddAlimentoForm";
import FormularioPendiente from "../components/FormularioPendiente";
import { Modal, Collapse } from "react-bootstrap";
import {
    getAlimentosPorUsuario,
    eliminarAlimento,
    actualizarAlimento,
} from "../services/alimentosService";
import { getCategorias } from "../services/categoriasService";
import { generarPegatinas } from "../components/GenerarPegatinas";
import FoodCard from "../components/FoodCard";
import BannerAlimentosPendientes from "../components/BannerAlimentosPendientes";
import { Informe } from "../components/Informe";



export default function Nevera() {
    const [alimentos, setAlimentos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [busqueda, setBusqueda] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [showPendientes, setShowPendientes] = useState(false);
    const [editandoPendiente, setEditandoPendiente] = useState(null);
    const [orden, setOrden] = useState("fecha");

    const fetchAlimentos = async () => {
        const usuarioId = localStorage.getItem("usuarioId");
        if (!usuarioId) return;
        try {
            const data = await getAlimentosPorUsuario(usuarioId);
            setAlimentos(data);
        } catch (error) {
            console.error("Error al obtener alimentos:", error);
        }
    };

    const fetchCategorias = async () => {
        try {
            const data = await getCategorias();
            setCategorias(data);
        } catch (error) {
            console.error("Error al obtener categorías:", error);
        }
    };

    const handleGenerarPegatinas = () => {
        const alimentosNevera = alimentos.filter(a => a.nevera_active);
        generarPegatinas(alimentosNevera);
    };


    useEffect(() => {
        fetchAlimentos();
        fetchCategorias();
    }, []);

    const pendientes = alimentos.filter((a) => a.ubicacion === "Pendiente");

    const ordenarAlimentos = (lista) => {
        return [...lista].sort((a, b) => {
            if (orden === "fecha") {
                return new Date(a.fecha_caducidad) - new Date(b.fecha_caducidad);
            }
            if (orden === "nombre") {
                return a.nombre.localeCompare(b.nombre);
            }
            if (orden === "cantidad") {
                return (b.cantidad || 0) - (a.cantidad || 0);
            }
            if (orden === "categoria") {
                const nombreA = categorias.find(c => c.id_categoria === a.categoria_id)?.nombre || "";
                const nombreB = categorias.find(c => c.id_categoria === b.categoria_id)?.nombre || "";
                return nombreA.localeCompare(nombreB);
            }
            return 0;
        });
    };


    return (
        <Layout
            title="Mi Nevera"
            onAddClick={() => setShowForm(true)}
            search={busqueda}
            onSearchChange={setBusqueda}
            footerProps={{
                mostrarBotonPegatinas: true,
                onDownloadClick: () => generarPegatinas(alimentos),
                onInformeClick: () => Informe(alimentos)
            }}
        >
            {!showPendientes && (
                <BannerAlimentosPendientes
                    cantidad={pendientes.length}
                    onClickMostrar={() => setShowPendientes(true)}
                />
            )}


            {/* Modal de pendientes */}
            <Modal show={showPendientes} onHide={() => setShowPendientes(false)} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Alimentos pendientes de colocar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        {pendientes.map((a) => (
                            <div className="col-md-6 mb-3" key={a.id_alimento}>
                                <FoodCard
                                    {...a}
                                    fecha={a.fecha_caducidad}
                                    categoriaNombre={categorias.find(cat => cat.id_categoria === a.categoria_id)?.nombre || ""}
                                    editable={false}
                                    showUbicacion={true}
                                    onColocarClick={() => setEditandoPendiente(a)}
                                    draggable
                                    onDragStart={(e) =>
                                        e.dataTransfer.setData(
                                            "text/plain",
                                            JSON.stringify({ id: a.id_alimento, ubicacion: a.ubicacion })
                                        )
                                    }
                                    onRefrescar={fetchAlimentos}
                                />

                            </div>
                        ))}
                    </div>
                </Modal.Body>
            </Modal>

            {/* Modal para colocar alimento pendiente */}
            <Modal show={!!editandoPendiente} onHide={() => setEditandoPendiente(null)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Colocar alimento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {editandoPendiente ? (
                        <FormularioPendiente
                            alimento={editandoPendiente}
                            onSave={async (ubicacion, fecha) => {
                                const usuarioId = localStorage.getItem("usuarioId");
                                await actualizarAlimento(editandoPendiente.id_alimento, usuarioId, {
                                    ...editandoPendiente,
                                    ubicacion,
                                    fecha_caducidad: fecha,
                                });
                                setEditandoPendiente(null);
                                setShowPendientes(false);
                                fetchAlimentos();
                            }}
                            onCancel={() => setEditandoPendiente(null)}
                        />
                    ) : (
                        <div className="text-center text-muted">Cargando...</div>
                    )}
                </Modal.Body>
            </Modal>

            {/* Modal añadir alimento */}
            {showForm && (
                <div
                    onClick={() => setShowForm(false)}
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
                    <AddAlimentoForm onCancel={() => setShowForm(false)} onSuccess={fetchAlimentos} />
                </div>
            </Collapse>

            <div className="d-flex justify-content-end align-items-center mb-3">
                <label className="me-2 fw-semibold">Ordenar por:</label>
                <select
                    className="form-select w-auto"
                    value={orden}
                    onChange={(e) => setOrden(e.target.value)}
                >
                    <option value="fecha">Fecha de caducidad</option>
                    <option value="nombre">Nombre</option>
                    <option value="cantidad">Cantidad</option>
                    <option value="categoria">Categoría</option>
                </select>
            </div>


            {/* Zonas de la nevera */}
            <ZonasNevera
                alimentos={ordenarAlimentos(alimentos)}
                categorias={categorias}
                busqueda={busqueda}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                actualizarAlimento={actualizarAlimento}
                eliminarAlimento={eliminarAlimento}
                onRefrescar={fetchAlimentos}
            />


        </Layout>
    );
}
