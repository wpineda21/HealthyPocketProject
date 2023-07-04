import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { show_Alerta } from "../functions";
import DatePicker from "react-datepicker";
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

const prueba = () => {
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
      settitle("Nueva Cita");
    } else if (op === 2) {
      settitle("Editar Cita");
      setid(id);
      setDescipcion(descripcion);
      settiempo_hos(tiempo_hos);
      setprecio(precio);
      setcode_cita(code_cita);
    }
  };

  const validar = async () => {
    var parametros;
    var metodo;

    if (descripcion === "") {
      show_Alerta("escripe el parametro correcto");
    } else if (tiempo_hos === "") {
      show_Alerta("escripe el parametro correcto");
    } else if (precio === "") {
      show_Alerta("escripe el parametro correcto");
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
        /*try {
                const response = await fetch(API_URL, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    descripcion,
                    fecha:"2012-05-18",
                    tiempo_hos,
                    precio,
                    code_user: localStorage.getItem("code_user"),
                  }),
                });
                console.log(JSON.stringify({
                    descripcion,
                    fecha,
                    tiempo_hos,
                    precio,
                    code_user: localStorage.getItem("code_user"),
                  }),)
                if (response.ok) {
                  //const data = await response.json();
                  console.log(response);
                  console.log("Nueva Cita Agregada Perfectamente");
                  //setokRegisterAlert(true);
                } else {
                  console.log("Error en el servidor:", response.status);
                  console.log(response);
                  // Establecer el estado de error de inicio de sesión
                }
              } catch (error) {
                console.log("error en el servidor:", error.message);
                console.log(error);
                // Establecer el estado de error de inicio de sesión
              }*/
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
        if (tipo === "success") {
          document.getElementById("btn-cerrar").click();
          getUsers();
        }
      })
      .catch(function (error) {
        show_Alerta("erorr en la solicitod", "error");
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
        if (tipo === "success") {
          document.getElementById("btn-cerrar").click();
          getUsers();
        }
      })
      .catch(function (error) {
        show_Alerta("erorr en la solicitod", "error");
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
    <div className="App">
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-md-4 offset-4">
            <div className="d-grid mx-auto">
              <button
                className="btn btn-dark"
                data-bs-toggle="modal"
                data-bs-target="#modalCitas"
                onClick={() => OpenModal(1)}
              >
                añadir nueva cita
              </button>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 col-lg-8 offset-0 offset-lg-2">
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>descripcion</th>
                    <th>fecha</th>
                    <th>cita2</th>
                    <th>cita2</th>
                    <th>
                      {" "}
                      <button
                        className="btn btn-primary"
                        onClick={() => recargar(true)}
                      >
                        Recargar
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {cita.map((citas, id) => (
                    <tr key={citas.id}>
                      <td>{id + 1}</td>
                      <td>{citas.descripcion}</td>
                      <td>{citas.fecha}</td>
                      <td>{citas.tiempo_hos}</td>
                      <td>${citas.precio}</td>
                      <td>${citas.code_cita}</td>
                      <td>
                        <button
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
                          className="btn btn-primary"
                        >
                          Editar
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-warning"
                          onClick={() => deleteCita(citas.id, citas.code_cita)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
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
                  placeholder="descripcion"
                  value={descripcion}
                  onChange={(e) => setDescipcion(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text"></span>
                <DatePicker
                  className="mb-4"
                  closeOnScroll={true}
                  selected={fecha}
                  onChange={(date) => setfecha(date)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text"></span>
                <input
                  type="text"
                  id="tiempo_hos"
                  className="form-control"
                  placeholder="tiempo_hos"
                  value={tiempo_hos}
                  onChange={(e) => settiempo_hos(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text"></span>
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
    </div>
  );
};

export default prueba;
