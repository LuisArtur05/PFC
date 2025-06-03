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
import RecetasIA from "./pages/RecetasIA";
import PrivateRoute from "./components/PrivateRoute";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/crear-cuenta" element={<CreateAccount />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* 👇 Rutas protegidas */}
        <Route
          path="/nevera"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/lista"
          element={
            <PrivateRoute>
              <Lista />
            </PrivateRoute>
          }
        />
        <Route
          path="/recetas"
          element={
            <PrivateRoute>
              <Recetas />
            </PrivateRoute>
          }
        />
        <Route
          path="/recetasIA"
          element={
            <PrivateRoute>
              <RecetasIA />
            </PrivateRoute>
          }
        />
        <Route
          path="/prueba"
          element={
            <PrivateRoute>
              <Prueba />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
