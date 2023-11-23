import { Sidenav } from "../../components/Admin/Sidenav";
import { Box } from "@mui/material";
import { ListHomestay } from "../../components/Homestay/ListHomestay";
import { HeaderAdmin } from "../../components/Header/HeaderAdmin";

export const Homestay = () => {
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
          <ListHomestay />
        </Box>
      </Box>
    </>
  );
};
