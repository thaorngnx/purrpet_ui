import { HeaderCustomer } from "../../components/Header/HeaderCustomer";
import { FooterCustomer } from "../../components/Footer/FooterCustomer";
import { SideNavCustomerInfo } from "../../components/Nav/SideNavCustomerInfo";
import { History } from "../../components/Customer/History";
import { Box } from "@mui/material";

export const OrderHistoryPage = () => {
  return (
    <>
       <HeaderCustomer />
      <Box className="flex flex-col md:flex-row">
          <SideNavCustomerInfo />
        <Box className="flex-grow">
          <History />
        </Box>
      </Box>
      <FooterCustomer />
    </>
  );
};
