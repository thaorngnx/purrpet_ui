import { Box, TextField, MenuItem, Typography, Button } from "@mui/material";
import { useState } from "react";
import "../../api/product";
export const UpdateProduct = ({ categories, product, updateProduct }) => {
  const handleChangeProduct = (event) => {
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

  const getCategoryName = (categoryCode) => {
    const category = categories.find(
      (category) => category.purrPetCode === categoryCode,
    );
    return category ? category.categoryName : "";
  };

  const [productUpdate, setProductUpdate] = useState(product);
  const [error, setError] = useState({});
  const [categoryCode, setCategoryCode] = useState(product?.categoryCode);
  const [categoryName, setCategoryName] = useState(
    getCategoryName(categoryCode),
  );

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
            alt="product"
            style={{ width: "200px", height: "300px" }}
          />
        </Box>
      </div>
    </Box>
  );
};
