import React, { useState } from "react";
import "./UserPage.css";
import Header from "../Header/Header";
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
      <Header></Header>

      <div className="container ">
        <div className="row text-center pt-5">
          <h1>¿Que deseas hacer Hoy? :  {localStorage.getItem("usuario")}</h1>
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
                    active={basicActive === "messages"}
                    noBorders
                    className="px-3"
                  >
                    <MDBTabsItem>
                      <MDBTabsLink onClick={() => handleBasicClick("messages")}>
                        Ver mi Perfil
                      </MDBTabsLink>
                    </MDBTabsItem>
                  </MDBListGroupItem>
                  <MDBListGroupItem
                    action
                    active={basicActive === "settings"}
                    noBorders
                    className="px-3"
                  >
                    <MDBTabsItem>
                      <MDBTabsLink onClick={() => handleBasicClick("settings")}>
                        Ver Mis Estadisticas
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
                  <MDBBtn className="btn-back" href="/Citas">
                    ver Mis Citas
                  </MDBBtn>
                </MDBTabsPane>
                <MDBTabsPane show={basicActive === "home"}>
                  Permite a los usuarios registrar y realizar un seguimiento de
                  sus exámenes médicos de manera fácil y organizada. Podrás
                  ingresar los detalles de tus exámenes, como tipo de examen,
                  fecha, resultados y notas adicionales. Mantén un historial
                  completo de tus exámenes médicos para tener un control más
                  efectivo de tu salud.
                  <h1></h1>
                  <MDBBtn className="btn-back"  href="/Examenes">Ver Examenes</MDBBtn>
                </MDBTabsPane>
                <MDBTabsPane show={basicActive === "profile"}>
                  Accede rápidamente a una lista completa de tus medicamentos,
                  junto con información detallada sobre cada uno. Obtén datos
                  sobre las dosis recomendadas, posibles efectos secundarios y
                  cualquier interacción conocida con otros medicamentos. Mantén
                  un registro actualizado de tu plan de medicación para
                  garantizar un manejo adecuado y seguro de tus tratamientos.
                  <h1></h1>
                  <MDBBtn className="btn-back" href="/Medicamento">Ver Mis Medicamentos</MDBBtn>
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
              </MDBTabsContent>
            </MDBCol>
          </MDBRow>
        </div>
      </div>
    </>
  );
};

export default UserPage;
