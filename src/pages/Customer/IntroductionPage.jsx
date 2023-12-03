import { HeaderCustomer } from "../../components/Header/HeaderCustomer";
import { FooterCustomer } from "../../components/Footer/FooterCustomer";
import img1 from "../../assets/gioithieu1.jpg";
import img2 from "../../assets/gioithieu2.jpg";
import img3 from "../../assets/vs1-6501.png";
import img4 from "../../assets/vs2-1809.png";
import img5 from "../../assets/vs3-0048.png";
import img6 from "../../assets/vs4-7317.png";
import img7 from "../../assets/bannervschon-4944.png";
import img8 from "../../assets/long-ngan.png";
import img9 from "../../assets/trang-vang.png";
import img10 from "../../assets/tai-cup.png";
import img11 from "../../assets/cho-corgi.png";
import img12 from "../../assets/canh-to.png";
import img13 from "../../assets/meo.png";
import img14 from "../../assets/husky.png";
import img15 from "../../assets/husky-va-alaska-nen-nuoi-loai-nao.png";
import MultipleSlides from "../../components/Slider/MultipleSlides";

export const IntroductionPage = () => {
  return (
    <>
      <HeaderCustomer />
      <div className="mb-[50px] mt-[80px] grid  grid-cols-2 gap-1">
        <div>
          <img
            src={img1}
            alt="Slide 3"
            className="mr-[20px] h-[450px] max-h-full w-full object-fill"
          />
        </div>
        <div className="ml-[20px]">
          <img src={img2} alt="Slide 3" />
          <h1 className="text-center text-3xl font-bold text-[#ED952D]">
            Giới thiệu về Petshop
          </h1>
          <div className="mx-auto my-0 w-[50%]  border-[1px] border-yellow-600"></div>
          <br />
          <p className="text-center text-xl">
            Chào mừng đến với trang web của chúng tôi! Chúng tôi là nền tảng đa
            dịch vụ cho thú cưng, cung cấp sản phẩm chất lượng, dịch vụ spa và
            đặt phòng homestay tiện nghi. Hãy khám phá ngay hôm nay để chăm sóc
            tốt nhất cho thú cưng của bạn!
          </p>
        </div>
      </div>
      <h1 className="  text-center text-3xl font-bold text-[#ED952D]">
        CHÚNG TÔI CUNG CẤP
      </h1>
      <div className="relative">
        <div class="relative z-[1] my-[60px] grid grid-cols-2 justify-items-center gap-[5rem]  ">
          <div className="w-[400px]">
            <div className="flex  justify-end">
              <h1 className="text-center text-xl font-bold ">
                Cung Cấp Sản Phẩm Với Mức Gía Cả Phải Chăng
              </h1>
              <img src={img3} alt="Slide 3" className="hover:rotate-45" />
            </div>
            <p className="text-justify">
              Ngoài các yếu tố về chất lượng sản phẩm cửa hàng uy tín, chuyên
              nghiệp cần mang đến sản phẩm với mức giá cả phải chăng đến khách
              hàng. Bạn có thể tham...
            </p>
          </div>
          <div className="w-[400px]">
            <div className="flex justify-end">
              <h1 className="text-center text-xl font-bold ">
                Nhân viên tư vấn nhiệt tình, am hiểu về thú cưng
              </h1>
              <img src={img4} alt="Slide 3" className="hover:rotate-45" />
            </div>
            <p className="text-justify">
              Bên cạnh các sản phẩm cung cấp đến khách hàng bạn có thể căn cứ
              vào thái độ của nhân viên để đánh giá cửa hàng uy tín. Nhân viên
              cửa hàng cần có thái...
            </p>
          </div>
          <div className="w-[400px]">
            <div className="flex justify-end">
              <h1 className="text-center text-xl font-bold ">
                Cung cấp sản phẩm chất lượng
              </h1>
              <img src={img5} alt="Slide 3" className="hover:rotate-45" />
            </div>
            <p className="text-justify">
              Một trong những tiêu chí quan trọng để đánh giá nhà cung cấp thức
              ăn thú cưng uy tín chính là mang đến sản phẩm chất lượng. Các sản
              phẩm như thức ăn, sữa...
            </p>
          </div>
          <div className="w-[400px]">
            <div className="flex justify-end">
              <h1 className="text-center text-xl font-bold ">
                Cung cấp sản phẩm đa dạng, phong phú
              </h1>
              <img src={img6} alt="Slide 3" className="hover:rotate-45" />
            </div>
            <p className="text-justify">
              Mỗi loại thú cưng lại có đặc điểm và thói quen riêng biệt. Các đơn
              vị cung cấp thức ăn chó mèo uy tín cần mang đến đầy đủ các sản
              phẩm đáp ứng nhu cầu...
            </p>
          </div>
        </div>
        <div className="absolute left-0 top-0 flex w-full justify-center">
          <img src={img7} alt="Slide 3" className="relative z-[10] " />
        </div>
      </div>
      <MultipleSlides
        img1={img8}
        img2={img9}
        img3={img10}
        img4={img11}
        img5={img12}
        img6={img13}
        img7={img14}
        img8={img15}
      />
      <FooterCustomer />
    </>
  );
};
