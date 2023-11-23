import { Sidenav } from "../../components/Admin/Sidenav";
import { Box } from "@mui/material";
import { ListProduct } from "../../components/Product/ListProduct";
import { HeaderAdmin } from "../../components/Header/HeaderAdmin";

export const Product = () => {
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
          <ListProduct />
        </Box>
      </Box>
    </>
  );
};
