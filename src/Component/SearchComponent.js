import React, { useEffect, useState } from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardHeader,
    MDBCardFooter,
    MDBBtn,
  } from "mdb-react-ui-kit";
import Button from "react-bootstrap/Button";

const SearchComponent = (props) => {

    const [citas,setcitas]=useState([]);
    const [searche,setSearch]=useState([]);

    const API_URL = "http://localhost:25060/api/cita";

    const showData = async()=>{
        const response = await fetch(API_URL)
        const data = await response.json()
        console.log(data);
        setcitas(data);
        }

        useEffect(()=>{
            showData();
        },[])
        
  
  return (
    <>

    <div>
    <table className="table table-striped table-hover mt-5 shadow-lg">
        <thead > 
            <tr className="bg-curso text-black">
                <th>descripcion </th>
                <th>descripcion </th>
                <th>descripcion </th>
            </tr>
        </thead>
        <tbody>
                {citas.map((cita2)=>(
                    <tr>
                        <td>
                           {cita2.descripcion} 
                        </td>
                        <td>
                           {cita2.fecha} 
                        </td>
                        <td>
                           $ {cita2.tiempo_hos} 
                        </td>
                        <td>
                        <Button
                            variant="primary"
                            onClick={() => handleEditExam(index)}
                          >
                            Detalles
                          </Button>{" "}
                          <Button
                            variant="danger"
                            onClick={() => handleDeleteExam(index)}
                          >
                            Eliminar
                          </Button>
                        </td>
                    </tr>    
                ))}
        </tbody>
    </table>
    </div>
    </>
  );
};

export default SearchComponent;
