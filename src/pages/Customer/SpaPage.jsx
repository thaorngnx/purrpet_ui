import { HeaderCustomer } from "../../components/Header/HeaderCustomer";
import SliderComponent from "../../components/Slider/SliderComponent";
import ing1 from "../../assets/Pricespa.png";
import { Button } from "@mui/material";
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
import MultipleSlides from "../../components/Slider/MultipleSlides";

export const SpaPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <HeaderCustomer />
      <div className="mt-[80px]">
        <SliderComponent />
      </div>
      <div className="flex justify-center">
        <h1 className="mt-10 text-4xl font-bold text-[#ED952D]">
          Dịch vụ Spa - PurrPet
        </h1>
      </div>
      <div className="flex  justify-center">
        <img className="mt-10 w-[80%]" src={ing1} alt="img1" />
      </div>
      <div className="flex justify-center">
        <p className="mt-10 text-center text-xl font-bold text-[#ED952D]">
          Giá có thể bị thay đổi theo từng thời điểm
          <br /> Để biết thêm thông tin chi tiết, bạn có thể vào mục đặt lịch để
          xem giá cụ thể.
        </p>
      </div>
      <div className="flex justify-center">
        <Button
          onClick={() => {
            navigate(`/booking/spa`);
          }}
          className="my-10 bg-[#ED952D] text-center text-xl  font-bold  text-white hover:bg-violet-600 "
        >
          Đặt lịch ngay!
        </Button>
      </div>
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
