import { Box } from "@mui/material";

import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const SliderComponent = () => {
  const images = {
    link1: "https://res.cloudinary.com/drzp9tafy/image/upload/v1721115024/Banner_edx2gt.png",
    link2: "https://res.cloudinary.com/drzp9tafy/image/upload/v1721115427/Banner3_ecdxpp.png",
    link3: "https://res.cloudinary.com/drzp9tafy/image/upload/v1721115466/questionSpa_fnnc57.png",
    link4: "https://res.cloudinary.com/drzp9tafy/image/upload/v1721115977/questionSpa_1_i5ekhj.png"
  }
   
  
  return (
    <Slide>
     <img src={images.link1} alt="img1" style={{ width:"100%"}} />
      <img src={images.link2} alt="img2" style={{ width:"100%"}} />
      <img src={images.link3} alt="img3" style={{ width:"100%"}} />
      <img src={images.link4} alt="img4" style={{ width:"100%"}} />
    </Slide>
  );
};
export default SliderComponent;
