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
import * as CONST from "../../constants";
import { getActiveCategories } from "../../api/category";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import img from "../../assets/logo.jpg";
import { getCart } from "../../api/cart";
import { Link } from "react-router-dom";

export function HeaderCustomer() {
  const [categories, setCategories] = useState([]);
  const [cartBadge, setCartBadge] = useState(0);

  const [style, setStyle] = useState(false);

  const [style2, setStyle2] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const params = { categoryType: CONST.CATEGORY_TYPE.PRODUCT };
    getActiveCategories(params).then((res) => {
      setCategories(res.data);
    });
  }, []);

  useEffect(() => {
    getCart().then((res) => {
      console.log(res.data);
      setCartBadge(res.length);
    });
  }, [cartBadge]);

  return (
    <AppBar position="static" className="mb-8 bg-[#d9d9d9]">
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
            <a
              href="/"
              className="s-{16px}  flex pb-[3px] font-bold text-black"
            >
              TRANG CHỦ
            </a>
            <a
              href="/introduction"
              className="s-{16px}  flex pb-[3px] font-bold text-black"
            >
              GIỚI THIỆU
            </a>
            <div
              className="relative inline-block"
              onMouseEnter={() => setStyle2(false)}
            >
              <a
                href="/product"
                onMouseEnter={() => setStyle(true)}
                className="s-{16px}  flex pb-[3px] font-bold text-black"
              >
                SẢN PHẨM
              </a>
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
                          navigate(`/product`);
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
              onMouseEnter={() => setStyle(false)}
            >
              <a
                href="/service"
                onMouseEnter={() => setStyle2(true)}
                className="s-{16px} flex  pb-[3px] font-bold text-black"
              >
                DỊCH VỤ
              </a>

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
            <a
              href="/introduction"
              className="s-{16px}  flex pb-[3px] font-bold text-black"
            >
              ĐẶT LỊCH
            </a>
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
              />
              <SearchOutlinedIcon />
              <Badge
                badgeContent={cartBadge > 0 ? cartBadge : null}
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
