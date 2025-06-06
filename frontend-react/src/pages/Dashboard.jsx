// src/pages/Dashboard.jsx
import React, { useEffect, useState, useRef } from "react";
import AddAlimentoForm from '../components/AddAlimentoForm';
import FoodCard from '../components/FoodCard';
import GroupedFoodCard from '../components/GroupedFoodCard';
import SideBar from "../components/SideBar";
import BurguerMenu from "../components/BurguerMenu";
import Header from "../components/Header";
import FooterBar from "../components/FooterBar";
import { Collapse, Button, Alert, Modal } from "react-bootstrap";
import {
    getAlimentosPorUsuario,
    eliminarAlimento,
    actualizarAlimento
} from "../services/alimentosService";
import { getCategorias } from "../services/categoriasService";
import { generarPegatinas } from "../components/GenerarPegatinas";
import { Informe } from "../components/Informe";
import FormularioPendiente from "../components/FormularioPendiente";
import { ToastContainer, toast } from 'react-toastify';

export default function Dashboard() {
    const [alimentos, setAlimentos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [busqueda, setBusqueda] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [zonaActiva, setZonaActiva] = useState(null);
    const [showPendientes, setShowPendientes] = useState(false);
    const [editandoPendiente, setEditandoPendiente] = useState(null);

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

    useEffect(() => {
        fetchAlimentos();
        fetchCategorias();
    }, []);

    const categoriaMap = Object.fromEntries(categorias.map(cat => [cat.id_categoria_alimento, cat.nombre]));

    const agruparPorNombre = (lista) => lista.reduce((acc, alimento) => {
        const clave = alimento.nombre;
        acc[clave] = acc[clave] || [];
        acc[clave].push(alimento);
        return acc;
    }, {});

    const ubicaciones = ["Frigorifico", "Congelador", "Despensa"];

    const pendientes = alimentos.filter(a => a.ubicacion === "Pendiente");

    const handleRefrescarConToast = async () => {
        await fetchAlimentos();
        toast.success("Alimento movido con éxito");
    };


    const renderUbicacion = (nombreUbicacion) => {
        const alimentosUbicacion = alimentos
            .filter(a => a.ubicacion === nombreUbicacion)
            .filter(a => {
                const q = busqueda.toLowerCase();
                const categoriaNombre = categoriaMap[a.categoria_id]?.toLowerCase() || "";
                return (
                    a.nombre.toLowerCase().includes(q) ||
                    (a.proveedor && a.proveedor.toLowerCase().includes(q)) ||
                    categoriaNombre.includes(q)
                );
            });

        const agrupados = agruparPorNombre(alimentosUbicacion);

        return (
            <div
                className={`col-sm p-3 bg-white transition-all ${zonaActiva === nombreUbicacion ? 'border border-primary shadow-sm bg-light' : ''}`}
                key={nombreUbicacion}
                onDragOver={(e) => {
                    e.preventDefault();
                    setZonaActiva(nombreUbicacion);
                }}
                onDragLeave={() => setZonaActiva(null)}
                onDrop={async (e) => {
                    setZonaActiva(null);
                    const data = e.dataTransfer.getData("text/plain");
                    if (!data) return;
                    const { id, ubicacion: origen } = JSON.parse(data);
                    if (origen === nombreUbicacion) return;

                    const usuarioId = localStorage.getItem("usuarioId");
                    const alimento = alimentos.find(a => a.id_alimento === id);
                    if (!alimento) return;

                    const actualizado = {
                        ...alimento,
                        ubicacion: nombreUbicacion,
                        fecha_caducidad: null
                    };

                    await actualizarAlimento(id, usuarioId, actualizado);
                    fetchAlimentos();
                }}
            >
                <h2 className="text-center">{nombreUbicacion}</h2>
                {Object.entries(agrupados).map(([nombreGrupo, lotes]) => (
                    lotes.length === 1 ? (
                        <FoodCard
                            key={lotes[0].id_alimento}
                            {...lotes[0]}
                            draggable
                            onDragStart={(e) => {
                                e.dataTransfer.setData("text/plain", JSON.stringify({ id: lotes[0].id_alimento, ubicacion: lotes[0].ubicacion }));
                            }}
                            fecha={lotes[0].fecha_caducidad}
                            categoriaNombre={categoriaMap[lotes[0].categoria_id]}
                            onSelect={() => setSelectedItem(prev => prev?.id_alimento === lotes[0].id_alimento ? null : lotes[0])}
                            isSelected={selectedItem?.id_alimento === lotes[0].id_alimento}
                            onEliminar={async () => {
                                await eliminarAlimento(lotes[0].id_alimento);
                                setSelectedItem(null);
                                fetchAlimentos();
                            }}
                            onGuardar={async (alimentoEditado) => {
                                const usuarioId = localStorage.getItem("usuarioId");
                                await actualizarAlimento(lotes[0].id_alimento, usuarioId, {
                                    ...lotes[0],
                                    ...alimentoEditado
                                });
                                fetchAlimentos();
                                setSelectedItem(null);
                            }}
                            onRefrescar={handleRefrescarConToast}
                        />
                    ) : (
                        <GroupedFoodCard
                            key={nombreGrupo}
                            grupoNombre={nombreGrupo}
                            lotes={lotes}
                            selectedItem={selectedItem}
                            onSelect={setSelectedItem}
                            onEliminar={async (alimento) => {
                                await eliminarAlimento(alimento.id_alimento);
                                setSelectedItem(null);
                                fetchAlimentos();
                            }}
                            onGuardar={async (original, editado) => {
                                const usuarioId = localStorage.getItem("usuarioId");
                                await actualizarAlimento(original.id_alimento, usuarioId, {
                                    ...original,
                                    ...editado
                                });
                                fetchAlimentos();
                                setSelectedItem(null);
                            }}
                        />
                    )
                ))}
            </div>
        );
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
                    <Header
                        title="Mi Nevera"
                        onAddClick={() => setShowForm(true)}
                        search={busqueda}
                        onSearchChange={(value) => setBusqueda(value)}
                    />

                    {pendientes.length > 0 && !showPendientes && (
                        <Alert
                            variant="warning"
                            dismissible
                            onClose={() => setShowPendientes(true)}
                            className="m-4 rounded shadow-sm"
                        >
                            Tienes <strong>{pendientes.length}</strong> alimento(s) pendientes de colocar.
                            <Button
                                variant="outline-warning"
                                size="sm"
                                className="ms-3"
                                onClick={() => setShowPendientes(true)}
                            >
                                Mostrar
                            </Button>
                        </Alert>
                    )}

                    {/* Modal listado de alimentos pendientes */}
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
                                            editable={false}
                                            showUbicacion={true}
                                            onColocarClick={() => setEditandoPendiente(a)}
                                            draggable
                                            onDragStart={(e) => {
                                                e.dataTransfer.setData(
                                                    "text/plain",
                                                    JSON.stringify({ id: a.id_alimento, ubicacion: a.ubicacion })
                                                );
                                            }}
                                            onRefrescar={handleRefrescarConToast}
                                        />
                                    </div>
                                ))}
                            </div>
                        </Modal.Body>
                    </Modal>

                    {/* Modal con formulario de colocación */}
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
                                        fetchAlimentos();
                                    }}
                                    onCancel={() => setEditandoPendiente(null)}
                                />
                            ) : (
                                <div className="text-center text-muted">Cargando...</div>
                            )}
                        </Modal.Body>
                    </Modal>

                    {/* Modal para añadir alimento */}
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

                    <div className="row flex-grow-1 bg-white">
                        {ubicaciones.map(renderUbicacion)}
                    </div>

                    {/*<FooterBar onDownloadClick={() => generarPegatinas(alimentos)}>*/}
                    <FooterBar onDownloadClick={() => Informe(alimentos)} />
                </div>
            </div>
        </div>

    );
    <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar />

}
