import React, { useState } from "react";
import "./UserPage.css";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import HeaderNuevo from "../Header/HeaderNuevo";
import {
  MDBCol,
  MDBListGroup,
  MDBListGroupItem,
  MDBRow,
  MDBTabs,
  MDBTabsContent,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsPane,
  MDBBtn,
} from "mdb-react-ui-kit";


const UserPage = (props) => {
  const [basicActive, setBasicActive] = useState("settings2");
  const handleBasicClick = (value: string) => {
    if (value === basicActive) return;

    setBasicActive(value);
  };

  console.log(localStorage.getItem("usuario"));

  return (
    <>
      <HeaderNuevo></HeaderNuevo>

      <div className="container ">
        <div className="row text-center pt-5">
          <h1>¿Que deseas hacer Hoy? : {localStorage.getItem("usuario")}</h1>
        </div>
        <div className="row mt-5">
          <MDBRow>
            <MDBCol size={4}>
              <MDBListGroup light small>
                <MDBTabs>
                  <MDBListGroupItem
                    action
                    active={basicActive === "settings2"}
                    noBorders
                    className="px-3"
                  >
                    <MDBTabsItem>
                      <MDBTabsLink
                        onClick={() => handleBasicClick("settings2")}
                      >
                        Ver Mis Citas
                      </MDBTabsLink>
                    </MDBTabsItem>
                  </MDBListGroupItem>

                  <MDBListGroupItem
                    action
                    active={basicActive === "home"}
                    noBorders
                    className="px-3"
                  >
                    <MDBTabsItem>
                      <MDBTabsLink onClick={() => handleBasicClick("home")}>
                        Ver Examenes
                      </MDBTabsLink>
                    </MDBTabsItem>
                  </MDBListGroupItem>

                  <MDBListGroupItem
                    action
                    active={basicActive === "profile"}
                    noBorders
                    className="px-3"
                  >
                    <MDBTabsItem>
                      <MDBTabsLink onClick={() => handleBasicClick("profile")}>
                        Ver Medicamentos
                      </MDBTabsLink>
                    </MDBTabsItem>
                  </MDBListGroupItem>

                  <MDBListGroupItem
                    action
                    active={basicActive === "userprofile"}
                    noBorders
                    className="px-3"
                  >
                    <MDBTabsItem>
                      <MDBTabsLink
                        onClick={() => handleBasicClick("userprofile")}
                      >
                        Ver mi Perfil
                      </MDBTabsLink>
                    </MDBTabsItem>
                  </MDBListGroupItem>

                  <MDBListGroupItem
                    action
                    active={basicActive === "statistics"}
                    noBorders
                    className="px-3"
                  >
                    <MDBTabsItem>
                      <MDBTabsLink
                        onClick={() => handleBasicClick("statistics")}
                      >
                        Ver Mis Estadisticas
                      </MDBTabsLink>
                    </MDBTabsItem>
                  </MDBListGroupItem>

                  <MDBListGroupItem
                    action
                    active={basicActive === "mapsinfo"}
                    noBorders
                    className="px-3"
                  >
                    <MDBTabsItem>
                      <MDBTabsLink onClick={() => handleBasicClick("mapsinfo")}>
                        Vista Centros medicos
                      </MDBTabsLink>
                    </MDBTabsItem>
                  </MDBListGroupItem>
                </MDBTabs>
              </MDBListGroup>
            </MDBCol>

            <MDBCol size={8}>
              <MDBTabsContent>
                <MDBTabsPane show={basicActive === "settings2"}>
                  Accede a una visión completa y personalizada de tus
                  estadísticas médicas. Explora tus datos de salud, incluidos
                  parámetros como peso, presión arterial, nivel de glucosa,
                  entre otros. Obtén gráficos y tendencias que te ayudarán a
                  comprender mejor tu estado de salud a lo largo del tiempo.
                  Comprende tus patrones y logra un enfoque más informado para
                  mejorar tu bienestar general
                  <h1></h1>
                  <Link to="/Citas" target="_self">
                    <MDBBtn className="btn-back">ver Mis Citas</MDBBtn>
                  </Link>
                </MDBTabsPane>

                <MDBTabsPane show={basicActive === "home"}>
                  Permite a los usuarios registrar y realizar un seguimiento de
                  sus exámenes médicos de manera fácil y organizada. Podrás
                  ingresar los detalles de tus exámenes, como tipo de examen,
                  fecha, resultados y notas adicionales. Mantén un historial
                  completo de tus exámenes médicos para tener un control más
                  efectivo de tu salud.
                  <h1></h1>
                  <Link to="/Examenes" target="_self">
                    <MDBBtn className="btn-back" >
                      Ver Examenes
                    </MDBBtn>
                  </Link>
                </MDBTabsPane>

                <MDBTabsPane show={basicActive === "profile"}>
                  Accede rápidamente a una lista completa de tus medicamentos,
                  junto con información detallada sobre cada uno. Obtén datos
                  sobre las dosis recomendadas, posibles efectos secundarios y
                  cualquier interacción conocida con otros medicamentos. Mantén
                  un registro actualizado de tu plan de medicación para
                  garantizar un manejo adecuado y seguro de tus tratamientos.
                  <h1></h1>
                  <Link to="/Medicamento" target="_self">
                  <MDBBtn className="btn-back">
                    Ver Mis Medicamentos
                  </MDBBtn>
                  </Link>
                </MDBTabsPane>
                <MDBTabsPane show={basicActive === "settings"}>
                  Accede a una visión completa y personalizada de tus
                  estadísticas médicas. Explora tus datos de salud, incluidos
                  parámetros como peso, presión arterial, nivel de glucosa,
                  entre otros. Obtén gráficos y tendencias que te ayudarán a
                  comprender mejor tu estado de salud a lo largo del tiempo.
                  Comprende tus patrones y logra un enfoque más informado para
                  mejorar tu bienestar general
                  <h1></h1>
                  
                  <MDBBtn className="btn-back">ver Mis Estadisticas</MDBBtn>
                </MDBTabsPane>

                <MDBTabsPane show={basicActive === "userprofile"}>
                  Accede a una vista resumida sobre tu perfil de datos
                  relevantes, monitorea desde un punto de vista general tus
                  datos mas relevantes como tu nombre, doctor principal,
                  examenes realizados entre otas cosas.
                  <h1></h1>
                  <Link to="/UserProfile" target="_self">
                  <MDBBtn className="btn-back" href="/UserProfile">
                    Ver mis datos
                  </MDBBtn>
                  </Link>
                </MDBTabsPane>

                <MDBTabsPane show={basicActive === "statistics"}>
                  PROXIMAMENTE!!!
                  <h1></h1>
                  <MDBBtn className="btn-back disabled" href="/statistics">
                    Ver mis estadisticas
                  </MDBBtn>
                </MDBTabsPane>

                <MDBTabsPane show={basicActive === "mapsinfo"}>
                  En esta opción podras ver el mapa de El Salvador, con tu
                  ubicacion y los hospitales cercanos a tu direccion estimada,
                  podras filtrar y entre otras opciones para mantenerte
                  informado.
                  <h1></h1>
                  <Link to="/SigIntegration" target="_self">
                  <MDBBtn className="btn-back" href="/SigIntegration">
                    Ver mapa
                  </MDBBtn>
                  </Link>
                </MDBTabsPane>
              </MDBTabsContent>
            </MDBCol>
          </MDBRow>
        </div>
      </div>
    </>
  );
};

export default UserPage;
