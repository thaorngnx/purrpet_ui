import { HeaderCustomer } from "../../components/Header/HeaderCustomer";
import { FooterCustomer } from "../../components/Footer/FooterCustomer";
import { ProductGrid } from "../../components/Product/ProductGrid";
import { SideNavCategoryCustomer } from "../../components/Nav/SideNavCategoryCustomer";
import { Box } from "@mui/material";

export const ProductPage = () => {
  return (
    <>
      <HeaderCustomer />
      <Box sx={{ display: "flex" }}>
        <SideNavCategoryCustomer />
        <ProductGrid />
      </Box>
      <FooterCustomer />
    </>
  );
};
