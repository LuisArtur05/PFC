import { Dropdown, Button, Form, InputGroup } from "react-bootstrap";
import AddButton from "./AddButton";

export default function Header({ title, onAddClick, search, onSearchChange, extraButtons = null }) {
    return (
        <div className="d-flex justify-content-between align-items-center px-4 py-3 shadow-sm bg-white sticky-top gap-3 flex-wrap"
            style={{ zIndex: 1030 }}>

            {/* Título */}
            <h4 className="mb-0 fw-semibold text-capitalize">{title}</h4>

            {/* Buscador */}
            {typeof search !== "undefined" && typeof onSearchChange === "function" && (
                <InputGroup className="flex-grow-1" style={{ maxWidth: "500px" }}>
                    <Form.Control
                        placeholder="Buscar..."
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                    {search && (
                        <Button variant="outline-secondary" onClick={() => onSearchChange("")}>
                            Cancelar
                        </Button>
                    )}
                </InputGroup>
            )}

            {/* Botones extra (por ejemplo: IA) */}
            {extraButtons && (
                <div className="d-flex align-items-center gap-2 flex-wrap">
                    {extraButtons}
                </div>
            )}

            {/* Botón Añadir */}
            {typeof onAddClick === "function" && (
                <AddButton onClick={onAddClick} />
            )}
        </div>
    );
}
