//create carousel image component
import { useState } from "react";
import { Dialog, DialogContent } from "@mui/material";
import { Carousel } from "react-responsive-carousel";

export const CarouselImage = () => {
  const images = [
    "https://res.cloudinary.com/demo/image/upload/ar_1.0,c_thumb,g_face,w_0.6,z_0.7/r_max/co_black,e_outline/co_grey,e_shadow,x_40,y_55/c_scale,h_250/dpr_2.0/f_auto/q_auto/actor.png",
    "https://res.cloudinary.com/demo/image/upload/l_docs:academy-award/c_scale,fl_relative,h_0.6/c_crop,g_auto,h_0.9,w_0.7/fl_layer_apply,g_south_east/co_white,l_text:AlexBrush-Regular.ttf_250:James%20Stewart%20/co_black,e_outline/fl_layer_apply,g_south,x_30,y_30/c_scale,h_250/dpr_2.0/f_auto/q_auto/actor.jpg",
    "https://res.cloudinary.com/demo/image/upload/e_cartoonify/a_10/e_brightness:20/c_scale,h_250/dpr_2.0/f_auto/q_auto/actor.jpg",
  ];
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleOpenDialog = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <Carousel showThumbs={false} autoPlay={true} infiniteLoop={true}>
        {images.map((image) => (
          <img src={image} alt={`Image`} width="100" height="200" />
        ))}
      </Carousel>
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <img
            src={selectedImage}
            alt="product"
            className="img-fluid"
            onClick={() => handleOpenDialog(selectedImage)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
