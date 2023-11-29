import { Box, List, ListItemButton, Typography, Divider } from "@mui/material";
import { useState, useEffect } from "react";
import { getActiveCategories } from "../../api/category";
import * as CONST from "../../constants";

export const SideNavCategoryCustomer = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const params = { categoryType: CONST.CATEGORY_TYPE.PRODUCT };
    getActiveCategories(params).then((res) => {
      console.log(res.data);
      setCategories(res.data);
    });
  }, []);
  return (
    <Box className="w-1/5 flex-col">
      <Typography variant="h6" className="text-center font-sans font-bold">
        Danh mục sản phẩm
      </Typography>
      <Divider className="mx-auto w-1/2 border-t-2 border-gray-500" />
      <List className="flex-col">
        {categories.map((category) => (
          <ListItemButton
            key={category.categoryCode}
            disablePadding
            sx={{ display: "block" }}
            onClick={() => {
              navigate(`/product/${category.categoryCode}`);
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
    </Box>
  );
};
