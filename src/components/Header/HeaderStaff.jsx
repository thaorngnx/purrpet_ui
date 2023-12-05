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
import Cookies from "universal-cookie";

export const HeaderStaff = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();

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
      if (res.err === 0) {
        cookies.remove(import.meta.env.VITE_APP_COOKIE_ACCESS_TOKEN);
        cookies.remove(import.meta.env.VITE_APP_COOKIE_REFRESH_TOKEN);
        navigate("/staff/login");
      }
    });
  };

  return (
    <AppBar position="static" sx={{ background: "#d9d9d9" }}>
      <Toolbar>
        <Typography sx={{ flexGrow: 1 }}>
          <img
            src={logo}
            alt="logo"
            style={{ width: "20%", marginRight: "25%", marginLeft: "auto" }}
          />
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
