import React, { useState } from "react";
import "./Header.css";
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
  return (
    <>
      <MDBNavbar expand="lg" className="nav-back">
        <MDBContainer fluid>
          <MDBNavbarBrand href="/Login">
            {" "}
            <img src={logo} height="70" alt="" loading="lazy" />
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
              <MDBNavbarLink>
                {" "}
                Bienvenido : {localStorage.getItem("usuario")}
              </MDBNavbarLink>
              <MDBNavbarItem>
                <Link className="nav-link Item" to="/UserPage" target="_self">
                  {" "}
                  Home
                </Link>
              </MDBNavbarItem>

              <MDBNavbarItem>
                <MDBDropdown>
                  <MDBDropdownToggle tag="a" className="nav-link" role="button">
                    Services
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem link>
                      <Link
                        className="nav-link Item"
                        to="/UserProfile"
                        target="_self"
                      >
                        {" "}
                        Perfil de Usuario
                      </Link>
                    </MDBDropdownItem>
                    <MDBDropdownItem link href="/Examenes">
                      
                      <Link
                        className="nav-link Item"
                        to="/Examenes"
                        target="_self"
                      >
                        {" "}
                        Registro de Examenes
                      </Link>
                    </MDBDropdownItem>
                    <MDBDropdownItem link href="/Citas">

                      <Link
                        className="nav-link Item"
                        to="/Citas"
                        target="_self"
                      >
                        {" "}
                        Citas
                      </Link>
                    </MDBDropdownItem>
                    <MDBDropdownItem link href="/Medicamento">

                      <Link
                        className="nav-link Item"
                        to="/Medicamento"
                        target="_self"
                      >
                        {" "}
                        Control de Horario de Medicamento
                      </Link>
                    </MDBDropdownItem>
                    <MDBDropdownItem link href="/SigIntegration">
                      
                      <Link
                        className="nav-link Item"
                        to="/SigIntegration"
                        target="_self"
                      >
                        {" "}
                        Mapa Hospitales
                      </Link>
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>
              <MDBNavbarItem></MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="/Login">Cerrar Sesion</MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
};

export default Header;
