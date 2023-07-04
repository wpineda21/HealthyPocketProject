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
import TimePicker from "react-time-picker";
import "./ExamenDetalle.css";
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

const ExamenDetalle = () => {
  const [Details, SetDetails] = useState([""]);
  const [id, Setid] = useState("");
  const [descripcion, Setdescipcion] = useState("");
  const [fecha, Setfecha] = useState(new Date("05 October 2011 14:48 UTC"));
  const [gasto, Setgasto] = useState("");
  const [hora, Sethora] = useState("");
  const [resultado, Setresultado] = useState("");
  const [code_det, Setcode_det] = useState("");

  const VariableCodigoExamen = localStorage.getItem("code_exam");

  const API_URL = `http://localhost:25060/api/detalle/${VariableCodigoExamen}`;

  const getDetails = async () => {
    const respuesta = await axios.get(API_URL);
    SetDetails(respuesta.data);
    console.log(respuesta.data);
  };
  useEffect(() => {
    getDetails();
  }, []);

  const ModalDetalle = (
    id,
    descripcion,
    fecha,
    gasto,
    hora,
    resultado,
    code_det
  ) => {
    Setid(id),
      Setdescipcion(descripcion),
      Setgasto(gasto),
      Sethora(hora),
      Setresultado(resultado),
      Setcode_det(code_det);
  };

  const validar = async () => {
    var parametros;
    var metodo;

    parametros = {
      descripcion: descripcion,
      fecha: fecha,
      gasto: gasto,
      hora: hora,
      resultado: resultado,
      code_exam: VariableCodigoExamen,
      code_det: code_det,
    };
    metodo = "PUT";
    enviarSolicitu2(metodo, parametros);
  };

  const enviarSolicitu2 = async (metodo, parametros) => {
    await axios({
      method: metodo,
      url: `http://localhost:25060/api/detalle/${parametros.code_det}`,
      data: parametros,
    })
      .then(function (respuesta) {
        var tipo = respuesta.data[0];
        var msj = respuesta.data[1];
        show_Alerta(msj, tipo);
        show_Alerta("Realizado con Exito");
        if (tipo === "success") {
          show_Alerta("Realizado con Exito");
          document.getElementById("btn-cerrar").click();
          getUsers();
        }
      })
      .catch(function (error) {
        show_Alerta("Error en la solicitod", "error");
        console.log(console.error());
      });
  };

  const deletedetalle = (id, code_det) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "Seguro que Quieres eliminar este detalle de Examen?",
      icon: "question",
      text: "no se podra dar marcha atras",
      showCancelButton: true,
      confirmButtonText: "si, eliminar",
      cancelButtonText: "cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Setid(id);
        enviarSolicitu2("DELETE", { code_det });
      } else {
        show_Alerta("el producto no fue eliminado", "info");
      }
    });
  };

  return (
    <>
      <Header></Header>
      <div>
        <div className="container-fluid">
          <div className="row text-center pt-3 mt-3">
            <div className="col-4"></div>
            <div className="col-4">
              <div className="">
                <h5>Detalles del examen :</h5>
              </div>
              <div></div>
            </div>
            <div className="col-4"></div>
          </div>

          <div className="row mt-1">
            <div className="col-2"></div>
            <div className="col-8">
              <MDBCard alignment="center" className="container-fluid ">
                <MDBCardBody className="">
                  <MDBBtn
                    className="btn btn-back mb-2"
                    href="http://localhost:3000/Examenes/Registro/"
                  >
                    Regresar a Examenes
                  </MDBBtn>
                  <MDBListGroup flush>
                    {Details.map((detail, id) => (
                      <tr key={detail.id}>
                        <MDBListGroupItem>
                          Descripcion del examen: {detail.descripcion}
                        </MDBListGroupItem>
                        <MDBListGroupItem>
                          fecha que se realizo el examen: {detail.fecha}
                        </MDBListGroupItem>
                        <MDBListGroupItem>
                          Costo del Examen: $ {detail.gasto}
                        </MDBListGroupItem>
                        <MDBListGroupItem>
                          Hora que Se Realizo el Examen: {detail.hora}
                        </MDBListGroupItem>
                        <MDBListGroupItem>
                          Resultado: {detail.resultado}
                        </MDBListGroupItem>
                        <MDBBtn
                          data-bs-toggle="modal"
                          data-bs-target="#ModalDetalle"
                          className="btn btn-warning m-3"
                          onClick={() =>
                            ModalDetalle(
                              detail.id,
                              detail.descripcion,
                              detail.fecha,
                              detail.gasto,
                              detail.hora,
                              detail.resultado,
                              detail.code_det
                            )
                          }
                        >
                          Modificar Detalle del Examen
                        </MDBBtn>
                        <MDBBtn
                          className="btn btn-danger m-3"
                          onClick={() =>
                            deletedetalle(detail.id, detail.code_det)
                          }
                        >
                          Eliminar Examen
                        </MDBBtn>
                      </tr>
                    ))}
                  </MDBListGroup>
                </MDBCardBody>
                <MDBCardFooter className="back-table-head">
                  "Vive Feliz, Vive Sano , Vive Healthy Pocket "
                </MDBCardFooter>
              </MDBCard>
            </div>
            <div className="col-2"> </div>
          </div>
        </div>
      </div>

      <div
        id="ModalDetalle"
        className="modal fade"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalScrollableTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-dialog">
              <label className="h5">Modificar Detalle de Examen</label>
            </div>
            <div className="modal-body">
              <input type="hidden" id="id"></input>
              <div className="input-group mb-3">
                <input
                  type="text"
                  id="descripcion"
                  className="form-control"
                  placeholder="descripcion"
                  value={descripcion}
                  onChange={(e) => Setdescipcion(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <DatePicker
                  className="mb-4"
                  closeOnScroll={true}
                  selected={fecha}
                  onChange={(date) => Setfecha(date)}
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  id="tiempo_hos"
                  className="form-control"
                  placeholder="gasto"
                  value={gasto}
                  onChange={(e) => Setgasto(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="time"
                  id="appt"
                  required
                  value={hora}
                  onChange={(e) => Sethora(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  id="tiempo_hos"
                  className="form-control"
                  placeholder="resultado"
                  value={resultado}
                  onChange={(e) => Setresultado(e.target.value)}
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
    </>
  );
};

export default ExamenDetalle;
