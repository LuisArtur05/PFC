import { useState } from "react";
import { Form, Button } from "react-bootstrap";

export default function AddAlimentoForm({ onCancel }) {
    const [nombre, setNombre] = useState("");
    const [categoria, setCategoria] = useState("");
    const [fechaCaducidad, setFechaCaducidad] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí enviarías los datos (de momento solo console.log)
        console.log({ nombre, categoria, fechaCaducidad });
        onCancel(); // Cierra el formulario después de guardar
    };

    return (
        <Form onSubmit={handleSubmit} className="p-4 bg-light rounded shadow-sm my-3">
            <Form.Group controlId="nombreAlimento" className="mb-3">
                <Form.Label>Nombre del alimento</Form.Label>
                <Form.Control
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group controlId="categoriaAlimento" className="mb-3">
                <Form.Label>Categoría</Form.Label>
                <Form.Control
                    type="text"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group controlId="fechaCaducidad" className="mb-3">
                <Form.Label>Fecha de caducidad</Form.Label>
                <Form.Control
                    type="date"
                    value={fechaCaducidad}
                    onChange={(e) => setFechaCaducidad(e.target.value)}
                    required
                />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
                <Button variant="secondary" onClick={onCancel}>Cancelar</Button>
                <Button type="submit" variant="success">Guardar</Button>
            </div>
        </Form>
    );
}
