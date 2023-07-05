import React, { useState } from "react";
import "./SHeader.css";
import logo from "../Header/logoNav.png";
import { Link } from "react-router-dom";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from "mdb-react-ui-kit";

const Header = (props) => {
  const [showBasic, setShowBasic] = useState(false);

  const InfoModal = () => {};

  return (
    <>
      <MDBNavbar expand="lg" className="nav-back">
        <MDBContainer fluid>
          <MDBNavbarBrand href="/Login">
            {" "}
            <img src={logo} height="30" alt="" loading="lazy" />
          </MDBNavbarBrand>

          <MDBNavbarToggler
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShowBasic(!showBasic)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>

          <MDBCollapse navbar show={showBasic}>
            <MDBNavbarNav className="mr-auto mb-lg-0">
              <MDBNavbarItem>

                <Link className="nav-link Item" to="/Login" target="_self">
                  {" "}
                  Iniciar Sesion
                </Link>
              </MDBNavbarItem>

              <MDBNavbarItem>
                <Link className="nav-link Item" to="/" target="_self">
                  {" "}
                  Home
                </Link>
              </MDBNavbarItem>

              <MDBNavbarItem>
                <MDBNavbarLink
                  data-bs-toggle="modal"
                  data-bs-target="#InfoModal"
                  onClick={() => InfoModal()}
                >
                  About
                </MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>

      <div id="InfoModal" className="modal fade" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <label className="h5">About US</label>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <label>
                En Healthy Pocket, nuestra misión es promover y facilitar el
                acceso a una vida saludable y feliz para todos. Creemos que la
                salud es un tesoro invaluable y queremos ser el compañero de
                confianza que te guíe en cada paso de tu viaje hacia el
                bienestar óptimo.
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

export default Header;
