import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import logo from "../Header/logoNav.png";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
  //-------------Variable CLAVE para el manejo de Informacion de la Entidad Usuario-------
  const CitasUsuario = localStorage.getItem("code_user");

  //-------------URL de la API-------------------------
  const API_URL = "http://localhost:25060/api/cita/";

  //-------------Variables Importantes-------------------------
  const [citas, setcitas] = useState([]);
  const [searche, setSearch] = useState([]);
  const [staticModal, setStaticModal] = useState(false);
  const [Modal2, setModal2] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [CitaDeleteIndex, setCitaDeleteIndex] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);

  //-------------Variables donde se Setean los Atributos de la Entidad Usuario-------------------------
  const [descripcion, setDescipcion] = useState("");
  const [fecha, setfecha] = useState(new Date());
  const [tiempo_hos, settiempo_hos] = useState("");
  const [precio, setprecio] = useState("");

  const handleEditExam = (index) => {
    setEditIndex(index);
    setcitas({ ...citas[index] });
    setShowModal(true);
  };

  const [registerError, setRegisterError] = useState(false);
  const [okRegisterAlert, setokRegisterAlert] = useState(false);

  //-------------estos evenctos Los Ocupa El Modal-------------------------
  const handleCalendarClose = () => console.log("Calendar closed");
  const handleCalendarOpen = () => console.log("Calendar opened");

  const toggleShow = () => setStaticModal(!staticModal);

  const toggleShow2 = () => setModal2(!Modal2);

  const handleDeleteExam = (index) => {
    setCitaDeleteIndex(index);
    setShowDeleteConfirmation(true);
  };
  const confirmDeleteExam = () => {
    const citasUpdate = [...citas];
    citasUpdate.splice(setCitaDeleteIndex, 1);
    setcitas(citasUpdate);
    setShowDeleteConfirmation(false);
  };

  //------------Variables que se guardan en el local Storage------------------------
  console.log(localStorage.getItem("form12"));
  console.log(localStorage.getItem("usuario"));

  //------------------------Metodo Get Provisional------------------------------------------
  const showData = async (e) => {
    //if (e && e.preventDefault) { e.preventDefault(); }
    const response = await fetch(
      `http://localhost:25060/api/cita/${CitasUsuario}`
    );
    const data = await response.json();
    console.log(data);
    setcitas(data);
  };
  useEffect(() => {
    showData();
  }, []);

  //--------------------------Metodo Post Para Registo De Citas----------------------------------
  const handleSubmit = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    try {
      location.reload(showData);
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          descripcion,
          fecha,
          tiempo_hos,
          precio,
          code_user: localStorage.getItem("code_user"),
        }),
      });

      if (response.ok) {
        //const data = await response.json();
        console.log("Nueva Cita Agregada Perfectamente");
        //setokRegisterAlert(true);
      } else {
        console.log("Error en el servidor:", response.status);
        // Establecer el estado de error de inicio de sesión
      }
    } catch (error) {
      console.log("Error en el servidor:", error.message);
      // Establecer el estado de error de inicio de sesión
    }
  };
  
//--------------------------Metodo Actualizar Para Registo De Citas----------------------------------
  const Actualizar = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    try {
      location.reload(showData);
      const response = await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          descripcion,
          fecha,
          tiempo_hos,
          precio,
          code_user: localStorage.getItem("code_user"),
        }),
      });

      if (response.ok) {
        //const data = await response.json();
        console.log(" Cita Modificada Perfectamente");
        //setokRegisterAlert(true);
      } else {
        console.log("Error en el servidor:", response.status);
        // Establecer el estado de error de inicio de sesión
      }
    } catch (error) {
      console.log("Error en el servidor:", error.message);
      // Establecer el estado de error de inicio de sesión
    }
  };

  return (
    <>
      <Header></Header>

{/*-----------Pagina Principal de LAs Citas----------------------------*/}
      <div className="Container">
        <div className="row text-center pt-3">
          <div>
            <h1>Citas de {localStorage.getItem("usuario")}</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-2"></div>
          <div className="col-8">
            <MDBCard alignment="center">
              <MDBCardBody>
                <MDBTable className="table-responsive">
                  <MDBTableHead className="back-table ">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Descripcion</th>
                      <th scope="col">fecha</th>
                      <th scope="col">Dias en El Hospital</th>
                      <th scope="col">precio</th>
                      <th scope="col">
                        <MDBBtn onClick={toggleShow}>Agregar Nueva Cita</MDBBtn>
                      </th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {citas.map((cita2, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{cita2.descripcion}</td>
                        <td>{cita2.fecha}</td>
                        <td>{cita2.tiempo_hos}</td>
                        <td>$ {cita2.precio}</td>
                        <td>
                        <MDBBtn className="btn-back ml-5" onClick={() => handleEditExam(index)}> Modificar </MDBBtn>
                          <Button
                            variant="danger"
                            onClick={() => handleDeleteExam(index)}
                          >
                            Eliminar
                          </Button>
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
          <div className="col-2"></div>
        </div>
      </div>

{/*-----------Modal donde esta el Formulario para Agregar una Nueva Cita----------------------------*/}
      <MDBModal
        staticBackdrop
        tabIndex="-1"
        show={staticModal}
        setShow={setStaticModal}
        onSubmit={handleSubmit}
      >
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Agregar Una Nueva Cita</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <form>
                <MDBInput
                  className="mb-4"
                  type="text"
                  id="form1Example1"
                  label="Descripcion"
                  value={descripcion}
                  onChange={(e) => setDescipcion(e.target.value)}
                />
                Seleccionar Fecha
                <DatePicker
                  className="mb-4"
                  closeOnScroll={true}
                  selected={fecha}
                  onChange={(date) => setfecha(date)}
                />
                <MDBInput
                  className="mb-4"
                  type="text"
                  id="form1Example3"
                  label="Tiempo En El Hospital"
                  value={tiempo_hos}
                  onChange={(e) => settiempo_hos(e.target.value)}
                />
                <MDBInput
                  className="mb-4"
                  type="text"
                  id="form1Example2"
                  label=" $ Costo de la Consulta"
                  value={precio}
                  onChange={(e) => setprecio(e.target.value)}
                />
                <MDBBtn
                  className="btn-back"
                  type="submit"
                  onClick={() => handleSubmit("submit")}
                >
                  Guardar
                </MDBBtn>
              </form>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn className="btn-back" onClick={toggleShow}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

{/*-----------Modal Para Confiramcion de Eliminacion de Cita----------------------------*/}
      <Modal
        show={showDeleteConfirmation}
        onHide={() => setShowDeleteConfirmation(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Estás seguro de que quieres eliminar este Examen?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteConfirmation(false)}
          >
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmDeleteExam}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

{/*-----------  Modal Modificar Datos y asi  ----------------------------*/}
      <MDBModal
        staticBackdrop
        tabIndex="-1"
        show={Modal2}
        setShow={setModal2}
        onSubmit={Actualizar}
      >
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Modificar Cita</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow2}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
            <form>
            {citas.map((cita2, index) => (
                      <tr key={index}>
                        <MDBInput
                          className="mb-4"
                          type="text"
                          id="form1Example1"
                          label="Descripcion"
                          value={cita2.descripcion}
                          onChange={(e) => setDescipcion(e.target.value)}
                        />
                        Seleccionar Fecha
                        <DatePicker
                          className="mb-4"
                          closeOnScroll={true}
                          value={cita2.fecha}
                          onChange={(date) => setfecha(date)}
                        />
                          <MDBInput
                          className="mb-4"
                          type="text"
                          id="form1Example3"
                          label="Tiempo En El Hospital"
                          value={cita2.tiempo_hos}
                          onChange={(e) => settiempo_hos(e.target.value)}
                        />
                          <MDBInput
                          className="mb-4"
                          type="text"
                          id="form1Example2"
                          label=" $ Costo de la Consulta"
                          value={cita2.precio}
                          onChange={(e) => setprecio(e.target.cita2.precio)}
                        />
                      </tr>
                      ))}
                  <MDBBtn
                  className="btn-back"
                  type="submit"
                  onClick={() => handleSubmit("submit")}
                >
                  Guardar
                </MDBBtn>
              </form>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn className="btn-back" onClick={toggleShow2}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default Citas;
