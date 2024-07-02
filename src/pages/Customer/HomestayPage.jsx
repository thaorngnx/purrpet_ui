import { HeaderCustomer } from "../../components/Header/HeaderCustomer";
import { FooterCustomer } from "../../components/Footer/FooterCustomer";
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
  const TimeLine = [
    {
      time: "07:00 - 08:30",
      content: "Nhân viên chuẩn bị bữa sáng, kiểm tra lau dọn chuồng",
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
      img: img1,
      color: "#7C58D3",
    },
    {
      name: "Phòng Size M",
      price: "140.000 VNĐ đến 160.000 VNĐ",
      img: img4,
      color: "#5868d3",
    },
    {
      name: "Phòng Size L",
      price: "160.000 VNĐ đến 180.000 VNĐ",
      img: img5,
      color: "#FFDA47",
    },
  ];

  return (
    <>
      <HeaderCustomer />

      <img className=" max-h-full w-full" src={img3} alt="img1" />

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
          src={img2}
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
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          padding: "0 20px",
          marginBottom: "50px",
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "row",
          },
        }}
      >
        {rooms.map((room) => (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
              borderRadius: "20px",
              border: "2px solid #FFDA47",
              backgroundColor: room.color,
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                color: "white",
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
                color: "white",
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
            <img
              src={room.img}
              alt="img1"
              style={{
                height: "300px",
                borderRadius: "30px",
              }}
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
        {images.map((image) => (
          <img
            src={image.imgPath}
            alt={image.alt}
            className="m-[10px] rounded-lg border-2 border-[#ED952D]"
          />
        ))}
      </Box>

      <FooterCustomer />
    </>
  );
};
