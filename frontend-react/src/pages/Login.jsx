import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // para redireccionar

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/usuario/getID", {
        email,
        password
      });

      const userId = response.data;

      // Guardar el ID en localStorage
      localStorage.setItem("usuarioId", userId);

      // Redirigir al dashboard u otra página
      navigate("/dashboard");

    } catch (error) {
      console.error("Error en el login:", error.response?.data || error.message);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="card p-4" style={{ minWidth: "500px", width: "100%" }}>
        <h3 className="mb-4 text-center">Iniciar sesión</h3>

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

          <div className="">
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

          <div className="mt text-end mb-3">
            <small><Link to="/forgot-password">¿Olvidaste tu contraseña?</Link></small>
          </div>

          <button type="submit" className="btn btn-primary w-100">Entrar</button>
        </form>

        <div className="mt-3 text-center">
          <small>¿No tienes cuenta? <Link to="/crear-cuenta">Regístrate</Link></small>
        </div>
      </div>
    </div>
  );
};

export default Login;
