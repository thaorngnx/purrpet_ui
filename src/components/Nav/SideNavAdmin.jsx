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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MuiDrawer from "@mui/material/Drawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HomeIcon from "@mui/icons-material/Home";
import BedroomChildIcon from "@mui/icons-material/BedroomChild";
import DatasetIcon from "@mui/icons-material/Dataset";
import PetsIcon from "@mui/icons-material/Pets";
import InventoryIcon from "@mui/icons-material/Inventory";
import CategoryIcon from "@mui/icons-material/Category";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  padding: theme.spacing(0, 1),
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

const NavList = [
  { icon: <HomeIcon />, text: "Trang chủ", href: "/admin" },
  {
    icon: <SupervisorAccountIcon />,
    text: "Quản lý tài khoản",
    href: "/admin/account",
  },
  { icon: <CategoryIcon />, text: "Quản lý danh mục", href: "/admin/category" },
  { icon: <InventoryIcon />, text: "Quản lý sản phẩm", href: "/admin/product" },
  { icon: <PetsIcon />, text: "Quản lý spa", href: "/admin/spa" },
  {
    icon: <BedroomChildIcon />,
    text: "Quản lý homestay",
    href: "/admin/homestay",
  },
  {
    icon: <DatasetIcon />,
    text: "Master Data",
    href: "/admin/masterData",
  },
];

export const SideNavAdmin = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

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
        <List>
          {NavList.map((nav) => (
            <ListItem
              key={nav.text}
              sx={{ display: "block" }}
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
      </Drawer>
    </Box>
  );
};
