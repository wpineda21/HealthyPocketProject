import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Header from "../Header/Header";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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

const ExamRegistration = () => {
  //-------------Variable CLAVE para el manejo de Informacion de la Entidad Usuario-------
  const CitasUsuario = localStorage.getItem("code_user");

  //-------------URL de la API-------------------------
  const API_URL = "http://localhost:25060/api/cita/";

  const [exam, setExam] = useState([]);

  const [citas, setcitas] = useState([]);

  const [newExam, setNewExam] = useState({
    name: "",
    date: null,
    description: "",
    tiempo_hos: "",
    precio: "",
    selectedDate: null,
  });

  const [editIndex, setEditIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [examToDeleteIndex, setExamToDeleteIndex] = useState(null);

  const [descripcion, setDescipcion] = useState("");
  const [fecha, setfecha] = useState(new Date());
  const [tiempo_hos, settiempo_hos] = useState("");
  const [precio, setprecio] = useState("");

  const handleInputChange = (event) => {
    if (event.target.name === "date") {
      setNewExam({
        ...newExam,
        date: event.target.value,
        selectedDate: new Date(event.target.value),
        descripcion: event.target.value,
        precio: event.target.value,
        tiempo_hos: event.target.value,
      });
    } else {
      setNewExam({ ...newExam, [event.target.name]: event.target.value });
    }
  };

  const toggleShow = () => setStaticModal(!staticModal);

  const handleDateChange = (date) => {
    setNewExam({ ...newExam, selectedDate: date });
  };

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleAddExam = () => {
    if (newExam.name && newExam.selectedDate) {
      if (editIndex !== null) {
        const updatedExam = [...exam];
        updatedExam[editIndex] = { ...newExam };
        setExam(updatedExam);
        setNewExam({
          name: "",
          descripcion: "",
          date: null,
          description: "",
          tiempo_hos: "",
          precio: "",
          selectedDate: null,
        });
        setShowModal(false);
        setEditIndex(null);
      } else {
        setExam([...exam, { ...newExam }]);
        setNewExam({
          name: "",
          descripcion: "",
          date: null,
          description: "",
          tiempo_hos: "",
          precio: "",
          selectedDate: null,
        });
        setShowModal(false);
      }
    }
  };

  const handleEditExam = (index) => {
    setEditIndex(index);
    setNewExam({ ...exam[index] });
    setShowModal(true);
  };

  const handleDeleteExam = (index) => {
    setExamToDeleteIndex(index);
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteExam = () => {
    const updatedExam = [...exam];
    updatedExam.splice(examToDeleteIndex, 1);
    setExam(updatedExam);
    setShowDeleteConfirmation(false);
  };

  const closeModal = () => {
    setNewExam({
      name: "",
      date: null,
      descripcion: "",
      description: "",
      selectedDate: null,
    });
    setShowModal(false);
    setEditIndex(null);
  };

  // Filtrado por nombre
  const filteredExam = exam.filter((exam) =>
    exam.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;

  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = filteredExam.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredExam.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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

  return (
    <div>
      <Header />
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
                <Form.Group controlId="formSearch" className="mb-5">
                  <Form.Control
                    type="text"
                    placeholder="Buscar por nombre"
                    value={searchText}
                    onChange={handleSearchTextChange}
                  />
                </Form.Group>

                <MDBTable className="table-responsive">
                  <MDBTableHead className="back-table ">
                    <tr>
                      <th scope="col">Descripcion</th>
                      <th scope="col">fecha</th>

                      <th scope="col">Dias en El Hospital</th>

                      <th scope="col">precio</th>
                      <th scope="col"></th>
                      <th scope="col">
                        <MDBBtn onClick={() => setShowModal(true)}>
                          Agregar Nueva Cita
                        </MDBBtn>
                      </th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {currentItems.map((exam, index) => (
                      <tr key={index}>
                        <td>{exam.name}</td>
                        <td>
                          {exam.selectedDate
                            ? exam.selectedDate.toDateString()
                            : ""}
                        </td>
                        <td>{exam.tiempo_hos}</td>
                        <td>{exam.precio}</td>
                        <td>
                          <MDBBtn
                            className="btn-back ml-5"
                            onClick={() => handleEditExam(index)}
                          >
                            {" "}
                            Modificar{" "}
                          </MDBBtn>
                        </td>
                        <td>
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

                {filteredExam.length > itemsPerPage && (
                  <div className="pagination">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (number) => (
                        <Button
                          key={number}
                          variant={
                            currentPage === number
                              ? "primary"
                              : "outline-primary"
                          }
                          onClick={() => handlePageChange(number)}
                        >
                          {number}
                        </Button>
                      )
                    )}
                  </div>
                )}
                <Modal show={showModal} onHide={closeModal}>
                  <Modal.Header closeButton>
                    <Modal.Title>
                      {editIndex !== null
                        ? "Detalles Examen"
                        : "Actualizar Examen"}
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form.Group controlId="formName">
                      <Form.Label className="modal-form-label">
                        Descripcion
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={newExam.name}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="formDate">
                      <Form.Label className="modal-form-label ">
                        Fecha
                      </Form.Label>
                      <br />
                      <DatePicker
                        name="fecha"
                        label="Fecha"
                        selected={newExam.selectedDate}
                        onChange={(date) => handleDateChange(date)}
                        dateFormat="yyyy-MM-dd"
                        className="form-control"
                      />
                      <MDBInput
                        className="mt-4 mb-4"
                        type="text"
                        name="tiempo_hos"
                        label="Tiempo Hospital"
                        value={newExam.tiempo_hos}
                        onChange={handleInputChange}
                      />
                      <MDBInput
                        className="mb-4"
                        type="text"
                        name="precio"
                        label="Precio"
                        value={newExam.precio}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    {editIndex !== null &&
                      /*<div>
                        <Form.Group controlId="formLocation">
                          <Form.Label className="modal-form-label">
                            Lugar de realización
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="location"
                            value={newExam.location}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                        <Form.Group controlId="formDoctor">
                          <Form.Label className="modal-form-label">
                            Doctor que lo realizó
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="doctor"
                            value={newExam.doctor}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </div>*/
                      ""}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                      Cerrar
                    </Button>
                    <Button variant="primary" onClick={handleAddExam}>
                      {editIndex !== null ? "Guardar" : "Agregar"}
                    </Button>
                  </Modal.Footer>
                </Modal>

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
              </MDBCardBody>
              <MDBCardFooter className="back-table-head">
                "Vive Feliz, Vive Sano , Vive Healthy Pocket "
              </MDBCardFooter>
            </MDBCard>
          </div>
          <div className="col-2"></div>
        </div>
      </div>
    </div>
  );
};

export default ExamRegistration;
