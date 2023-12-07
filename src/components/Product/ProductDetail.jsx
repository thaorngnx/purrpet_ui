import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductByCode } from "../../api/product";
import {
  Box,
  Paper,
  Typography,
  Tabs,
  Tab,
  FormControl,
  TextField,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { formatCurrency } from "../../utils/formatData";
import { useStore } from "../../zustand/store";

export const ProductDetail = () => {
  const { productCode } = useParams();

  const { addToCart } = useStore();

  const handleDescriptionTab = () => {
    setReviewTab(false);
    setDescriptionTab(true);
  };

  // const handleReviewTab = () => {
  //   setDescriptionTab(false);
  //   setReviewTab(true);
  // };

  const handleAddQuantity = () => {
    if (quantity < product.inventory) {
      setQuantity(quantity + 1);
    }
  };

  const handleSubtractQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    console.log(productCode, quantity);
    addToCart({ productCode: productCode, quantity: quantity });
  };

  const [product, setProduct] = useState({});
  const [descriptionTab, setDescriptionTab] = useState(true);
  // const [reviewTab, setReviewTab] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    getProductByCode(productCode).then((res) => {
      console.log(res.data);
      setProduct(res.data);
    });
  }, [productCode]);

  return (
    <Box>
      <Paper sx={{ width: "80%", marginTop: "80px" }}>
        <Box sx={{ display: "flex", flexDirection: "row", height: "300px" }}>
          <Box sx={{ width: "50%" }}>
            <img
              src={product.images?.[0]?.path}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
          <Box className="m-2">
            <Typography variant="h4" className="text-2xl font-bold">
              {product.productName}
            </Typography>
            <div className="flex flex-row">
              <Typography variant="body1" className="font-bold">
                Tình trạng: &nbsp;
              </Typography>
              <Typography variant="body1">
                {product.inventory > 0 ? "Còn hàng" : "Hết hàng"}
              </Typography>
            </div>
            <div className="flex flex-row">
              <Typography variant="body1" className="font-bold">
                Giá: &nbsp;
              </Typography>
              <Typography variant="body1" className="font-bold text-red-700">
                {formatCurrency(product.price)}
              </Typography>
            </div>
            <FormControl variant="outlined" sx={{ width: "100%" }}>
              <Typography variant="body1" className="font-bold">
                Số lượng: &nbsp;
              </Typography>
              <div>
                <Button
                  variant="contained"
                  className="min-w-min bg-gray-300 p-2 text-black"
                  onClick={handleSubtractQuantity}
                >
                  <RemoveIcon />
                </Button>
                <TextField
                  type="number"
                  variant="outlined"
                  size="small"
                  value={quantity}
                  disabled
                  sx={{ width: "100px" }}
                  inputProps={{
                    style: { textAlign: "center" },
                  }}
                />
                <Button
                  variant="contained"
                  className="min-w-min bg-gray-300 p-2 text-black"
                  onClick={handleAddQuantity}
                >
                  <AddIcon />
                </Button>
              </div>
              <Button
                variant="contained"
                className=" bg-black"
                onClick={handleAddToCart}
              >
                Thêm vào giỏ hàng
              </Button>
            </FormControl>
          </Box>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Tabs value={0} textColor="primary" indicatorColor="primary">
            <Tab label="Mô tả" onClick={handleDescriptionTab} />
            {/* <Tab label="Đánh giá" onClick={handleReviewTab} /> */}
          </Tabs>
          <Box sx={{ p: 2 }}>
            {descriptionTab && (
              <Typography variant="body1">{product.description}</Typography>
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
