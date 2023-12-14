import { Box, TextField, MenuItem, TextareaAutosize } from "@mui/material";
import * as CONST from "../../constants";
import { useEffect, useState } from "react";
import { UploadImage } from "../Image/UploadImage";

export const UpdateSpa = ({ categories, spa, updateSpa, err }) => {
  const [spaUpdate, setSpaUpdate] = useState(spa);
  const [error, setError] = useState({});
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    setCategoryName(getCategoryName(spa?.categoryCode));
  }, [spa]);

  useEffect(() => {
    if (Object.keys(err).length > 0) {
      setError(err);
    }
  }, [err]);

  const handleChangeSpa = (event) => {
    if (!event.target.value) {
      setError({ ...error, [event.target.name]: true });
    } else {
      setError({ ...error, [event.target.name]: false });
    }
    if (event.target.name === "category") {
      if (!event.target.value) {
        setError({ ...error, categoryCode: true });
      } else {
        setError({ ...error, categoryCode: false });
      }
      const category = categories.find(
        (category) => category.categoryName === event.target.value,
      );
      setCategoryName(category.categoryName);
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

  // const handleUpdateImage = (updateData) => {
  //   console.log("handleUpdateData", updateData);
  //   setSpaUpdate(updateData);
  //   updateSpa(updateData);
  // };

  const getCategoryName = (categoryCode) => {
    const category = categories.find(
      (category) => category.purrPetCode === categoryCode,
    );
    return category ? category.categoryName : "";
  };

  return (
    <Box className="m-5 flex w-[400px] flex-col">
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
        className="mb-3"
        onChange={handleChangeSpa}
        error={error.categoryCode}
        helperText={error.categoryCode && "Danh mục spa không được để trống"}
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
    </Box>
  );
};
