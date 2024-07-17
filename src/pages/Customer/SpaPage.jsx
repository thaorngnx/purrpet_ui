import { HeaderCustomer } from "../../components/Header/HeaderCustomer";
import SliderComponent from "../../components/Slider/SliderComponent";
import { Button, Typography, Box } from "@mui/material";
import { FooterCustomer } from "../../components/Footer/FooterCustomer";
import { useNavigate } from "react-router-dom";

import img10 from "../../assets/questionSpa.png";
import { de } from "date-fns/locale";

export const SpaPage = () => {
  const navigate = useNavigate();
  const images = [
    {
      imgPath: "https://res.cloudinary.com/drzp9tafy/image/upload/v1721113095/spa9_wct30q.jpg",
      alt: "Image 8",
      description: "Chú Tiny Poodle sau khi đã được cắt tỉa lông gọn gàng, với bộ lông được cắt đều và mịn màng. Khuôn mặt của chú chó trở nên rõ ràng hơn và lông quanh mặt được cắt tỉa tạo nên một hình dạng đẹp mắt, tròn trịa",
    },
    {
      imgPath: "https://res.cloudinary.com/drzp9tafy/image/upload/v1721113053/spa7_zrjoo8.jpg",
      alt: "Image 9",
      description: "chú chó Pomeranian đã được cắt tỉa gọn gàng theo phong cách Boo. Bộ lông của chú chó được cắt ngắn, đều và mịn màng, tạo nên một hình dáng tròn trịa và vô cùng đáng yêu. Khuôn mặt của chú chó được cắt tỉa để trông giống như một con gấu bông nhỏ, với đôi tai và khuôn mặt tròn trịa, rất dễ thương",
    },
    {
      imgPath: "https://res.cloudinary.com/drzp9tafy/image/upload/v1721113103/spa11_k3p82x.jpg",
      alt: "Image 10",
      description: "Trước khi đến spa Bộ lông của chú rất dày và xù xì, che kín cả khuôn mặt và tai, khiến chú chó trông có vẻ lộn xộn và kém gọn gàng. Kết thúc dịch vụ  Bộ lông của chú được cắt ngắn, mịn màng và đều đặn. Khuôn mặt của chú chó trở nên rõ ràng hơn, với đôi tai được cắt tỉa tạo nên hình dạng tròn trịa và dễ thương",
    },
    {
      imgPath: "https://res.cloudinary.com/drzp9tafy/image/upload/v1721113039/spa1_b9jgut.jpg",
      alt: "Image 11",
      description: "Chú Toy Poodle sau khi đã được cắt tỉa lông gọn gàng, với bộ lông được cắt đều và mịn màng. Khuôn mặt của chú chó trở nên rõ ràng hơn và lông quanh mặt được cắt tỉa tạo nên một hình dạng đẹp mắt, tròn trịa. Chú chó trông sạch sẽ, gọn gàng và vô cùng đáng yêu sau khi được chăm sóc lông.",
    },
    {
      imgPath: "https://res.cloudinary.com/drzp9tafy/image/upload/v1721113112/spa14_lwssfd.jpg",
      alt: "Image 12",
      description: "Chú mèo Ragdoll sau khi được cắt tỉa lông gọn gàng, khuôn mặt của chú mèo trở nên rõ ràng hơn và lông quanh mặt được cắt tỉa tạo nên một hình dạng đẹp mắt, tròn trịa. Chú mèo trông sạch sẽ, gọn gàng và vô cùng đáng yêu sau khi được chăm sóc lông.",
    },
    {
      imgPath: "https://res.cloudinary.com/drzp9tafy/image/upload/v1721113045/spa3_jvwryi.jpg",
      alt: "Image 13",
      description: "Chú chó Pomeranian đã được cắt tỉa gọn gàng theo phong cách Boo. Bộ lông của chú chó được cắt ngắn, đều và mịn màng, tạo nên một hình dáng tròn trịa và vô cùng đáng yêu. Khuôn mặt của chú chó được cắt tỉa để trông giống như một con gấu bông nhỏ, với đôi tai và khuôn mặt tròn trịa, rất dễ thương",
    },
    {
      imgPath: "https://res.cloudinary.com/drzp9tafy/image/upload/v1721113106/spa13_b0wrdq.jpg",
      alt: "Image 13",
      description: "Trước khi đến spa Bộ lông của chú rất dày và xù xì, che kín cả khuôn mặt và tai, khiến chú chó trông có vẻ lộn xộn và kém gọn gàng. Kết thúc dịch vụ  Bộ lông của chú được cắt ngắn, mịn màng và đều đặn. Khuôn mặt của chú chó trở nên rõ ràng hơn, với đôi tai được cắt tỉa tạo nên hình dạng tròn trịa và dễ thương ",
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
        src="https://res.cloudinary.com/drzp9tafy/image/upload/v1721221012/Pricespa_ssyhrh.png"
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
      <Box sx={{
        backgroundColor: "#F5F5F5",
      }}>
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
            marginTop: {
              xs: "20px",
              sm: "30px",
              md: "30px",
            },
            padding: {
              xs: "10px",
              sm: "20px",
              md: "30px",
            },
          }}
        >
          Một số hình ảnh before - after của khách hàng
        </Typography>
        <Box className="my-2 ">
          {images.map((item, index) => (
            <Box
              sx={{
                display: "flex",
                flexDirection: index % 2 === 0 ? "row" : "row-reverse",
                justifyContent: "center",
                alignItems: "center",
                my: {
                  xs: "10px",
                  sm: "20px",
                  md: "30px",
                },
                margin:{
                  xs: "10px",
                  sm: "20px",
                  md: "30px",
                }
                
                
              }}
              >
            <img
              style={{
                margin: {
                  xs: "10px",
                  sm: "20px",
                  md: "30px",
                },
                width: "30%",
                height: "auto",
                borderRadius: "20px",
              }}
              src={item.imgPath}
              alt={item.alt}
            />
            <Typography sx={{ fontSize: "1.5rem", color: "#ED952D", textAlign: "start", px: "10px" }}>
              {item.description}
            </Typography>
            </Box>
          ))}
          
        </Box>
      </Box>
        <Box sx={{
          display: "flex",
          justifyContent: "center",
          alignItems:" center",
          my: {
            xs: "10px",
            sm: "20px",
            md: "30px",
          },
          margin:{
            xs: "10px",
            sm: "20px",
            md: "30px",
          }

        }}>
        <img src="https://res.cloudinary.com/drzp9tafy/image/upload/v1721116363/0684e598-23dd-495c-9a61-89e4edb337c3.png" alt="img2" />
      </Box>
      <img src="https://res.cloudinary.com/drzp9tafy/image/upload/v1721114806/Screenshot_2024-07-16_142627_nmxmfq.jpg" alt="img2" style={{ width:"100%"}} />
      <FooterCustomer />
    </>
  );
};
