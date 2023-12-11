import { Typography } from "@mui/material";
import { useState } from "react";

export const UploadImage = ({ product, updateProduct }) => {
  const [selectedImage, setSelectedImage] = useState(product.images[0]?.path);

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
    <div>
      <Typography variant="h6" className="mb-2 font-bold">
        Hình ảnh
      </Typography>
      {selectedImage && (
        <img src={selectedImage} alt="Preview" className="h-auto max-w-full" />
      )}
      <input
        name="images"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
    </div>
  );
};
