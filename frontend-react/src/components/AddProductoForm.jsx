import { useState, useEffect } from "react";
import { Form, Button, FormSelect, Row, Col } from "react-bootstrap";
import { crearAlimento_lista } from "../services/alimentosService";
import { getCategorias } from "../services/categoriasService";

export default function AddProductoForm({ onCancel, onSuccess, alimentosPrevios = [] }) {
    const usuarioId = parseInt(localStorage.getItem("usuarioId"));
    const [nombre, setNombre] = useState("");
    const [cantidad, setCantidad] = useState(1);
    const [precio, setPrecio] = useState("");
    const [proveedor, setProveedor] = useState("");
    const [categoriaId, setCategoriaId] = useState("");
    const [categorias, setCategorias] = useState([]);
    const [sugerencias, setSugerencias] = useState([]);

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

    const handleNombreChange = (value) => {
        setNombre(value);

        if (value.length >= 2) {
            const sugerenciasFiltradas = alimentosPrevios
                .filter((a) => a.nombre.toLowerCase().startsWith(value.toLowerCase()))
                .reduce((acc, current) => {
                    const found = acc.find(item => item.nombre.toLowerCase() === current.nombre.toLowerCase());
                    if (!found) acc.push(current);
                    return acc;
                }, []);
            setSugerencias(sugerenciasFiltradas);
        } else {
            setSugerencias([]);
        }
    };

    const autocompletar = (producto) => {
        setNombre(producto.nombre);
        setCategoriaId(producto.categoria_id || "");
        setPrecio(producto.precio || "");
        setProveedor(producto.proveedor || "");
        setSugerencias([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nuevoAlimento = {
            nombre,
            cantidad: parseInt(cantidad),
            usuario_id: usuarioId,
            categoria_id: parseInt(categoriaId),
            precio: precio ? parseFloat(precio) : null,
            proveedor: proveedor || null,
            ubicacion: "Pendiente"
        };

        try {
            await crearAlimento_lista(nuevoAlimento);
            if (onSuccess) await onSuccess();
            onCancel();
        } catch (error) {
            console.error("Error al crear producto:", error);
        }
    };


    return (
        <Form
            onSubmit={handleSubmit}
            className="p-4 bg-light rounded shadow-sm my-3 mx-auto"
            style={{ maxWidth: "800px" }}
        >
            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3 position-relative">
                        <Form.Label>Nombre *</Form.Label>
                        <Form.Control
                            type="text"
                            value={nombre}
                            onChange={(e) => handleNombreChange(e.target.value)}
                            placeholder="Ej. Leche"
                            required
                            autoComplete="off"
                        />
                        {sugerencias.length > 0 && (
                            <div className="position-absolute bg-white border rounded shadow w-100 mt-1 z-3">
                                {sugerencias.map((item, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => autocompletar(item)}
                                        className="px-2 py-1 text-muted hover-bg-light"
                                        style={{ cursor: "pointer" }}
                                    >
                                        {item.nombre}
                                    </div>
                                ))}
                            </div>
                        )}
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
                        <Form.Label>Precio</Form.Label>
                        <Form.Control
                            type="number"
                            min="0"
                            step="0.01"
                            value={precio}
                            onChange={(e) => setPrecio(e.target.value)}
                            placeholder="Ej. 2.99"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Proveedor</Form.Label>
                        <Form.Control
                            type="text"
                            value={proveedor}
                            onChange={(e) => setProveedor(e.target.value)}
                            placeholder="Ej. Carrefour, Makro..."
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Form.Text className="text-muted">
                Los campos marcados con <strong>*</strong> son obligatorios.
            </Form.Text>

            <div className="d-flex justify-content-end gap-2 mt-3">
                <Button variant="secondary" onClick={onCancel}>Cancelar</Button>
                <Button type="submit" variant="success">Guardar</Button>
            </div>
        </Form>
    );
}
