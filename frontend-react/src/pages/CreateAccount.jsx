import React from "react";
import axios from "axios";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom"; // << Importar navigate

const CreateAccount = () => {
  const navigate = useNavigate(); // << Declarar navigate

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
      // Hash de la contraseña
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Enviar JSON correcto con password hasheada
      const response = await axios.post("http://localhost:8080/usuario/crearUsuario", {
        nombre,
        email,
        password: hashedPassword,
      });

      alert("Cuenta creada con éxito");
      console.log(response.data);
      navigate("/login"); // Redirigir después de crear cuenta
    } catch (error) {
      alert("Hubo un error al crear la cuenta");
      console.error(error);
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="card p-4" style={{ minWidth: "500px", width: "100%" }}>
        <h3 className="mb-4 text-center">Crear Cuenta</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">
              Nombre de usuario:
            </label>
            <input type="text" className="form-control" id="nombre" required />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Correo electrónico
            </label>
            <input type="email" className="form-control" id="email" required />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input type="password" className="form-control" id="password" required />
          </div>
          <div className="mb-3">
            <label htmlFor="repeatPassword" className="form-label">
              Repetir contraseña
            </label>
            <input type="password" className="form-control" id="repeatPassword" required />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Crear
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
