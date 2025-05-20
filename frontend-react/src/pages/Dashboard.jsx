// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import AddAlimentoForm from '../components/AddAlimentoForm';
import FoodCard from '../components/FoodCard';
import SideBar from "../components/SideBar";
import BurguerMenu from "../components/BurguerMenu";
import Header from "../components/Header";
import { Collapse, Fade } from "react-bootstrap";
import { getAlimentosPorUsuario, eliminarAlimento, actualizarAlimento } from "../services/alimentosService";
import GroupedFoodCard from "../components/GroupedFoodCard";

const Dashboard = () => {

    const [selectedItem, setSelectedItem] = useState(null);

    const [busqueda, setBusqueda] = useState("");

    {/* Handlers del formulario */ }
    const [showForm, setShowForm] = useState(false);

    const handleAddClick = () => {
        setShowForm(true);
    };

    const handleCancelForm = () => {
        setShowForm(false);
    };

    {/*Recogemos los alimentos del usuario con en un array */ }
    const [alimentos, setAlimentos] = useState([]);

    useEffect(() => {
        const fetchAlimentos = async () => {
            const usuarioId = localStorage.getItem("usuarioId");
            if (!usuarioId) return;

            try {
                const data = await getAlimentosPorUsuario(usuarioId);
                console.log("Datos recibidos:", data);
                setAlimentos(data);
            } catch (error) {
                console.error("Error obtenido al obtener Alimentos:", error)
            }
        };

        fetchAlimentos();
    }, [])

    const agruparPorNombre = (lista) => {
        return lista.reduce((acc, alimento) => {
            const clave = alimento.nombre;
            if (!acc[clave]) {
                acc[clave] = [];
            }
            acc[clave].push(alimento);
            return acc;
        }, {});
    };

    const alimentosNevera = alimentos.filter(a => a.ubicacion === "Frigorifico");
    const alimentosCongelador = alimentos.filter(a => a.ubicacion === "Congelador")
    const alimentosDespensa = alimentos.filter(a => a.ubicacion === "Despensa")

    const agrupadosNevera = agruparPorNombre(alimentosNevera);
    const agrupadosCongelador = agruparPorNombre(alimentosCongelador);
    const agrupadosDespensa = agruparPorNombre(alimentosDespensa);

    const alimentosFiltrados = alimentos.filter((a) =>
        a.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
    const agrupadosBusqueda = agruparPorNombre(alimentosFiltrados);



    return (
        <div className="container-fluid vh-100">
            <div className="row vh-100">
                {/* Sidebar */}
                <div className="col-2 p-3 d-none d-sm-block  text-center bg-light">
                    <SideBar />
                </div>
                <div className="row d-block d-sm-none bg-light">
                    <BurguerMenu />
                </div>

                {/* Contenido principal */}
                <div className="col d-flex flex-column bg-white vw-100">

                    {/* Header */}
                    <Header
                        title="Mi Nevera"
                        onAddClick={handleAddClick}
                        search={busqueda}
                        onSearchChange={(value) => {
                            setBusqueda(value);
                            setModoBusqueda(value !== "");
                        }}
                    />

                    {/* Overlay */}
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

                    {/* Formulario collapsable */}
                    <Collapse in={showForm}>
                        <div
                            style={{
                                position: "fixed",
                                top: "80px", // justo debajo del header
                                right: "20px",
                                width: "400px",
                                background: "white",
                                borderRadius: "12px",
                                boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
                                zIndex: 1050,
                                padding: "20px",
                            }}
                        >
                            <AddAlimentoForm onCancel={handleCancelForm} />
                        </div>
                    </Collapse>

                    {/* Tarjetas de Nevera / Congelador / Despensa */}
                    <div className="row flex-grow-1  bg-white">
                        <div className="col-sm p-3 bg-white">
                            <h2 className="text-center" >Nevera</h2>
                            {Object.entries(agrupadosNevera).map(([nombreGrupo, lotes]) => (
                                lotes.length === 1 ? (
                                    <FoodCard
                                        key={lotes[0].id_alimento}
                                        nombre={nombreGrupo}
                                        cantidad={lotes[0].cantidad}
                                        fecha={new Date(lotes[0].fecha_caducidad).toLocaleDateString("es-ES")}
                                        onSelect={() => {
                                            if (selectedItem?.id_alimento === lotes[0].id_alimento) {
                                                setSelectedItem(null);
                                            } else {
                                                setSelectedItem(lotes[0]);
                                            }
                                        }}
                                        isSelected={selectedItem?.id_alimento === lotes[0].id_alimento}
                                        onEliminar={async () => {
                                            await eliminarAlimento(lotes[0].id_alimento);
                                            setSelectedItem(null);
                                            const usuarioId = localStorage.getItem("usuarioId");
                                            const data = await getAlimentosPorUsuario(usuarioId);
                                            setAlimentos(data);
                                        }}
                                        onGuardar={async (alimentoEditado) => {
                                            const usuarioId = localStorage.getItem("usuarioId");
                                            const actualizado = {
                                                ...lotes[0],
                                                nombre: alimentoEditado.nombre,
                                                cantidad: alimentoEditado.cantidad,
                                                fecha_caducidad: alimentoEditado.fecha,
                                            };
                                            await actualizarAlimento(lotes[0].id_alimento, usuarioId, actualizado);
                                            const data = await getAlimentosPorUsuario(usuarioId);
                                            setAlimentos(data);
                                            setSelectedItem(null);
                                        }}
                                    />
                                ) : (
                                    <GroupedFoodCard
                                        key={nombreGrupo}
                                        grupoNombre={nombreGrupo}
                                        lotes={lotes}
                                        onSelect={setSelectedItem}
                                        selectedItem={selectedItem}
                                        onEliminar={async (alimento) => {
                                            await eliminarAlimento(alimento.id_alimento);
                                            setSelectedItem(null);
                                            const usuarioId = localStorage.getItem("usuarioId");
                                            const data = await getAlimentosPorUsuario(usuarioId);
                                            setAlimentos(data);
                                        }}
                                        onGuardar={async (original, editado) => {
                                            const usuarioId = localStorage.getItem("usuarioId");
                                            const actualizado = {
                                                ...original,
                                                nombre: editado.nombre,
                                                cantidad: editado.cantidad,
                                                fecha_caducidad: editado.fecha,
                                            };
                                            await actualizarAlimento(original.id_alimento, usuarioId, actualizado);
                                            const data = await getAlimentosPorUsuario(usuarioId);
                                            setAlimentos(data);
                                            setSelectedItem(null);
                                        }}
                                    />
                                )
                            ))}
                        </div>
                        <div className="col-sm p-3 bg-white">
                            <h2 className="text-center" >Congelador</h2>
                            {Object.entries(agrupadosCongelador).map(([nombreGrupo, lotes]) => (
                                lotes.length === 1 ? (
                                    <FoodCard
                                        key={lotes[0].id_alimento}
                                        nombre={nombreGrupo}
                                        cantidad={lotes[0].cantidad}
                                        fecha={new Date(lotes[0].fecha_caducidad).toLocaleDateString("es-ES")}
                                        onSelect={() => {
                                            if (selectedItem?.id_alimento === lotes[0].id_alimento) {
                                                setSelectedItem(null);
                                            } else {
                                                setSelectedItem(lotes[0]);
                                            }
                                        }}
                                        isSelected={selectedItem?.id_alimento === lotes[0].id_alimento}
                                        onEliminar={async () => {
                                            await eliminarAlimento(lotes[0].id_alimento);
                                            setSelectedItem(null);
                                            const usuarioId = localStorage.getItem("usuarioId");
                                            const data = await getAlimentosPorUsuario(usuarioId);
                                            setAlimentos(data);
                                        }}
                                        onGuardar={async (alimentoEditado) => {
                                            const usuarioId = localStorage.getItem("usuarioId");
                                            const actualizado = {
                                                ...lotes[0],
                                                nombre: alimentoEditado.nombre,
                                                cantidad: alimentoEditado.cantidad,
                                                fecha_caducidad: alimentoEditado.fecha,
                                            };
                                            await actualizarAlimento(lotes[0].id_alimento, usuarioId, actualizado);
                                            const data = await getAlimentosPorUsuario(usuarioId);
                                            setAlimentos(data);
                                            setSelectedItem(null);
                                        }}
                                    />
                                ) : (
                                    <GroupedFoodCard
                                        key={nombreGrupo}
                                        grupoNombre={nombreGrupo}
                                        lotes={lotes}
                                        onSelect={setSelectedItem}
                                        selectedItem={selectedItem}
                                        onEliminar={async (alimento) => {
                                            await eliminarAlimento(alimento.id_alimento);
                                            setSelectedItem(null);
                                            const usuarioId = localStorage.getItem("usuarioId");
                                            const data = await getAlimentosPorUsuario(usuarioId);
                                            setAlimentos(data);
                                        }}
                                        onGuardar={async (original, editado) => {
                                            const usuarioId = localStorage.getItem("usuarioId");
                                            const actualizado = {
                                                ...original,
                                                nombre: editado.nombre,
                                                cantidad: editado.cantidad,
                                                fecha_caducidad: editado.fecha,
                                            };
                                            await actualizarAlimento(original.id_alimento, usuarioId, actualizado);
                                            const data = await getAlimentosPorUsuario(usuarioId);
                                            setAlimentos(data);
                                            setSelectedItem(null);
                                        }}
                                    />
                                )
                            ))}
                        </div>
                        <div className="col-sm p-3 bg-white">
                            <h2 className="text-center" >Despensa</h2>
                            {Object.entries(agrupadosDespensa).map(([nombreGrupo, lotes]) => (
                                lotes.length === 1 ? (
                                    <FoodCard
                                        key={lotes[0].id_alimento}
                                        nombre={nombreGrupo}
                                        cantidad={lotes[0].cantidad}
                                        fecha={new Date(lotes[0].fecha_caducidad).toLocaleDateString("es-ES")}
                                        onSelect={() => {
                                            if (selectedItem?.id_alimento === lotes[0].id_alimento) {
                                                setSelectedItem(null);
                                            } else {
                                                setSelectedItem(lotes[0]);
                                            }
                                        }}
                                        isSelected={selectedItem?.id_alimento === lotes[0].id_alimento}
                                        onEliminar={async () => {
                                            await eliminarAlimento(lotes[0].id_alimento);
                                            setSelectedItem(null);
                                            const usuarioId = localStorage.getItem("usuarioId");
                                            const data = await getAlimentosPorUsuario(usuarioId);
                                            setAlimentos(data);
                                        }}
                                        onGuardar={async (alimentoEditado) => {
                                            const usuarioId = localStorage.getItem("usuarioId");
                                            const actualizado = {
                                                ...lotes[0],
                                                nombre: alimentoEditado.nombre,
                                                cantidad: alimentoEditado.cantidad,
                                                fecha_caducidad: alimentoEditado.fecha,
                                            };
                                            await actualizarAlimento(lotes[0].id_alimento, usuarioId, actualizado);
                                            const data = await getAlimentosPorUsuario(usuarioId);
                                            setAlimentos(data);
                                            setSelectedItem(null);
                                        }}
                                    />

                                ) : (
                                    <GroupedFoodCard
                                        key={nombreGrupo}
                                        grupoNombre={nombreGrupo}
                                        lotes={lotes}
                                        onSelect={setSelectedItem}
                                        selectedItem={selectedItem}
                                        onEliminar={async (alimento) => {
                                            await eliminarAlimento(alimento.id_alimento);
                                            setSelectedItem(null);
                                            const usuarioId = localStorage.getItem("usuarioId");
                                            const data = await getAlimentosPorUsuario(usuarioId);
                                            setAlimentos(data);
                                        }}
                                        onGuardar={async (original, editado) => {
                                            const usuarioId = localStorage.getItem("usuarioId");
                                            const actualizado = {
                                                ...original,
                                                nombre: editado.nombre,
                                                cantidad: editado.cantidad,
                                                fecha_caducidad: editado.fecha,
                                            };
                                            await actualizarAlimento(original.id_alimento, usuarioId, actualizado);
                                            const data = await getAlimentosPorUsuario(usuarioId);
                                            setAlimentos(data);
                                            setSelectedItem(null);
                                        }}
                                    />
                                )
                            ))}
                        </div>
                    </div>

                    {/* Barra inferior */}
                    <div className="row border p-3 align-content-end bg-white">
                        <div className="col">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
