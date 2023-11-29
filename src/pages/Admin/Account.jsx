import { SideNavAdmin } from "../../components/Nav/SideNavAdmin";
import { Box } from "@mui/material";
import { ListAccount } from "../../components/Account/ListAccount";
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
          <ListAccount />
        </Box>
      </Box>
    </>
  );
};
