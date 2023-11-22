import { useDropzone } from "react-dropzone";
import { useRef, useState } from "react";

export const DropboxUploadImage = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const fileInputRef = useRef(null);

  const onDrop = (acceptedFiles) => {
    const newImages = acceptedFiles.map((file) => URL.createObjectURL(file));
    setSelectedImages((prevImages) => [...prevImages, ...newImages]);
    // Thực hiện xử lý tải lên ảnh ở đây
  };

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  const onFileInputChange = (event) => {
    const files = event.target.files;
    const newImages = Array.from(files).map((file) =>
      URL.createObjectURL(file),
    );
    setSelectedImages((prevImages) => [...prevImages, ...newImages]);
    // Thực hiện xử lý tải lên ảnh ở đây
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  const deleteImage = (index) => {
    setSelectedImages((prevImages) => {
      const newImages = [...prevImages];
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const dropzoneStyle = {
    border: "2px dashed #ccc",
    borderRadius: "4px",
    padding: "20px",
    textAlign: "center",
    cursor: "pointer",
    backgroundColor: isDragActive ? "#f8f8f8" : "transparent",
    outline: "none",
    transition: "background-color 0.3s ease",
    maxWidth: "50%",
  };

  return (
    <div>
      <div {...getRootProps()} style={dropzoneStyle}>
        <input {...getInputProps()} />
        {selectedImages.length > 0 ? (
          selectedImages.map((image, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <img
                src={image}
                alt={`Selected ${index}`}
                style={{ maxWidth: "100%", maxHeight: "200px" }}
              />
              <button onClick={() => deleteImage(index)}>Xóa</button>
            </div>
          ))
        ) : (
          <p>Kéo và thả ảnh vào đây hoặc</p>
        )}
      </div>
      <button onClick={openFileDialog}>Chọn ảnh</button>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={onFileInputChange}
        multiple
      />
    </div>
  );
};
