import { HeaderAdmin } from "../../components/Header/HeaderAdmin";
import { SideNavAdmin } from "../../components/Nav/SideNavAdmin"
import { Box } from "@mui/material";
import { Notification } from "../../components/Admin/Notification";

export const NotificationAdmin = () => {
    
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
                <Notification />
            </Box>
        </Box>
        </>
    );
    }