import React, { useState } from "react";
import "./Login.css";
import logo from "../Header/logoNav.png";
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import SHeader from "../SimpleHeader/SHeader";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  json,
} from "react-router-dom";

const Login = (props) => {
  //variable que guarda el cambio de pestañas en el login y registro de usuarios
  const [justifyActive, setJustifyActive] = useState("tab1");

  //Variables que Guardan toda la Informacion del Front-end
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setcorreo] = useState("");

  const [code, setcode] = useState("");

  //Variables que se usan para la verificacion de eventos
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loginError, setLoginError] = useState(false); // Nuevo estado para el error de inicio de sesión
  const [isRegisterOk, setIsRegisterOk] = useState(false);
  const [registerError, setRegisterError] = useState(false);
  const [okRegisterAlert, setokRegisterAlert] = useState(false);

  //Variable que consume la API
  const API_URL = "http://localhost:25060/api/Login/";

  const API_URL2 = "http://localhost:25060/api/Login/Signup";

  //Estos son Los eventos con los que se cambia de iniciar sesion a Registrarse en la misma pagina
  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }
    setJustifyActive(value);
  };

  //Estos son los enventos que son Utilizados en el Login para el Inicio se Sesion
  const handleSubmit = async (e) => {
    window.localStorage.setItem("form12", form12.value);
    //e.preventDefault();
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, contraseña: password }),
      });

      if (response.ok) {
        const data = await response.json();
        const usuario = JSON.parse(data);
        window.localStorage.setItem("usuario", usuario.nombre);
        window.localStorage.setItem("code_user", usuario.code_user);
        console.log(usuario);
        if (response.ok) {
          console.log("Inicio de sesión exitoso");
          setIsAuthorized(true);
        } else {
          console.log("Credenciales inválidas");
          setLoginError(true); // Establecer el estado de error de inicio de sesión
        }
      } else {
        console.log("Error en el servidor:", response.status);
        setLoginError(true); // Establecer el estado de error de inicio de sesión
      }
    } catch (error) {
      console.log("Error en el servidor:", error.message);
      setLoginError(true); // Establecer el estado de error de inicio de sesión
    }
  }; //Eveneto que se activa si todo sale bien en el inicio de sesion
  if (isAuthorized) {
    return <Navigate to="/UserPage" />;
  }

  //Eventos para El REGISTRO DE USUARIOS en la aplicacion(eventos similares al de inicio de sesion)
  const handleRegister = async (e) => {
    //e.preventDefault();
    try {
      const response = await fetch(API_URL2, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          correo: email,
          nombre: name,
          apellido: lastname,
          contraseña: password,
          code: 1,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Registro Perfecto");
        setIsRegisterOk(true);
        setokRegisterAlert(true);
      } else {
        console.log("Error:", response.status);
        setRegisterError(true); // Establecer el estado de error de inicio de sesión
      }
    } catch (error) {
      console.log("Error en el servidor:", error.message);
      setRegisterError(true); // Establecer el estado de error de inicio de sesión
    }
  }; //Eveneto que se activa si todo sale bien en el inicio de sesion

  function Guardar() {
    window.localStorage.setItem("code", data.value);
  }

  return (
    <>
      <SHeader />

      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <figure className="figure pt-5">
              <img src={logo} className="figure-img img-fluid mb-3" alt="..." />
              <figcaption className="figure-caption text-center">
                "Vive Feliz, Vive Sano, Vive Healthy Pocket"
              </figcaption>
            </figure>
          </div>
          <div className="col-lg-8">
            {/* ---------------------------------Aqui Empieza El inicio de Sesion ---------------------------------*/}
            <MDBContainer className=" my-5 d-flex flex-column w-50">
              <div className="text-center ">
                <h2>Healthy Pocket</h2>
                {loginError && ( // Mostrar el mensaje de error si loginError es true
                  <div className="alert alert-danger" role="alert">
                    Usuario O Contraseña Incorrecta, Intentelo Nuevamente
                  </div>
                )}
              </div>
              <MDBTabs
                pills
                justify
                className="mb-3 d-flex flex-row justify-content-between"
              >
                <MDBTabsItem>
                  <MDBTabsLink
                    onClick={() => handleJustifyClick("tab1")}
                    active={justifyActive === "tab1"}
                  >
                    Login
                  </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                  <MDBTabsLink
                    onClick={() => handleJustifyClick("tab2")}
                    active={justifyActive === "tab2"}
                  >
                    Register
                  </MDBTabsLink>
                </MDBTabsItem>
              </MDBTabs>

              <MDBTabsContent onSubmit={handleSubmit}>
                <MDBTabsPane show={justifyActive === "tab1"}>
                  <div className="text-center mb-3">
                    <p>Iniciar Sesion :</p>
                    <div
                      className="d-flex justify-content-between mx-auto"
                      style={{ width: "40%" }}
                    ></div>
                  </div>

                  <MDBInput
                    wrapperClass="mb-4"
                    label="Email address"
                    id="form12"
                    type="email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Password"
                    id="form2"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <div className="d-flex justify-content-between mx-4 mb-4">
                    <MDBCheckbox
                      name="flexCheck"
                      value=""
                      id="flexCheckDefault"
                      label="Remember me"
                    />
                    <a href="/Contraseña" className="link-color">
                      Forgot password?
                    </a>
                  </div>

                  <MDBBtn
                    onClick={() => handleSubmit("submit")}
                    type="submit"
                    className="btn-back mb-4 w-100"
                  >
                    Sign in
                  </MDBBtn>

                  <p className="text-center">
                    Not a member?{" "}
                    <MDBBtn
                      onClick={() => handleJustifyClick("tab2")}
                      active={justifyActive === "tab2"}
                      className="btn-back"
                    >
                      Register
                    </MDBBtn>
                  </p>
                </MDBTabsPane>

                {/* ---------------------------------Aqui comienza la vista para registrarse ------------------------------- */}

                <MDBTabsPane
                  show={justifyActive === "tab2"}
                  onSubmit={handleRegister}
                >
                  <div className="text-center mb-3">
                    <p>Register:</p>
                    {registerError && ( // Mostrar el mensaje de error si el Registro  es incorrecto
                      <div className="alert alert-danger" role="alert">
                        upps, hubo un problema con su registro, Intentelo
                        Nuevamente
                      </div>
                    )}
                    {okRegisterAlert && ( // Mostrar el mensaje de error si el Registro  es incorrecto
                      <div className="alert alert-success" role="alert">
                        Usuario Registrado, Bienvenido
                      </div>
                    )}
                  </div>
                  <MDBInput
                    wrapperClass="mb-3"
                    label="UserName"
                    id="form1"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <MDBInput
                    wrapperClass="mb-3"
                    label="Email"
                    id="form1"
                    type="email"
                    value={email}
                    onChange={(e) => setcorreo(e.target.value)}
                  />
                  <MDBInput
                    wrapperClass="mb-3"
                    label="Nombre"
                    id="form1"
                    type="text"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                  />
                  <MDBInput
                    wrapperClass="mb-3"
                    label="Last Name"
                    id="form1"
                    type="text"
                    value={lastname}
                    onChange={(e) => setlastname(e.target.value)}
                  />

                  <MDBInput
                    wrapperClass="mb-3"
                    label="Password"
                    id="form1"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="d-flex justify-content-center mb-2">
                    <MDBCheckbox
                      name="flexCheck"
                      id="flexCheckDefault"
                      label="I have read and agree to the terms"
                    />
                  </div>
                  <MDBBtn
                    className="btn-back mb-4 w-100"
                    onClick={() => handleRegister("submit")}
                    type="submit"
                  >
                    Sign up
                  </MDBBtn>
                </MDBTabsPane>
              </MDBTabsContent>
            </MDBContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
