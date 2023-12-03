import { HeaderCustomer } from "../../components/Header/HeaderCustomer";
import { FooterCustomer } from "../../components/Footer/FooterCustomer";
import { useNavigate } from "react-router-dom";
import SliderComponent from "../../components/Slider/SliderComponent";
import img1 from "../../assets/Banner3.png";
import img2 from "../../assets/cat_banner.png";
import img3 from "../../assets/dog_banner.png";
import img4 from "../../assets/spa_pet.png";
import img5 from "../../assets/homestay.jpg";
import img6 from "../../assets/banner_page.png";
import { Button, ButtonGroup } from "@mui/material";
import { GiJumpingDog } from "react-icons/gi";
import { FaRegCreditCard } from "react-icons/fa";
import { FaShippingFast } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";
import { AiOutlineRight } from "react-icons/ai";

export const HomePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <HeaderCustomer />
      <div className="mt-[80px]">
        <SliderComponent />
      </div>
      <div>
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
      </div>
      <div className=" mb-4 flex justify-center">
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
      </div>
      <div>
        <div className="mb-[20px] mt-[40px] flex justify-center text-2xl font-bold text-[#ED952D]">
          <h1>NỔI BẬT TẠI PURRPET</h1>
        </div>
        <div className="mx-[30px] my-[10px] mb-[60px] grid  grid-cols-2 gap-1 rounded-md bg-[#e5e7eb]">
          <div>
            <img src={img4} alt="Slide 3" className="rounded-l-md" />
          </div>
          <div className="m-[20px] ">
            <h1 className="s-3xl text-center font-bold text-[#feb200]">
              SPA THÚ CƯNG
            </h1>

            <h2 className="s-l text-center font-bold text-[#feb200]">
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
            <div className="flex justify-center">
              <Button
                onClick={() => {
                  navigate(`/service/spa`);
                }}
                variant="contained"
                className="center mt-[50px]  bg-[#ED952D] font-bold text-white"
                endIcon={<AiOutlineRight />}
              >
                XEM CHI TIẾT
              </Button>
            </div>
          </div>
        </div>
        <div className="mx-[30px] my-[10px] grid grid-cols-2  gap-1 rounded-md bg-[#e5e7eb]">
          <div className="m-[20px] ">
            <h1 className="s-3xl text-center font-bold text-[#feb200]">
              HOMESTAY THÚ CƯNG
            </h1>

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
            <div className="flex justify-center">
              <Button
                onClick={() => {
                  navigate(`/service/homestay`);
                }}
                variant="contained"
                className=" mt-[50px]  bg-[#ED952D] font-bold text-white"
                endIcon={<AiOutlineRight />}
              >
                XEM CHI TIẾT
              </Button>
            </div>
          </div>
          <div>
            <img src={img5} alt="Slide 3" className="rounded-r-md" />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <img
          src={img6}
          alt="Slide 3"
          className=" m-[20px] w-[80%] transform overflow-hidden rounded-md transition-transform duration-300 ease-out hover:scale-125"
        />
      </div>
      <FooterCustomer />
    </>
  );
};
