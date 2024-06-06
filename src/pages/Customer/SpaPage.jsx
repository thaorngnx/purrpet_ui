import { HeaderCustomer } from "../../components/Header/HeaderCustomer";
import SliderComponent from "../../components/Slider/SliderComponent";
import ing1 from "../../assets/Pricespa.png";
import { Button, Typography, Box } from "@mui/material";
import { FooterCustomer } from "../../components/Footer/FooterCustomer";
import { useNavigate } from "react-router-dom";
import img2 from "../../assets/spa1.jpg";
import img3 from "../../assets/spa2.jpg";
import img4 from "../../assets/spa3.jpg";
import img5 from "../../assets/spa4.jpg";
import img6 from "../../assets/spa5.png";
import img7 from "../../assets/spa6.jpg";
import img8 from "../../assets/spa7.jpg";
import img9 from "../../assets/spa8.jpg";
import img10 from "../../assets/questionSpa.png";
import img11 from "../../assets/spa9.jpg";
import img12 from "../../assets/spa10.jpg";
import img13 from "../../assets/spa11.jpg";
import img14 from "../../assets/spa12.jpg";
import img15 from "../../assets/spa13.jpg";
import img16 from "../../assets/spa14.jpg";
import MultipleSlides from "../../components/Slider/MultipleSlides";

export const SpaPage = () => {
  const navigate = useNavigate();
  const images = [
  
    {
      imgPath: img11,
      alt: "Image 8",
    },
    {
      imgPath: img12,
      alt: "Image 9",
    },
    {
      imgPath: img13,
      alt: "Image 10",
    },
    {
      imgPath: img14,
      alt: "Image 11",
    },
    {
      imgPath: img15,
      alt: "Image 12",
    },
    {
      imgPath: img16,
      alt: "Image 13",
    },
  ];
  return (
    <>
      <HeaderCustomer />
      <SliderComponent />

      <img className=" mt-10" src={img10} alt="img10" />
      <Typography className="mt-10 text-4xl font-bold text-[#ED952D] flex justify-center">
          Dịch vụ Spa - PurrPet
        </Typography>
     
        <img className="mt-10 w-[80%] m-[auto]" src={ing1} alt="img1" />
      
     
        <Typography className="mt-10 text-center text-xl font-bold text-[#ED952D]">
          Giá có thể bị thay đổi theo từng thời điểm
          <br /> Để biết thêm thông tin chi tiết, bạn có thể vào mục đặt lịch để
          xem giá cụ thể.
        </Typography>
    
      <Typography className="flex justify-center">
        <Button
          onClick={() => {
            navigate(`/booking/spa`);
          }}
          className="my-10 bg-[#ED952D] text-center text-xl  font-bold  text-white hover:bg-violet-600 "
        >
          Đặt lịch ngay!
        </Button>
      </Typography>
      <Box>
        <Typography className="mt-10 text-4xl font-bold text-[#ED952D] flex justify-center">
          Một số hình ảnh before - after của khách hàng  
        </Typography>
        <Box className="flex justify-center flex-wrap">
          {
            images.map((item) => (
              <img
                className="m-[20px] w-[40%] "
                src={item.imgPath}
                alt={item.alt}
              />
            ))
          }
          </Box>
      </Box>
      <MultipleSlides
        img1={img2}
        img2={img3}
        img3={img4}
        img4={img5}
        img5={img6}
        img6={img7}
        img7={img8}
        img8={img9}
      />
      <FooterCustomer />
    </>
  );
};
