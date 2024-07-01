import { Box } from "@mui/material";
import img1 from "../../assets/Banner.png";
import img2 from "../../assets/Banner1.png";
import img3 from "../../assets/Banner2.png";
import img4 from "../../assets/Banner3.png";
import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const SliderComponent = () => {
  const images = [img1, img2, img3, img4];
  return (
    <Slide>
      {images.map((image, index) => (
        <Box>
          <img src={image} alt={`img-${index}`} className="w-full" />
        </Box>
      ))}
    </Slide>
  );
};
export default SliderComponent;
