import { Box, TextField, MenuItem, TextareaAutosize } from "@mui/material";
import { useState } from "react";
import "../../api/homestay";
import * as CONST from "../../constants";
import { UploadImage } from "../Image/UploadImage";

export const UpdateHomestay = ({
  homeSize,
  categories,
  homestay,
  updateHomestay,
}) => {
  const [homestayUpdate, setHomestayUpdate] = useState(homestay);
  const [error, setError] = useState({});
  const [categoryCode, setCategoryCode] = useState(homestay?.categoryCode);
  const [categoryName, setCategoryName] = useState(
    getCategoryName(categoryCode),
  );
  const [masterDataCode, setMasterDataCode] = useState(
    homestay?.masterDataCode,
  );
  const [masterDataName, setMasterDataName] = useState(
    getMasterDataName(masterDataCode),
  );

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
    } else if (event.target.name === "homeSize") {
      const size = homeSize.find((size) => size.name === event.target.value);
      setMasterDataName(size.name);
      setMasterDataCode(size.purrPetCode);
      setHomestayUpdate({
        ...homestayUpdate,
        masterDataName: size.name,
        masterDataCode: size.purrPetCode,
      });
      updateHomestay({ ...homestayUpdate, masterDataCode: size.purrPetCode });
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

  const getMasterDataName = (masterDataCode) => {
    const masterData = homeSize.find(
      (masterData) => masterData.purrPetCode === masterDataCode,
    );
    return masterData ? masterData.name : "";
  };

  // const handleUpdateImage = (updateData) => {
  //   console.log("handleUpdateData", updateData);
  //   setHomestayUpdate(updateData);
  //   updateHomestay(updateData);
  // };

  return (
    <Box component="form" sx={{ width: "90%", margin: "auto" }}>
      <div className="mt-5">
        <TextField
          label="Loại phòng"
          select
          required
          name="homeType"
          value={homestayUpdate.homeType}
          sx={{ width: "50%" }}
          onChange={handleChangeHomestay}
          error={error.homeType}
          helperText={error.homeType && "Loại spa không được để trống"}
        >
          {Object.values(CONST.PRODUCT_TYPE).map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Kích thước phòng"
          select
          required
          name="homeSize"
          value={masterDataName}
          sx={{ width: "50%" }}
          onChange={handleChangeHomestay}
          error={error.homestayType}
          helperText={
            error.homestayType && "Danh mục homestay không được để trống"
          }
        >
          {homeSize.map((size) => (
            <MenuItem key={size.name} value={size.name}>
              {size.name}
            </MenuItem>
          ))}
        </TextField>
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
        {/* <UploadImage product={homestay} updateProduct={handleUpdateImage} /> */}
      </div>
    </Box>
  );
};
