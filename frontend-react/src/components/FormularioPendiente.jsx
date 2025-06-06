import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Form, Button } from "react-bootstrap";

export default function FormularioPendiente({ alimento, onSave, onCancel }) {
    const [ubicacion, setUbicacion] = useState(alimento.ubicacion || "");
    const [usarFechaAutomatica, setUsarFechaAutomatica] = useState(true);
    const [fechaCaducidad, setFechaCaducidad] = useState(null);

    const handleGuardar = () => {
        const fechaFinal = usarFechaAutomatica ? null : fechaCaducidad?.toISOString().split("T")[0];
        onSave(ubicacion, fechaFinal);
    };

    return (
        <div className="p-3 bg-white border rounded shadow-sm" style={{ minWidth: 250 }}>
            <h6 className="fw-semibold mb-3">Colocar alimento</h6>

            <Form.Group className="mb-2">
                <Form.Label>Ubicación</Form.Label>
                <Form.Select value={ubicacion} onChange={(e) => setUbicacion(e.target.value)}>
                    <option value="">Selecciona ubicación</option>
                    <option value="Frigorifico">Frigorífico</option>
                    <option value="Congelador">Congelador</option>
                    <option value="Despensa">Despensa</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Caducidad</Form.Label>
                <div>
                    <DatePicker
                        selected={fechaCaducidad}
                        onChange={(date) => setFechaCaducidad(date)}
                        dateFormat="yyyy-MM-dd"
                        minDate={new Date()}
                        className="form-control"
                        disabled={usarFechaAutomatica}
                        required={!usarFechaAutomatica}
                    />
                    <Form.Check
                        type="checkbox"
                        label="Usar fecha automática"
                        className="mt-2"
                        checked={usarFechaAutomatica}
                        onChange={(e) => setUsarFechaAutomatica(e.target.checked)}
                    />
                </div>

            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
                <Button size="sm" variant="secondary" onClick={onCancel}>
                    Cancelar
                </Button>
                <Button size="sm" variant="primary" onClick={handleGuardar}>
                    Guardar
                </Button>
            </div>
        </div>
    );
}
