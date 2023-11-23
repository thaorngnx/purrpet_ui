import { Sidenav } from "../../components/Admin/Sidenav";
import { Box } from "@mui/material";
import { ListCategory } from "../../components/Category/ListCategory";
import { HeaderAdmin } from "../../components/Header/HeaderAdmin";

export const Category = () => {
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
          <ListCategory />
        </Box>
      </Box>
    </>
  );
};
