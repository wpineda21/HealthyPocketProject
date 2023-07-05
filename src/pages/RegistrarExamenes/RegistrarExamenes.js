import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { show_Alerta } from "../functions";
import Header from "../Header/Header";
import DatePicker from "react-datepicker";
import Button from "react-bootstrap/Button";
import logo from "../Header/logoNav.png";
import { Navigate } from "react-router-dom";
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
  MDBCardImage,
  MDBCardLink,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";

const RegistrarExamenes = (props) => {
  const Examenes_porCodigo = localStorage.getItem("code_cita2");

  const API_URL = "http://localhost:25060/api/examen/";
  const API_URL2 = `http://localhost:25060/api/examen/${Examenes_porCodigo}`;
  const API_URL3 = `http://localhost:25060/api/detalle`;

  const [Examenes, setExamenes] = useState([""]);
  const [code_exam, setcode_exam] = useState("");
  const [nombre, setnombre] = useState("");
  const [descripcion, Setdescipcion] = useState("");
  const [gasto, Setgasto] = useState("");
  const [hora, Sethora] = useState("");
  const [resultado, Setresultado] = useState("");
  const [code_det, Setcode_det] = useState("");

  const [id, setid] = useState();

  const [fecha, setfecha] = useState(new Date("05 October 2011 14:48 UTC"));

  const InfoModal = (id, code_exam) => {
    {
      window.localStorage.setItem("code_exam", code_exam);
    }
  };

  const VariableCodigoExamen = localStorage.getItem("code_exam");

  const getExamenes = async () => {
    const respuesta = await axios.get(API_URL2);
    setExamenes(respuesta.data);
  };

  useEffect(() => {
    getExamenes();
  }, []);

  const newExam = () => {};

  const validar = async () => {
    var parametros;

    var metodo;

    parametros = {
      code_cita: Examenes_porCodigo,
      nombre: nombre,
    };
    metodo = "POST";
    enviarSolicitu(metodo, parametros);
  };

  const GenerarDetalleExamen = (code_exam) => {
    var parametro2;
    var metodo2;
    parametro2 = {
      gasto: 0.0,
      descripcion: "vacio",
      fecha: "2023-01-01",
      hora: "00:00:00",
      resultado: "vacio",
      code_exam: code_exam,
    };
    metodo2 = "POST";
    enviarSolicitu2(metodo2, parametro2);
  };

  const enviarSolicitu = async (metodo, parametros) => {
    console.log(
      (parametros = {
        code_cita: Examenes_porCodigo,
        nombre: nombre,
      })
    );

    await axios({ method: metodo, url: API_URL, data: parametros })
      .then(function (respuesta) {
        var tipo = respuesta.data[0];
        var msj = respuesta.data[1];
        show_Alerta(msj, tipo);
        show_Alerta("Examen Agregado Correctamente");
        if (tipo === "success") {
          show_Alerta("Cita Agregada Correctamente");
          document.getElementById("btn-cerrar").click();
          getUsers();
        }
      })
      .catch(function (error) {
        show_Alerta("Error en la solicitod", "error");
        console.log(console.error());
      });
  };

  const enviarSolicitu2 = async (metodo, parametros) => {
    await axios({ method: metodo, url: API_URL3, data: parametros })
      .then(function (respuesta) {
        var tipo = respuesta.data[0];
        var msj = respuesta.data[1];
        console.log("se creo la onda vacio ");
      })
      .catch(function (error) {
        //show_Alerta("Error en la solicitod", "error");
        console.log(console.error());
      });
  };

  const enviarSolicitu3 = async (metodo, parametros) => {
    await axios({
      method: metodo,
      url: `http://localhost:25060/api/examen/${parametros.code_exam}`,
      data: parametros,
    })
      .then(function (respuesta) {
        var tipo = respuesta.data[0];
        var msj = respuesta.data[1];
        console.log("se creo la onda vacio ");
        show_Alerta("correcto");
      })
      .catch(function (error) {
        show_Alerta("Error servidor");
        //show_Alerta("Error en la solicitod", "error");
        console.log(console.error());
      });
  };

  const deleteExamen = (code_exam) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "Seguro que Quieres Este Examen?",
      icon: "question",
      text: "no se podra dar marcha atras",
      showCancelButton: true,
      confirmButtonText: "si, eliminar",
      cancelButtonText: "cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        enviarSolicitu3("DELETE", { code_exam });
      } else {
        show_Alerta("el producto no fue eliminado", "info");
      }
    });
  };

  const recargar = (reload) => {
    const reloa2 = reload;
    if (reloa2 === true) {
      location.reload(getExamenes);
    }
  };

  return (
    <>
      <Header></Header>
      <div className="container">
        <div className="row text-center pt-3 mt-3">
          <div className="col-md-4 offset-4">
            <div className="d-grid mx-auto">
              <h5>
                Registro de Examenes de la cita:
                <br></br>
                {localStorage.getItem("cita_nombre")}{" "}
              </h5>
              <h5>con fecha : {localStorage.getItem("cita_fecha")}</h5>
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
                    <th>Nombre Examen:</th>
                    <th></th>
                    <th>
                      <MDBBtn
                        className="btn btn-primary"
                        onClick={() => recargar(true)}
                      >
                        Recargar Pagina
                      </MDBBtn>
                    </th>
                    <th>
                      <MDBBtn
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#NewExam"
                        onClick={() => newExam()}
                      >
                        Agregar Examen a la cita
                      </MDBBtn>
                    </th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {Examenes.map((examen, id) => (
                    <tr key={examen.id}>
                      <td>{id + 1}</td>
                      <td>{examen.nombre}</td>
                      <td>
                        <MDBBtn
                          className="btn-back"
                          onClick={() => InfoModal(examen.id, examen.code_exam)}
                          href="http://localhost:3000/Examenes/Registro/Detalle"
                        >
                          Detalles del Examen
                        </MDBBtn>
                      </td>
                      <td>
                        <MDBBtn
                          className="btn btn-warning"
                          onClick={() => GenerarDetalleExamen(examen.code_exam)}
                          href="http://localhost:3000/Examenes/Registro/Detalle"
                        >
                          Generar Detalle Examen
                        </MDBBtn>
                      </td>
                      <td>
                        <MDBBtn
                          className="btn btn-danger"
                          onClick={() => deleteExamen(examen.code_exam)}
                        >
                          Eliminar Examen
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

      <div id="NewExam" className="modal fade" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <label className="h5">Agregar Examen a la Cita</label>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <label>Nombre del Examen:</label>
              <div className="input-group mb-3">
                <input
                  type="text"
                  id="tiempo_hos"
                  className="form-control"
                  placeholder="Nombre del Examen"
                  value={nombre}
                  onChange={(e) => setnombre(e.target.value)}
                />
              </div>
              <div className="d-grid col-6 mx-auto">
                <button className="btn btn-success" onClick={() => validar()}>
                  Guardar
                </button>
              </div>
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

export default RegistrarExamenes;
