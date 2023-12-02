import img1 from "../../assets/Banner.png";
import img2 from "../../assets/Banner1.png";
import img3 from "../../assets/Banner2.png";
import img4 from "../../assets/Banner3.png";
import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const SliderComponent = () => {
  return (
    <Slide>
      <div>
        <div
          className="flex h-[500px] max-h-full w-full items-center justify-center object-cover"
          style={{
            backgroundImage: `url(${img1})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
      <div>
        <div
          className="flex h-[500px] max-h-full w-full items-center justify-center object-cover"
          style={{
            backgroundImage: `url(${img2})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
      <div>
        <div
          className="flex h-[500px] max-h-full w-full items-center justify-center object-cover"
          style={{
            backgroundImage: `url(${img3})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
      <div>
        <div
          className="flex h-[500px] max-h-full w-full items-center justify-center object-cover"
          style={{
            backgroundImage: `url(${img4})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
    </Slide>
  );
};
export default SliderComponent;
