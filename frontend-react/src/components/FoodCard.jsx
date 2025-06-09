import React, { useState, useMemo } from 'react';
import { Alert, Badge, Modal, Button, Row, Col } from "react-bootstrap";
import './FoodCard.css';
import { actualizarNevera_A_Lista } from '../services/alimentosService';

export default function FoodCard({
  id_alimento,
  nombre,
  cantidad,
  fecha,
  precio,
  proveedor,
  ubicacion,
  categoriaNombre,
  onSelect,
  isSelected,
  className = '',
  onGuardar,
  onEliminar,
  onColocarClick,
  onRefrescar = () => { }
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNombre, setEditedNombre] = useState(nombre || "");
  const [editedCantidad, setEditedCantidad] = useState(cantidad || 1);
  const [editedPrecio, setEditedPrecio] = useState(precio || "");
  const [editedProveedor, setEditedProveedor] = useState(proveedor || "");
  const [editedUbicacion, setEditedUbicacion] = useState(ubicacion || "Frigorifico");
  const [validationError, setValidationError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const today = new Date();
  const hoySinHora = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  let isCaducado = false;
  let porCaducar = false;
  let fechaCadSinHora = hoySinHora;

  if (typeof fecha === "string" && /^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
    const [a, m, d] = fecha.split("-");
    fechaCadSinHora = new Date(Number(a), Number(m) - 1, Number(d));
    const diffDias = Math.ceil((fechaCadSinHora - hoySinHora) / (1000 * 60 * 60 * 24));
    isCaducado = fechaCadSinHora < hoySinHora;
    porCaducar = !isCaducado && diffDias <= 3;
  }

  const cardStyle = isCaducado
    ? "border border-2 border-danger bg-light"
    : porCaducar
      ? "border border-2 border-warning bg-light"
      : "border border-2 border-success bg-white";

  const badge = isCaducado
    ? <Badge bg="danger">CADUCADO</Badge>
    : porCaducar
      ? <Badge bg="warning" text="dark">PRONTO</Badge>
      : <Badge bg="success">OK</Badge>;

  const imagenCategoria = useMemo(() => {
    const mapa = {
      Fruta: "fruta.png",
      Verdura: "verdura.png",
      Carne: "carne.png",
      Pescado: "pescado.png",
      Lácteos: "lacteos.png",
      Huevos: "huevos.png",
      Pan: "pan.png",
      Congelados: "congelados.png",
      "Comida Preparada": "comida_preparada.png",
      Conservas: "conservas.png",
      Bebidas: "bebidas.png",
      Dulces: "dulces.png",
      Cereales: "cereales.png",
      "Frutos Secos": "frutos_secos.png"
    };

    const nombreLimpio = (categoriaNombre || "").trim();
    const filename = mapa[nombreLimpio] || "default.png";
    return `/assets/categorias/${filename}`;
  }, [categoriaNombre]);

  const handleSave = () => {
    if (!editedNombre.trim()) {
      setValidationError("El nombre no puede estar vacío.");
      return;
    }
    if (!editedCantidad || editedCantidad < 1) {
      setValidationError("La cantidad debe ser mayor o igual a 1.");
      return;
    }

    setIsEditing(false);
    setValidationError(null);

    if (onGuardar) {
      onGuardar({
        nombre: editedNombre,
        cantidad: editedCantidad,
        precio: editedPrecio ? parseFloat(editedPrecio) : null,
        proveedor: editedProveedor,
        ubicacion: editedUbicacion,
      });
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedNombre(nombre);
    setEditedCantidad(cantidad);
    setEditedPrecio(precio);
    setEditedProveedor(proveedor);
    setEditedUbicacion(ubicacion);
  };

  const handleEliminarClick = (e) => {
    e.stopPropagation();
    setShowModal(true);
  };

  const handleMoverALista = async () => {
    const usuarioId = parseInt(localStorage.getItem("usuarioId"));
    await actualizarNevera_A_Lista(usuarioId, id_alimento);
    setShowModal(false);
    onRefrescar();
  };

  return (
    <>
      <div
        className={`card food-card mb-3 shadow-sm ${isSelected ? 'expanded' : ''} ${cardStyle} ${className}`}
        onClick={onSelect}
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setData("text/plain", JSON.stringify({ id: id_alimento, ubicacion }));
        }}
        style={{ cursor: 'pointer' }}
      >
        <div className="card-body">
          {isEditing ? (
            <div className="d-flex flex-column gap-2">
              {validationError && (
                <Alert variant="danger" onClose={() => setValidationError(null)} dismissible>
                  {validationError}
                </Alert>
              )}

              <input type="text" className="form-control" value={editedNombre}
                onChange={(e) => setEditedNombre(e.target.value)} placeholder="Nombre" />

              <Row>
                <Col md={6}>
                  <input type="number" className="form-control" value={editedCantidad}
                    onChange={(e) => setEditedCantidad(parseInt(e.target.value))} placeholder="Cantidad" min={1} />
                </Col>
                <Col md={6}>
                  <select className="form-select" value={editedUbicacion}
                    onChange={(e) => setEditedUbicacion(e.target.value)}>
                    <option value="Frigorifico">Frigorífico</option>
                    <option value="Despensa">Despensa</option>
                    <option value="Congelador">Congelador</option>
                  </select>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <input type="number" step="0.01" className="form-control" value={editedPrecio}
                    onChange={(e) => setEditedPrecio(e.target.value)} placeholder="Precio (€)" />
                </Col>
                <Col md={6}>
                  <input type="text" className="form-control" value={editedProveedor}
                    onChange={(e) => setEditedProveedor(e.target.value)} placeholder="Proveedor" />
                </Col>
              </Row>

              <div className="d-flex gap-2 justify-content-center">
                <button className="btn btn-success btn-sm" onClick={handleSave}>Guardar</button>
                <button className="btn btn-secondary btn-sm" onClick={handleCancel}>Cancelar</button>
              </div>
            </div>
          ) : (
            <>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="d-flex flex-column">
                  <h5 className="card-title mb-1">{nombre}</h5>
                  {badge}
                </div>
                <img
                  src={imagenCategoria}
                  alt={categoriaNombre}
                  style={{
                    width: "40px",
                    height: "40px",
                    marginLeft: "10px",
                    objectFit: "contain",
                    flexShrink: 0
                  }}
                />
              </div>

              <Row>
                <Col md={6}>
                  <p className="card-text">Cantidad: {cantidad}</p>
                  <p className="card-text">Ubicación: {ubicacion}</p>
                </Col>
                <Col md={6}>
                  {precio && <p className="card-text">Precio: {precio} €</p>}
                  {proveedor && <p className="card-text">Proveedor: {proveedor}</p>}
                </Col>
              </Row>

              {fecha && (
                <p className="card-text">
                  <small className="text-muted">
                    Caduca: {new Date(fechaCadSinHora).toLocaleDateString("es-ES")}
                  </small>
                </p>
              )}

              {ubicacion === "Pendiente" && onColocarClick && (
                <div className="mt-3 d-flex justify-content-center">
                  <button className="btn btn-outline-success btn-sm" onClick={(e) => { e.stopPropagation(); onColocarClick(); }}>
                    Colocar
                  </button>
                </div>
              )}

              {isSelected && ubicacion !== "Pendiente" && (
                <div className="mt-3 d-flex gap-2 justify-content-center">
                  <button className="btn btn-outline-primary btn-sm" onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}>Editar</button>
                  <button className="btn btn-outline-danger btn-sm" onClick={handleEliminarClick}>Eliminar</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {isCaducado ? "Alimento caducado" : "Eliminar alimento"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isCaducado
            ? "¿Deseas mover este alimento a la lista de la compra?"
            : "¿Quieres moverlo a la lista de la compra antes de eliminarlo?"}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => { setShowModal(false); onEliminar(); }}>
            No, eliminar
          </Button>
          <Button variant="success" onClick={handleMoverALista}>
            {isCaducado ? "Sí, mover a lista" : "Sí, mover a la lista"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
