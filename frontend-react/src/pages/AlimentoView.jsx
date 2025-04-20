import { useState } from "react";
import { crearAlimento, getAlimentoPorId } from "../services/alimentosService";

export default function AlimentoView() {
    const [alimento, setAlimento] = useState(null);
    const [form, setForm] = useState({
        usuario_id: 1,
        categoria_id: 5,
        nombre: "",
        fecha_caducidad: "",
        cantidad: 1,
        ubicacion: "Frigorifico",
    });

    const [alimentoId, setAlimentoId] = useState("");

    const buscarAlimento = async () => {
        const data = await getAlimentoPorId(alimentoId);
        setAlimento(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await crearAlimento(form);
        alert("Alimento creado correctamente.");
        setForm({
            usuario_id: 1,
            categoria_id: 5,
            nombre: "",
            fecha_caducidad: "",
            cantidad: 1,
            ubicacion: "Frigorifico",
        });
    };

    return (
        <div className="container mt-4">
            <h2>➕ Añadir nuevo alimento</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nombre"
                    className="form-control mb-2"
                    value={form.nombre}
                    onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                    required
                />
                <input
                    type="date"
                    className="form-control mb-2"
                    value={form.fecha_caducidad}
                    onChange={(e) =>
                        setForm({ ...form, fecha_caducidad: e.target.value })
                    }
                    required
                />
                <input
                    type="number"
                    placeholder="Cantidad"
                    className="form-control mb-2"
                    value={form.cantidad}
                    onChange={(e) => setForm({ ...form, cantidad: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Ubicación"
                    className="form-control mb-2"
                    value={form.ubicacion}
                    onChange={(e) => setForm({ ...form, ubicacion: e.target.value })}
                />
                <button type="submit" className="btn btn-primary">
                    Crear alimento
                </button>
            </form>

            <hr />

            <h2>🔍 Buscar alimento por ID</h2>
            <div className="input-group mb-3">
                <input
                    type="number"
                    className="form-control"
                    placeholder="ID del alimento"
                    value={alimentoId}
                    onChange={(e) => setAlimentoId(e.target.value)}
                />
                <button className="btn btn-outline-secondary" onClick={buscarAlimento}>
                    Buscar
                </button>
            </div>

            {alimento && (
                <div className="alert alert-info">
                    <strong>{alimento.nombre}</strong> - {alimento.descripcion} -{" "}
                    {alimento.fechaCaducidad}
                </div>
            )}
        </div>
    );
}
