import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const AddRecetaForm = ({ onCancel }) => {
    const [nombre, setNombre] = useState("");
    const [ingredientes, setIngredientes] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Nueva Receta:", { nombre, ingredientes });
        // Aquí podrías hacer un POST al backend
        onCancel();
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formNombreReceta">
                <Form.Label>Nombre de la receta</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Ej: Ensalada César"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formIngredientesReceta">
                <Form.Label>Ingredientes principales</Form.Label>
                <Form.Control
                    as="textarea"
                    placeholder="Ej: Lechuga, pollo, parmesano"
                    value={ingredientes}
                    onChange={(e) => setIngredientes(e.target.value)}
                    rows={3}
                    required
                />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
                <Button variant="secondary" onClick={onCancel}>Cancelar</Button>
                <Button type="submit" variant="success">Guardar</Button>
            </div>
        </Form>
    );
};

export default AddRecetaForm;
