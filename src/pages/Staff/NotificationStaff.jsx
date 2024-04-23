import { HeaderStaff } from "../../components/Header/HeaderStaff";
import { Box } from "@mui/material";
import { Notification } from "../../components/Admin/Notification";
import { SideNavStaff } from "../../components/Nav/SideNavStaff";

export const NotificationStaff = () => {
    return (
        <>
        <HeaderStaff />
        <Box sx={{ display: "flex" }}>
            <SideNavStaff />
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