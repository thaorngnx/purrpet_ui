import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import { useStore } from "../../zustand/store";
import { useNavigate } from "react-router-dom";
import { BigHoverButton } from "../Button/StyledButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SavingsIcon from "@mui/icons-material/Savings";
import AnalyticsIcon from "@mui/icons-material/Analytics";

export const SideNavCustomerInfo = () => {
  const navigate = useNavigate();

  const { logout } = useStore();

  const handleLogout = () => {
    logout();
    navigate("/lookup");
  };
  return (
    <Box>
      <Box className="flex hidden min-h-screen w-1/6 min-w-[200px] flex-col p-2 pt-5 shadow-md shadow-zinc-400 md:block">
        <Link
          to={"/customer"}
          underline="none"
          color={"inherit"}
          className="m-2 flex flex-row items-center"
        >
          <ContactPageIcon className="mr-1" />
          <Typography
            variant="h2"
            gutterBottom
            component="div"
            className="m-0 text-base"
          >
            Thông tin cá nhân
          </Typography>
        </Link>
        <Link
          to={"/order"}
          underline="none"
          color={"inherit"}
          className="m-2 flex flex-row"
        >
          <ReceiptLongIcon className="mr-1" />
          <Typography
            variant="h2"
            gutterBottom
            component="div"
            className="m-0 text-base"
          >
            Đơn hàng của tôi
          </Typography>
        </Link>
        <Link
          to={"/notification"}
          underline="none"
          color={"inherit"}
          className="m-2 flex flex-row"
        >
          <NotificationsIcon className="mr-1" />
          <Typography
            variant="h2"
            gutterBottom
            component="div"
            className="m-0 text-base"
          >
            Thông báo
          </Typography>
        </Link>
        <Link
          to={"/wallet"}
          underline="none"
          color={"inherit"}
          className="m-2 flex flex-row"
        >
          <SavingsIcon className="mr-1" />
          <Typography
            variant="h2"
            gutterBottom
            component="div"
            className="m-0 text-base"
          >
            Ví xu của bạn
          </Typography>
        </Link>
        <Link
          to={"/favorite"}
          underline="none"
          color={"inherit"}
          className="m-2 flex flex-row"
        >
          <SavingsIcon className="mr-1" />
          <Typography
            variant="h2"
            gutterBottom
            component="div"
            className="m-0 text-base"
          >
            Sản phẩm yêu thích
          </Typography>
        </Link>
        <Link
          to={"/spending"}
          underline="none"
          color={"inherit"}
          className="m-2 flex flex-row"
        >
          <AnalyticsIcon className="mr-1" />
          <Typography
            variant="h2"
            gutterBottom
            component="div"
            className="m-0 text-base"
          >
            Thống kê chi tiêu
          </Typography>
        </Link>
        <BigHoverButton onClick={handleLogout} className="my-5">
          Đăng xuất
        </BigHoverButton>
      </Box>
      <Box className="flex w-full flex-row items-center justify-center justify-around bg-[#eceef0] p-4 md:hidden">
        <Link
          to="/customer"
          underline="line"
          className="s-{12px} item-center ml-3 flex text-black"
          style={{ textDecoration: "underline" }}
        >
          Thông tin cá nhân
        </Link>
        <Link
          to="/order"
          underline="line"
          className="s-{12px} ml-3 flex justify-center text-black"
          style={{ textDecoration: "underline" }}
        >
          Đơn hàng của tôi
        </Link>
        <Link
          to="/notification"
          underline="line"
          className="s-{12px} ml-3 flex justify-center text-black"
          style={{ textDecoration: "underline" }}
        >
          Thông báo
        </Link>
        <Link
          to="/wallet"
          underline="line"
          className="s-{12px} ml-3 flex justify-center text-black"
          style={{ textDecoration: "underline" }}
        >
          Ví xu của bạn
        </Link>
        <Link
          to="/spending"
          underline="line"
          className="s-{12px} ml-3 flex justify-center text-black"
          style={{ textDecoration: "underline" }}
        >
          Thống kê chi tiêu
        </Link>
      </Box>
    </Box>
  );
};
