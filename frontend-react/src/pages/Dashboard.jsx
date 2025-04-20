// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import AddButton from "../components/AddButton";
import FoodCard from '../components/FoodCard';
import SideBar from "../components/SideBar";
import BurguerMenu from "../components/BurguerMenu";
import { getAlimentosPorUsuario } from "../services/alimentosService";

const Dashboard = () => {

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
                <div className="col-1 p-3 d-none d-sm-block  text-center bg-light">
                    <SideBar />
                </div>
                <div className="row d-block d-sm-none bg-light">
                    <BurguerMenu />
                </div>

                {/* Contenido principal */}
                <div className="col d-flex flex-column bg-white vw-100">
                    {/* Parte superior: Nevera / Congelador / Despensa */}
                    <div className="row flex-grow-1  bg-white">
                        <div className="col-sm p-3 bg-white">
                            <h2 className="text-center" >Nevera</h2>
                            {alimentosNevera.map((item, index) => (
                                <FoodCard
                                    key={`nevera-${item.id_alimento}`}
                                    nombre={item.nombre}
                                    descripcion={`Cantidad: ${item.cantidad}`}
                                    fecha={new Date(item.fecha_caducidad).toLocaleDateString()}
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
                                />
                            ))}
                        </div>
                    </div>

                    {/* Barra inferior */}
                    <div className="row border p-3 align-content-end bg-white">
                        <div className="col">
                            <AddButton />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
