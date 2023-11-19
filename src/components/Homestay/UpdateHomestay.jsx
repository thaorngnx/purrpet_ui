import { Box, TextField, MenuItem, Typography, Button } from "@mui/material";
import { useState } from "react";
import "../../api/homestay";
export const UpdateHomestay = ({ categories, homestay, updateHomestay }) => {
  const handleChangeHomestay = (event) => {
    console.log(event.target);
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
      setHomestayUpdate({
        ...homestayUpdate,
        categoryName: category.categoryName,
        categoryCode: category.purrPetCode,
      });
      updateHomestay({ ...homestayUpdate, categoryCode: category.purrPetCode });
    } else {
      setHomestayUpdate({
        ...homestayUpdate,
        [event.target.name]: event.target.value,
      });
      updateHomestay({
        ...homestayUpdate,
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

  const [homestayUpdate, setHomestayUpdate] = useState(homestay);
  const [error, setError] = useState({});
  const [categoryCode, setCategoryCode] = useState(homestay?.categoryCode);
  const [categoryName, setCategoryName] = useState(
    getCategoryName(categoryCode),
  );

  return (
    <Box component="form" sx={{ width: "90%", margin: "auto" }}>
      <div className="mt-5">
        <TextField
          required
          id="outlined-required"
          label="Tên homestay"
          fullWidth
          name="homeName"
          value={homestayUpdate.homeName}
          onChange={handleChangeHomestay}
          error={error.homeName}
          helperText={error.homeName && "Tên homestay không được để trống"}
          className="mb-3"
        />
        <TextField
          required
          id="outlined-multiline-static"
          label="Mô tả"
          multiline
          fullWidth
          name="description"
          value={homestayUpdate.description}
          onChange={handleChangeHomestay}
          error={error.description}
          helperText={error.description && "Mô tả homestay không được để trống"}
          className="mb-3"
        />
        <TextField
          required
          id="outlined-required"
          label="Giá"
          fullWidth
          name="price"
          value={homestayUpdate.price}
          type="number"
          onChange={handleChangeHomestay}
          error={error.price}
          helperText={error.price && "Giá homestay không được để trống"}
          className="mb-3"
        />
        <TextField
          label="Danh mục homestay"
          select
          required
          name="category"
          key={categoryCode}
          value={categoryName}
          sx={{ width: "50%" }}
          onChange={handleChangeHomestay}
          error={error.homestayType}
          helperText={
            error.homestayType && "Danh mục homestay không được để trống"
          }
        >
          {categories.map((category) => (
            <MenuItem key={category.categoryName} value={category.categoryName}>
              {category.categoryName}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          required
          id="outlined-required"
          label="Số lượng hàng tồn kho"
          type="number"
          InputProps={{ inputProps: { min: 0 } }}
          fullWidth
          name="inventory"
          value={homestayUpdate.inventory}
          onChange={handleChangeHomestay}
          error={error.inventory}
          helperText={
            error.inventory && "Số lượng homestay không được để trống"
          }
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
            alt="homestay"
            style={{ width: "200px", height: "300px" }}
          />
        </Box>
      </div>
    </Box>
  );
};
