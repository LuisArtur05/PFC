import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import COOLEDButton from "../components/COOLEDButton";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [nuevaPassword, setNuevaPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nuevaPassword !== repeatPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(nuevaPassword, salt);

      const res = await fetch(`http://localhost:8080/usuario/restablecer-password?token=${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nuevaPassword: hashedPassword }),
      });

      const text = await res.text();
      setMensaje(text);

      if (res.ok) {
        alert("Contraseña actualizada exitosamente. Redirigiendo al login...");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      setMensaje("Error al actualizar la contraseña.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', backgroundColor: 'var(--gris-fondo)' }}>
      <div className="card shadow p-4 border-0" style={{ minWidth: "400px", width: "90%", maxWidth: "500px", borderRadius: "1rem" }}>
        {/* Logotipo COOLED */}
        <div className="text-center mb-3">
          <img
            src="/img/Logotipo_COOLED.png"
            alt="Logo COOLED"
            style={{ width: "180px", marginBottom: "0.5rem" }}
          />
        </div>

        <h5 className="text-center mb-4">Restablecer Contraseña</h5>

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

          <div className="mb-3">
            <label htmlFor="repeatPassword" className="form-label">Repetir nueva contraseña</label>
            <input
              type="password"
              className="form-control"
              id="repeatPassword"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
            />
          </div>

          <COOLEDButton type="submit">Actualizar</COOLEDButton>
        </form>

        {mensaje && (
          <div className="mt-3 text-center" style={{ color: "var(--verde-cooled)", fontWeight: "500" }}>
            {mensaje}
          </div>
        )}
      </div>
    </div>
  );
}
