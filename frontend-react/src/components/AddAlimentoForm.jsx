import { useState, useEffect } from "react";
import { Form, Button, FormSelect, Row, Col } from "react-bootstrap";
import { getCategorias } from "../services/categoriasService";
import { crearAlimento, crearAlimento_lista } from "../services/alimentosService";
import DatePicker from "react-datepicker";

export default function AddAlimentoForm({ onCancel, onSuccess, isLista = false }) {
    const [nombre, setNombre] = useState("");
    const [cantidad, setCantidad] = useState(1);
    const [ubicacion, setUbicacion] = useState("Frigorifico");
    const [categoriaId, setCategoriaId] = useState("");
    const [fechaCaducidad, setFechaCaducidad] = useState(new Date());
    const [usarFechaAutomatica, setUsarFechaAutomatica] = useState(false);
    const [precio, setPrecio] = useState("");
    const [proveedor, setProveedor] = useState("");
    const [categorias, setCategorias] = useState([]);

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
            fecha_caducidad: usarFechaAutomatica ? null : fechaCaducidad.toISOString().split("T")[0],
            ubicacion,
            usuario_id: parseInt(localStorage.getItem("usuarioId")),
            categoria_id: parseInt(categoriaId),
            precio: precio ? parseFloat(precio) : null,
            proveedor: proveedor || null
        };

        try {
            if (isLista) {
                await crearAlimento_lista(nuevoAlimento);
            } else {
                await crearAlimento(nuevoAlimento);
            }

            if (onSuccess) await onSuccess();  // actualiza la lista
            onCancel(); // cierra el modal

        } catch (error) {
            console.error("Error al crear alimento:", error);
        }
    };

    return (
        <Form
            onSubmit={handleSubmit}
            className="p-4 bg-light rounded shadow-sm my-3 mx-auto"
            style={{ maxWidth: "900px" }}
        >
            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre del alimento *</Form.Label>
                        <Form.Control
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            placeholder="Ej. Tomate, Leche..."
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Cantidad *</Form.Label>
                        <Form.Control
                            type="number"
                            min="1"
                            value={cantidad}
                            onChange={(e) => setCantidad(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Ubicación *</Form.Label>
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

                    <Form.Group className="mb-3">
                        <Form.Label>Categoría *</Form.Label>
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
                </Col>

                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Caducidad *</Form.Label>
                        <DatePicker
                            selected={fechaCaducidad}
                            onChange={(date) => setFechaCaducidad(date)}
                            dateFormat="yyyy-MM-dd"
                            minDate={new Date()}
                            className="form-control"
                            disabled={usarFechaAutomatica}
                            required={!usarFechaAutomatica}
                        />
                        <div className="mt-2">
                            <Form.Check
                                type="checkbox"
                                label="Automática"
                                checked={usarFechaAutomatica}
                                onChange={(e) => setUsarFechaAutomatica(e.target.checked)}
                            />
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Precio</Form.Label>
                        <Form.Control
                            type="number"
                            min="0"
                            step="0.01"
                            value={precio}
                            onChange={(e) => setPrecio(e.target.value)}
                            placeholder="Ej. 3.49"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Proveedor</Form.Label>
                        <Form.Control
                            type="text"
                            value={proveedor}
                            onChange={(e) => setProveedor(e.target.value)}
                            placeholder="Ej. Makro, Carrefour..."
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Form.Text className="text-muted">
                Los campos marcados con <strong>*</strong> son obligatorios.</Form.Text>

            <div className="d-flex justify-content-end gap-2 mt-3">
                <Button variant="secondary" onClick={onCancel}>Cancelar</Button>
                <Button type="submit" variant="success">Guardar</Button>
            </div>
        </Form>

    );
}
