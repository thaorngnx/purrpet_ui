import React, { useEffect } from "react";
import { ProductCard } from "../Product/ProducCard";
import { Box, Typography } from "@mui/material";
import Slider from "react-slick";

export const HorizontalSlider = ({ products, title }) => {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    autoPlay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };


  return (
    <Box className=" my-6 items-center justify-center">
      <Box className="slider-container">
        <Typography variant="h5" className="my-4 text-center font-bold">
          {title}
        </Typography>
        <Slider {...settings}>
          {products.map((product) => (
              <ProductCard key={product.purrPetCode} product={product} />
          ))}
        </Slider>
      </Box>
    </Box>
  );
};
