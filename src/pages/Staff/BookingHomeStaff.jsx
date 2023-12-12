import { HeaderStaff } from "../../components/Header/HeaderStaff";
import { SideNavStaff } from "../../components/Nav/SideNavStaff";
import { HomeHistory } from "../../components/Admin/HomeHistory";
import { Box } from "@mui/material";

export const BookingHomeStaff = () => {
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
          <HomeHistory />
        </Box>
      </Box>
    </>
  );
};
