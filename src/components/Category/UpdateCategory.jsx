import { Box, TextField, MenuItem } from "@mui/material";
import * as CONST from "../../constants";
import { useState } from "react";
import "../../api/category";
export const UpdateCategory = ({ category, updateCategory }) => {
  const [categoryName, setCategoryName] = useState(category?.categoryName);
  const [categoryType, setCategoryType] = useState(category?.categoryType);
  const [error, setError] = useState({});

  const handleChangeCategoryName = (e) => {
    setCategoryName(e.target.value);
    setError({ ...error, categoryName: false });
    if (!e.target.value) {
      setError({ ...error, categoryName: true });
    }
    updateCategory({ ...category, categoryName: e.target.value });
  };

  const handleChangeCategoryType = (e) => {
    setCategoryType(e.target.value);
    setError({ ...error, categoryType: false });
    if (!e.target.value) {
      setError({ ...error, categoryType: true });
    }
    updateCategory({ ...category, categoryType: e.target.value });
  };

  return (
    <Box
      component="form"
      sx={{ width: "90%", display: "block", margin: "auto" }}
    >
      <div className="mt-5">
        <TextField
          required
          id="outlined-required"
          label="Tên danh mục"
          fullWidth
          value={categoryName}
          onChange={handleChangeCategoryName}
          error={error.categoryName}
          helperText={error.categoryName && "Tên danh mục không được để trống"}
          className="mb-3"
        />
        <TextField
          label="Loại danh mục"
          select
          fullWidth
          required
          value={categoryType}
          onChange={handleChangeCategoryType}
          error={error.categoryType}
          helperText={error.categoryType && "Loại danh mục không được để trống"}
        >
          <MenuItem value={CONST.CATEGORY_TYPE.PRODUCT}>
            {CONST.CATEGORY_TYPE.PRODUCT}
          </MenuItem>
          <MenuItem value={CONST.CATEGORY_TYPE.SPA}>
            {CONST.CATEGORY_TYPE.SPA}
          </MenuItem>
          <MenuItem value={CONST.CATEGORY_TYPE.HOMESTAY}>
            {CONST.CATEGORY_TYPE.HOMESTAY}
          </MenuItem>
        </TextField>
      </div>
    </Box>
  );
};
