import { HeaderCustomer } from "../../components/Header/HeaderCustomer";
import { FooterCustomer } from "../../components/Footer/FooterCustomer";
import { CustomerInfo } from "../../components/Customer/CustomerInfo";
import { SideNavCustomerInfo } from "../../components/Nav/SideNavCustomerInfo";
import { Box } from "@mui/material";

export const CustomerInfoPage = () => {
  return (
    <>
      <HeaderCustomer />
      <Box className="flex flex-row">
        <SideNavCustomerInfo />
        <CustomerInfo />
      </Box>
      <FooterCustomer />
    </>
  );
};
