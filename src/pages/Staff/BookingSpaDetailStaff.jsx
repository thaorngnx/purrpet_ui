import { HeaderStaff } from "../../components/Header/HeaderStaff";
import { SideNavStaff } from "../../components/Nav/SideNavStaff";
import { BookingSpaDetail } from "../../components/Admin/BookingSpaDetail";
import { Box } from "@mui/material";

export const BookingSpaDetailStaff = () => {
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
          <BookingSpaDetail />
        </Box>
      </Box>
    </>
  );
};
