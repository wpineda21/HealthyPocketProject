import React, { useState } from "react";
import SHeader from '../SimpleHeader/SHeader'
import logo from "../Header/logoNav.png";
import {
    MDBCarousel,
    MDBCarouselItem,
  } from 'mdb-react-ui-kit';



const Home = (props) => {
  const [showBasic, setShowBasic] = useState(false);
  return (
    <>
    <SHeader></SHeader>
  </>
  );
};

export default Home;
