import React, { useEffect, useState } from "react";
import Header from "../Header/Header";




const SigIntegration = () => {
  return (
    <>
    <Header/>
    <div className="map-container-1">
    <iframe src="http://127.0.0.1:5500/src/pages/SigIntegration/index.html#9/13.8225/-88.8612"
    title="SigIntegration"
      style={{ width: '100%', height: '100vh', border: 'none' }}
    />
    </div>
    </>
  );
};

export default SigIntegration;