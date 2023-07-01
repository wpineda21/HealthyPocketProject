import React from "react";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login/Login';
import Header from "./pages/Header/Header";
import SHeader from "./pages/SimpleHeader/SHeader";
import Home from "./pages/HomePage/HomePage";
import UserPage from "./pages/UserPage/UserPage";
import Citas from "./pages/CitaPage/CitaPage";
import SearchComponent from "./Component/SearchComponent";
import ExamRegistration from "./pages/Exampage/ExamPage";
import MedicationSchedule from "./pages/Medicamen/Medicament";



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
        <Route path="/Citas2" element={ <SearchComponent/> }></Route>
        <Route path="/Exam" element={ <ExamRegistration/> }></Route>
        <Route path="/Medicamento" element={ <MedicationSchedule/> }></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

