import { HeaderCustomer } from "../../components/Header/HeaderCustomer";
import { FooterCustomer } from "../../components/Footer/FooterCustomer";
import { ProductGrid } from "../../components/Product/ProductGrid";
import { SideNavCategoryCustomer } from "../../components/Nav/SideNavCategoryCustomer";
import { useState } from "react";
import { Box } from "@mui/material";

export const ProductPage = () => {
  const [selectedCategoryCode, setSelectedCategoryCode] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const handleCategorySelect = (categoryCode, section) => {
    setSelectedCategoryCode(categoryCode);
    setSelectedSection(section);
  };

  return (
    <>
      <HeaderCustomer onSelectCategory={handleCategorySelect} />
      <Box sx={{ display: "flex", marginTop: "10px" }}>
        <SideNavCategoryCustomer onSelect={handleCategorySelect} />
        <ProductGrid
          categoryCode={selectedCategoryCode}
          section={selectedSection}
        />
      </Box>
      <FooterCustomer />
    </>
  );
};
