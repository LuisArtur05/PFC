import React from "react";
import { FaSnowflake, FaAppleAlt, FaBars } from "react-icons/fa";
import { RiFridgeFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import "./BurguerMenu.css"; // Estilos adicionales

const BurguerMenu = () => {
    return (
        <div className="burguer-sidebar d-none d-sm-flex flex-column align-items-center">
            <div className="logo-hover mb-4" title="Inicio">
                <NavLink to="/dashboard">
                    <img src="/img/Icono_COOLED.png" alt="COOLED" width="36" />
                </NavLink>
            </div>

            <NavLink to="/nevera" className="nav-icon" title="Nevera">
                <RiFridgeFill size={20} />
                <span>Nevera</span>
            </NavLink>
            <NavLink to="/lista" className="nav-icon" title="Lista">
                <FaSnowflake size={18} />
                <span>Lista</span>
            </NavLink>
            <NavLink to="/recetas" className="nav-icon" title="Recetas">
                <FaAppleAlt size={18} />
                <span>Recetas</span>
            </NavLink>
        </div>
    );
};

export default BurguerMenu;
