import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import AddButton from "./AddButton";
import IAButton from "./IAButton";  // <-- Importa tu botón IA aquí

export default function HeaderRecetas({ title, onAddClick = () => {}, onIARecommendationClick = () => {} }) {
    const [search, setSearch] = useState("");

    return (
        <div className="d-flex justify-content-between align-items-center px-4 py-2 shadow-sm bg-white sticky-top" style={{ zIndex: 1030 }}>
            {/* Título */}
            <h4 className="mb-0 fw-semibold">{title}</h4>

            {/* Buscador */}
            

            {/* Botón IA a la izquierda del botón Add */}
            <div className="d-flex align-items-center gap-2">
                <IAButton onClick={onIARecommendationClick} />
                <AddButton onClick={onAddClick} />
            </div>
        </div>
    );
}
