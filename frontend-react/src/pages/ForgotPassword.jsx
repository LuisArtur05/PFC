import React, { useState } from "react";
import axios from "axios";

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
    <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="card p-4" style={{ minWidth: "500px", width: "100%" }}>
        <h3 className="mb-4 text-center">Recuperar Contraseña</h3>

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

          <button type="submit" className="btn btn-primary w-100">Enviar enlace</button>
        </form>

        {status && <div className="mt-3 text-center text-info">{status}</div>}
      </div>
    </div>
  );
};

export default ForgotPassword;
