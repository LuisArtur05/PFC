import SideBar from "./SideBar";
import Header from "./Header";
import FooterBar from "./FooterBar";
import { useLocation } from "react-router-dom";

const Layout = ({ children, title = "", search, onSearchChange, onAddClick, footerProps = {} }) => {
    const location = useLocation();
    const mostrarBotonPegatinas = location.pathname === "/nevera";

    return (
        <div
            className="d-flex"
            style={{
                minHeight: "100vh",
                backgroundColor: "var(--gris-fondo)",
                fontFamily: "var(--fuente-principal)",
            }}
        >
            <SideBar />

            <div className="flex-grow-1 d-flex flex-column position-relative">
                {title && (
                    <Header
                        title={title}
                        search={search}
                        onSearchChange={onSearchChange}
                        onAddClick={onAddClick}
                    />
                )}

                <div className="p-4 flex-grow-1 overflow-auto" style={{ paddingBottom: "80px" }}>
                    {children}
                </div>

                <FooterBar {...footerProps} />
            </div>
        </div>
    );
};

export default Layout;
