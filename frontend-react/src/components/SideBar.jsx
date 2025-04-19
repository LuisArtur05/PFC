import { FaSnowflake, FaAppleAlt, FaIceCream } from "react-icons/fa";
import { RiFridgeFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";

const SideBar = () => {
    const handleAddFood = () => {
        alert("Aquí abre el formulario para anyadir alimento");
        // También podrías usar useNavigate para redirigir a /alimentos/nuevo
    };

    return (
        <div
            className="d-flex flex-column align-items-start bg-light p-2"
            style={{ position: "sticky", top: 0 }}
        >
            <NavLink to="/nevera" className="mt-5 my-3 d-flex aling-items-center gap-2 text-decoration-none text-dark">
                <RiFridgeFill size={24} />
                <span>Nevera</span>
            </NavLink>
            <NavLink to='/lista' className="my-3 d-flex align-items-center gap-2 text-decoration-none text-dark">
                <FaSnowflake size={24} />
                <span>Lista</span>
            </NavLink>
            <NavLink to='/recetas' className="my-3 d-flex align-items-center gap-2 text-decoration-none text-dark">
                <FaAppleAlt size={24} />
                <span>Recetas</span>
            </NavLink>


        </div>
    );
};

export default SideBar;