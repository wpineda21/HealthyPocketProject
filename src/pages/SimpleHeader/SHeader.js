import React, { useState } from "react";
import "./SHeader.css";
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
          <MDBNavbarBrand href="/Login"> <img
            src={logo}
            height='30'
            alt=''
            loading='lazy'
          /></MDBNavbarBrand>

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
                <MDBNavbarLink href="/Login">Iniciar Sesion</MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
               <MDBNavbarLink href="/">Home</MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBNavbarLink href="#">About</MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
            
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
};

export default Header;
