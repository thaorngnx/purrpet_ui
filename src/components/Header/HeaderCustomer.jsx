import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Menu,
  Container,
  Button,
  MenuItem,
  Fade,
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
import { getCart, getProducts } from "../../api/cart";
import Tooltip from "@mui/material/Tooltip";
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

  const hadleClickCategory = (category) => {
    const params = { category: category };
    getProducts(params).then((res) => {
      navigate("/product", { state: res.data });
    });
  };

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
            <Button
              sx={{
                color: "black",
                display: "block",
                fontWeight: "bold",
                fontSize: "16px",
              }}
              onClick={() => {
                navigate("/");
              }}
            >
              Trang chủ
            </Button>
            <Button
              sx={{
                color: "black",
                display: "block",
                fontWeight: "bold",
                fontSize: "16px",
              }}
              onClick={() => {
                navigate("/introduction");
              }}
            >
              Giới thiệu
            </Button>
            <Box sx={{ position: "relative" }}>
              <a
                href="/product"
                onMouseEnter={() => setStyle(true)}
                className="s-{16px}  flex pb-[3px] font-bold text-black"
              >
                SẢN PHẨM
              </a>

              {style && (
                <div
                  className="  absolute  z-10  mt-7 w-max rounded-md bg-white shadow-lg"
                  onMouseLeave={() => setStyle(false)}
                >
                  {categories.map((category) => (
                    <div
                      key={category.categoryName}
                      className="mx-3 flex h-[50px] flex-col items-center justify-center border-b-2 border-gray-200 hover:bg-gray-100"
                    >
                      <Button
                        onClick={() => hadleClickCategory(category.purrPetCode)} // chỉnh lại phần này nhe
                        className="text-black"
                      >
                        {category.categoryName}
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </Box>
            <Box sx={{ position: "relative" }}>
              <a
                href="/service"
                onMouseEnter={() => setStyle2(true)}
                className="s-{16px}  flex pb-[3px] font-bold text-black"
              >
                DỊCH VỤ
              </a>

              {style2 && (
                <div
                  className=" absolute  z-10  mt-9 w-max rounded-md bg-white shadow-lg"
                  onMouseLeave={() => setStyle2(false)}
                >
                  <div className="mx-3 flex h-[50px] flex-col items-center justify-center border-b-2 border-gray-200 hover:bg-gray-100">
                    <Link to={`/service/homestay`} className="text-black">
                      Dịch vụ khách sạn
                    </Link>
                  </div>
                  <div className="mx-3 flex h-[50px] flex-col items-center justify-center border-b-2 border-gray-200 hover:bg-gray-100">
                    <Link to={`/service/spa`} className="text-black">
                      Dịch vụ Spa
                    </Link>
                  </div>
                </div>
              )}
            </Box>
            <Button
              sx={{
                color: "black",
                display: "block",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              Đặt lịch
            </Button>
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
