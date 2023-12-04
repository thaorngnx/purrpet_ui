import { HeaderCustomer } from "../../components/Header/HeaderCustomer";
import { FooterCustomer } from "../../components/Footer/FooterCustomer";
import { ProductGrid } from "../../components/Product/ProductGrid";
import { SideNavCategoryCustomer } from "../../components/Nav/SideNavCategoryCustomer";
import { useState } from "react";
import { Box } from "@mui/material";

export const ProductPage = () => {
  const [selectedCategoryCode, setSelectedCategoryCode] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const handleCategorySelect = (categoryCode, section) => {
    setSelectedCategoryCode(categoryCode);
    setSelectedSection(section);
  };
  const handleSearch = (value) => {
    setSearchValue(value);
    // Xử lý logic tìm kiếm dựa trên giá trị `value` ở đây
    // Ví dụ: Gọi API để lấy dữ liệu sản phẩm phù hợp với giá trị tìm kiếm
  };

  return (
    <>
      <HeaderCustomer onSelectCategory={handleCategorySelect}  onSearch={handleSearch}/>
      <Box sx={{ display: "flex", marginTop: "10px" }}>
        <SideNavCategoryCustomer onSelect={handleCategorySelect} />
        <ProductGrid
          categoryCode={selectedCategoryCode}
          section={selectedSection}
          searchValue={searchValue}
        />
      </Box>
      <FooterCustomer />
    </>
  );
};
