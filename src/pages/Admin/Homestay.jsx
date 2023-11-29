import { SideNavAdmin } from "../../components/Nav/SideNavAdmin";
import { Box } from "@mui/material";
import { TableHomestay } from "../../components/Homestay/TableHomestay";
import { HeaderAdmin } from "../../components/Header/HeaderAdmin";

export const Homestay = () => {
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
          <TableHomestay />
        </Box>
      </Box>
    </>
  );
};
