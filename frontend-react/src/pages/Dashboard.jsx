// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import AddAlimentoForm from '../components/AddAlimentoForm';
import FoodCard from '../components/FoodCard';
import SideBar from "../components/SideBar";
import BurguerMenu from "../components/BurguerMenu";
import Header from "../components/Header";
import { Collapse, Fade } from "react-bootstrap";
import { getAlimentosPorUsuario } from "../services/alimentosService";

const Dashboard = () => {

    const [selectedItem, setSelectedItem] = useState(null);

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

    const alimentosNevera = alimentos.filter(a => a.ubicacion === "Frigorifico");
    const alimentosCongelador = alimentos.filter(a => a.ubicacion === "Congelador")
    const alimentosDespensa = alimentos.filter(a => a.ubicacion === "Despensa")

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
                    <Header title="Mi Nevera" onAddClick={handleAddClick} />

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
                            {alimentosNevera.map((item, index) => (
                                <FoodCard
                                    key={`nevera-${item.id_alimento}`}
                                    nombre={item.nombre}
                                    descripcion={`Cantidad: ${item.cantidad}`}
                                    fecha={new Date(item.fecha_caducidad).toLocaleDateString()}
                                    onSelect={() => {
                                        if (selectedItem?.id_alimento === item.id_alimento) {
                                            setSelectedItem(null); // Si ya está seleccionada, la deseleccionamos
                                        } else {
                                            setSelectedItem(item); // Si no, la seleccionamos
                                        }
                                    }}
                                    isSelected={selectedItem?.id_alimento === item.id_alimento}
                                />
                            ))}
                        </div>
                        <div className="col-sm p-3 bg-white">
                            <h2 className="text-center" >Congelador</h2>
                            {alimentosCongelador.map((item, index) => (
                                <FoodCard
                                    key={`nevera-${item.id_alimento}`}
                                    nombre={item.nombre}
                                    descripcion={`Cantidad: ${item.cantidad}`}
                                    fecha={new Date(item.fecha_caducidad).toLocaleDateString()}
                                    onSelect={() => {
                                        if (selectedItem?.id_alimento === item.id_alimento) {
                                            setSelectedItem(null);
                                        } else {
                                            setSelectedItem(item);
                                        }
                                    }}
                                    isSelected={selectedItem?.id_alimento === item.id_alimento}
                                />
                            ))}
                        </div>
                        <div className="col-sm p-3 bg-white">
                            <h2 className="text-center" >Despensa</h2>
                            {alimentosDespensa.map((item, index) => (
                                <FoodCard
                                    key={`nevera-${item.id_alimento}`}
                                    nombre={item.nombre}
                                    descripcion={`Cantidad: ${item.cantidad}`}
                                    fecha={new Date(item.fecha_caducidad).toLocaleDateString()}
                                    onSelect={() => {
                                        if (selectedItem?.id_alimento === item.id_alimento) {
                                            setSelectedItem(null);
                                        } else {
                                            setSelectedItem(item);
                                        }
                                    }}
                                    isSelected={selectedItem?.id_alimento === item.id_alimento}
                                />
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
