import { HeaderAdmin } from "../../components/Header/HeaderAdmin";
import { SideNavAdmin } from "../../components/Nav/SideNavAdmin";
import { HomeHistory } from "../../components/Admin/HomeHistory";
import { Box } from "@mui/material";

export const BookingHome = () => {
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
          <HomeHistory />
        </Box>
      </Box>
    </>
  );
};
