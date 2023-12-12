import { HeaderStaff } from "../../components/Header/HeaderStaff";
import { SideNavStaff } from "../../components/Nav/SideNavStaff";
import { SpaHistory } from "../../components/Admin/SpaHistory";
import { Box } from "@mui/material";

export const BookingSpaStaff = () => {
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
          <SpaHistory />
        </Box>
      </Box>
    </>
  );
};
