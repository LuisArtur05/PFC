import { useState, useEffect } from "react";
import { Form, Button, FormSelect } from "react-bootstrap";
import { getCategorias } from "../services/categoriasService";
import { crearAlimento } from "../services/alimentosService";
import DatePicker from "react-datepicker";

export default function AddAlimentoForm({ onCancel }) {
    const [nombre, setNombre] = useState("");
    const [cantidad, setCantidad] = useState(1);
    const [ubicacion, setUbicacion] = useState("Frigorifico"); // default
    const [categoriaId, setCategoriaId] = useState("");
    const [fechaCaducidad, setFechaCaducidad] = useState(new Date());
    const [categorias, setCategorias] = useState([]);

    // Cargar categorías desde el backend
    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const data = await getCategorias();
                setCategorias(data);
            } catch (error) {
                console.error("Error al cargar categorías:", error);
            }
        };

        fetchCategorias();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nuevoAlimento = {
            nombre,
            cantidad: parseInt(cantidad),
            fecha_caducidad: fechaCaducidad.toISOString().split("T")[0],
            ubicacion,
            usuario_id: parseInt(localStorage.getItem("usuarioId")),
            categoria_id: parseInt(categoriaId)
        };


        console.log("JSON enviado:", nuevoAlimento);

        try {
            await crearAlimento(nuevoAlimento);
            onCancel(); // cerrar el formulario
            window.location.reload(); // opcional: recargar dashboard
        } catch (error) {
            console.error("Error al crear alimento:", error);
        }
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

            <Form.Group controlId="cantidadAlimento" className="mb-3">
                <Form.Label>Cantidad</Form.Label>
                <Form.Control
                    type="number"
                    value={cantidad}
                    min="1"
                    onChange={(e) => setCantidad(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group controlId="ubicacionAlimento" className="mb-3">
                <Form.Label>Ubicación</Form.Label>
                <Form.Select
                    value={ubicacion}
                    onChange={(e) => setUbicacion(e.target.value)}
                    required
                >
                    <option value="Frigorifico">Frigorífico</option>
                    <option value="Despensa">Despensa</option>
                    <option value="Congelador">Congelador</option>
                </Form.Select>
            </Form.Group>

            <Form.Group controlId="categoriaAlimento" className="mb-3">
                <Form.Label>Categoría</Form.Label>
                <FormSelect
                    value={categoriaId}
                    onChange={(e) => setCategoriaId(e.target.value)}
                    required
                >
                    <option value="">Selecciona una categoría</option>
                    {categorias.map((cat) => (
                        <option key={cat.id_categoria} value={cat.id_categoria}>
                            {cat.nombre}
                        </option>
                    ))}
                </FormSelect>
            </Form.Group>

            <Form.Group controlId="fechaCaducidad" className="mb-3">
                <Form.Label>Fecha de caducidad</Form.Label>
                <DatePicker
                    selected={fechaCaducidad}
                    onChange={(date) => setFechaCaducidad(date)}
                    dateFormat="yyyy-MM-dd"
                    minDate={new Date()}
                    className="form-control"
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
