import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  List,
  CssBaseline,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MuiDrawer from "@mui/material/Drawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import BedroomChildIcon from "@mui/icons-material/BedroomChild";
import PetsIcon from "@mui/icons-material/Pets";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useRef } from "react";
import { socket } from "../../../socket";
import { Socket } from "socket.io-client";
import { useStore } from "../../zustand/store";


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1.5),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const NavNoti= [
  {
    icon: <NotificationsIcon />,
    text: "Thông báo",
    href: "/staff/notification",
  }
];

const NavListCreate = [
  {
    icon: <AddShoppingCartIcon />,
    text: "Tạo đơn hàng",
    href: "/staff/create/order",
  },
  {
    icon: <PetsIcon />,
    text: "Tạo đơn đặt lịch spa",
    href: "/staff/create/bookingSpa",
  },
  {
    icon: <BedroomChildIcon />,
    text: "Tạo đơn đặt phòng",
    href: "/staff/create/bookingHome",
  },
];

const NavListManage = [
  { icon: <ListAltIcon />, text: "Quản lý đơn hàng", href: "/staff/order" },
  {
    icon: <CalendarMonthIcon />,
    text: "Quản lý lịch đặt spa",
    href: "/staff/bookingSpa",
  },
  {
    icon: <HolidayVillageIcon />,
    text: "Quản lý đặt phòng",
    href: "/staff/bookingHome",
  },
];

export const SideNavStaff = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const notifications = useStore((state) => state.notificationState.data);
  const { getAllNotifications } = useStore();
  const accessToken = Cookies.get('access_token');

  const notiNotSeen = notifications?.filter(
    (noti) => noti.seen === false,
  ).length;

  const socketRef = useRef(Socket);

  useEffect(() => {
  
    if(accessToken){
     getAllNotifications();
    }
  },[]);

  useEffect(() => {
    if (accessToken
    ) {
      // Socket
      const socketClient = socket(accessToken);
      socketRef.current = socketClient;

      function onTradeEvent(value) {
        const socketData = JSON.parse(value);
      getAllNotifications();
      }
      socketClient.on('connect', () => {
        console.log('socket connected');
      });

      socketClient.on(accessToken, onTradeEvent);

      return () => {
        socketClient.off(accessToken, onTradeEvent);
      };
    }
  }, [accessToken]);


  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={() => setOpen(!open)}>
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {
          NavNoti.map((nav) => (
            <List>
              <ListItem
                key={nav.text}
                sx={{ display: "block", p: 0 }}
                onClick={() => {
                  navigate(nav.href);
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                     <Badge badgeContent={notiNotSeen  > 0 ? notiNotSeen  : null} color="error">
                    <Tooltip title={nav.text} placement="right">
                      {nav.icon}
                    </Tooltip>
                    </Badge>
                  </ListItemIcon>
                  <ListItemText
                    primary={nav.text}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          ))
        }
        <List>
          {NavListCreate.map((nav) => (
            <ListItem
              key={nav.text}
              sx={{ display: "block", p: 0 }}
              onClick={() => {
                navigate(nav.href);
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <Tooltip title={nav.text} placement="right">
                    {nav.icon}
                  </Tooltip>
                </ListItemIcon>
                <ListItemText
                  primary={nav.text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {NavListManage.map((nav) => (
            <ListItem
              key={nav.text}
              sx={{ display: "block", p: 0 }}
              onClick={() => {
                navigate(nav.href);
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <Tooltip title={nav.text} placement="right">
                    {nav.icon}
                  </Tooltip>
                </ListItemIcon>
                <ListItemText
                  primary={nav.text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
