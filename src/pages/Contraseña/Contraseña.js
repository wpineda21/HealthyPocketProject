import React from "react";
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
  MDBCheckbox,
  MDBContainer,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import Header from "../Header/Header";
import SHeader from "../SimpleHeader/SHeader";

const Contraseña = () => {
  const InfoModal2 = () => {};

  return (
    <div>
      <SHeader></SHeader>
      <div className="container">
        <div className="row text-center pt-3 mt-3">
          <div className="col-md-4 offset-4">
            <div className="d-grid mx-auto"></div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-6"></div>
          <MDBCard alignment="center">
            <MDBCardBody>
              <form>
                <MDBInput
                  className="mb-4"
                  id="form5Example1"
                  label="Username"
                />
                <MDBInput
                  className="mb-4"
                  type="email"
                  id="form5Example2"
                  label="Email address"
                />

                <MDBBtn
                  className="btn-back"
                  type="submit"
                  block
                  data-bs-toggle="modal"
                  data-bs-target="#InfoModal2"
                  onClick={() => InfoModal2()}
                >
                  Recuperar Contraseña
                </MDBBtn>
              </form>
            </MDBCardBody>
          </MDBCard>
        </div>
      </div>
      <div id="InfoModal2" className="modal fade" aria-hidden="true">
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
                "Revisa Tu Correo se Te enviaron Instrucciones para Reestablecer
                Tu Contraseña"
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
    </div>
  );
};

export default Contraseña;
