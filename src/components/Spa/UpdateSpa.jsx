import { Box, TextField, MenuItem, TextareaAutosize } from "@mui/material";
import * as CONST from "../../constants";
import { useState } from "react";
import { UploadImage } from "../Image/UploadImage";

export const UpdateSpa = ({ categories, spa, updateSpa }) => {
  const [spaUpdate, setSpaUpdate] = useState(spa);
  const [error, setError] = useState({});
  const [categoryCode, setCategoryCode] = useState(spa?.categoryCode);
  const [categoryName, setCategoryName] = useState(
    getCategoryName(categoryCode),
  );

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

  // const handleUpdateImage = (updateData) => {
  //   console.log("handleUpdateData", updateData);
  //   setSpaUpdate(updateData);
  //   updateSpa(updateData);
  // };

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
          InputProps={{
            inputComponent: TextareaAutosize,
          }}
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
          {Object.values(CONST.PRODUCT_TYPE).map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>
        {/* <UploadImage product={spa} updateProduct={handleUpdateImage} /> */}
      </div>
    </Box>
  );
};
