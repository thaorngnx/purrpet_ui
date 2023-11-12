import { Box, TextField, MenuItem, Typography, Button } from "@mui/material";
import * as CONST from "../../constants";
import { useState } from "react";
import "../../api/product";
export const UpdateProduct = ({ categories, product, updateProduct }) => {
  const handleChangeProductName = (e) => {
    setProductName(e.target.value);
    setError({ ...error, productName: false });
    if (!e.target.value) {
      setError({ ...error, productName: true });
    }
    updateProduct({ ...product, productName: e.target.value });
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
    setError({ ...error, description: false });
    if (!e.target.value) {
      setError({ ...error, description: true });
    }
    updateProduct({ ...product, description: e.target.value });
  };

  const handleChangePrice = (e) => {
    setPrice(e.target.value);
    setError({ ...error, price: false });
    if (!e.target.value) {
      setError({ ...error, price: true });
    }
    updateProduct({ ...product, price: e.target.value });
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
    updateProduct({ ...product, categoryCode: category.purrPetCode });
  };

  const handleChangeProductType = (e) => {
    setProductType(e.target.value);
    setError({ ...error, productType: false });
    if (!e.target.value) {
      setError({ ...error, productType: true });
    }
    updateProduct({ ...product, productType: e.target.value });
  };

  const handleChangeImages = (e) => {
    setImages(e.target.value);
    setError({ ...error, images: false });
    if (!e.target.value) {
      setError({ ...error, images: true });
    }
    updateProduct({ ...product, images: e.target.value });
  };

  const handleChangeInventory = (e) => {
    setInventory(e.target.value);
    setError({ ...error, inventory: false });
    if (!e.target.value) {
      setError({ ...error, inventory: true });
    }
    updateProduct({ ...product, inventory: e.target.value });
  };

  const getCategoryName = (categoryCode) => {
    const category = categories.find(
      (category) => category.purrPetCode === categoryCode,
    );
    return category ? category.categoryName : "";
  };

  const [productName, setProductName] = useState(product?.productName);
  const [productType, setProductType] = useState(product?.productType);
  const [error, setError] = useState({});
  const [description, setDescription] = useState(product?.description);
  const [price, setPrice] = useState(product?.price);
  const [categoryCode, setCategoryCode] = useState(product?.categoryCode);
  const [categoryName, setCategoryName] = useState(
    getCategoryName(categoryCode),
  );
  const [images, setImages] = useState(product?.images);
  const [inventory, setInventory] = useState(product?.inventory);

  return (
    <Box component="form" sx={{ width: "90%", margin: "auto" }}>
      <div className="mt-5">
        <TextField
          required
          id="outlined-required"
          label="Tên sản phẩm"
          fullWidth
          value={productName}
          onChange={handleChangeProductName}
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
          value={description}
          onChange={handleChangeDescription}
          error={error.description}
          helperText={error.description && "Mô tả sản phẩm không được để trống"}
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
          helperText={error.price && "Giá sản phẩm không được để trống"}
          className="mb-3"
        />
        <TextField
          label="Danh mục sản phẩm"
          select
          required
          key={categoryCode}
          value={categoryName}
          sx={{ width: "50%" }}
          onChange={handleChangeCategory}
          error={error.productType}
          helperText={
            error.productType && "Danh mục sản phẩm không được để trống"
          }
        >
          {categories.map((category) => (
            <MenuItem key={category.categoryName} value={category.categoryName}>
              {category.categoryName}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Loại sản phẩm"
          select
          required
          value={productType}
          sx={{ width: "50%" }}
          onChange={handleChangeProductType}
          error={error.productType}
          helperText={error.productType && "Loại sản phẩm không được để trống"}
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
