import { FaSnowflake, FaAppleAlt } from "react-icons/fa";
import { RiFridgeFill } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("usuarioId"); // Solo borra el ID
    navigate("/login"); // Redirige al login
  };

  return (
    <div
      className="d-flex flex-column justify-content-between align-items-baseline bg-light p-3"
      style={{ position: "sticky", top: 0, height: "100vh" }}
    >
      <div className="w-100">
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
        <NavLink to="/nevera" className="mt-2 my-3 d-flex align-items-center gap-2 text-decoration-none text-dark">
          <RiFridgeFill size={24} />
          <span>Nevera</span>
        </NavLink>
        <NavLink to="/lista" className="my-3 d-flex align-items-center gap-2 text-decoration-none text-dark">
          <FaSnowflake size={24} />
          <span>Lista</span>
        </NavLink>
        <NavLink to="/recetas" className="my-3 d-flex align-items-center gap-2 text-decoration-none text-dark">
          <FaAppleAlt size={24} />
          <span>Recetas</span>
        </NavLink>
      </div>

      {/* Botón Sign out */}
      <div className="mb-4 align-self-center">
        <button
          onClick={handleSignOut}
          className="btn btn-dark"
          style={{ padding: "6px 12px", fontSize: "14px", width: "auto", minWidth: "fit-content" }}
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

export default SideBar;
