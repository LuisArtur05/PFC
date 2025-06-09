import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
    return (
        <div style={{ fontFamily: "var(--fuente-principal)", backgroundColor: "var(--gris-fondo)" }}>

            <section
                className="text-center text-md-start d-flex align-items-center justify-content-center flex-column flex-md-row"
                style={{
                    minHeight: "100vh",
                    background: "linear-gradient(180deg, #F0FAF4 0%, #ffffff 90%)",
                    padding: "3rem 2rem",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Texto */}
                <div style={{ maxWidth: "600px", zIndex: 2 }}>
                    <img
                        src="/img/Logotipo_COOLED.png"
                        alt="Logo COOLED"
                        style={{ width: "220px", marginBottom: "1.5rem" }}
                    />

                    <h1
                        style={{
                            fontWeight: 700,
                            fontSize: "2.7rem",
                            color: "var(--verde-cooled)",
                        }}
                    >
                        Organiza tu cocina. Ahorra. Respira.
                    </h1>

                    <p
                        style={{
                            fontSize: "1.2rem",
                            marginTop: "1rem",
                            maxWidth: "500px",
                            color: "#333",
                        }}
                    >
                        La solución web para gestionar alimentos, reducir el desperdicio
                        y automatizar tu lista de la compra con inteligencia.
                    </p>

                    <div className="d-flex gap-3 mt-4 flex-wrap justify-content-center justify-content-md-start">
                        <Link to="/login">
                            <button
                                className="btn btn-lg"
                                style={{
                                    backgroundColor: "var(--verde-cooled)",
                                    color: "white",
                                    padding: "0.75em 1.5em",
                                    fontWeight: 600,
                                    borderRadius: "8px",
                                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                                }}
                            >
                                Iniciar sesión
                            </button>
                        </Link>
                        <Link to="/crear-cuenta">
                            <button
                                className="btn btn-lg"
                                style={{
                                    backgroundColor: "#ffffff",
                                    border: "2px solid var(--verde-cooled)",
                                    color: "var(--verde-cooled)",
                                    padding: "0.75em 1.5em",
                                    fontWeight: 600,
                                    borderRadius: "8px",
                                    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                                }}
                            >
                                Crear cuenta
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Imagen decorativa */}
                <div className="d-none d-md-block ms-5">
                    <img
                        src="/img/alimentos_Flotando.png"
                        alt="Alimentos FLotando"
                        className="img-fluid"
                        style={{
                            maxWidth: "500px",
                            borderRadius: "1rem",
                            boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                        }}
                    />
                </div>
            </section>


            <section className="text-center py-5 bg-white">
                <h3 className="fw-semibold">Controla tu inventario desde un solo lugar</h3>
                <p className="mx-auto" style={{ maxWidth: "700px", fontSize: "1.1rem" }}>
                    Visualiza tu nevera digital con productos organizados, alertas inteligentes y listas de compra automáticas.
                </p>
                <img
                    src="/img/mockup_cooled.png"
                    alt="Vista previa de COOLED"
                    className="img-fluid mt-4"
                    style={{
                        maxWidth: "720px",
                        maxHeight: "400px",
                        width: "90%",
                        height: "auto",
                        borderRadius: "1rem",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                        objectFit: "contain"
                    }}
                />
            </section>


            {/* QUÉ ES COOLED */}
            <section className="container text-center py-5">
                <h3 className="mb-4 fw-semibold">¿Qué es COOLED?</h3>
                <p className="mx-auto" style={{ maxWidth: "700px", fontSize: "1.05rem" }}>
                    COOLED es una plataforma web que permite a los restaurantes tener un control total sobre su inventario de alimentos: puedes registrar productos, recibir alertas de caducidad, planificar recetas, generar listas de compra automáticamente, e incluso mover productos con un solo clic.
                </p>
                <img src="/img/Icono_COOLED.png" alt="Icono" style={{ width: "80px", marginTop: "2rem" }} />
            </section>

            {/* FUNCIONALIDADES */}
            <section className="bg-white py-5">
                <div className="container text-center">
                    <h3 className="mb-4 fw-semibold">Funcionalidades destacadas</h3>
                    <div className="row g-4">
                        {[
                            { title: "Gestión de alimentos", desc: "Organiza productos por ubicación, cantidad y caducidad." },
                            { title: "Alertas inteligentes", desc: "Recibe notificaciones antes de que un alimento caduque." },
                            { title: "Lista de la compra", desc: "Generada automáticamente según el consumo y el stock." },
                            { title: "Recetas sugeridas", desc: "Aprovecha ingredientes antes de que se desperdicien." }
                        ].map((item, idx) => (
                            <div key={idx} className="col-12 col-md-6 col-lg-3">
                                <div className="p-4 border rounded shadow-sm h-100 bg-white">
                                    <h5 className="text-success">{item.title}</h5>
                                    <p>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* BENEFICIOS */}
            <section className="container text-center py-5">
                <h3 className="mb-4 fw-semibold">¿Por qué usar COOLED?</h3>
                <div className="row g-4">
                    {[
                        ["💰", "Reduce el coste operativo"],
                        ["♻️", "Disminuye el desperdicio de comida"],
                        ["🧠", "Planifica con inteligencia"],
                        ["📊", "Visibilidad total del inventario"]
                    ].map(([icon, text], idx) => (
                        <div key={idx} className="col-6 col-md-3">
                            <div className="p-3">
                                <div style={{ fontSize: "2rem" }}>{icon}</div>
                                <p className="mt-2">{text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CALL TO ACTION FINAL */}
            <section className="text-center py-5 bg-light">
                <h4 className="mb-3">¿Listo para empezar?</h4>
                <p className="mb-4">Únete a COOLED y gestiona tus alimentos de forma eficiente, moderna y sin complicaciones.</p>
                <Link to="/crear-cuenta">
                    <button className="btn btn-lg" style={{
                        backgroundColor: "var(--verde-cooled)",
                        color: "white",
                        fontWeight: 600,
                        padding: "0.75em 2em",
                        borderRadius: "8px"
                    }}>
                        Crear cuenta
                    </button>
                </Link>
            </section>
        </div>
    );
}
