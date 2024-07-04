import { HeaderCustomer } from "../../components/Header/HeaderCustomer";
import SliderComponent from "../../components/Slider/SliderComponent";
import img1 from "../../assets/Pricespa.png";
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

      <img
        style={{
          marginTop: {
            sm: "10px",
            md: "20px",
          },
        }}
        src={img10}
        alt="img10"
      />
      <Typography
        sx={{
          my: {
            xs: "1rem",
            sm: "2rem",
            md: "2rem",
          },
          fontSize: {
            xs: "1.5rem",
            sm: "2rem",
            md: "2.5rem",
          },
          fontWeight: "bold",
          color: "#ED952D",
          textAlign: "center",
        }}
      >
        Dịch vụ Spa - PurrPet
      </Typography>

      <img
        src={img1}
        alt="img1"
        style={{
          height: "auto",
          borderRadius: "30px",
          paddingInline: "20px",
        }}
      />

      <Typography
        sx={{
          my: {
            xs: "1rem",
            sm: "2rem",
            md: "2rem",
          },
          fontSize: {
            xs: "1rem",
            sm: "1.5rem",
            md: "2rem",
          },
          fontWeight: "bold",
          textAlign: "center",
          px: {
            xs: "10px",
            sm: "20px",
            md: "30px",
          },
        }}
      >
        Giá có thể bị thay đổi theo từng thời điểm
        <br />
        Để biết thêm thông tin chi tiết, bạn có thể vào mục đặt lịch để xem giá
        cụ thể.
      </Typography>

      <Typography className="flex justify-center">
        <Button
          onClick={() => {
            navigate(`/booking/spa`);
          }}
          className="bg-[#ED952D] text-center text-xl font-bold text-white hover:bg-violet-600"
        >
          Đặt lịch ngay!
        </Button>
      </Typography>
      <Box>
        <Typography
          sx={{
            textAlign: "center",
            fontSize: {
              xs: "1.5rem",
              sm: "2rem",
              md: "2.5rem",
            },
            fontWeight: "bold",
            color: "#ED952D",
            mt: {
              xs: "20px",
              sm: "30px",
              md: "30px",
            },
          }}
        >
          Một số hình ảnh before - after của khách hàng
        </Typography>
        <Box className="my-2 flex flex-wrap justify-center">
          {images.map((item) => (
            <img
              style={{
                margin: {
                  xs: "10px",
                  sm: "20px",
                  md: "30px",
                },
                width: "25%",
                height: "auto",
                borderRadius: "20px",
              }}
              src={item.imgPath}
              alt={item.alt}
            />
          ))}
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
