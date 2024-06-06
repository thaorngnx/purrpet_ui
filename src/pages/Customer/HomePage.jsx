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
import { getNewProduct, getProductBestSeller, getProductPromotionForCus } from "../../api/product";
import { HorizontalSlider } from "../../components/Slider/HorizontalSlider";


export const HomePage = () => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState('one');
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
        }
        );
        await getProductPromotionForCus().then((response) => {
          setProductPromotion(response.data);
        }
        );
        
      } catch (error) {
        console.log("Failed to fetch product list: ", error);
      }
    };
    fetchData();
  }, []);
 

  return (
    <>
      <HeaderCustomer />
      <SliderComponent />
      <Box>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
          className="m-w-[100%]  z-2 my-[30px] flex justify-center"
        >
          <Button
            className=" h-[90px] w-[25%] border-r-2 border-[#fff] bg-[#ED952D] font-bold "
            endIcon={<FaShippingFast className="text-2xl text-[#3255F6]" />}
          >
            Miễn phí vận chuyển
          </Button>
          <Button
            className="h-[90px] w-[25%] border-r-2 border-[#fff] bg-[#ED952D] font-bold"
            endIcon={<MdVerifiedUser className=" text-2xl text-[#3255F6]" />}
          >
            Sản phẩm chính hãng
          </Button>
          <Button
            className=" h-[90px] w-[25%] border-r-2 border-[#fff] bg-[#ED952D] font-bold"
            endIcon={<FaRegCreditCard className=" text-2xl text-[#3255F6]" />}
          >
            Thanh toán tiện lợi
          </Button>
          <Button
            className="h-[90px] w-[25%] border-r-2 border-[#fff] bg-[#ED952D] font-bold"
            endIcon={<GiJumpingDog className=" text-2xl text-[#3255F6]" />}
          >
            Dịch vụ chuyên nghiệp
          </Button>
        </ButtonGroup>
      </Box>
      <Box className=" mb-4 flex justify-center">
        <Button
          onClick={() => {
            navigate(`/product`);
          }}
        >
          <img
            src={img3}
            alt="Cat banner"
            className="mr-[30px] transform overflow-hidden rounded-md transition-transform duration-300 ease-out hover:scale-125"
          />
        </Button>
        <Button
          onClick={() => {
            navigate(`/product`);
          }}
        >
          <img
            src={img2}
            alt="Dog banner"
            className="ml-[30px] transform overflow-hidden rounded-md transition-transform duration-300 ease-out hover:scale-125"
          />
        </Button>
      </Box>
      <Box className="border-2 border-orange-600 mt-10">
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="inherit"
        variant="fullWidth"
        aria-label="secondary tabs example"
        className="flex justify-center bg-orange-500 rounded-t-lg"
      >
          <Tab
          value="one"
          label="SẢN PHẨM MỚI"
          className={`text-black font-bold uppercase px-6 py-3 hover:bg-orange-600 focus:bg-white focus:text-gray-800 rounded-t-lg ${
            value === 'one' ? 'bg-white text-gray-800' : ''
          }`}
        />
        <Tab
          value="two"
          label="SẢN PHẨM BÁN CHẠY"
          className={`text-black font-bold uppercase px-6 py-3 hover:bg-orange-600 focus:bg-white focus:text-gray-800 rounded-t-lg ${
            value === 'two' ? 'bg-white text-gray-800' : ''
          }`}
        />
        <Tab
          value="three"
          label="SẢN PHẨM KHUYẾN MÃI"
          className={`text-black font-bold uppercase px-6 py-3 hover:bg-orange-600 focus:bg-white focus:text-gray-800 rounded-t-lg ${
            value === 'three' ? 'bg-white text-gray-800' : ''
          }`}
        />
      </Tabs>
      {value === 'one' && (
        <HorizontalSlider products={productNew} title="SẢN PHẨM MỚI" />
      )}
      {value === 'two' && (
        <HorizontalSlider products={productBestSeller} title="SẢN PHẨM BÁN CHẠY" />
      )}
      {value === 'three' && (
        <HorizontalSlider products={productPromotion} title="SẢN PHẨM KHUYẾN MÃI" />
      )}
    </Box>
      <Box>
        <Typography variant="h1" className="mb-[20px] mt-[40px] flex justify-center text-2xl font-bold text-[#ED952D]">
       NỔI BẬT TẠI PURRPET
        </Typography >
        <Box className="mx-[30px] my-[10px] mb-[60px] grid  grid-cols-2 gap-1 rounded-md bg-[#e5e7eb]">
        
            <img src={img4} alt="Slide 3" className="rounded-l-md" />
        
          <Box className="m-[20px] ">
            <Typography variant="h1" className=" text-2xl text-center font-bold text-[#feb200]">
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
                className="center mt-[50px]  bg-[#ED952D] font-bold text-white flex justify-center"
                endIcon={<AiOutlineRight />}
              >
                XEM CHI TIẾT
              </Button>
            
          </Box>
        </Box>
        <Box className="mx-[30px] my-[10px] grid grid-cols-2  gap-1 rounded-md bg-[#e5e7eb]">
          <Box className="m-[20px] ">
            <Typography variant="h1" className="text-2xl text-center font-bold text-[#feb200]">
              HOMESTAY THÚ CƯNG
            </Typography >

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
                className=" mt-[50px]  bg-[#ED952D] font-bold text-white "
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
      <AdvFooterSlider/>
     
      <FooterCustomer />
    </>
  );
};
