import { HeaderCustomer } from "../../components/Header/HeaderCustomer";
import { FooterCustomer } from "../../components/Footer/FooterCustomer";
import img6 from "../../assets/homestay7.jpg";
import img7 from "../../assets/homestay8.jpg";
import img8 from "../../assets/homestay9.jpg";
import img9 from "../../assets/homestay10.jpg";
import img10 from "../../assets/homestay11.jpg";
import img11 from "../../assets/homestay12.jpg";
import { Button, List, ListItem, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Slider from "react-slick";

export const HomestayPage = () => {
  const navigate = useNavigate();
  const TimeLine = [
    {
      time: "07:00 - 08:30",
      content: "Nhân viên chuẩn bị: bữa sáng, kiểm tra lau dọn chuồng",
    },
    {
      time: "08:30 - 09:00",
      content: "Bắt đầu ăn sáng",
    },
    {
      time: "09:00 - 12:00",
      content: "Tự do vui chơi trong vườn",
    },
    {
      time: "12:00 - 12:30",
      content: "Các bé trở về phòng và ăn trưa",
    },
    {
      time: "12:30 - 14:00",
      content: "Các bé nghỉ trưa trong phòng",
    },
    {
      time: "14:00 - 17:00",
      content: "Tự do vui chơi trong vườn",
    },
    {
      time: "17:00 - 19:00",
      content: "Các bé trở về phòng, bắt đầu ăn tối",
    },
    {
      time: "Sau 19:00",
      content: "Các bé nghỉ ngơi trong phòng",
    },
  ];
  

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

  const rooms = [
    {
      name: "Phòng Size S",
      price: "120.000 VNĐ đến 140.000 VNĐ",
      link1: "https://res.cloudinary.com/drzp9tafy/image/upload/v1721221081/Add_a_subheading_8_qqz1ps.png",
      link2: "https://res.cloudinary.com/drzp9tafy/image/upload/v1721221081/Add_a_subheading_y98lau.png",
      link3: "https://res.cloudinary.com/drzp9tafy/image/upload/v1721221822/Add_a_subheading_1_wl092z.png",
      description: {
      size: "- Kích thước: 60cm x 60cm x 60cm",
        
      conform: "- Phù hợp với: Mèo và chó nhỏ (dưới 5kg), như Chihuahua, Pomeranian, mèo nhà thông thường",
      apparatus: "- Phòng được trang bị: giường mềm, khay vệ sinh, đồ chơi và bát ăn uống.",
      },
      color: "#a2f997",
      image: 'https://res.cloudinary.com/drzp9tafy/image/upload/v1721102015/Chihuahua-removebg-preview_awkdvd.png'
    },
    {
      name: "Phòng Size M",
      price: "140.000 VNĐ đến 160.000 VNĐ",
      link1: "https://res.cloudinary.com/drzp9tafy/image/upload/v1721221076/Add_a_subheading_4_glsjiu.png",
      link2: "https://res.cloudinary.com/drzp9tafy/image/upload/v1721221076/Add_a_subheading_3_icwg9u.png",
      link3: "https://res.cloudinary.com/drzp9tafy/image/upload/v1721221073/Add_a_subheading_2_csrndp.png",
    
      description: {
      size: "- Kích thước: 60cm x 80cm x 90cm",
      conform: "- Phù hợp với: Chó cỡ trung (5kg - 15kg), như Cocker Spaniel, French Bulldog, mèo lớn hơn.",
      apparatus: "- Phòng được trang bị: giường mềm, khay vệ sinh, đồ chơi, bát ăn uống, và đệm nằm.",
      },
      color: "#f5b658",
      image: "https://res.cloudinary.com/drzp9tafy/image/upload/v1721102202/image-removebg-preview_qkjdsh.png"
    },
    {
      name: "Phòng Size L",
      price: "160.000 VNĐ đến 180.000 VNĐ",
      link1: "https://res.cloudinary.com/drzp9tafy/image/upload/v1721221079/Add_a_subheading_5_bnz84b.png",
      link2: "https://res.cloudinary.com/drzp9tafy/image/upload/v1721221079/Add_a_subheading_6_xfertx.png",
      link3: "https://res.cloudinary.com/drzp9tafy/image/upload/v1721221081/Add_a_subheading_7_gypuk7.png",
      description: {
      size: "- Kích thước: 60cm x 90cm x 120cm",
      conform: "- Phù hợp với: Chó cỡ lớn (trên 15kg), như Golden Retriever, Husky, Beagle.",
      apparatus: "- Phòng được trang bị: giường lớn, khay vệ sinh, đồ chơi, bát ăn uống, đệm nằm, và máy lọc không khí.",
      },
      image:"https://res.cloudinary.com/drzp9tafy/image/upload/v1721102429/image-removebg-preview_1_gwl7zw.png",
      color: "#5ebee8",
    },
  ];

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // 3 giây mỗi slide
    arrows:false,
  };

  return (
    <>
      <HeaderCustomer />

      <img className=" max-h-full w-full" src="https://res.cloudinary.com/drzp9tafy/image/upload/v1721096705/PURR_PET_3_dwjlxd.png" alt="img1" />

      <Box className="flex justify-center">
        <Typography
          sx={{
            mt: {
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
            padding: "0 20px",
            textAlign: "center",
          }}
        >
          Lịch trình hàng ngày của Các bé tại PurrPet
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "row",
          },
          justifyContent: "center",
          padding: "0 20px",
          alignItems: "center",
        }}
      >
        <img
          style={{
            maxWidth: "40%",
            margin: "20px",
          }}
          src="https://res.cloudinary.com/drzp9tafy/image/upload/v1721222980/hotel-img-7_dcr7s8.webp"
          alt="img1"
        />
        <List>
          {TimeLine.map((item) => (
            <Box>
              <ListItem>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: "#ED952D",
                    fontSize: {
                      xs: "1rem",
                      sm: "1.5rem",
                      md: "1.5rem",
                    },
                  }}
                >
                  {item.time}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="body1">{item.content}</Typography>
              </ListItem>
            </Box>
          ))}
        </List>
      </Box>

      <Typography
        sx={{
          my: {
            xs: "1rem",
            sm: "2rem",
            md: "3rem",
          },
          textAlign: "center",
          fontSize: {
            xs: "1.5rem",
            sm: "2rem",
            md: "2.5rem",
          },
          fontWeight: "bold",
          color: "#ED952D",
        }}
      >
        Giá dịch vụ theo ngày
      </Typography>

      <Box
        sx={{
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          padding: "0 20px",
          marginBottom: "50px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",

        }}
      >

        {rooms.map((room) => (
          <Box
            sx={{
             margin: "10px",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
              borderRadius: "20px",
              border: "2px solid #FFDA47",
              backgroundColor: room.color,
              width: "80%",
            }}
          >
            <Box className="flex flex-col items-center">
            <Typography
              sx={{
                fontWeight: "bold",
                color: "#c51111",
                fontSize: {
                  xs: "1.5rem",
                  sm: "1.5rem",
                  md: "2rem",
                },
              }}
            >
              {room.name}
            </Typography>
            <Typography
              sx={{
                fontWeight: "bold",
                color: "#c51111",
                fontSize: {
                  xs: "1rem",
                  sm: "1rem",
                  md: "1.5rem",
                },
                marginBottom: "10px",
              }}
            >
              {room.price}
            </Typography>
            </Box>
            <Box className="flex justify-between mb-2">
            <Box className="w-[30%]">
            <Slider  {...sliderSettings} key={room.name} >
              <Box style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={room.link1}
                  alt={`img-${room.name}`}
                  style={{
                    height: "auto",
                    maxWidth: "100%",
                    
                  }}
                />
              </Box>
              <Box style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={room.link2}
                  alt={`img-${room.name}`}
                  style={{
                    height: "auto",
                    maxWidth: "100%",
                    
                  }}
                />
              </Box>
              <Box style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={room.link3}
                  alt={`img-${room.name}`}
                  style={{
                    height: "auto",
                    maxWidth: "100%",
                    
                  }}
                />
              </Box>
              </Slider>
              </Box>
              <Box className="w-[70%] flex flex-col items-start mt-5 ml-5">
              <Typography sx={{color: "black", fontSize: "20px",  textAlign: "start" }}>{room.description.size}</Typography>
              <Typography sx={{color: "black", fontSize: "20px",  textAlign: "start" }}>{room.description.conform}</Typography>
              <Typography sx={{color: "black", fontSize: "20px",  textAlign: "start"}}>{room.description.apparatus}</Typography>
              <img src={room.image} alt="img" />
              </Box>
              
            </Box>
           
            <Typography className="flex justify-center">
              <Button
                onClick={() => {
                  navigate(`/booking/home`);
                }}
                className=" mt-[20px] bg-[#FFFFFF] text-center text-xl font-bold"
              >
                Đặt Phòng ngay!
              </Button>
            </Typography>
          </Box>
        ))}
      </Box>
      
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
        }}
      >
        Hình ảnh
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "0 20px",
        }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image.imgPath}
            alt={image.alt}
            className="m-[10px] rounded-lg border-2 border-[#ED952D]"
            style={{
              maxWidth: "500px",
              maxHeight: "500px",
              objectFit: "cover",
              transition: "transform 0.3s",
              '&:hover': {
                transform: "scale(1.05)",
              }
            }}
          />
        ))}
      </Box>
      <FooterCustomer />
    </>
  );
};
