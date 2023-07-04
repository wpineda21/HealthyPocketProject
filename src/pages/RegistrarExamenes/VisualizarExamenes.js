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
import { Navigate } from "react-router-dom";

const VisualizarExamenes = (props) => {
  const CitasUsuario = localStorage.getItem("code_user");
  const API_URL2 = `http://localhost:25060/api/cita/${CitasUsuario}`;

  const [cita, setcitas] = useState([]);

  const [id, setid] = useState();
  const [descripcion, setDescipcion] = useState("");
  const [fecha, setfecha] = useState(new Date("05 October 2011 14:48 UTC"));
  const [precio, setprecio] = useState("");

  const [code_cita, setcode_cita] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const respuesta = await axios.get(API_URL2);
    setcitas(respuesta.data);
    console.log(respuesta.data);
  };

  const enviarCodigo = (id, code_cita, descripcion, fecha) => {
    setid(id);
    setcode_cita(code_cita);
    setDescipcion(descripcion);
    setfecha(fecha);
    console.log(id);
    console.log(code_cita);
    console.log(descripcion);
    console.log(fecha);
    {
      window.localStorage.setItem("code_cita2", code_cita);
    }
    {
      window.localStorage.setItem("cita_nombre", descripcion);
    }
    {
      window.localStorage.setItem("cita_fecha", fecha);
    }
  };

  const InfoModal = () => {};

  return (
    <>
      <Header></Header>

      <div className="container">
        <div className="row text-center pt-3 mt-3">
          <div className="col-md-4 offset-4">
            <div className="d-grid mx-auto">
              <h1>Citas</h1>
              <MDBBtn
                className="btn-back"
                data-bs-toggle="modal"
                data-bs-target="#InfoModal"
                onClick={() => InfoModal()}
              >
                Informacion
              </MDBBtn>
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
                    <th>Descripcion/Nombre Cita</th>
                    <th>Fecha de La cita</th>
                    <th>Ver Examenes por cita</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {cita.map((citas, id) => (
                    <tr key={citas.id}>
                      <td>{id + 1}</td>
                      <td>{citas.descripcion}</td>
                      <td>{citas.fecha}</td>
                      <td>
                        <MDBBtn
                          className="btn-back"
                          onClick={() =>
                            enviarCodigo(
                              citas.id,
                              citas.code_cita,
                              citas.descripcion,
                              citas.fecha
                            )
                          }
                          href="/Examenes/Registro"
                        >
                          Examenes
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

      <div id="InfoModal" className="modal fade" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <label className="h5">Informacion</label>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <label>
                En Esta Pagina Se muestran Todas tus Citas, Si Deseas Visualizar
                Los Examenes Por cada Cita por favor Selecciona el Boton de
                "Examenes", se te reedigira a una pagina con los Examenes de esa
                Cita.
                <br />
                <br />
                "Gracias Por Confiar en Healthy Pocket"
              </label>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VisualizarExamenes;
