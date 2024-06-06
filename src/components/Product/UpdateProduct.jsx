import { Box, TextField, MenuItem, TextareaAutosize } from "@mui/material";
import { useEffect, useState } from "react";
import "../../api/product";
import { UploadImage } from "../Image/UploadImage";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


export const UpdateProduct = ({ categories, product, updateProduct, err }) => {
  const [productUpdate, setProductUpdate] = useState(product);
  const [error, setError] = useState({});
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    setCategoryName(getCategoryName(product?.categoryCode));
  }, [product]);

  useEffect(() => {
    if (Object.keys(err).length > 0) {
      setError(err);
    }
  }, [err]);

  const handleChangeProduct = (event) => {
   
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
  const handleChangeDescription = (value) => {
    console.log("value", value);
    setProductUpdate({
      ...productUpdate,
      description: value,
    });
    updateProduct({
      ...productUpdate,
      description: value,
    });
  }
  const getCategoryName = (categoryCode) => {
    const category = categories.find(
      (category) => category.purrPetCode === categoryCode,
    );
    return category ? category.categoryName : "";
  };

  return (
    <Box className="m-5 flex w-[450px] flex-col">
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
      {/* <TextField
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
      /> */}
      <ReactQuill 
      name="description"
       value={product.description}
       onChange={handleChangeDescription}
       error={error.description}
       helperText={error.description && "Mô tả sản phẩm không được để trống"}
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
        className="mb-3 mt-3"
      />
      <TextField
        label="Danh mục sản phẩm"
        select
        required
        name="category"
        key={categoryName}
        value={categoryName}
        onChange={handleChangeProduct}
        error={error.categoryCode}
        helperText={
          error.categoryCode && "Danh mục sản phẩm không được để trống"
        }
        className="mb-3"
      >
        {categories.map((category) => (
          <MenuItem key={category.categoryName} value={category.categoryName}>
            {category.categoryName}
          </MenuItem>
        ))}
      </TextField>
      {/* <TextField
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
        helperText={error.inventory && "Số lượng sản phẩm không được để trống"}
        className="mb-3"
      /> */}
      <UploadImage
        product={product}
        updateProduct={handleUpdateImage}
        err={error}
      />
    </Box>
  );
};
