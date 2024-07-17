import { HeaderCustomer } from "../../components/Header/HeaderCustomer";
import { FooterCustomer } from "../../components/Footer/FooterCustomer";
import { SideNavCustomerInfo } from "../../components/Nav/SideNavCustomerInfo";
import { Box } from "@mui/material";
import { FavoriteProduct } from "../../components/Customer/FavoriteProduct";

export const FavoriteProductPage = () => {
  return (
    <>
      <HeaderCustomer />
      <Box className="flex flex-col md:flex-row">
        <SideNavCustomerInfo />
        <Box className="flex-grow">
          <FavoriteProduct />
        </Box>
      </Box>
      <FooterCustomer />
    </>
  );
};
