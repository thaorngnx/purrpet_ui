import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { logout } from "../../api/auth";
import logo from "../../assets/logo.jpg";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";

export const HeaderAdmin = () => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout().then((res) => {
      console.log(res);
      if (res.err === 0) {
        Cookie.remove(import.meta.env.VITE_APP_COOKIE_ACCESS_TOKEN, {
          path: "/admin",
        });
        Cookie.remove(import.meta.env.VITE_APP_COOKIE_REFRESH_TOKEN, {
          path: "/admin",
        });
        navigate("/admin/login");
      }
    });
  };

  return (
    <AppBar
      position="static"
      className="sticky top-0 z-[100] flex-none bg-[#d9d9d9]"
    >
      <Toolbar>
        <Typography className="ml-[48%] w-fit">
          <img src={logo} alt="logo" className=" w-28" />
        </Typography>
        <Typography
          variant="inherit"
          sx={{
            flexGrow: 1,
            color: "#000000",
            fontWeight: "bold",
            textAlign: "end",
          }}
        >
          Hi, {username}
        </Typography>
        <IconButton
          size="large"
          edge="end"
          color="base"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenuOpen}
          sx={{ ml: 2 }}
        >
          <AccountCircle />
          <Typography sx={{ ml: 1 }}></Typography>
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
