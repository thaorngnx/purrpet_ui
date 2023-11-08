import { Box, TextField, MenuItem, Typography, Button } from "@mui/material";
import * as CONST from "../../constants";
import { useState } from "react";
import "../../api/spa";
export const UpdateSpa = ({ categories, spa, updateSpa }) => {
  const handleChangeSpaName = (e) => {
    setSpaName(e.target.value);
    setError({ ...error, spaName: false });
    if (!e.target.value) {
      setError({ ...error, spaName: true });
    }
    updateSpa({ ...spa, spaName: e.target.value });
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
    setError({ ...error, description: false });
    if (!e.target.value) {
      setError({ ...error, description: true });
    }
    updateSpa({ ...spa, description: e.target.value });
  };

  const handleChangePrice = (e) => {
    setPrice(e.target.value);
    setError({ ...error, price: false });
    if (!e.target.value) {
      setError({ ...error, price: true });
    }
    updateSpa({ ...spa, price: e.target.value });
  };

  const handleChangeCategory = (e) => {
    const category = categories.find(
      (category) => category.categoryName === e.target.value,
    );
    setCategoryName(category.categoryName);
    setCategoryCode(category.purrPetCode);
    setError({ ...error, categoryCode: false });
    if (!e.target.value) {
      setError({ ...error, categoryCode: true });
    }
    updateSpa({ ...spa, categoryCode: category.purrPetCode });
  };

  const handleChangeSpaType = (e) => {
    setSpaType(e.target.value);
    setError({ ...error, spaType: false });
    if (!e.target.value) {
      setError({ ...error, spaType: true });
    }
    updateSpa({ ...spa, spaType: e.target.value });
  };

  const handleChangeImages = (e) => {
    setImages(e.target.value);
    setError({ ...error, images: false });
    if (!e.target.value) {
      setError({ ...error, images: true });
    }
    updateSpa({ ...spa, images: e.target.value });
  };

  const handleChangeInventory = (e) => {
    setInventory(e.target.value);
    setError({ ...error, inventory: false });
    if (!e.target.value) {
      setError({ ...error, inventory: true });
    }
    updateSpa({ ...spa, inventory: e.target.value });
  };

  const getCategoryName = (categoryCode) => {
    const category = categories.find(
      (category) => category.purrPetCode === categoryCode,
    );
    return category ? category.categoryName : "";
  };

  const [spaName, setSpaName] = useState(spa?.spaName);
  const [spaType, setSpaType] = useState(spa?.spaType);
  const [error, setError] = useState({});
  const [description, setDescription] = useState(spa?.description);
  const [price, setPrice] = useState(spa?.price);
  const [categoryCode, setCategoryCode] = useState(spa?.categoryCode);
  const [categoryName, setCategoryName] = useState(
    getCategoryName(categoryCode),
  );
  const [images, setImages] = useState(spa?.images);
  const [inventory, setInventory] = useState(spa?.inventory);

  return (
    <Box component="form" sx={{ width: "90%", margin: "auto" }}>
      <div className="mt-5">
        <TextField
          required
          id="outlined-required"
          label="Tên spa"
          fullWidth
          value={spaName}
          onChange={handleChangeSpaName}
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
          value={description}
          onChange={handleChangeDescription}
          error={error.producDescription}
          helperText={error.spaName && "Mô tả spa không được để trống"}
          className="mb-3"
        />
        <TextField
          required
          id="outlined-required"
          label="Giá"
          fullWidth
          value={price}
          type="number"
          onChange={handleChangePrice}
          error={error.price}
          helperText={error.price && "Giá spa không được để trống"}
          className="mb-3"
        />
        <TextField
          label="Danh mục spa"
          select
          required
          key={categoryCode}
          value={categoryName}
          sx={{ width: "50%" }}
          onChange={handleChangeCategory}
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
          value={spaType}
          sx={{ width: "50%" }}
          onChange={handleChangeSpaType}
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
        <TextField
          required
          id="outlined-required"
          label="Số lượng hàng tồn kho"
          type="number"
          InputProps={{ inputProps: { min: 0 } }}
          fullWidth
          value={inventory}
          onChange={handleChangeInventory}
          error={error.inventory}
          helperText={error.inventory && "Số lượng spa không được để trống"}
          className="mb-3"
        />
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
