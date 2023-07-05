import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { show_Alerta } from "../functions";
import Header from "../Header/Header";
import DatePicker from "react-datepicker";
import Button from "react-bootstrap/Button";
import "./citaPage.css";
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

const Citas = (props) => {
  const CitasUsuario = localStorage.getItem("code_user");
  const API_URL = "http://localhost:25060/api/cita/";
  const API_URL2 = `http://localhost:25060/api/cita/${CitasUsuario}`;
  //const API_URL3 = `http://localhost:25060/api/cita/${CitasUsuario}`;

  const [cita, setcitas] = useState([]);

  const [id, setid] = useState();
  const [descripcion, setDescipcion] = useState("");
  const [fecha, setfecha] = useState(new Date("05 October 2011 14:48 UTC"));
  //const[fecha,setfecha]=useState("2012-05-15");
  const [tiempo_hos, settiempo_hos] = useState("");
  const [precio, setprecio] = useState("");

  const [code_cita, setcode_cita] = useState("");

  const [operation, setOperation] = useState(1);
  const [title, settitle] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const respuesta = await axios.get(API_URL2);
    setcitas(respuesta.data);
    console.log(respuesta.data);
  };

  const OpenModal = (
    op,
    id,
    descripcion,
    fecha,
    tiempo_hos,
    precio,
    code_cita
  ) => {
    setid("");
    setDescipcion("");
    setfecha("");
    settiempo_hos("");
    setprecio("");
    setOperation(op);
    if (op === 1) {
      settitle("Nueva Cita Medica");
    } else if (op === 2) {
      settitle("Editar Cita");
      setid(id);
      setDescipcion(descripcion);
      settiempo_hos(tiempo_hos);
      setprecio(precio);
      setcode_cita(code_cita);
      console.log(code_cita);
    }
  };

  const validar = async () => {
    var parametros;
    var metodo;

    if (descripcion === "") {
      show_Alerta("Rellena Todos Los Campos Por Favor");
    } else if (tiempo_hos === "") {
      show_Alerta("Rellena Todos Los Campos Por Favor");
    } else if (precio === "") {
      show_Alerta("Rellena Todos Los Campos Por Favor");
    } else {
      if (operation === 1) {
        parametros = {
          descripcion: descripcion,
          fecha: fecha,
          tiempo_hos: tiempo_hos,
          precio: precio,
          code_user: localStorage.getItem("code_user"),
        };
        console.log(parametros);
        metodo = "POST";

        enviarSolicitu(metodo, parametros);
      }
      if (operation === 2) {
        parametros = {
          descripcion: descripcion,
          fecha: fecha,
          tiempo_hos: tiempo_hos,
          precio: precio,
          code_user: localStorage.getItem("code_user"),
          code_cita: code_cita,
        };
        metodo = "PUT";
        enviarSolicitu2(metodo, parametros);
      }
    }
  };

  const enviarSolicitu = async (metodo, parametros) => {
    await axios({ method: metodo, url: API_URL, data: parametros })
      .then(function (respuesta) {
        var tipo = respuesta.data[0];
        var msj = respuesta.data[1];
        show_Alerta(msj, tipo);
        show_Alerta("Cita Agregada Correctamente");
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
      url: `http://localhost:25060/api/cita/${parametros.code_cita}`,
      data: parametros,
    })
      .then(function (respuesta) {
        var tipo = respuesta.data[0];
        var msj = respuesta.data[1];
        show_Alerta(msj, tipo);
        show_Alerta("Cita Editada Correctamente");
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

  const deleteCita = (id, code_cita) => {
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
        enviarSolicitu2("DELETE", { code_cita });
      } else {
        show_Alerta("el producto no fue eliminado", "info");
      }
    });
  };

  const recargar = (reload) => {
    const reloa2 = reload;
    if (reloa2 === true) {
      location.reload(getUsers);
    }
  };

  return (
    <>
      <Header></Header>

      <div className="container">
        <div className="row text-center pt-3 mt-3">
          <div className="col-md-4 offset-4">
            <div className="d-grid mx-auto">
              <h1>Citas de {localStorage.getItem("usuario")}</h1>
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
                    <th>Descripcion</th>
                    <th>Fecha de La cita</th>
                    <th>Dias en el Hospital</th>
                    <th>Precio Cita</th>
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
                  {cita.map((citas, id) => (
                    <tr key={citas.id}>
                      <td>{id + 1}</td>
                      <td>{citas.descripcion}</td>
                      <td>{citas.fecha}</td>
                      <td>{citas.tiempo_hos}</td>
                      <td>$  {citas.precio}</td>
                      <td></td>
                      <td>
                        <MDBBtn
                          data-bs-toggle="modal"
                          data-bs-target="#modalCitas"
                          onClick={() =>
                            OpenModal(
                              2,
                              citas.id,
                              citas.descripcion,
                              citas.fecha,
                              citas.tiempo_hos,
                              citas.precio,
                              citas.code_cita
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
                          onClick={() => deleteCita(citas.id, citas.code_cita)}
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
              <label>Descripcion:</label>
              <div className="input-group mb-3">
                <input
                  type="text"
                  id="descripcion"
                  className="form-control"
                  placeholder="descripcion"
                  value={descripcion}
                  onChange={(e) => setDescipcion(e.target.value)}
                />
              </div>
              <label>Fecha Que Se Realizo El Examen:</label>
              <div className="input-group mb-1">
                <DatePicker
                  className="mb-3"
                  closeOnScroll={true}
                  selected={fecha}
                  onChange={(date) => setfecha(date)}
                />
              </div>
              <label>Dias Que Estuvo En El Hospital:</label>
              <div className="input-group mb-3">
                <input
                  type="text"
                  id="tiempo_hos"
                  className="form-control"
                  placeholder="tiempo_hos"
                  value={tiempo_hos}
                  onChange={(e) => settiempo_hos(e.target.value)}
                />
              </div>
              <label>Costo del Examen ($):</label>
              <div className="input-group mb-3">
                <input
                  type="text"
                  id="precio"
                  className="form-control"
                  placeholder="precio"
                  value={precio}
                  onChange={(e) => setprecio(e.target.value)}
                />
              </div>
              <div className="d-grid col-6 mx-auto">
                <button onClick={() => validar()} className="btn btn-success">
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

export default Citas;
