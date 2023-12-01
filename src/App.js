import React from "react";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login/Login';
import Home from "./pages/HomePage/HomePage";
import UserPage from "./pages/UserPage/UserPage";
import Citas from './pages/CitaPage/CitaPage';
import SearchComponent from "./Component/SearchComponent";
import Prueba from "./pages/Prueba2/prueba";
import Prueba3 from "./pages/CitaPage/Prueba3";
import VisualizarExamenes from "./pages/RegistrarExamenes/VisualizarExamenes";
import RegistrarExamenes from "./pages/RegistrarExamenes/RegistrarExamenes";
import ExamenDetalle from "./pages/RegistrarExamenes/ExamenDetalle";
import Medicamentos from "./pages/Medicamentos/Medicamentos";
import UserProfile from "./pages/UserProfile/UserProfile";
import SigIntegration from "./pages/SigIntegration/SigIntegration";
import Contraseña from "./pages/Contraseña/Contraseña";



function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Home/> }></Route>
        <Route path="/Login" element={ <Login/> }></Route>
        <Route path="/Home" element={ <Login/> }></Route>
        <Route path="/UserPage" element={ <UserPage/> }></Route>
        <Route path="/Citas" element={ <Citas/> }></Route>
        <Route path="/Examenes" element={ <VisualizarExamenes/> }></Route>
        <Route path="/Examenes/Registro" element={ <RegistrarExamenes/> }></Route>
        <Route path="/Examenes/Registro/Detalle" element={ <ExamenDetalle/> }></Route>
        <Route path="/Medicamento" element={ <Medicamentos/> }></Route>
        <Route path="/UserProfile" element={ <UserProfile/>}></Route>
        <Route path="/SigIntegration" element={ <SigIntegration/>}></Route>
        <Route path="/Contraseña" element={ <Contraseña/> }></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
  
}


export default App;

