import { Box } from "@mui/material";
import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const MultipleSlides = ({ img1, img2, img3, img4, img5, img6, img7, img8 }) => {
  const images = [img1, img2, img3, img4, img5, img6, img7, img8];
  return (
    <Slide slidesToScroll={2} slidesToShow={3} indicators={true}>
      {images.map((image, index) => (
        <Box
          sx={{
            display: "flex",
            maxHeight: "100%",
            width: {
              xs: "95%",
              md: "85%",
            },
            alignItems: "center",
            justifyContent: "center",
            border: "15px",
            borderColor: "white",
            objectFit: "cover",
            transition: "transform 300ms ease-out",
            "&:hover": {
              transform: "scale(1.25)",
            },
          }}
        >
          <img src={image} alt={`img-${index}`} className="w-full" />
        </Box>
      ))}
    </Slide>
  );
};
export default MultipleSlides;
