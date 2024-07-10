import { HeaderCustomer } from "../../components/Header/HeaderCustomer";
import { FooterCustomer } from "../../components/Footer/FooterCustomer";
import { ProductGrid } from "../../components/Product/ProductGrid";
import { SideNavCategoryCustomer } from "../../components/Nav/SideNavCategoryCustomer";
import { Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useStore } from "../../zustand/store";

export const ProductPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryCode = searchParams.get("category");

  const categories = useStore((state) => state.activeProductCategoryState.data);

  const selectedCategory = categories.find(
    (category) => category.purrPetCode === categoryCode,
  );

  return (
    <>
      <HeaderCustomer />
      <Box className="mt-4 flex flex-row align-top">
        <SideNavCategoryCustomer />
        <Box className="w-4/5 flex-col">
          <Typography variant="h6" className="text-center font-sans font-bold text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px]">
            Sản phẩm
          </Typography>
          <Typography variant="h6" className="text-center font-sans font-bold text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px]">
            {selectedCategory?.categoryName || "Tất cả"}
          </Typography>
          <ProductGrid />
        </Box>
      </Box>

      <FooterCustomer />
    </>
  );
};
