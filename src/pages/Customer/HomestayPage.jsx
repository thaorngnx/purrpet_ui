import { HeaderCustomer } from "../../components/Header/HeaderCustomer";
import { FooterCustomer } from "../../components/Footer/FooterCustomer";
import SliderComponent from "../../components/Slider/SliderComponent";
import img1 from "../../assets/homestay.jpg";
import img2 from "../../assets/hotel-img-7.jpg";
import img3 from "../../assets/Bannerhomestay.png";
import img4 from "../../assets/homestay5.jpg";
import img5 from "../../assets/homestay6.jpg";
import img6 from "../../assets/homestay7.jpg";
import img7 from "../../assets/homestay8.jpg";
import img8 from "../../assets/homestay9.jpg";
import img9 from "../../assets/homestay10.jpg";
import img10 from "../../assets/homestay11.jpg";
import img11 from "../../assets/homestay12.jpg";
import { Button, List, ListItem, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const HomestayPage = () => {
  const navigate = useNavigate();
  const TimeLine =[
    {
      time: "07:00 - 08:30",
      content: "Nhân viên chuẩn bị bữa sáng, kiểm tra lau dọn chuồng",
    },
    {
      time:  "08:30 - 09:00",
      content:"Bắt đầu ăn sáng"
    },{
      time:"09:00 - 12:00",
      content:"Tự do vui chơi trong vườn"
    },
    {
      time:"12:00 - 12:30",
      content:"Các bé trở về phòng và ăn trưa"
    },
    {
      time:"12:30 - 14:00",
      content:"Các bé nghỉ trưa trong phòng"
    },
    {
      time:"14:00 - 17:00",
      content:"Tự do vui chơi trong vườn"
    },
    {
      time:"17:00 - 19:00",
      content:"Các bé trở về phòng, bắt đầu ăn tối"
    },
    {
      time:"Sau 19:00",
      content:"Các bé nghỉ ngơi trong phòng"
    }
  ]
   
  const images = [
    {
      imgPath: img6,
      alt: "Image 0",
    },
    {
      imgPath: img7,
      alt: "Image 1",
    },
    {
      imgPath: img8,
      alt: "Image 2",
    },
    {
      imgPath: img9,
      alt: "Image 3",
    },
    {
      imgPath: img10,
      alt: "Image 3",
    },
    {
      imgPath: img11,
      alt: "Image 3",
    },
  ];
     
    
  
  return (
    <>
      <HeaderCustomer />
   
        <img className=" max-h-full w-full" src={img3} alt="img1" />
  
      <Box className="flex justify-center">
        <Typography className="mt-10 text-4xl font-bold text-[#ED952D]">
        Lịch trình hàng ngày của Các bé tại PurrPet
        </Typography>
      </Box>
      <Box className="flex flex-row  justify-center">
        <img
          className="m-[20px] w-[40%] "
          src={img2}
          alt="img1"
        />
      <List>
        {TimeLine.map((item) => (
          <Box>
          <ListItem>
            <Typography variant="h6" className="font-bold text-[#ED952D]">{item.time}</Typography>
            
          </ListItem>
          <ListItem>
          <Typography variant="body1">{item.content}</Typography>
          </ListItem>
          </Box>
         
        ))}
      </List>
      </Box>
    
        <Typography className=" flex justify-center my-10 text-3xl font-bold text-[#ED952D]">
          Giá dịch vụ theo ngày
        </Typography>
     
      <Box className="mb-[30px] grid grid-cols-6 gap-7 ">
        <Box className="... col-start-2 col-end-4 rounded-lg border-[30px] border-[#7C58D3] bg-[#7C58D3]   ">
          <Typography className=" mt-[20px] text-2xl font-black text-white">
            Phòng Size S
          </Typography>
          <Typography className="mb-[10px] text-xl font-black text-white text-white">
            {" "}
            120.000 đến 140.000
          </Typography>
          <img
            src={img1}
            alt="img1"
            className="h-[300px] transform overflow-hidden rounded-md transition-transform duration-300 ease-out hover:scale-125"
          />
          <Typography className="flex justify-center">
            <Button
              onClick={() => {
                navigate(`/booking/home`);
              }}
              className=" mt-[20px] bg-[#FFFFFF] text-center  text-xl  font-bold "
            >
              Đặt Phòng ngay!
            </Button>
          </Typography>
        </Box>
        <Box className="... col-span-2 col-end-6 rounded-lg border-[30px] border-[#5868d3] bg-[#5868d3] ">
          <Typography className=" my-[10px] text-2xl font-black text-white">
            Phòng Size M
          </Typography>
          <Typography className="mb-[10px] text-xl font-black text-white text-white">
            {" "}
            140.000 đến 160.000
          </Typography>
          <img
            src={img4}
            alt="img1"
            className="h-[300px] transform overflow-hidden rounded-md transition-transform duration-300 ease-out hover:scale-125"
          />
          <Typography className="flex justify-center">
            <Button
              onClick={() => {
                navigate(`/booking/home`);
              }}
              className="mt-[20px] bg-[#FFFFFF] text-center  text-xl  font-bold "
            >
              Đặt Phòng ngay!
            </Button>
          </Typography>
        </Box>
        <Box className="... col-span-4 col-start-3 col-end-5 rounded-lg border-[30px] border-[#FFDA47] bg-[#FFDA47]    ">
          <Typography className=" mt-[10px] text-2xl font-black text-white">
            Phòng Size L
          </Typography>
          <Typography className="mb-[10px] text-xl font-black text-white text-white">
            {" "}
            160.000 đến 180.000
          </Typography>
          <img
            src={img5}
            alt="img1"
            className="h-[300px] transform overflow-hidden rounded-md transition-transform duration-300 ease-out hover:scale-125"
          />
          <Typography className="flex justify-center">
            <Button
              onClick={() => {
                navigate(`/booking/home`);
              }}
              className=" mt-[20px] bg-[#FFFFFF] text-center  text-xl  font-bold  "
            >
              Đặt Phòng ngay!
            </Button>
          </Typography>
        </Box>
       
      </Box>
      <Typography className=" flex justify-center  text-4xl font-bold text-[#ED952D]">
          Hình ảnh 
        </Typography>
        <Box className="flex flex-wrap justify-around ">
          {
            images.map((image) => (
              <img
              src={image.imgPath}
              alt={image.alt}
              height={"400px"}
              className="m-[20px] border-2 border-[#ED952D] rounded-lg"
            />
            ))
          }
          </Box>
    
      <FooterCustomer />
    </>
  );
};
