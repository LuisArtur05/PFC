import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap"; // Componentes de Bootstrap
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css"; // Importación de Bootstrap

function App() {
  return (
    <Router>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Nevera Virtual</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link href="/dashboard">Dashboard</Nav.Link>
        </Nav>
      </Navbar>

      <div className="container mt-4">
        <Button variant="primary">Botón de ejemplo</Button>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
