import { TableComsignment } from "../../components/Comsignment/TableComsignment";
import { Box } from "@mui/system";
import { HeaderAdmin } from "../../components/Header/HeaderAdmin";
import { SideNavAdmin } from "../../components/Nav/SideNavAdmin";


export const Comsignment = () => {
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
           <TableComsignment/>
            </Box>
        </Box>
        </>
    );
    };