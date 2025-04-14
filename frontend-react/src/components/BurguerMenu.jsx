import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const BurguerMenu = () => {
    const [abierto, setAbierto] = useState(false);

    const toggleMenu = () => {
        setAbierto(!abierto);
    };

    return (
        <div className="p-3">
            {/* Botón de hamburguesa */}
            <button className="btn" onClick={toggleMenu}>
                <FaBars />
            </button>

            {abierto && (
                <div className="row p-2 bg-light-subtle">
                    <NavLink to="/nevera" className="mt-2 text-dark text-decoration-none">
                        <span>Nevera</span>
                    </NavLink>
                    <NavLink to="/lista" className="text-dark text-decoration-none">
                        <span>Lista</span>
                    </NavLink>
                    <NavLink to="/recetas" className="text-dark text-decoration-none">
                        <span>Recetas</span>
                    </NavLink>
                </div>


            )}
        </div>




    );
};

export default BurguerMenu;