import { Dropdown, Button, Form, InputGroup } from "react-bootstrap";
import AddButton from "./AddButton";

export default function Header({ title, onAddClick = () => { }, search, onSearchChange }) {
    return (
        <div className="d-flex justify-content-between align-items-center px-4 py-2 shadow-sm bg-white sticky-top" style={{ zIndex: 1030 }}>
            <h4 className="mb-0 fw-semibold">{title}</h4>

            <InputGroup className="w-50">
                <Form.Control
                    placeholder="Buscar..."
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
                {search && (
                    <Button variant="outline-secondary" onClick={() => onSearchChange("")}>
                        Cancel
                    </Button>
                )}
            </InputGroup>

            <AddButton onClick={onAddClick} />
        </div>
    );
}
