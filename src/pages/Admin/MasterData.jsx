import { Sidenav } from "../../components/Admin/Sidenav";
import { Box } from "@mui/material";
import { ListMasterData } from "../../components/MasterData/ListMasterData";
import { HeaderAdmin } from "../../components/Header/HeaderAdmin";

export const MasterData = () => {
  return (
    <>
      <HeaderAdmin />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box
          sx={{
            display: "block",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
            marginBottom: "30px",
          }}
        >
          <ListMasterData />
        </Box>
      </Box>
    </>
  );
};
