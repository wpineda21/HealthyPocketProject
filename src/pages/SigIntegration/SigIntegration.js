import React, { useEffect, useState } from "react";
import Header from "../Header/Header";




const SigIntegration = () => {
  return (
    <>
    <Header/>
    <h1>HOSPITALES Y CLINICAS DE EL SALVADOR</h1>
    <div className="map-container-1">
    <iframe src="https://benjamincarpio.github.io/QGIS_GeolocationMap/#14/13.7194/-89.2171"
    title="SigIntegration"
      style={{ width: '100%', height: '100vh', border: 'none' }}
    />
    </div>
    </>
  );
};

export default SigIntegration;