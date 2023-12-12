import { HeaderAdmin } from "../../components/Header/HeaderAdmin";
import { SideNavAdmin } from "../../components/Nav/SideNavAdmin";
import { OrderHistory } from "../../components/Admin/OrderHistory";
import { Box } from "@mui/material";

export const OrderAdmin = () => {
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
          <OrderHistory />
        </Box>
      </Box>
    </>
  );
};
