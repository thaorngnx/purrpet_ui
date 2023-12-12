import { HeaderAdmin } from "../../components/Header/HeaderAdmin";
import { SideNavAdmin } from "../../components/Nav/SideNavAdmin";
import { BookingSpaDetail } from "../../components/Admin/BookingSpaDetail";
import { Box } from "@mui/material";

export const BookingSpaDetailAdmin = () => {
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
          <BookingSpaDetail />
        </Box>
      </Box>
    </>
  );
};
