import { Box, TextField, MenuItem, Typography, Button } from "@mui/material";
import * as CONST from "../../constants";
import { useState } from "react";
import "../../api/spa";
export const UpdateSpa = ({ categories, spa, updateSpa }) => {
  const handleChangeSpa = (event) => {
    setError({ ...error, [event.target.name]: false });
    if (!event.target.value) {
      setError({ ...error, [event.target.name]: true });
    }
    if (event.target.name === "category") {
      const category = categories.find(
        (category) => category.categoryName === event.target.value,
      );
      setCategoryName(category.categoryName);
      setCategoryCode(category.purrPetCode);
      setSpaUpdate({
        ...spaUpdate,
        categoryName: category.categoryName,
        categoryCode: category.purrPetCode,
      });
      updateSpa({ ...spaUpdate, categoryCode: category.purrPetCode });
    } else {
      setSpaUpdate({
        ...spaUpdate,
        [event.target.name]: event.target.value,
      });
      updateSpa({
        ...spaUpdate,
        [event.target.name]: event.target.value,
      });
    }
  };

  const getCategoryName = (categoryCode) => {
    const category = categories.find(
      (category) => category.purrPetCode === categoryCode,
    );
    return category ? category.categoryName : "";
  };

  const [spaUpdate, setSpaUpdate] = useState(spa);
  const [error, setError] = useState({});
  const [categoryCode, setCategoryCode] = useState(spa?.categoryCode);
  const [categoryName, setCategoryName] = useState(
    getCategoryName(categoryCode),
  );

  return (
    <Box component="form" sx={{ width: "90%", margin: "auto" }}>
      <div className="mt-5">
        <TextField
          required
          id="outlined-required"
          label="Tên spa"
          fullWidth
          name="spaName"
          value={spaUpdate.spaName}
          onChange={handleChangeSpa}
          error={error.spaName}
          helperText={error.spaName && "Tên spa không được để trống"}
          className="mb-3"
        />
        <TextField
          required
          id="outlined-multiline-static"
          label="Mô tả"
          multiline
          fullWidth
          name="description"
          value={spaUpdate.description}
          onChange={handleChangeSpa}
          error={error.description}
          helperText={error.description && "Mô tả spa không được để trống"}
          className="mb-3"
        />
        <TextField
          required
          id="outlined-required"
          label="Giá"
          fullWidth
          name="price"
          value={spaUpdate.price}
          type="number"
          onChange={handleChangeSpa}
          error={error.price}
          helperText={error.price && "Giá spa không được để trống"}
          className="mb-3"
        />
        <TextField
          label="Danh mục spa"
          select
          required
          name="category"
          value={categoryName}
          sx={{ width: "50%" }}
          onChange={handleChangeSpa}
          error={error.spaType}
          helperText={error.spaType && "Danh mục spa không được để trống"}
        >
          {categories.map((category) => (
            <MenuItem key={category.categoryName} value={category.categoryName}>
              {category.categoryName}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Loại spa"
          select
          required
          name="spaType"
          value={spaUpdate.spaType}
          sx={{ width: "50%" }}
          onChange={handleChangeSpa}
          error={error.spaType}
          helperText={error.spaType && "Loại spa không được để trống"}
        >
          <MenuItem value={CONST.PRODUCT_TYPE.DOG}>
            {CONST.PRODUCT_TYPE.DOG}
          </MenuItem>
          <MenuItem value={CONST.PRODUCT_TYPE.CAT}>
            {CONST.PRODUCT_TYPE.CAT}
          </MenuItem>
        </TextField>
        <Typography variant="h6" gutterBottom component="div">
          Hình ảnh
          <Button variant="outlined" component="label">
            Upload File
            <input type="file" hidden />
          </Button>
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <img
            src="https://picsum.photos/200/300"
            alt="spa"
            style={{ width: "200px", height: "300px" }}
          />
        </Box>
      </div>
    </Box>
  );
};
