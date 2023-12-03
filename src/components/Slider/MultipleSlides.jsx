import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const MultipleSlides = ({ img1, img2, img3, img4, img5, img6, img7, img8 }) => {
  return (
    <div>
      <Slide slidesToScroll={2} slidesToShow={3} indicators={true}>
        <div>
          <div
            className=" flex h-[300px] max-h-full w-[80%] items-center justify-center border-[15px] border-white object-cover transition-transform duration-300 ease-out hover:scale-125"
            style={{
              backgroundImage: `url(${img1})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
        <div>
          <div
            className=" flex h-[300px] max-h-full w-[80%] items-center justify-center border-[15px] border-white object-cover transition-transform duration-300 ease-out hover:scale-125 "
            style={{
              backgroundImage: `url(${img2})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
        <div>
          <div
            className=" flex h-[300px] max-h-full w-[80%] items-center justify-center border-[15px] border-white object-cover transition-transform duration-300 ease-out hover:scale-125 "
            style={{
              backgroundImage: `url(${img3})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
        <div>
          <div
            className=" flex h-[300px] max-h-full w-[80%] items-center justify-center border-[15px] border-white object-cover transition-transform duration-300 ease-out hover:scale-125 "
            style={{
              backgroundImage: `url(${img4})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
        <div>
          <div
            className=" flex h-[300px] max-h-full w-[80%] items-center justify-center border-[15px] border-white object-cover transition-transform duration-300 ease-out hover:scale-125 "
            style={{
              backgroundImage: `url(${img5})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
        <div>
          <div
            className=" flex h-[300px] max-h-full w-[80%] items-center justify-center border-[15px] border-white object-cover transition-transform duration-300 ease-out hover:scale-125 "
            style={{
              backgroundImage: `url(${img6})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
        <div>
          <div
            className=" flex h-[300px] max-h-full w-[80%] items-center justify-center border-[15px] border-white object-cover transition-transform duration-300 ease-out hover:scale-125 "
            style={{
              backgroundImage: `url(${img7})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
        <div>
          <div
            className=" flex h-[300px] max-h-full w-[80%] items-center justify-center border-[15px] border-white object-cover transition-transform duration-300 ease-out hover:scale-125 "
            style={{
              backgroundImage: `url(${img8})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
      </Slide>
    </div>
  );
};
export default MultipleSlides;
