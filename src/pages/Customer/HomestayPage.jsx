import { HeaderCustomer } from "../../components/Header/HeaderCustomer";
import { FooterCustomer } from "../../components/Footer/FooterCustomer";
import SliderComponent from "../../components/Slider/SliderComponent";
import img1 from "../../assets/homestay.jpg";
import img2 from "../../assets/quytrinhHome.png";
import img3 from "../../assets/Bannerhomestay.png";
import img4 from "../../assets/homestay5.jpg";
import img5 from "../../assets/homestay6.jpg";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const HomestayPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <HeaderCustomer />
      <div>
        <img className="h-[500px] max-h-full w-full" src={img3} alt="img1" />
      </div>
      <div className="flex justify-center">
        <h1 className="mt-10 text-4xl font-bold text-[#ED952D]">
          Một ngày của Pet tại PurrPet
        </h1>
      </div>
      <div className="flex  justify-center">
        <img
          className="m-[20px] w-[80%] transform overflow-hidden rounded-md transition-transform duration-300 ease-out hover:scale-125"
          src={img2}
          alt="img1"
        />
      </div>
      <div className="flex justify-center">
        <h1 className="my-10 text-2xl font-bold text-[#ED952D]">
          Giá dịch vụ theo ngày
        </h1>
      </div>
      <div className="mb-[30px] grid grid-cols-6 gap-7 ">
        <div className="... col-start-2 col-end-4 rounded-lg border-[30px] border-[#7C58D3] bg-[#7C58D3]   ">
          <h1 className=" mt-[20px] text-2xl font-black text-white">
            Phòng Size S
          </h1>
          <h2 className="mb-[10px] text-xl font-black text-white text-white">
            {" "}
            120.000 đến 140.000
          </h2>
          <img
            src={img1}
            alt="img1"
            className="h-[300px] transform overflow-hidden rounded-md transition-transform duration-300 ease-out hover:scale-125"
          />
          <div className="flex justify-center">
            <Button
              onClick={() => {
                navigate(`/booking/home`);
              }}
              className=" mt-[20px] bg-[#FFFFFF] text-center  text-xl  font-bold "
            >
              Đặt Phòng ngay!
            </Button>
          </div>
        </div>
        <div className="... col-span-2 col-end-6 rounded-lg border-[30px] border-[#5868d3] bg-[#5868d3] ">
          <h1 className=" my-[10px] text-2xl font-black text-white">
            Phòng Size M
          </h1>
          <h2 className="mb-[10px] text-xl font-black text-white text-white">
            {" "}
            140.000 đến 160.000
          </h2>
          <img
            src={img4}
            alt="img1"
            className="h-[300px] transform overflow-hidden rounded-md transition-transform duration-300 ease-out hover:scale-125"
          />
          <div className="flex justify-center">
            <Button
              onClick={() => {
                navigate(`/booking/home`);
              }}
              className="mt-[20px] bg-[#FFFFFF] text-center  text-xl  font-bold "
            >
              Đặt Phòng ngay!
            </Button>
          </div>
        </div>
        <div className="... col-span-4 col-start-3 col-end-5 rounded-lg border-[30px] border-[#FFDA47] bg-[#FFDA47]    ">
          <h1 className=" mt-[10px] text-2xl font-black text-white">
            Phòng Size L
          </h1>
          <h2 className="mb-[10px] text-xl font-black text-white text-white">
            {" "}
            160.000 đến 180.000
          </h2>
          <img
            src={img5}
            alt="img1"
            className="h-[300px] transform overflow-hidden rounded-md transition-transform duration-300 ease-out hover:scale-125"
          />
          <div className="flex justify-center">
            <Button
              onClick={() => {
                navigate(`/booking/home`);
              }}
              className=" mt-[20px] bg-[#FFFFFF] text-center  text-xl  font-bold  "
            >
              Đặt Phòng ngay!
            </Button>
          </div>
        </div>
      </div>
      <FooterCustomer />
    </>
  );
};
