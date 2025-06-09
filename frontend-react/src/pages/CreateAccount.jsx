import React from "react";
import axios from "axios";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const repeatPassword = document.getElementById("repeatPassword").value;

    if (password !== repeatPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const response = await axios.post("http://localhost:8080/usuario/crearUsuario", {
        nombre,
        email,
        password: hashedPassword,
      });

      alert("Cuenta creada con éxito");
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      alert("Hubo un error al crear la cuenta");
      console.error(error);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh", backgroundColor: "var(--gris-fondo)" }}
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

        <h5 className="text-center mb-4">Crear Cuenta</h5>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre de usuario</label>
            <input type="text" className="form-control" id="nombre" required />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo electrónico</label>
            <input type="email" className="form-control" id="email" required />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input type="password" className="form-control" id="password" required />
          </div>

          <div className="mb-3">
            <label htmlFor="repeatPassword" className="form-label">Repetir contraseña</label>
            <input type="password" className="form-control" id="repeatPassword" required />
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
            Crear
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
