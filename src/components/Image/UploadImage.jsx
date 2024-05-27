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
      console.log('file',file);
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }

  };
  console.log('selectedImage',selectedImage);
  
  

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
      <label htmlFor="images">
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

export const UploadImageRefund = ({ request, updateRequest, err }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [url, setUrl] = useState([]);
  const [error, setError] = useState({});
  useEffect(() => {
    if (Object.keys(err).length > 0) {
      setError(err);
    }
  }, [err]);

  const handleUploadImage = (selectedImage) => {
   

    const data = new FormData();
    data.append('file', selectedImage);
    data.append('upload_preset', 'g2rusnuv');
    data.append('cloud_name', 'dmzahhttu');
    fetch('https://api.cloudinary.com/v1_1/dmzahhttu/image/upload', {
      method: 'POST',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl([...url, data.url]);
        updateRequest({ ...request, images: [...url, data.url] });
      })
      .catch((err) => {
        console.log(err);
      });
    
  }
  const handleImageChange = (event) => {
    const files = event.target.files;
    console.log(selectedImages.length);
    if (selectedImages.length >= 5) {
      setError({ images: 'Bạn chỉ có thể chọn tối đa 5 ảnh' });
      return;
    }
    const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
    setSelectedImages([...selectedImages, ...newImages]);
    Array.from(files).forEach((file) => {
      handleUploadImage(file);
    });
  };
  console.log('selectedImages',selectedImages);

  return (
      <Box className="flex flex-col">
        <Typography variant="h6" className="mb-2 text-base font-bold">
          Hình ảnh: {selectedImages.length}/5
        </Typography>

        {error.images && (
          <Typography variant="caption" className=" text-red-600">
            {error.images}
          </Typography>
        )}
        <Box className="flex flex-wrap gap-2">
          {selectedImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Preview ${index}`}
              className="h-auto max-w-[100px]"
            />
          ))}
        </Box>
        <input
          name="images"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          id="images"
          multiple
        />
        <label htmlFor="images">
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
