import { SideNavAdmin } from "../../components/Nav/SideNavAdmin";
import { Box } from "@mui/material";
import { TableMasterData } from "../../components/MasterData/TableMasterData";
import { HeaderAdmin } from "../../components/Header/HeaderAdmin";

export const MasterData = () => {
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
          <TableMasterData />
        </Box>
      </Box>
    </>
  );
};
