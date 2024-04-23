import React from "react";
import { Box } from "@mui/system";
import { HeaderCustomer } from "../../components/Header/HeaderCustomer";
import { FooterCustomer } from "../../components/Footer/FooterCustomer";
import { SideNavCustomerInfo } from "../../components/Nav/SideNavCustomerInfo";
import { Notification } from "../../components/Notification/Notification";

export const NotificationPage = () => {
    return (
        <>
         <HeaderCustomer />
        <Box className="flex flex-row justify-normal">
          <SideNavCustomerInfo />
         <Notification />
        </Box>
        <FooterCustomer />
        </>
       
    );
    };