import { HeaderStaff } from "../../components/Header/HeaderStaff";
import { SideNavStaff } from "../../components/Nav/SideNavStaff";
import { OrderHistory } from "../../components/Admin/OrderHistory";
import { Box } from "@mui/material";

export const OrderStaff = () => {
  return (
    <>
      <HeaderStaff />
      <Box sx={{ display: "flex" }}>
        <SideNavStaff />
        <Box
          sx={{
            display: "block",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
            marginBottom: "30px",
          }}
        >
          <OrderHistory />
        </Box>
      </Box>
    </>
  );
};
