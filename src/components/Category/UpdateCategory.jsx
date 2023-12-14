import { Box, TextField, MenuItem } from "@mui/material";
import * as CONST from "../../constants";
import { useEffect, useState } from "react";
import "../../api/category";
export const UpdateCategory = ({ category, updateCategory, err }) => {
  const [categoryName, setCategoryName] = useState(category?.categoryName);
  const [categoryType, setCategoryType] = useState(category?.categoryType);
  const [error, setError] = useState({});

  useEffect(() => {
    if (Object.keys(err).length > 0) {
      setError(err);
    }
  }, [err]);

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
    <Box className="m-5 w-[400px]">
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
    </Box>
  );
};
