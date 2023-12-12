import { HeaderAdmin } from "../../components/Header/HeaderAdmin";
import { SideNavAdmin } from "../../components/Nav/SideNavAdmin";
import { OrderDetail } from "../../components/Admin/OrderDetail";
import { Box } from "@mui/material";

export const OrderDetailAdmin = () => {
  return (
    <>
      <HeaderAdmin />
      <Box sx={{ display: "flex" }}>
        <SideNavAdmin />
        <Box
          sx={{
            display: "block",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
            marginBottom: "30px",
          }}
        >
          <OrderDetail />
        </Box>
      </Box>
    </>
  );
};
