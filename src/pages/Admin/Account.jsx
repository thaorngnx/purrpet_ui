import { Sidenav } from "../../components/Admin/Sidenav";
import { Box } from "@mui/material";
import { ListAccount } from "../../components/Account/ListAccount";
export const Account = () => {
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
        <ListAccount />
      </Box>
    </Box>
  );
};
