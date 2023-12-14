import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export const UploadImage = ({ product, updateProduct, err }) => {
  const [selectedImage, setSelectedImage] = useState(product.images[0]?.path);
  const [error, setError] = useState({});

  useEffect(() => {
    if (Object.keys(err).length > 0) {
      setError(err);
    }
  }, [err]);

  const handleImageChange = (event) => {
    if (!event.target.files[0]) return;
    const file = event.target.files[0];
    updateProduct({ ...product, images: file });
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  return (
    <Box className="flex flex-col">
      <Typography variant="h6" className="mb-2 text-base font-bold">
        Hình ảnh
      </Typography>
      {error.images && (
        <Typography variant="caption" className=" text-red-600">
          Hình ảnh không được để trống
        </Typography>
      )}
      {selectedImage && (
        <img src={selectedImage} alt="Preview" className="h-auto max-w-full" />
      )}
      <input
        name="images"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
        id="images"
      />
      <label for="images">
        <Button
          variant="outlined"
          component="span"
          size="small"
          className="mt-3"
        >
          Chọn ảnh
        </Button>
      </label>
    </Box>
  );
};
