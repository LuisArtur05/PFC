import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/usuario/getID", {
        email,
        password
      });

      const userId = response.data;
      localStorage.setItem("usuarioId", userId);
      navigate("/nevera");

    } catch (error) {
      console.error("Error en el login:", error.response?.data || error.message);
      alert("Usuario o contraseña incorrectos.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: '100vh', backgroundColor: 'var(--gris-fondo)' }}
    >
      <div
        className="card shadow p-4 border-0"
        style={{ minWidth: "400px", width: "90%", maxWidth: "500px", borderRadius: "1rem" }}
      >
        {/* Logotipo COOLED */}
        <div className="text-center mb-3">
          <img
            src="/img/Logotipo_COOLED.png"
            alt="Logo COOLED"
            style={{ width: "180px", marginBottom: "0.5rem" }}
          />
        </div>

        <h5 className="text-center mb-4">Iniciar sesión</h5>

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

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="text-end mb-3">
            <small>
              <Link to="/forgot-password" style={{ color: "var(--verde-cooled)" }}>
                ¿Olvidaste tu contraseña?
              </Link>
            </small>
          </div>

          <button
            type="submit"
            className="w-100"
            style={{
              backgroundColor: "var(--verde-cooled)",
              border: "none",
              padding: "0.75em",
              borderRadius: "8px",
              fontWeight: 600,
              color: "white"
            }}
          >
            Entrar
          </button>
        </form>

        <div className="mt-3 text-center">
          <small>
            ¿No tienes cuenta?{" "}
            <Link to="/crear-cuenta" style={{ color: "var(--verde-cooled)" }}>
              Regístrate
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;
