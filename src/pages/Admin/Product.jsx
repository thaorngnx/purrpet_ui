import { Sidenav } from "../../components/Admin/Sidenav";
import { Box } from "@mui/material";
import { ListProduct } from "../../components/Product/ListProduct";
export const Product = () => {
  return (
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
  );
};
