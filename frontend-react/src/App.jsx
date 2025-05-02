import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Prueba from "./pages/Prueba";
import CreateAccount from "./pages/CreateAccount";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Lista from "./pages/Lista";
import Recetas from "./pages/Recetas";


import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/nevera" element={<Dashboard />} />
        <Route path="/prueba" element={<Prueba />} />
        <Route path="/crear-cuenta" element={<CreateAccount />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/lista" element={<Lista />} />
        <Route path="/recetas" element={<Recetas />} />
      </Routes>
    </Router>
  );
}

export default App;
