import React from "react";
import { HeaderAdmin } from "../../components/Header/HeaderAdmin";
import { SideNavAdmin } from "../../components/Nav/SideNavAdmin";
import { Box } from "@mui/material";
import { Refund } from "../../components/Notification/Refund";
import { useLocation } from "react-router-dom";

export const RefundProcessing = ( ) => {
    const location = useLocation();
  const notification = location.state?.notification;
    return (
      <>
        <HeaderAdmin />
        <Box style={{ display: "flex" }}>
          <SideNavAdmin  />
         <Refund notification={notification}/>
        </Box>
      </>
    );
}