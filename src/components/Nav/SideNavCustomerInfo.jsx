import { Box, Button, Link, Typography } from "@mui/material";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ContactPageIcon from "@mui/icons-material/ContactPage";

export const SideNavCustomerInfo = () => {
  return (
    <Box className="flex min-h-screen w-1/4 flex-col p-2 pt-5 shadow-md shadow-zinc-400">
      <Link
        href="/customer"
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
        href="/order"
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
      <Button
        size="small"
        sx={{
          color: "black",
          display: "block",
          fontWeight: "bold",
          fontSize: "16px",
          border: "1px solid black",
          textTransform: "none",
          m: 2,
          ":hover": {
            backgroundColor: "black",
            color: "white",
          },
        }}
      >
        Đăng xuất
      </Button>
    </Box>
  );
};
