import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { RiFridgeLine } from "react-icons/ri";
import { TbShoppingCartCheck } from "react-icons/tb";
import { LuChefHat } from "react-icons/lu";
import { HiOutlineLogout, HiOutlineMenuAlt3 } from "react-icons/hi";

const SideBar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true); // Ahora comienza expandido

  const handleSignOut = () => {
    localStorage.removeItem("usuarioId");
    navigate("/login");
  };

  return (
    <div
      className="d-flex flex-column justify-content-between align-items-start bg-light shadow-sm"
      style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        width: open ? "220px" : "80px",
        transition: "width 0.3s",
        padding: "1rem 1rem",
        zIndex: 1050,
        backgroundColor: "var(--gris-fondo)",
        fontFamily: "var(--fuente-principal)"
      }}
    >
      {/* Header: logo o icono + toggle */}
      <div className="w-100 mb-4 d-flex justify-content-between align-items-center">
        <img
          src={open ? "/img/Logotipo_COOLED.png" : "/img/Icono_COOLED_Grande.png"}
          alt="Logo COOLED"
          style={{
            width: open ? "140px" : "36px",
            height: open ? "auto" : "36px",
            objectFit: "contain",
            transition: "width 0.3s, height 0.3s",
            cursor: "pointer"
          }}
        />
        <button className="btn btn-sm ms-auto p-2" onClick={() => setOpen(!open)}>
          <HiOutlineMenuAlt3 size={20} />
        </button>
      </div>


      {/* Nav Items */}
      <div className="w-100 d-flex flex-column gap-3 mt-2">
        <NavItem to="/nevera" icon={<RiFridgeLine size={22} />} label="Nevera" open={open} />
        <NavItem to="/lista" icon={<TbShoppingCartCheck size={22} />} label="Lista" open={open} />
        <NavItem to="/recetas" icon={<LuChefHat size={22} />} label="Recetas" open={open} />
      </div>

      {/* Footer: logout */}
      <div className="w-100 mt-auto">
        <button className="btn btn-outline-dark w-100" onClick={handleSignOut}>
          <div className="d-flex align-items-center gap-2 justify-content-center">
            <HiOutlineLogout size={20} />
            {open && <span>Salir</span>}
          </div>
        </button>
      </div>
    </div>
  );
};

// Subcomponente nav item con estilo
const NavItem = ({ to, icon, label, open }) => (
  <NavLink
    to={to}
    className="d-flex align-items-center text-dark text-decoration-none gap-2 px-2 py-2 rounded"
    style={{
      fontWeight: 500,
      fontSize: "15px",
      transition: "background-color 0.2s",
    }}
    activeclassname="active"
  >
    {icon}
    {open && <span>{label}</span>}
  </NavLink>
);

export default SideBar;
