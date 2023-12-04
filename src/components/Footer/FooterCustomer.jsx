import React from "react";
import img from "../../assets/logo.jpg";
import { FaPhoneVolume } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { Box } from "@mui/material";

export const FooterCustomer = () => {
  return (
    <Box>
      <div className="footer-maininfo w-full">
        <div className="w-full bg-[#d9d9d9]">
          <div className=" grid grid-cols-3 gap-4 px-8 ">
            <div className="m-[20px]">
              <h2 className="title-footer opened text-lg font-bold">
                Thông tin liên hệ
              </h2>
              <div className="content-footer">
                <p>
                  <b>Purrpet</b> là trang mua sắm trực tuyến các sản phẩm bán lẻ
                  dành cho thú cưng của <b>Purr Pet shop</b>.
                </p>

                <div className="logo-footer max-w-[50%]">
                  <a
                    href="#"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full"
                  >
                    <img
                      src={img}
                      alt="Purrpet - Mua sắm thú cưng online"
                      title="Purrpet - Mua sắm thú cưng online"
                    />
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md-3 col-sm-12 col-xs-12 widget-footer m-[20px]">
              <h2 className="title-footer text-lg font-bold">
                Thông tin cửa hàng
              </h2>
              <div className="content-footer block-collapse">
                <div className="address-footer">
                  <ul>
                    <li className="contact-1">
                      <b>Cửa hàng 1 </b>:{" "}
                      <a
                        rel="noopener noreferrer"
                        href="https://maps.app.goo.gl/XMsJzBQNxvRSUPwJA"
                        target="_blank"
                      >
                        Số 1, Võ Văn Ngân, P.Linh Chiểu, Q.Thủ Đức, HCM
                      </a>
                      <br />
                      <b>Cửa hàng 2 </b>:{" "}
                      <a
                        rel="noopener noreferrer"
                        href="https://maps.app.goo.gl/CkFeqchCndmJk4v37"
                        target="_blank"
                      >
                        484, Lê Văn Việt, P.Tăng Nhơn Phú A, Q.9, HCM
                      </a>
                    </li>
                    <li className="contact-2 flex items-center">
                      <FaPhoneVolume className="mr-[20px] text-lg" />{" "}
                      0342.596.563
                    </li>
                    <li className="contact-2 flex items-center ">
                      <MdOutlineEmail className="mr-[20px] text-lg" />{" "}
                      purrpet@gmail.com
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-md-3 col-sm-12 col-xs-12 widget-footer m-[20px]">
              <h2 className="title-footer text-lg font-bold">
                Hỗ trợ khách hàng
              </h2>
              <div className="content-footer block-collapse">
                <ul className="footerNav-link">
                  <li className="item">
                    <a href="#" title="Tìm kiếm">
                      Tìm kiếm
                    </a>
                  </li>

                  <li className="item">
                    <a href="#" title="Giới thiệu">
                      Giới thiệu
                    </a>
                  </li>

                  <li className="item">
                    <a href="#" title="Chính sách bảo mật">
                      Tra cứu đơn hàng
                    </a>
                  </li>
                  <li className="item">
                    <a href="#" title="Chính sách đổi trả">
                      Thông tin sản phẩm
                    </a>
                  </li>

                  <li className="item">
                    <a href="#" title="Hướng dẫn mua hàng">
                      Dịch vụ spa - grooming
                    </a>
                  </li>

                  <li className="item">
                    <a href="#" title="Điều khoản dịch vụ">
                      Đặt lịch dịch vụ
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};
