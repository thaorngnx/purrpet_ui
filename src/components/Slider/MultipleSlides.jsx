import img1 from "../../assets/cho-corgi.png";
import img2 from "../../assets/long-ngan.png";
import img3 from "../../assets/trang-vang.png";
import img4 from "../../assets/tai-cup.png";
import img5 from "../../assets/cho-corgi.png";
import img6 from "../../assets/canh-to.png";
import img7 from "../../assets/meo.png";
import img8 from "../../assets/husky.png";
import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const MultipleSlides = () => {
  return (
    <div>
      <Slide slidesToScroll={2} slidesToShow={3} indicators={true}>
        <div>
          <div
            className=" flex h-[300px] max-h-full w-[80%] items-center justify-center border-[21px] border-white object-cover transition-transform duration-300 ease-out hover:scale-125"
            style={{
              backgroundImage: `url(${img1})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
        <div>
          <div
            className=" flex h-[300px] max-h-full w-[80%] items-center justify-center border-[21px] border-white object-cover transition-transform duration-300 ease-out hover:scale-125 "
            style={{
              backgroundImage: `url(${img2})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
        <div>
          <div
            className=" flex h-[300px] max-h-full w-[80%] items-center justify-center border-[21px] border-white object-cover transition-transform duration-300 ease-out hover:scale-125 "
            style={{
              backgroundImage: `url(${img3})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
        <div>
          <div
            className=" flex h-[300px] max-h-full w-[80%] items-center justify-center border-[21px] border-white object-cover transition-transform duration-300 ease-out hover:scale-125 "
            style={{
              backgroundImage: `url(${img4})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
        <div>
          <div
            className=" flex h-[300px] max-h-full w-[80%] items-center justify-center border-[21px] border-white object-cover transition-transform duration-300 ease-out hover:scale-125 "
            style={{
              backgroundImage: `url(${img5})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
        <div>
          <div
            className=" flex h-[300px] max-h-full w-[80%] items-center justify-center border-[21px] border-white object-cover transition-transform duration-300 ease-out hover:scale-125 "
            style={{
              backgroundImage: `url(${img6})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
        <div>
          <div
            className=" flex h-[300px] max-h-full w-[80%] items-center justify-center border-[21px] border-white object-cover transition-transform duration-300 ease-out hover:scale-125 "
            style={{
              backgroundImage: `url(${img7})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
        <div>
          <div
            className=" flex h-[300px] max-h-full w-[80%] items-center justify-center border-[21px] border-white object-cover transition-transform duration-300 ease-out hover:scale-125 "
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
