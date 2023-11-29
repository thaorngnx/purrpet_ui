import { SideNavAdmin } from "../../components/Nav/SideNavAdmin";
import { Box } from "@mui/material";
import { TableSpa } from "../../components/Spa/TableSpa";
import { HeaderAdmin } from "../../components/Header/HeaderAdmin";

export const Spa = () => {
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
          <TableSpa />
        </Box>
      </Box>
    </>
  );
};
