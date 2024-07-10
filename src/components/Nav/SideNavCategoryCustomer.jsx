import React, { useState, useEffect } from "react";
import {
  Box,
  List,
  ListItemButton,
  Typography,
  Divider,
 
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, useLocation } from "react-router-dom";
import { useStore } from "../../zustand/store";

export const SideNavCategoryCustomer = ({ onSelect }) => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const categories = useStore((state) => state.activeProductCategoryState.data);

  const handleCategoryClick = (categoryCode) => {
    if (!categoryCode) {
      navigate(`/product`);
      return;
    }
    navigate(`/product?category=${categoryCode}`);
    if(mobileOpen){
      setMobileOpen(false);
    }
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box>
  
    <Box className="text-bold  flex-col hidden md:flex">
      <Typography variant="h6" className="text-center font-sans font-bold">
        Danh mục sản phẩm
      </Typography>
      <Divider className="mx-auto w-1/2 border-t-2 border-gray-500" />
      <List className="flex-col">
        <ListItemButton
          key="all"
          sx={{ display: "block" }}
          onClick={() => {
            handleCategoryClick();
          }}
        >
          <Typography
            component="div"
            className=" my-1 overflow-hidden text-ellipsis whitespace-nowrap text-sm "
          >
            Tất cả
          </Typography>
        </ListItemButton>
        {categories.map((category) => (
          <ListItemButton
            key={category.purrPetCode}
            sx={{ display: "block" }}
            onClick={() => {
              handleCategoryClick(category.purrPetCode);
            }}
          >
            <Typography
              component="div"
              className=" my-1 overflow-hidden text-ellipsis whitespace-nowrap text-sm"
            >
              {category.categoryName}
            </Typography>
          </ListItemButton>
        ))}
      </List>

    </Box>
    <Box
            sx={{
              display: { xs: "block", md: "none", lg: "none", margin: "auto" },
            }}
          >
            <MenuIcon
              className="text-black"
              onClick={() => handleDrawerToggle()}
            />
          </Box>
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={() => handleDrawerToggle()}
        >
          <Box className="w-50">
            <Typography variant="h6" className="text-center font-sans font-bold">
              Danh mục sản phẩm
            </Typography>
            <Divider className="mx-auto w-1/2 border-t-2 border-gray-500" />
            <List className="flex-col">
              <ListItemButton
                key="all"
                sx={{ display: "block" }}
                onClick={() => {
                  handleCategoryClick();
                }}
              >
                <Typography
                  component="div"
                  className=" my-1 overflow-hidden text-ellipsis whitespace-nowrap text-sm"
                >
                  Tất cả
                </Typography>
              </ListItemButton>
              {categories.map((category) => (
                <ListItemButton
                  key={category.purrPetCode}
                  sx={{ display: "block" }}
                  onClick={() => {
                    handleCategoryClick(category.purrPetCode);
                  }}
                >
                  <Typography
                    component="div"
                    className=" my-1 overflow-hidden text-ellipsis whitespace-nowrap text-sm"
                  >
                    {category.categoryName}
                  </Typography>
                </ListItemButton>
              ))}
            </List>
          </Box>
        </Drawer>
    </Box>
  );
};
