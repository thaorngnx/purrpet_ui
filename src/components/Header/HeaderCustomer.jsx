import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Container,
  Button,
  Badge,
  TextField,
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import img from "../../assets/logo.jpg";
import { useStore } from "../../zustand/store";

export function HeaderCustomer() {
  const cart = useStore((state) => state.cartState.data);
  const categories = useStore((state) => state.activeProductCategoryState.data);

  const [style, setStyle] = useState(false);
  const [style2, setStyle2] = useState(false);
  const [style3, setStyle3] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const navigate = useNavigate();

  const handleCategorySelect = (categoryCode) => {
    navigate(`/product?category=${categoryCode}`);
  };
  const handleSearch = () => {
    navigate(`/product?search=${searchKey}`);
  };

  return (
    <AppBar
      position="static"
      className="sticky top-0 z-[100] flex-none bg-[#d9d9d9]"
    >
      <Container className="p-0">
        <Toolbar disableGutters>
          <img src={img} alt="logo" width="15%" />
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "space-around",
              alignItems: "center",
              width: "50%",
            }}
          >
            <Link
              to="/"
              underline="none"
              className="s-{16px}  flex pb-[3px] font-bold text-black"
            >
              TRANG CHỦ
            </Link>
            <Link
              to="/introduction"
              underline="none"
              className="s-{16px}  flex pb-[3px] font-bold text-black"
            >
              GIỚI THIỆU
            </Link>
            <div
              className="relative inline-block"
              onMouseEnter={() => setStyle2(false) ?? setStyle3(false)}
            >
              <Link
                to="/product"
                underline="none"
                onMouseEnter={() => setStyle(true)}
                className="s-{16px}  flex pb-[3px] font-bold text-black"
              >
                SẢN PHẨM
              </Link>
              {style && (
                <div
                  className=" t-[100%] l-[50%]  absolute z-10 mt-7  w-max translate-x-[-35%] rounded-md bg-white shadow-lg"
                  onMouseLeave={() => setStyle(false)}
                >
                  {categories.map((category) => (
                    <div
                      key={category.categoryName}
                      className="mx-3 flex h-[50px] flex-col items-center justify-center border-b-2 border-gray-200 hover:bg-gray-100"
                    >
                      <Button
                        className="text-black"
                        onClick={() => {
                          handleCategorySelect(category.purrPetCode);
                        }}
                      >
                        {category.categoryName}
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div
              className="relative inline-block"
              onMouseEnter={() => setStyle(false) ?? setStyle3(false)}
            >
              <Link
                underline="none"
                onMouseEnter={() => setStyle2(true)}
                className="s-{16px} flex  pb-[3px] font-bold text-black"
              >
                DỊCH VỤ
              </Link>

              {style2 && (
                <div
                  className="t-[100%] l-[50%] absolute z-10  mt-7  w-max translate-x-[-26%] rounded-md bg-white shadow-lg"
                  onMouseLeave={() => setStyle2(false)}
                >
                  <div className="mx-3 flex h-[50px] flex-col items-center justify-center border-b-2 border-gray-200 hover:bg-gray-100">
                    <Button
                      className="text-black"
                      onClick={() => {
                        navigate(`/service/homestay`);
                      }}
                    >
                      Dịch vụ khách sạn
                    </Button>
                  </div>
                  <div className="mx-3 flex h-[50px] flex-col items-center justify-center border-b-2 border-gray-200 hover:bg-gray-100">
                    <Button
                      className="text-black"
                      onClick={() => {
                        navigate(`/service/spa`);
                      }}
                    >
                      Dịch vụ Spa
                    </Button>
                  </div>
                </div>
              )}
            </div>
            <div onMouseEnter={() => setStyle2(false) ?? setStyle(false)}>
              <Link
                underline="none"
                className="s-{16px}  flex pb-[3px] font-bold text-black"
                onMouseEnter={() => setStyle3(true)}
              >
                ĐẶT LỊCH
              </Link>
              {style3 && (
                <div
                  className="t-[100%] l-[50%] absolute z-10  mt-7  w-max translate-x-[-26%] rounded-md bg-white shadow-lg"
                  onMouseLeave={() => setStyle3(false)}
                >
                  <div className="mx-3 flex h-[50px] flex-col items-center justify-center border-b-2 border-gray-200 hover:bg-gray-100">
                    <Button
                      className="text-black"
                      onClick={() => {
                        navigate(`/booking/home`);
                      }}
                    >
                      Đặt lịch khách sạn
                    </Button>
                  </div>
                  <div className="mx-3 flex h-[50px] flex-col items-center justify-center border-b-2 border-gray-200 hover:bg-gray-100">
                    <Button
                      className="text-black"
                      onClick={() => {
                        navigate(`/booking/spa`);
                      }}
                    >
                      Đặt lịch Spa
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Box>
          <Box className="flex w-[35%] items-center justify-end text-center text-black">
            <Button
              sx={{
                color: "black",
                display: "block",
                fontWeight: "bold",
                border: "1px solid black",
                textTransform: "none",
                mr: 1,
              }}
              onClick={() => {
                navigate("/lookup");
              }}
            >
              Tra cứu đơn hàng
            </Button>
            <Box className="flex items-center">
              <TextField
                variant="outlined"
                size="small"
                placeholder="Tìm kiếm"
                className=" w-[150px]"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
              />
              <SearchOutlinedIcon onClick={handleSearch} />
              <Badge
                badgeContent={cart.length > 0 ? cart.length : null}
                color="primary"
              >
                <ShoppingCartOutlinedIcon
                  onClick={() => {
                    navigate("/cart");
                  }}
                />
              </Badge>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
