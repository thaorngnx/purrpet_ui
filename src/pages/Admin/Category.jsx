import { SideNavAdmin } from "../../components/Nav/SideNavAdmin";
import { Box } from "@mui/material";
import { TableCategory } from "../../components/Category/TableCategory";
import { HeaderAdmin } from "../../components/Header/HeaderAdmin";

export const Category = () => {
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
          <TableCategory />
        </Box>
      </Box>
    </>
  );
};
