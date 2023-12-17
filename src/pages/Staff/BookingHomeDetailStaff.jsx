import { HeaderStaff } from "../../components/Header/HeaderStaff";
import { SideNavStaff } from "../../components/Nav/SideNavStaff";
import { BookingHomeDetail } from "../../components/Admin/BookingHomeDetail";
import { Box } from "@mui/material";

export const BookingHomeDetailStaff = () => {
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
          <BookingHomeDetail />
        </Box>
      </Box>
    </>
  );
};
