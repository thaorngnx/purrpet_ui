import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import * as CONST from "../../constants";

import { getCategories } from "../../api/category";
import { useEffect, useState } from "react";

import img from "../../assets/logo.jpg";

export function HeaderCustomer() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorProduct, setAnchorProduct] = React.useState(null);
  const [categories, setCategories] = useState([]);
  const open = Boolean(anchorProduct);
  const openNav = Boolean(anchorElNav);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleClick = (event) => {
    setAnchorProduct(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorProduct(null);
  };

  useEffect(() => {
    getCategories();
    const params = { categoryType: CONST.CATEGORY_TYPE.PRODUCT };
    getCategories(params).then((res) => {
      console.log(res.data);
      setCategories(res.data);
    });
  }, []);

  return (
    <AppBar position="static" className="bg-[#d9d9d9]">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src={img} alt="logo" width="15%" />
          <Box
            sx={{
              // flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "space-around",
              width: "60%",
            }}
          >
            <Button
              sx={{
                my: 2,
                color: "black",
                display: "block",
                fontWeight: "bold",
              }}
            >
              Trang chủ
            </Button>
            <Button
              sx={{
                my: 2,
                color: "black",
                display: "block",
                fontWeight: "bold",
              }}
            >
              Giới thiệu
            </Button>
            <Button
              sx={{
                my: 2,
                color: "black",
                display: "block",
                fontWeight: "bold",
              }}
              onClick={handleClick}
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
                <MenuItem onClick={handleClose}>
                  {category.categoryName}
                </MenuItem>
              ))}
            </Menu>
            <Button
              onClick={handleOpenNavMenu}
              sx={{
                my: 2,
                color: "black",
                display: "block",
                fontWeight: "bold",
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
              onClose={handleCloseNavMenu}
              TransitionComponent={Fade}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                Dịch vụ khách sạn
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>Dịch vụ Spa</MenuItem>
            </Menu>
            <Button
              sx={{
                my: 2,
                color: "black",
                display: "block",
                fontWeight: "bold",
              }}
            >
              Đặt lịch
            </Button>
          </Box>
          <div className="relative flex w-[25%] max-w-full items-center justify-between text-black">
            <a href="#">Tra cứu đơn hàng</a>
            <div className="relative">
              <input
                type="text"
                className="bg-[#d9d9d9]"
                placeholder="Tìm kiếm..."
              />
              <div className="absolute right-0 top-0 flex h-full items-center px-2 text-gray-400">
                <AiOutlineSearch className="text-lg text-black" />
              </div>
            </div>
            <a href="">
              <AiOutlineShoppingCart className="text-lg text-black" />
            </a>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
