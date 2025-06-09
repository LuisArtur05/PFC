import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import BurguerMenu from "../components/BurguerMenu";
import { Collapse, Form, Button } from "react-bootstrap";
import { getNombresAlimentosSinCaducar } from "../services/alimentosService";
import { generarRecetaConIA, postReceta } from "../services/recetasService";
import AddButton from "../components/AddButton";
import ReturnButton from "../components/ReturnButton";

const RecetasIA = () => {
    const [showForm, setShowForm] = useState(false);
    const [recetaIA, setRecetaIA] = useState("");
    const [recetaParseada, setRecetaParseada] = useState(null);
    const [loading, setLoading] = useState(false);

    const [nombre, setNombre] = useState("");
    const [ingredientes, setIngredientes] = useState("");
    const [instrucciones, setInstrucciones] = useState("");
    const [tiempo, setTiempo] = useState("");
    const [dificultad, setDificultad] = useState("");
    const [precio, setPrecio] = useState("");

    const navigate = useNavigate();

    const handleAddClick = () => {
        if (recetaParseada) {
            setNombre(recetaParseada.nombre);
            setIngredientes(recetaParseada.alimentos.join(", "));
            setInstrucciones(recetaParseada.instrucciones);
            setTiempo(recetaParseada.tiempo);
            setDificultad(recetaParseada.dificultad);
            setPrecio(recetaParseada.precio || "");
        }
        setShowForm(true);
    };

    const handleCancelForm = () => setShowForm(false);

    const handleReturnClick = () => {
        console.log("Regresando...");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const usuarioId = parseInt(localStorage.getItem("usuarioId"));
        if (!usuarioId) {
            console.error("Usuario no identificado");
            return;
        }

        const receta = {
            usuario_id: usuarioId,
            nombre,
            instrucciones,
            tiempo_preparacion: parseFloat(tiempo) || 0,
            dificultad,
            precio: parseFloat(precio) || 0,
        };

        try {
            await postReceta(receta);
            alert("Receta guardada exitosamente.");
            navigate("/recetas");
        } catch (error) {
            console.error("Error al guardar la receta:", error);
            alert("Error al guardar la receta. Intenta de nuevo.");
        }
    };

    useEffect(() => {
        const usuarioId = localStorage.getItem("usuarioId");
        if (!usuarioId) return;

        const fetchRecetaIA = async () => {
            setLoading(true);
            try {
                const alimentos = await getNombresAlimentosSinCaducar(usuarioId);
                const receta = await generarRecetaConIA(alimentos);
                setRecetaIA(receta);
                setRecetaParseada(parseJSONReceta(receta));
            } catch (error) {
                console.error("Error generando receta con IA:", error);
                setRecetaIA("Hubo un problema generando la receta.");
                setRecetaParseada(null);
            } finally {
                setLoading(false);
            }
        };

        fetchRecetaIA();
    }, []);

    const limpiarTextoJSON = (texto) => {
        if (typeof texto !== "string") return texto;
        return texto.replace(/```(?:json)?\s*([\s\S]*?)\s*```/, "$1").trim();
    };

    const parseJSONReceta = (texto) => {
        try {
            const limpio = limpiarTextoJSON(texto);
            const obj = JSON.parse(limpio);
            const receta = obj.Receta || obj;

            return {
                nombre: receta.Nombre || "",
                alimentos: receta.Alimentos || [],
                instrucciones: Array.isArray(receta.Instrucciones)
                    ? receta.Instrucciones.join("\n")
                    : receta.Instrucciones || "",
                tiempo:
                    receta.TiempoDePreparacion ||
                    receta["Tiempo de preparacion"] ||
                    receta["Tiempo preparación"] ||
                    "",
                dificultad: receta.Dificultad || "",
                precio: receta.Precio || receta["Precio"] || "",
            };
        } catch (err) {
            console.error("Error al interpretar la respuesta:", err);
            return null;
        }
    };

    return (
        <div className="container-fluid vh-100">
            <div className="row vh-100">
                <div className="col-2 p-3 d-none d-sm-block bg-light">
                    <SideBar />
                </div>
                <div className="row d-block d-sm-none bg-light">
                    <BurguerMenu />
                </div>

                <div className="col d-flex flex-column bg-white vw-100">
                    {showForm && (
                        <div
                            onClick={handleCancelForm}
                            style={{
                                position: "fixed",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                                zIndex: 1040,
                            }}
                        />
                    )}

                    <Collapse in={showForm}>
                        <div
                            style={{
                                position: "fixed",
                                top: "80px",
                                right: "20px",
                                width: "400px",
                                background: "white",
                                borderRadius: "12px",
                                boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
                                zIndex: 1050,
                                padding: "20px",
                            }}
                        >
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Ingredientes</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={2}
                                        value={ingredientes}
                                        onChange={(e) => setIngredientes(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Instrucciones</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={4}
                                        value={instrucciones}
                                        onChange={(e) => setInstrucciones(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Tiempo de preparación</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={tiempo}
                                        onChange={(e) => setTiempo(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Dificultad</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={dificultad}
                                        onChange={(e) => setDificultad(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Precio (€)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        step="0.01"
                                        value={precio}
                                        onChange={(e) => setPrecio(e.target.value)}
                                    />
                                </Form.Group>

                                <div className="d-flex justify-content-end gap-2">
                                    <Button variant="secondary" onClick={handleCancelForm}>
                                        Cancelar
                                    </Button>
                                    <Button type="submit" variant="success">
                                        Guardar receta
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </Collapse>

                    <div className="row flex-grow-1 p-3">
                        <div className="card p-4">
                            <h5>Receta generada con IA</h5>
                            {loading ? (
                                <p>Cargando receta con tus alimentos...</p>
                            ) : (
                                <>
                                    {recetaParseada ? (
                                        <div>
                                            <p><strong>Nombre:</strong> {recetaParseada.nombre}</p>
                                            <p><strong>Alimentos:</strong> {recetaParseada.alimentos.join(", ")}</p>
                                            <p><strong>Instrucciones:</strong><br />{recetaParseada.instrucciones}</p>
                                            <p><strong>Tiempo de preparación:</strong> {recetaParseada.tiempo}</p>
                                            <p><strong>Dificultad:</strong> {recetaParseada.dificultad}</p>
                                            {recetaParseada.precio && (
                                                <p><strong>Precio:</strong> {recetaParseada.precio}€</p>
                                            )}
                                        </div>
                                    ) : (
                                        <p>Error al interpretar la respuesta.</p>
                                    )}
                                </>
                            )}

                            {!loading && (
                                <div className="d-flex justify-content-center gap-3 mt-4">
                                    <AddButton onClick={handleAddClick} />
                                    <ReturnButton onClick={handleReturnClick} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecetasIA;
