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
import { getCart } from "../../api/cart";

export function HeaderCustomer() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorProduct, setAnchorProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [cartBadge, setCartBadge] = useState(0);
  const open = Boolean(anchorProduct);
  const openNav = Boolean(anchorElNav);

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleClose = () => {
    setAnchorProduct(null);
  };

  useEffect(() => {
    const params = { categoryType: CONST.CATEGORY_TYPE.PRODUCT };
    getActiveCategories(params).then((res) => {
      console.log(res.data);
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
              width: "50%",
            }}
          >
            <Button
              sx={{
                color: "black",
                display: "block",
                fontWeight: "bold",
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
              }}
              onClick={() => {
                navigate("/introduction");
              }}
            >
              Giới thiệu
            </Button>
            <Button
              className="flex font-bold text-black"
              onClick={() => {
                navigate("/product");
              }}
            >
              Sản phẩm
            </Button>
            <Menu
              id="fade-menu"
              MenuListProps={{
                "aria-labelledby": "fade-button",
              }}
              anchorEl={anchorProduct}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              {categories.map((category) => (
                <MenuItem key={category.categoryName} onClick={handleClose}>
                  {category.categoryName}
                </MenuItem>
              ))}
            </Menu>
            <Button
              sx={{
                color: "black",
                display: "block",
                fontWeight: "bold",
              }}
              onClick={() => {
                navigate("/service");
              }}
            >
              Dịch vụ
            </Button>
            <Menu
              id="fade-menu"
              MenuListProps={{
                "aria-labelledby": "fade-button",
              }}
              anchorEl={anchorElNav}
              open={openNav}
              TransitionComponent={Fade}
            >
              <MenuItem
                onClick={() => {
                  navigate("/service/spa");
                }}
              >
                Dịch vụ khách sạn
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/service/homestay");
                }}
              >
                Dịch vụ Spa
              </MenuItem>
            </Menu>
            <Button
              sx={{
                color: "black",
                display: "block",
                fontWeight: "bold",
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
            <Box>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Tìm kiếm"
                className="w-[150px]"
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
