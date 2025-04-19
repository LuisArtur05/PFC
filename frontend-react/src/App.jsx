import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Prueba from "./pages/Prueba"
import "bootstrap/dist/css/bootstrap.min.css"; // Importación de Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Login from "./pages/Login";
import AlimentoView from "./pages/AlimentoView";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
