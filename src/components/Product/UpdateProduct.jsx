import { Box, TextField, MenuItem, TextareaAutosize } from "@mui/material";
import { useState } from "react";
import "../../api/product";
import { UploadImage } from "../Image/UploadImage";

export const UpdateProduct = ({ categories, product, updateProduct }) => {
  const [productUpdate, setProductUpdate] = useState(product);
  const [error, setError] = useState({});
  const [categoryCode, setCategoryCode] = useState(product?.categoryCode);
  const [categoryName, setCategoryName] = useState(
    getCategoryName(categoryCode),
  );

  const handleChangeProduct = (event) => {
    console.log("handleChangeProduct", event.target);
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
      setProductUpdate({
        ...productUpdate,
        categoryName: category.categoryName,
        categoryCode: category.purrPetCode,
      });
      updateProduct({ ...productUpdate, categoryCode: category.purrPetCode });
    } else {
      setProductUpdate({
        ...productUpdate,
        [event.target.name]: event.target.value,
      });
      updateProduct({
        ...productUpdate,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleUpdateImage = (updateData) => {
    console.log("handleUpdateData", updateData);
    setProductUpdate(updateData);
    updateProduct(updateData);
  };

  const getCategoryName = (categoryCode) => {
    const category = categories.find(
      (category) => category.purrPetCode === categoryCode,
    );
    return category ? category.categoryName : "";
  };

  return (
    <Box component="form" sx={{ width: "90%", margin: "auto" }}>
      <div className="mt-5">
        <TextField
          required
          id="outlined-required"
          label="Tên sản phẩm"
          fullWidth
          name="productName"
          value={product.productName}
          onChange={handleChangeProduct}
          error={error.productName}
          helperText={error.productName && "Tên sản phẩm không được để trống"}
          className="mb-3"
        />
        <TextField
          required
          id="outlined-multiline-static"
          label="Mô tả"
          multiline
          fullWidth
          name="description"
          value={product.description}
          onChange={handleChangeProduct}
          error={error.description}
          helperText={error.description && "Mô tả sản phẩm không được để trống"}
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
          value={product.price}
          type="number"
          onChange={handleChangeProduct}
          error={error.price}
          helperText={error.price && "Giá sản phẩm không được để trống"}
          className="mb-3"
        />
        <TextField
          label="Danh mục sản phẩm"
          select
          required
          name="category"
          key={categoryName}
          value={categoryName}
          sx={{ width: "50%" }}
          onChange={handleChangeProduct}
          error={error.categoryCode}
          helperText={
            error.categoryCode && "Danh mục sản phẩm không được để trống"
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
          value={product.inventory}
          onChange={handleChangeProduct}
          error={error.inventory}
          helperText={
            error.inventory && "Số lượng sản phẩm không được để trống"
          }
          className="mb-3"
        />
        <UploadImage product={product} updateProduct={handleUpdateImage} />
      </div>
    </Box>
  );
};
