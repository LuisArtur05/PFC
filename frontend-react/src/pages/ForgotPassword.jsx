import React, { useState } from "react";
import axios from "axios";
import COOLEDButton from "../components/COOLEDButton";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/usuario/forgot-password", { email });
      setStatus("Hemos enviado un enlace de recuperación a tu correo.");
    } catch (error) {
      setStatus("Error al enviar el correo. Intenta de nuevo.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh", backgroundColor: "var(--gris-fondo)" }}>
      <div className="card shadow p-4 border-0" style={{ minWidth: "400px", width: "90%", maxWidth: "500px", borderRadius: "1rem" }}>
        {/* Logo COOLED */}
        <div className="text-center mb-3">
          <img
            src="/img/Logotipo_COOLED.png"
            alt="Logo COOLED"
            style={{ width: "180px", marginBottom: "0.5rem" }}
          />
        </div>

        <h5 className="text-center mb-4">Recuperar Contraseña</h5>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <COOLEDButton type="submit">Enviar enlace</COOLEDButton>
        </form>

        {status && (
          <div className="mt-3 text-center" style={{ color: "var(--verde-cooled)", fontWeight: "500" }}>
            {status}
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
