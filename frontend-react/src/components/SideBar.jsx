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
            className="d-flex flex-column align-items-baseline bg-light p-3"
            style={{ position: "sticky", top: 0, height: "100vh" }}
        >
            <div className="mb-3 align-self-center">
                <img
                    src="/IMG_COOLED_CUT2.PNG"
                    alt="COOLED"
                    style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "contain",
                    }}
                />
            </div>
            <NavLink to="/nevera" className="mt-2 my-3 d-flex aling-items-center gap-2 text-decoration-none text-dark">
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