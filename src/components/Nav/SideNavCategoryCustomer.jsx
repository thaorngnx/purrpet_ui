import React, { useState, useEffect } from "react";
import {
  Box,
  List,
  ListItemButton,
  Typography,
  Divider,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { useStore } from "../../zustand/store";

export const SideNavCategoryCustomer = ({ onSelect }) => {
  const categories = useStore((state) => state.activeProductCategoryState.data);
  const [selectedCategoryCode, setSelectedCategoryCode] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  const handleCategoryClick = (categoryCode) => {
    setSelectedCategoryCode(categoryCode);
    setSelectedSection("");
    onSelect(categoryCode, "");
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedSection(value);
    onSelect(selectedCategoryCode, value);
  };

  return (
    <Box className="text-bold w-1/5 flex-col">
      <Typography variant="h6" className="text-center font-sans font-bold">
        Danh mục sản phẩm
      </Typography>
      <Divider className="mx-auto w-1/2 border-t-2 border-gray-500" />
      <List className="flex-col">
        {categories.map((category) => (
          <ListItemButton
            key={category.purrPetCode}
            sx={{ display: "block" }}
            onClick={() => {
              handleCategoryClick(category.purrPetCode);
            }}
          >
            <Typography
              component="div"
              className=" my-1 overflow-hidden text-ellipsis whitespace-nowrap text-sm"
            >
              {category.categoryName}
            </Typography>
          </ListItemButton>
        ))}
      </List>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Sắp xếp</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedSection}
            label="Filter"
            onChange={handleChange}
          >
            <MenuItem value={"price.asc"}>Giá tăng dần</MenuItem>
            <MenuItem value={"price.desc"}>Giá giảm dần</MenuItem>
            <MenuItem value={"productName.asc"}>A đến Z</MenuItem>
            <MenuItem value={"productName.desc"}>Z đến A</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};
