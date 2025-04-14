import React from "react";

const Login = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ minWidth: "500px", maxWidth: "400px", width: "100%" }}>
        <h3 className="mb-4 text-center">Iniciar sesión</h3>

        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              id="email"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Entrar</button>
        </form>

        <div className="mt-3 text-center">
          <small>¿No tienes cuenta? <a href="#">Regístrate</a></small>
        </div>
      </div>
    </div>
  );
};

export default Login;
