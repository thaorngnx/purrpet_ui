import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Fab,
  Box,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { formatCurrency } from "../../utils/formatData";
import { useStore } from "../../zustand/store";
import StarRateIcon from "@mui/icons-material/StarRate";

export const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const { addToCart } = useStore();

  const [isHover, setIsHover] = useState(false);

  const handleProductClick = () => {
    navigate(`/product/${product.purrPetCode}`);
  };

  const handleAddToCart = () => {
    addToCart({
      productCode: product.purrPetCode,
      quantity: 1,
    });
  };

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <Card sx={{ width: "200px", m: 2 }}>
      <CardActionArea
        sx={{ display: "flex", flexDirection: "column", position: "relative" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {product.priceDiscount > 0 && (
          <Typography
            variant="body2"
            className="absolute right-2 top-2 bg-red-600 px-2 py-1 font-bold text-white"
          >
            - {((product.price - product.priceDiscount) / product.price) * 100}%
          </Typography>
        )}
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
          <Box className="flex flex-row justify-between">
            {product.inventory > 0 ? (
              <Typography
                variant="body2"
                className={
                  product.discountQuantity > 0
                    ? "text-[#ed8821]"
                    : "text-green-600"
                }
              >
                {product.discountQuantity > 0
                  ? `Số lượng ${product.discountQuantity} `
                  : "Còn hàng"}
              </Typography>
            ) : (
              <Typography variant="body2" className="text-red-600">
                Hết hàng
              </Typography>
            )}
            <Box className="flex flex-col">
              {product.priceDiscount > 0 && (
                <Typography variant="body2" className="font-bold text-red-600">
                  {formatCurrency(product.priceDiscount)}
                </Typography>
              )}

              <Typography
                variant="body2"
                className={
                  product.discountQuantity > 0
                    ? "text-gray-500 line-through "
                    : "font-bold"
                }
              >
                {formatCurrency(product.price)}
              </Typography>
            </Box>
          </Box>
          <Box className="flex flex-row justify-between">
            <Typography variant="body2" className="text-gray-500">
              Đã bán: {product.orderQuantity}
            </Typography>
            <Typography variant="body2" className="text-gray-500">
              {product.averageRating}
              <StarRateIcon style={{ color: "#f17359" }} />
            </Typography>
          </Box>
        </CardContent>
        {isHover && (
          <div className="absolute z-0 flex h-full w-full items-center justify-center bg-white bg-opacity-10">
            {product.inventory > 0 && (
              <Fab
                className="m-1 min-w-min bg-white p-2 text-black hover:bg-orange-200"
                onClick={handleAddToCart}
              >
                <AddShoppingCartIcon />
              </Fab>
            )}
            <Fab
              className="m-1 min-w-min bg-white p-2 text-black hover:bg-orange-200"
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
