import React from "react";
import AddButton from "../components/AddButton";
import FoodCard from '../components/FoodCard';
import SideBar from "../components/SideBar";
import BurguerMenu from "../components/BurguerMenu";

const Prueba = () => {

    {/*Aqui un JSON simulando los alimentos */ }
    const alimentos = [
        {
            nombre: "Yogur Natural",
            descripcion: "Caduca pronto",
            fecha: "Hoy · 23 min"
        },
        {
            nombre: "Manzanas",
            descripcion: "Manzana roja",
            fecha: "Mañana · 14:00"
        },
        {
            nombre: "Pechuga de Pollo",
            descripcion: "A punto de caducar",
            fecha: "Hoy · 18:30"
        }
    ];

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
                            {alimentos.map((item, index) => (
                                <FoodCard
                                    key={`nevera-${index}`}
                                    nombre={item.nombre}
                                    descripcion={item.descripcion}
                                    fecha={item.fecha}
                                />
                            ))}
                        </div>
                        <div className="col-sm p-3 bg-white">
                            <h2 className="text-center" >Congelador</h2>
                            {alimentos.map((item, index) => (
                                <FoodCard
                                    key={`congelador-${index}`}
                                    nombre={item.nombre}
                                    descripcion={item.descripcion}
                                    fecha={item.fecha}
                                />
                            ))}
                        </div>
                        <div className="col-sm p-3 bg-white">
                            <h2 className="text-center" >Despensa</h2>
                            {alimentos.map((item, index) => (
                                <FoodCard
                                    key={`despensa-${index}`}
                                    nombre={item.nombre}
                                    descripcion={item.descripcion}
                                    fecha={item.fecha}
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

export default Prueba;
