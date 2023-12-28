import { Box } from "@mui/material";
import { HeaderStaff } from "../../components/Header/HeaderStaff";
import { SideNavStaff } from "../../components/Nav/SideNavStaff";
import { BookingHome } from "./BookingHome";

export const CreateBookingHome = () => {
  return (
    <>
      <HeaderStaff />
      <Box style={{ display: "flex" }}>
        <SideNavStaff />
        <BookingHome />
      </Box>
    </>
  );
};
