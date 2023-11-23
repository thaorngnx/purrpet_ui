import { Sidenav } from "../../components/Admin/Sidenav";
import { Box } from "@mui/material";
import { ListSpa } from "../../components/Spa/ListSpa";
import { HeaderAdmin } from "../../components/Header/HeaderAdmin";

export const Spa = () => {
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
          <ListSpa />
        </Box>
      </Box>
    </>
  );
};
