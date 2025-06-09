import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import './index.css'
import App from './App.jsx'
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
