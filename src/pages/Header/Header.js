import React, { useState } from "react";
import "./Header.css";
import logo from "../Header/logoNav.png";
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
              <MDBNavbarItem>
                <MDBNavbarLink href="/UserPage">Home</MDBNavbarLink>
              </MDBNavbarItem>

              <MDBNavbarItem>
                <MDBNavbarLink href="/UserPage">About</MDBNavbarLink>
              </MDBNavbarItem>

              <MDBNavbarItem>
                <MDBNavbarLink href="/Login">Cerrar Sesion</MDBNavbarLink>
              </MDBNavbarItem>

              <MDBNavbarItem>
                <MDBDropdown>
                  <MDBDropdownToggle tag="a" className="nav-link" role="button">
                    Services
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem link>Perfil de Usuario</MDBDropdownItem>
                    <MDBDropdownItem link>Registro de Examenes</MDBDropdownItem>
                    <MDBDropdownItem link>
                      Control de Horario de Medicamento
                    </MDBDropdownItem>
                    <MDBDropdownItem link>Control de Gastos</MDBDropdownItem>
                    <MDBDropdownItem link>
                      Representacion Grafica de Estadisticas
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>

              <MDBNavbarItem>
                <MDBNavbarLink>
                  {" "}
                  Bienvenido : {localStorage.getItem("usuario")}
                </MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
};

export default Header;
