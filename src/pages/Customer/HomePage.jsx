import { HeaderCustomer } from "../../components/Header/HeaderCustomer";
import { FooterCustomer } from "../../components/Footer/FooterCustomer";
import { useNavigate } from "react-router-dom";
import SliderComponent from "../../components/Slider/SliderComponent";
import img1 from "../../assets/Banner3.png";
import img2 from "../../assets/cat_banner.png";
import img3 from "../../assets/dog_banner.png";
import img4 from "../../assets/spa_pet.png";
import img5 from "../../assets/homestay.jpg";
import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { GiJumpingDog } from "react-icons/gi";
import { FaRegCreditCard } from "react-icons/fa";
import { FaShippingFast } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";
import { AiOutlineRight } from "react-icons/ai";
import AdvFooterSlider from "../../components/Footer/AdvFooterSlider";
import { Tabs, Tab } from "@mui/material";
import React, { useEffect } from "react";
import {
  getNewProduct,
  getProductBestSeller,
  getProductPromotionForCus,
} from "../../api/product";
import { HorizontalSlider } from "../../components/Slider/HorizontalSlider";

export const HomePage = () => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState("one");
  const [productBestSeller, setProductBestSeller] = React.useState([]);
  const [productNew, setProductNew] = React.useState([]);
  const [productPromotion, setProductPromotion] = React.useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getProductBestSeller().then((response) => {
          setProductBestSeller(response.data);
        });
        await getNewProduct().then((response) => {
          setProductNew(response.data);
        });
        await getProductPromotionForCus().then((response) => {
          setProductPromotion(response.data);
        });
      } catch (error) {
        console.log("Failed to fetch product list: ", error);
      }
    };
    fetchData();
  }, []);

  const slogan = [
    {
      title: "Miễn phí vận chuyển",
      icon: <FaShippingFast className="text-2xl text-[#3255F6]" />,
    },
    {
      title: "Sản phẩm chính hãng",
      icon: <MdVerifiedUser className=" text-2xl text-[#3255F6]" />,
    },
    {
      title: "Thanh toán tiện lợi",
      icon: <FaRegCreditCard className=" text-2xl text-[#3255F6]" />,
    },
    {
      title: "Dịch vụ chuyên nghiệp",
      icon: <GiJumpingDog className=" text-2xl text-[#3255F6]" />,
    },
  ];

  return (
    <>
      <HeaderCustomer />
      <SliderComponent />
      <Box className="flex flex-wrap justify-around sm:flex-nowrap">
        {slogan.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              margin: {
                xs: "5px 0",
                sm: "10px",
                md: "10px",
              },
              width: {
                xs: "100%",
                sm: "45%",
                md: "25%",
              },
            }}
          >
            <Button
              sx={{
                backgroundColor: "#ED952D",
                color: "white",
                fontWeight: "bold",
                fontSize: {
                  xs: "12px",
                  sm: "14px",
                  md: "16px",
                },
                padding: "10px",
                width: "100%",
                marginX: "5px",
              }}
              endIcon={item.icon}
            >
              {item.title}
            </Button>
          </Box>
        ))}
      </Box>
      <Box className="my-3 flex flex-wrap justify-center sm:flex-nowrap md:justify-around">
        <Button
          onClick={() => {
            navigate(`/product`);
          }}
        >
          <img
            src={img3}
            alt="Dog banner"
            className="h-auto w-full transform overflow-hidden rounded-md transition-transform duration-300 ease-out hover:scale-125 sm:mr-[30px] sm:w-auto"
          />
        </Button>
        <Button
          onClick={() => {
            navigate(`/product`);
          }}
        >
          <img
            src={img2}
            alt="Cat banner"
            className="h-auto w-full transform overflow-hidden rounded-md transition-transform duration-300 ease-out hover:scale-125 sm:ml-[30px] sm:w-auto"
          />
        </Button>
      </Box>

      <Box className="mt-5 border-2 border-orange-600">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="secondary tabs example"
          className="flex justify-center rounded-t-lg bg-orange-500"
        >
          <Tab
            value="one"
            label="SẢN PHẨM MỚI"
            className={`rounded-t-lg px-6 py-3 font-bold uppercase text-black hover:bg-orange-600 focus:bg-white focus:text-gray-800 ${
              value === "one" ? "bg-white text-gray-800" : ""
            }`}
          />
          <Tab
            value="two"
            label="SẢN PHẨM BÁN CHẠY"
            className={`rounded-t-lg px-6 py-3 font-bold uppercase text-black hover:bg-orange-600 focus:bg-white focus:text-gray-800 ${
              value === "two" ? "bg-white text-gray-800" : ""
            }`}
          />
          <Tab
            value="three"
            label="SẢN PHẨM KHUYẾN MÃI"
            className={`rounded-t-lg px-6 py-3 font-bold uppercase text-black hover:bg-orange-600 focus:bg-white focus:text-gray-800 ${
              value === "three" ? "bg-white text-gray-800" : ""
            }`}
          />
        </Tabs>
        {value === "one" && (
          <HorizontalSlider products={productNew} title="SẢN PHẨM MỚI" />
        )}
        {value === "two" && (
          <HorizontalSlider
            products={productBestSeller}
            title="SẢN PHẨM BÁN CHẠY"
          />
        )}
        {value === "three" && (
          <HorizontalSlider
            products={productPromotion}
            title="SẢN PHẨM KHUYẾN MÃI"
          />
        )}
      </Box>
      <Box>
        <Typography
          variant="h1"
          sx={{
            textAlign: "center",
            marginBottom: "20px",
            marginTop: "40px",
            fontSize: {
              xs: "20px",
              sm: "24px",
              md: "28px",
            },
            fontWeight: "bold",
            color: "#ED952D",
          }}
        >
          NỔI BẬT TẠI PURRPET
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr",
              md: "1fr 1fr",
            },
            gap: "1",
            backgroundColor: "#e5e7eb",
            borderRadius: "10px",
            margin: "0 30px 60px 30px",
          }}
        >
          <img src={img4} alt="Slide 3" className="rounded-l-md" />

          <Box className="m-[20px] ">
            <Typography
              variant="h1"
              className=" text-center text-2xl font-bold text-[#feb200]"
            >
              SPA THÚ CƯNG
            </Typography>

            <h2 className=" text-center font-bold text-[#feb200]">
              {" "}
              Cùng bạn nuôi nấng Pet yêu{" "}
            </h2>
            <p className="text-justify">
              Dịch vụ Spa cho chó mèo là một trải nghiệm chăm sóc và làm đẹp
              tuyệt vời dành cho vật nuôi cưng của bạn. Tại đây, chúng tôi cung
              cấp các liệu pháp chăm sóc chuyên nghiệp như tắm, cắt tỉa lông,
              chăm sóc móng và vệ sinh tai. Đặc biệt, chúng tôi không chỉ tạo ra
              một môi trường thư giãn và thoải mái, mà còn mang đến một trải
              nghiệm spa đích thực cho chó mèo của bạn. Hãy để chúng tôi đưa vật
              nuôi của bạn lên một tầm cao mới với dịch vụ Spa chất lượng cao và
              sự chăm sóc tận tâm từ đội ngũ chuyên gia của chúng tôi.
            </p>

            <Button
              onClick={() => {
                navigate(`/service/spa`);
              }}
              variant="contained"
              className="center mt-5 flex justify-center bg-[#ED952D] font-bold text-white"
              endIcon={<AiOutlineRight />}
            >
              XEM CHI TIẾT
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr",
              md: "1fr 1fr",
            },
            gap: "1",
            backgroundColor: "#e5e7eb",
            borderRadius: "10px",
            margin: "0 30px 60px 30px",
          }}
        >
          <Box className="m-[20px] ">
            <Typography
              variant="h1"
              className="text-center text-2xl font-bold text-[#feb200]"
            >
              HOMESTAY THÚ CƯNG
            </Typography>

            <h2 className="s-l text-center font-bold text-[#feb200]">
              {" "}
              Chăm sóc tận tụy, hạnh phúc mãi cùng bạn và thú cưng của bạn!{" "}
            </h2>
            <p className="text-justify">
              Chúng tôi cung cấp một môi trường an lành và yêu thương cho thú
              cưng của bạn khi bạn không có thể có mặt. Thú cưng của bạn sẽ được
              tận hưởng sự chăm sóc tận tâm và không gian thoải mái trong một
              căn nhà như ngôi nhà thứ hai. Với đội ngũ chuyên gia chăm sóc đầy
              đam mê, chúng tôi cam kết mang lại trải nghiệm tốt nhất cho thú
              cưng của bạn.
            </p>

            <Button
              onClick={() => {
                navigate(`/service/homestay`);
              }}
              variant="contained"
              className="mt-5  bg-[#ED952D] font-bold text-white "
              endIcon={<AiOutlineRight />}
            >
              XEM CHI TIẾT
            </Button>
          </Box>

          <img src={img5} alt="Slide 3" className="rounded-r-md" />
        </Box>
      </Box>
      {/* <div className="flex justify-center">
        <img
          src={img6}
          alt="Slide 3"
          className=" m-[20px] w-[80%] transform overflow-hidden rounded-md transition-transform duration-300 ease-out hover:scale-125"
        />
      </div> */}
      <AdvFooterSlider />

      <FooterCustomer />
    </>
  );
};
