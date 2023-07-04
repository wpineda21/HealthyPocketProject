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
  const API_URL2 = `http://localhost:25060/api/medicamento/${codigo_recta}`;

  const API_URL = "http://localhost:25060/api/medicamento";

  const [medicamentos, setmedicamentos] = useState([]);
  const [cita, setmedicamentos2] = useState([]);
  const [id, setid] = useState();
  const [code_cita, setcode_cita] = useState("");
  const [Descripcion, setDescipcion] = useState("");
  const [hora, sethora] = useState("");
  const [cantidad, setcantidad] = useState("");
  const [operation, setOperation] = useState(1);
  const [title, settitle] = useState("");
  const [code_rcta, setcode_rcta] = useState("");
  const [code_medca, setcode_medca] = useState("");

  useEffect(() => {
    getmedicamentos();
  }, []);

  const getmedicamentos = async () => {
    const respuesta = await axios.get(API_URL);
    setmedicamentos(respuesta.data);
    console.log(respuesta.data);
  };

  const recargar = (reload) => {
    const reloa2 = reload;
    if (reloa2 === true) {
      location.reload(getmedicamentos);
    }
  };

  const OpenModal = (
    op,
    id,
    descripcion,
    hora,
    cantidad,
    code_rcta,
    code_medca
  ) => {
    setid("");
    setDescipcion("");
    sethora("");
    setcantidad("");
    setOperation(op);
    setcode_rcta(codigo_recta);
    if (op === 1) {
      settitle("Nueva Medicamento");
    } else if (op === 2) {
      settitle("Editar Medicamento");
      setid(id);
      setDescipcion(descripcion);
      sethora(hora);
      setcantidad(cantidad);
      setcode_rcta(code_rcta);
      setcode_medca(code_medca);
    }
  };

  const validar = async () => {
    var parametros;
    var metodo;
    if (operation === 1) {
      parametros = {
        descripcion: Descripcion,
        hora: hora,
        cantidad: cantidad,
        code_rcta: code_rcta,
      };
      console.log(parametros);
      metodo = "POST";

      enviarSolicitu(metodo, parametros);
    }
    if (operation === 2) {
      parametros = {
        descripcion: Descripcion,
        hora: hora,
        cantidad: cantidad,
        code_rcta: code_rcta,
      };
      metodo = "PUT";
      enviarSolicitu2(metodo, parametros);
    }
  };

  const enviarSolicitu = async (metodo, parametros) => {
    await axios({ method: metodo, url: API_URL, data: parametros })
      .then(function (respuesta) {
        var tipo = respuesta.data[0];
        var msj = respuesta.data[1];
        show_Alerta(msj, tipo);
        show_Alerta("Medicamento Agregado");
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
    await axios({
      method: metodo,
      url: `http://localhost:25060/api/medicamento/${code_medca}`,
      data: parametros,
    })
      .then(function (respuesta) {
        var tipo = respuesta.data[0];
        var msj = respuesta.data[1];
        show_Alerta(msj, tipo);
        show_Alerta("Medicamento Editado Correctamente");
        if (tipo === "success") {
          show_Alerta("Cita Editada Correctamente");
          document.getElementById("btn-cerrar").click();
          getUsers();
        }
      })
      .catch(function (error) {
        show_Alerta("Error en la solicitod", "error");
        console.log(console.error());
      });
  };

  const deleteCita = (id, code_medca) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "Seguro que Quieres eliminar esta cita?",
      icon: "question",
      text: "no se podra dar marcha atras",
      showCancelButton: true,
      confirmButtonText: "si, eliminar",
      cancelButtonText: "cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setid(id);
        enviarSolicitu2("DELETE", { code_medca });
      } else {
        show_Alerta("el producto no fue eliminado", "info");
      }
    });
  };

  return (
    <>
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
                        Recargar Medicamento
                      </button>
                    </th>
                    <th scope="col">
                      <MDBBtn
                        data-bs-toggle="modal"
                        data-bs-target="#modalCitas"
                        onClick={() => OpenModal(1)}
                      >
                        Agregar Nuevo Medicamento
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
                              medicamentos2.code_rcta,
                              medicamentos2.code_medca
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
                          onClick={() =>
                            deleteCita(
                              medicamentos2.id,
                              medicamentos2.code_medca
                            )
                          }
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

      <div id="modalCitas" className="modal fade" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <label className="h5">{title}</label>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input type="hidden" id="id"></input>
              <div className="input-group mb-3">
                <span className="input-group-text"></span>
                <input
                  type="text"
                  id="descripcion"
                  className="form-control"
                  placeholder="Descripcion"
                  value={Descripcion}
                  onChange={(e) => setDescipcion(e.target.value)}
                />
              </div>
              <div className="input-group mb-3 m-0">
                <span className="input-group-text"></span>
                <input
                  type="text"
                  id="precio"
                  className="form-control"
                  placeholder="Cantidad Medicamento"
                  value={cantidad}
                  onChange={(e) => setcantidad(e.target.value)}
                />
              </div>
              <div className="input-group mb-4">
                <label className="m-2">Hora Medicamento</label>
                <input
                  type="time"
                  id="appt"
                  required
                  value={hora}
                  onChange={(e) => sethora(e.target.value)}
                />
              </div>
              <div className="d-grid col-6 mx-auto">
                <button onClick={() => validar()} className="btn btn-success">
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Medicamentos;
