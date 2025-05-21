import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const AddRecetaForm = ({ onCancel }) => {
    const [nombre, setNombre] = useState("");
    const [ingredientes, setIngredientes] = useState("");
    const [instrucciones, setInstrucciones] = useState("");
    const [tiempoPreparacion, setTiempoPreparacion] = useState("");
    const [dificultad, setDificultad] = useState("");
    const [precio, setPrecio] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const nuevaReceta = {
            nombre,
            ingredientes,
            instrucciones,
            tiempoPreparacion,
            dificultad,
            precio,
        };
        console.log("Nueva Receta:", nuevaReceta);
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


            <Form.Group className="mb-3" controlId="formInstrucciones">
                <Form.Label>Instrucciones</Form.Label>
                <Form.Control
                    as="textarea"
                    placeholder="Describe los pasos de la receta"
                    value={instrucciones}
                    onChange={(e) => setInstrucciones(e.target.value)}
                    rows={3}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formTiempoPreparacion">
                <Form.Label>Tiempo de preparación (minutos)</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Ej: 20"
                    value={tiempoPreparacion}
                    onChange={(e) => setTiempoPreparacion(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDificultad">
                <Form.Label>Dificultad</Form.Label>
                <Form.Select
                    value={dificultad}
                    onChange={(e) => setDificultad(e.target.value)}
                    required
                >
                    <option value="">Selecciona una dificultad</option>
                    <option value="Fácil">Fácil</option>
                    <option value="Media">Media</option>
                    <option value="Difícil">Difícil</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPrecio">
                <Form.Label>Precio(€)</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Ej: 12.50"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    min="0"
                    step="0.01"
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
