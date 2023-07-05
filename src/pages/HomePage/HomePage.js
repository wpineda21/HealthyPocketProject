import React, { useState } from "react";
import SHeader from "../SimpleHeader/SHeader";
import logo from "../Header/logoNav.png";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBCarousel,
  MDBCarouselItem,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardHeader,
  MDBCardFooter,
  MDBCardImage,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";

const Home = (props) => {
  const [fillActive, setFillActive] = useState("tab1");
  const handleFillClick = (value: string) => {
    if (value === fillActive) {
      return;
    }

    setFillActive(value);
  };
  const [showBasic, setShowBasic] = useState(false);

  return (
    <>
      <SHeader></SHeader>
      <div className="container">
        <div className="row mt-3">
          <div className="col-6"></div>
          <MDBCard alignment="center">
            <MDBCardBody>
              <MDBTabs pills fill className="mb-3">
                <MDBTabsItem>
                  <MDBTabsLink
                    onClick={() => handleFillClick("tab1")}
                    active={fillActive === "tab1"}
                  >
                    Healthy Pocket
                  </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                  <MDBTabsLink
                    onClick={() => handleFillClick("tab2")}
                    active={fillActive === "tab2"}
                  >
                    Sobre Nosotros
                  </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                  <MDBTabsLink
                    onClick={() => handleFillClick("tab3")}
                    active={fillActive === "tab3"}
                  >
                    Contactos
                  </MDBTabsLink>
                </MDBTabsItem>
              </MDBTabs>

              <MDBTabsContent className="d-flex justify-content-center align-items-center ">
                <MDBTabsPane show={fillActive === "tab1"}>
                  <div className="bg-image">
                    <img src={logo} className="img-fluid" alt="Sample" />
                    <div
                      className="mask"
                      style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
                    >
                      <div className="d-flex justify-content-center align-items-center h-100"></div>
                    </div>
                    <h6 className="text-dark mb-0">
                      "Tu Aplicacion de Confianza"
                    </h6>
                  </div>
                </MDBTabsPane>
                <MDBTabsPane show={fillActive === "tab2"}>
                  <MDBRow className="row-cols-1 row-cols-md-3 g-4">
                    <MDBCol>
                      <MDBCard className="h-100">
                        <MDBCardImage src={logo} alt="..." position="top" />
                        <MDBCardBody>
                          <MDBCardTitle>Nuestra Mision</MDBCardTitle>
                          <MDBCardText>
                            En Healthy Pocket, nuestra misión es promover y
                            facilitar el acceso a una vida saludable y feliz
                            para todos. Creemos que la salud es un tesoro
                            invaluable y queremos ser el compañero de confianza
                            que te guíe en cada paso de tu viaje hacia el
                            bienestar óptimo.
                          </MDBCardText>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                    <MDBCol>
                      <MDBCard className="h-100">
                        <MDBCardImage src={logo} alt="..." position="top" />
                        <MDBCardBody>
                          <MDBCardTitle>Nuestra Vision</MDBCardTitle>
                          <MDBCardText>
                            Como líderes en la industria de la salud, aspiramos
                            a ser la opción preferida para las personas que
                            buscan mejorar su salud y calidad de vida. Queremos
                            ser reconocidos por nuestra excelencia en el
                            servicio al cliente, nuestras soluciones innovadoras
                            y efectivas, y nuestra pasión por fomentar la salud
                            y el bienestar en la comunidad.
                          </MDBCardText>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                    <MDBCol>
                      <MDBCard className="h-100">
                        <MDBCardImage src={logo} alt="..." position="top" />
                        <MDBCardBody>
                          <MDBCardTitle>Nuestros Valores</MDBCardTitle>
                          <MDBCardText>
                            *Salud y bienestar: Nos dedicamos a fomentar un
                            estilo de vida saludable y equilibrado, *Integridad:
                            Valoramos
                            <br></br>
                            la honestidad, la ética y la transparencia en todas
                            nuestras interacciones. socios.
                            <br></br>
                            *Innovación: Nos apasiona la búsqueda constante de
                            soluciones innovadoras que mejoren la salud y el
                            bienestar.
                          </MDBCardText>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                  </MDBRow>
                </MDBTabsPane>
                <MDBTabsPane show={fillActive === "tab3"}>
                  <div style={{ minWidth: "22rem" }}>
                    <h6 className="bg-light p-2 border-top border-bottom">
                      Development Team
                    </h6>
                    <MDBListGroup light className="mb-4">
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <img
                            src={logo}
                            alt=""
                            style={{ width: "45px", height: "45px" }}
                            className="rounded-circle"
                          />
                          <div className="ms-3">
                            <p className="fw-bold mb-1">Carlos Vasquez</p>
                            <p className="text-muted mb-0">
                              carlosvazquez@hotmail.com
                            </p>
                          </div>
                        </div>
                      </MDBListGroupItem>
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <img
                            src={logo}
                            alt=""
                            style={{ width: "45px", height: "45px" }}
                            className="rounded-circle"
                          />
                          <div className="ms-3">
                            <p className="fw-bold mb-1">Julio Ventura</p>
                            <p className="text-muted mb-0">
                              julioventura@hotmail.com
                            </p>
                          </div>
                        </div>
                      </MDBListGroupItem>
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <img
                            src={logo}
                            alt=""
                            style={{ width: "45px", height: "45px" }}
                            className="rounded-circle"
                          />
                          <div className="ms-3">
                            <p className="fw-bold mb-1">Benjamin Carpio</p>
                            <p className="text-muted mb-0">
                              benjamincarpio@hotmail.com
                            </p>
                          </div>
                        </div>
                      </MDBListGroupItem>
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <img
                            src={logo}
                            alt=""
                            style={{ width: "45px", height: "45px" }}
                            className="rounded-circle"
                          />
                          <div className="ms-3">
                            <p className="fw-bold mb-1">Eduardo Payes</p>
                            <p className="text-muted mb-0">
                              eduardopayes@hotmail.com
                            </p>
                          </div>
                        </div>
                      </MDBListGroupItem>
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <img
                            src={logo}
                            alt=""
                            style={{ width: "45px", height: "45px" }}
                            className="rounded-circle"
                          />
                          <div className="ms-3">
                            <p className="fw-bold mb-1">William Pineda</p>
                            <p className="text-muted mb-0">
                              williampineda@hotmail.com
                            </p>
                          </div>
                        </div>
                      </MDBListGroupItem>
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <img
                            src={logo}
                            alt=""
                            style={{ width: "45px", height: "45px" }}
                            className="rounded-circle"
                          />
                          <div className="ms-3">
                            <p className="fw-bold mb-1">Ricardo Lopez</p>
                            <p className="text-muted mb-0">
                              RicardoLopez@hotmail.com
                            </p>
                          </div>
                        </div>
                      </MDBListGroupItem>
                    </MDBListGroup>
                  </div>
                </MDBTabsPane>
              </MDBTabsContent>
            </MDBCardBody>
          </MDBCard>
        </div>
      </div>
    </>
  );
};

export default Home;
