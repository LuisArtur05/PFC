import { useState } from "react";
import { Dropdown, Button, Form, InputGroup } from "react-bootstrap";
import AddButton from "./AddButton";

export default function Header({ title, onAddClick = () => { } }) {
    const [search, setSearch] = useState("");

    return (
        <div className="d-flex justify-content-between align-items-center px-4 py-2 shadow-sm bg-white sticky-top" style={{ zIndex: 1030 }}>
            {/* Título */}
            <h4 className="mb-0 fw-semibold">{title}</h4>

            {/* Buscador */}
            <InputGroup className="w-50">
                <Form.Control
                    placeholder="Buscar..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </InputGroup>

            {/* Botón + con menú */}
            <AddButton onClick={onAddClick} />

        </div>
    );
}
