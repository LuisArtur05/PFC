import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [nuevaPassword, setNuevaPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:8080/usuario/restablecer-password?token=${token}&nuevaPassword=${nuevaPassword}`, {
        method: "POST",
      });

      const text = await res.text();
      setMensaje(text);
    } catch (error) {
      setMensaje("Error al actualizar la contraseña.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="card p-4" style={{ minWidth: "500px", width: "100%" }}>
        <h3 className="mb-4 text-center">Restablecer Contraseña</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nuevaPassword" className="form-label">Nueva contraseña</label>
            <input
              type="password"
              className="form-control"
              id="nuevaPassword"
              value={nuevaPassword}
              onChange={(e) => setNuevaPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100">Actualizar</button>
        </form>

        {mensaje && <div className="mt-3 text-center text-info">{mensaje}</div>}
      </div>
    </div>
  );
}
