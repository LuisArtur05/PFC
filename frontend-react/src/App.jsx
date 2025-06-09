import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Nevera from "./pages/Nevera";
import CreateAccount from "./pages/CreateAccount";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Lista from "./pages/Lista";
import Recetas from "./pages/Recetas";
import RecetasIA from "./pages/RecetasIA";
import PrivateRoute from "./components/PrivateRoute";
import Landing from "./pages/landing";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* 👇 Landing pública */}
        <Route path="/" element={<Landing />} />

        {/* 👇 Autenticación */}
        <Route path="/login" element={<Login />} />
        <Route path="/crear-cuenta" element={<CreateAccount />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* 👇 Rutas privadas con Layout interno en cada página */}
        <Route path="/nevera" element={<PrivateRoute><Nevera /></PrivateRoute>} />
        <Route path="/lista" element={<PrivateRoute><Lista /></PrivateRoute>} />
        <Route path="/recetas" element={<PrivateRoute><Recetas /></PrivateRoute>} />
        <Route path="/recetasIA" element={<PrivateRoute><RecetasIA /></PrivateRoute>} />
      </Routes>

      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />
    </Router>
  );
}

export default App;
