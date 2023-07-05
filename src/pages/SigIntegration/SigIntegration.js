import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import "./sigintegration.css";
import { Button } from "react-bootstrap";




const SigIntegration = () => {
  return (
    <>
    <Header/>
    <div className="map-container-1">
    <h1>HOSPITALES DE EL SALVADOR</h1>
    <Button href="https://benjamincarpio.github.io/QGIS_GeolocationMap/#14/13.7194/-89.2171">WEB DETALLADA (BETA)</Button>
    <iframe className="iframe-map-1" src="https://benjamincarpio.github.io/QGIS_GeolocationMap/#14/13.7194/-89.2171"
    title="SigIntegration"
      style={{ width: '100%', height: '100vh'}}
    />
    </div>
    </>
  );
};

export default SigIntegration;