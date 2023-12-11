import { SideNavAdmin } from "../../components/Nav/SideNavAdmin";
import { Box } from "@mui/material";
import { TableAccount } from "../../components/Account/TableAccount";
import { HeaderAdmin } from "../../components/Header/HeaderAdmin";

export const Account = () => {
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
          <TableAccount />
        </Box>
      </Box>
    </>
  );
};
