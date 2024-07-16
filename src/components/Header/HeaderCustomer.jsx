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
import { Socket } from "socket.io-client";
import { socket } from "../../../socket";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import img from "../../assets/logo.jpg";
import { useStore } from "../../zustand/store";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNotificationStore } from "../../zustand/notificationStore";
import { FormNotification } from "../Notification/FormNotification";
import { useEffect } from "react";
import { getAllNotifications } from "../../api/notification";
import MenuIcon from "@mui/icons-material/Menu";
import { useRef } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";

export function HeaderCustomer() {
  const cart = useStore((state) => state.cartState.data);
  const customer = useStore((state) => state.customerState.data);
  const categories = useStore((state) => state.activeProductCategoryState.data);
  const [style, setStyle] = useState(false);
  const [style2, setStyle2] = useState(false);
  const [style3, setStyle3] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const notiNotSeen = notifications.filter(
    (noti) => noti.seen === false,
  ).length;

  const socketRef = useRef(Socket);

  useEffect(() => {
    if (customer && customer.accessToken) {
      getAllNotifications().then((res) => {
        setNotifications(res.data);
      });
    }
  }, []);

  useEffect(() => {
    if (customer && Object.keys(customer).length > 0 && customer.accessToken) {
      // Socket
      const accessToken = customer.accessToken;
      const socketClient = socket(accessToken);
      socketRef.current = socketClient;

      function onTradeEvent(value) {
        const socketData = JSON.parse(value);
        getAllNotifications().then((res) => {
          if (res.err === 0) {
            setNotifications(res.data);
          }
        });
      }
      socketClient.on("connect", () => {
        console.log("socket connected");
      });
      socketClient.on(accessToken, onTradeEvent);
      return () => {
        socketClient.off(accessToken, onTradeEvent);
      };
    }
  }, [customer?.accessToken]);

  const handleCategorySelect = (categoryCode) => {
    navigate(`/product?category=${categoryCode}`);
  };
  const handleSearch = () => {
    navigate(`/product?search=${searchKey}`);
  };
  const listNagivation = [
    {
      name: "Trang chủ",
      link: "/",
    },
    {
      name: "Giới thiệu",
      link: "/introduction",
    },
    {
      name: "Sản phẩm",
      link: "/product",
    },

    {
      name: "Dịch vụ Spa",
      link: "/service/spa",
    },
    {
      name: "Dịch vụ Homestay",
      link: "/service/homestay",
    },
    {
      name: "Đặt lịch khách sạn",
      link: "/booking/home",
    },
    {
      name: "Đặt lịch Spa",
      link: "/booking/spa",
    },
  ];
  const DrawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => handleDrawerToggle()}
    >
      <List
        sx={{
          padding: 0,
        }}
      >
        <img src={img} alt="logo" width="100%" />
        {listNagivation.map((item, index) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton>
              <Link to={item.link} underline="none">
                <ListItemText primary={item.name} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
        <Divider />

        <ListItemButton>
          <Link to="/lookup" underline="none">
            <ListItemText primary="Tra cứu đơn hàng" />
          </Link>
        </ListItemButton>
      </List>
    </Box>
  );
  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#d9d9d9",
        color: "black",
        boxShadow: "none",
        pr: {
          xs: 1,
          md: 0,
        },
      }}
    >
      <Container className="p-0" maxWidth="auto">
        <Toolbar disableGutters>
          <img src={img} alt="logo" width="15%" onClick={() => navigate("/")} />
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
            <Box
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
                <Box
                  className=" t-[100%] l-[50%]  absolute z-10 mt-7  w-max translate-x-[-35%] rounded-md bg-white shadow-lg"
                  onMouseLeave={() => setStyle(false)}
                >
                  {categories.map((category) => (
                    <Box
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
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
            <Box
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
                <Box
                  className="t-[100%] l-[50%] absolute z-10  mt-7  w-max translate-x-[-26%] rounded-md bg-white shadow-lg"
                  onMouseLeave={() => setStyle2(false)}
                >
                  <Box className="mx-3 flex h-[50px] flex-col items-center justify-center border-b-2 border-gray-200 hover:bg-gray-100">
                    <Button
                      className="text-black"
                      onClick={() => {
                        navigate(`/service/homestay`);
                      }}
                    >
                      Dịch vụ khách sạn
                    </Button>
                  </Box>
                  <Box className="mx-3 flex h-[50px] flex-col items-center justify-center border-b-2 border-gray-200 hover:bg-gray-100">
                    <Button
                      className="text-black"
                      onClick={() => {
                        navigate(`/service/spa`);
                      }}
                    >
                      Dịch vụ Spa
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
            <Box onMouseEnter={() => setStyle2(false) ?? setStyle(false)}>
              <Link
                underline="none"
                className="s-{16px}  flex pb-[3px] font-bold text-black"
                onMouseEnter={() => setStyle3(true)}
              >
                ĐẶT LỊCH
              </Link>
              {style3 && (
                <Box
                  className="t-[100%] l-[50%] absolute z-10  mt-7  w-max translate-x-[-26%] rounded-md bg-white shadow-lg"
                  onMouseLeave={() => setStyle3(false)}
                >
                  <Box className="mx-3 flex h-[50px] flex-col items-center justify-center border-b-2 border-gray-200 hover:bg-gray-100">
                    <Button
                      className="text-black"
                      onClick={() => {
                        navigate(`/booking/home`);
                      }}
                    >
                      Đặt lịch khách sạn
                    </Button>
                  </Box>
                  <Box className="mx-3 flex h-[50px] flex-col items-center justify-center border-b-2 border-gray-200 hover:bg-gray-100">
                    <Button
                      className="text-black"
                      onClick={() => {
                        navigate(`/booking/spa`);
                      }}
                    >
                      Đặt lịch Spa
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
          <Box className="flex w-full max-w-xs items-center justify-end text-center text-black sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
            <Box
              className="mr-2 md:mr-10"
              onMouseLeave={() => setShowNotification(false)}
            >
              <Badge
                badgeContent={notiNotSeen > 0 ? notiNotSeen : null}
                color="error"
              >
                <NotificationsIcon
                  color={showNotification ? "disabled" : "inherit"}
                  onMouseEnter={() => setShowNotification(true)}
                />
              </Badge>
              {showNotification && <FormNotification />}
            </Box>
            <Button
              className="hidden md:block"
              style={{
                color: "black",
                fontWeight: "bold",
                border: "1px solid black",
                textTransform: "none",
              }}
              onClick={() => {
                navigate("/lookup");
              }}
            >
              Tra cứu đơn hàng
            </Button>
            <Box className="ml-2 flex items-center md:ml-4">
              <TextField
                variant="outlined"
                size="small"
                placeholder="Tìm kiếm"
                className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
              />
              <SearchOutlinedIcon onClick={handleSearch} className="ml-2" />
              <Badge
                badgeContent={cart.length > 0 ? cart.length : null}
                color="primary"
                className="ml-2 mr-2 md:mr-4"
              >
                <ShoppingCartOutlinedIcon
                  onClick={() => {
                    navigate("/cart");
                  }}
                />
              </Badge>
            </Box>
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
        </Toolbar>
      </Container>
      <Drawer
        open={mobileOpen}
        anchor="right"
        onClose={() => handleDrawerToggle()}
      >
        {DrawerList}
      </Drawer>
    </AppBar>
  );
}
