import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { show_Alerta } from "../functions";
import Header from "../Header/Header";
import DatePicker from "react-datepicker";
import Button from "react-bootstrap/Button";

import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardHeader,
  MDBCardFooter,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
} from "mdb-react-ui-kit";

const Medicamentos = () => {
    const codigo_recta = "1e925aaa-6923-4216-a917-d78a39150475";
    const API_URL2 =  `http://localhost:25060/api/medicamento/${codigo_recta}`;

    const API_URL ="http://localhost:25060/api/medicamento";

    const [medicamentos,setmedicamentos]=useState([]);
    const [cita, setmedicamentos2] = useState([]);

    const [code_cita, setcode_cita] = useState("");


    useEffect(() => {
        getmedicamentos();
      }, []);
    
      const getmedicamentos = async () => {
        const respuesta = await axios.get(API_URL2);
        setmedicamentos(respuesta.data);
        console.log(respuesta.data);
      };



  return (
    <div>
      <Header></Header>
      <div className="container">
        <div className="row text-center pt-3 mt-3">
          <div className="col-md-4 offset-4">
            <div className="d-grid mx-auto">
              <h1>Medicamentos de {localStorage.getItem("usuario")}</h1>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-6"></div>
          <MDBCard alignment="center">
            <MDBCardBody>
              <MDBTable responsive>
                <MDBTableHead className="back-table">
                  <tr>
                    <th>#</th>
                    <th>Nombre Medicamento</th>
                    <th>Hora Designada</th>
                    <th>cantidad</th>
                    <th></th>
                    <th>
                      {" "}
                      <button
                        className="btn btn-primary"
                        onClick={() => recargar(true)}
                      >
                        Recargar Citas
                      </button>
                    </th>
                    <th scope="col">
                      <MDBBtn
                        data-bs-toggle="modal"
                        data-bs-target="#modalCitas"
                        onClick={() => OpenModal(1)}
                      >
                        Agregar Nueva Cita
                      </MDBBtn>
                    </th>
                    <th></th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {medicamentos.map((medicamentos2, id) => (
                    <tr key={medicamentos2.id}>
                      <td>{id + 1}</td>
                      <td>{medicamentos2.descripcion}</td>
                      <td>{medicamentos2.hora}</td>
                      <td>{medicamentos2.cantidad}</td>
                      <td></td>
                      <td>
                        <MDBBtn
                          data-bs-toggle="modal"
                          data-bs-target="#modalCitas"
                          onClick={() =>
                            OpenModal(
                              2,
                              medicamentos2.id,
                              medicamentos2.descripcion,
                              medicamentos2.hora,
                              medicamentos2.cantidad,
                            )
                          }
                          className="btn-back"
                        >
                          Editar
                        </MDBBtn>
                      </td>
                      <td>
                        <MDBBtn
                          className="btn btn-danger"
                        >
                          Eliminar
                        </MDBBtn>
                      </td>
                    </tr>
                  ))}
                </MDBTableBody>
              </MDBTable>
            </MDBCardBody>
            <MDBCardFooter className="back-table-head">
              "Vive Feliz, Vive Sano , Vive Healthy Pocket "
            </MDBCardFooter>
          </MDBCard>
        </div>
      </div>
    </div>
  )
}

export default Medicamentos
