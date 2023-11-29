import { SideNavAdmin } from "../../components/Nav/SideNavAdmin";
import { Box } from "@mui/material";
import { TableProduct } from "../../components/Product/TableProduct";
import { HeaderAdmin } from "../../components/Header/HeaderAdmin";

export const Product = () => {
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
          <TableProduct />
        </Box>
      </Box>
    </>
  );
};
