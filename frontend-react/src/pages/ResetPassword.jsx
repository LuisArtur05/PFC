import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`http://localhost:8080/usuario/reset-password/${token}`, { password });
      setStatus("Contraseña actualizada con éxito. Ya puedes iniciar sesión.");
    } catch (error) {
      setStatus("Error al actualizar la contraseña.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="card p-4" style={{ minWidth: "500px", width: "100%" }}>
        <h3 className="mb-4 text-center">Restablecer Contraseña</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Nueva contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
            
          <button type="submit" className="btn btn-success w-100">Actualizar</button>
        </form>

        {status && <div className="mt-3 text-center text-info">{status}</div>}
      </div>
    </div>
  );
};

export default ResetPassword;
