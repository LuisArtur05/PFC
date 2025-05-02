import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const AddProductoForm = ({ onCancel }) => {
    const [nombre, setNombre] = useState("");
    const [cantidad, setCantidad] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Nuevo Producto:", { nombre, cantidad });
        // Aquí podrías hacer un POST al backend
        onCancel();
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formNombreProducto">
                <Form.Label>Nombre del producto</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Ej: Leche"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCantidadProducto">
                <Form.Label>Cantidad</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Ej: 2 litros"
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
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

export default AddProductoForm;
