import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Fab,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { addToCart } from "../../api/cart";
import { formatCurrency } from "../../utils/FormatPrice";

export const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/product/${product.purrPetCode}`);
  };

  const handleAddToCart = () => {
    addToCart({
      productCode: product.purrPetCode,
      quantity: 1,
    }).then((res) => {
      console.log(res);
    });
  };

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const [isHover, setIsHover] = useState(false);
  return (
    <Card sx={{ width: "200px", m: 2 }}>
      <CardActionArea
        sx={{ display: "flex", flexDirection: "column" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <CardMedia
          component="img"
          key={product.purrPetCode}
          image={product.images[0]?.path}
          alt={product.productName}
          sx={{ height: "200px" }}
        />
        <CardContent className="w-full p-1">
          <Typography
            component="div"
            className=" my-1 overflow-hidden text-ellipsis whitespace-nowrap text-sm"
          >
            {product.productName}
          </Typography>

          <Typography variant="body2" className=" text-end font-bold">
            {formatCurrency(product.price)}
          </Typography>
        </CardContent>
        {isHover && (
          <div className="absolute flex h-full w-full items-center justify-center bg-white bg-opacity-10">
            <Fab
              className="m-1 min-w-min bg-indigo-500 p-2 text-white"
              onClick={handleAddToCart}
            >
              <AddShoppingCartIcon />
            </Fab>
            <Fab
              className="m-1 min-w-min bg-amber-300 p-2 text-black"
              onClick={handleProductClick}
            >
              <VisibilityIcon />
            </Fab>
          </div>
        )}
      </CardActionArea>
    </Card>
  );
};