import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getActiveProducts, getProductByCode } from "../../api/product";
import {
  Box,
  Paper,
  Typography,
  Tabs,
  Tab,
  FormControl,
  TextField,
  Button,
  Rating,
  Stack,
  Pagination,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { BigHoverTransformButton } from "../Button/StyledButton";
import { formatCurrency } from "../../utils/formatData";
import { useStore } from "../../zustand/store";
import StarRateIcon from "@mui/icons-material/StarRate";
import { HorizontalSlider } from "../Slider/HorizontalSlider";
import { getReviewByProduct } from "../../api/review";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export const ProductDetail = () => {
  const navigate = useNavigate();

  const { productCode } = useParams();

  const { addToCart } = useStore();

  const [product, setProduct] = useState({});
  const [descriptionTab, setDescriptionTab] = useState(true);
  const [reviewTab, setReviewTab] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [recommendProducts, setRecommendProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reviewPagination, setReviewPagination] = useState({
    limit: 10,
    page: 1,
    total: 0,
  });

  const favorite = useStore((state) => state.favoriteState.data);
  const { favoriteProduct } = useStore();
  const customer = useStore((state) => state.customerState.data);
  console.log("favorite", favorite);
  console.log("customer", customer);

  useEffect(() => {
    getProductByCode(productCode).then((res) => {
      console.log(res.data);
      setProduct(res.data);
    });
  }, [productCode]);

  useEffect(() => {
    const params = {
      limit: 10,
      page: 1,
      categoryCode: product?.categoryCode,
    };
    getActiveProducts(params).then((res) => {
      if (res.err === 0) {
        setRecommendProducts(res.data);
      }
    });
  }, [product]);

  useEffect(() => {
    const params = {
      limit: 10,
      page: reviewPagination.page,
    };
    getReviewByProduct(productCode, params).then((res) => {
      console.log("re", res);
      setReviews(res.data);
      setReviewPagination(res.pagination);
    });
  }, [productCode, reviewPagination.page]);

  const handleDescriptionTab = () => {
    setReviewTab(false);
    setDescriptionTab(true);
  };

  const handleReviewTab = () => {
    setDescriptionTab(false);
    setReviewTab(true);
  };

  const handleAddQuantity = () => {
    const inventory = product.discountQuantity
      ? product.discountQuantity
      : product.inventory;
    if (quantity < inventory) {
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

  const handleChangeReviewPage = (event, value) => {
    setReviewPagination({ ...reviewPagination, page: value });
  };

  const handleFavorite = () => {
    favoriteProduct(productCode);
  };

  return (
    <>
      <Box className="my-5 flex flex-col items-center">
        <Typography
          variant="h3"
          sx={{
            marginBottom: {
              xs: "10px",
              md: "20px",
            },
            fontSize: {
              xs: "28px",
              md: "32px",
            },
            fontWeight: "bold",
          }}
        >
          Chi tiết sản phẩm
        </Typography>
        <Paper
          sx={{
            width: {
              xs: "92%",
              sm: "97%",
            },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: {
              xs: "10px",
              md: "20px",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "row",
              },
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box>
              <img
                src={product.images?.[0]?.path}
                alt=""
                style={{
                  maxHeight: "400px",
                  objectFit: "contain",
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: 2,
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  marginBottom: {
                    xs: "10px",
                    md: "20px",
                  },
                  fontSize: {
                    xs: "20px",
                    md: "28px",
                  },
                  fontWeight: "bold",
                }}
              >
                {product.productName}
              </Typography>
              <Box className="mb-2 flex flex-row justify-between">
                <Typography variant="body1">
                  {product.averageRating
                    ? product.averageRating
                    : "Chưa có đánh giá"}{" "}
                  <StarRateIcon style={{ color: "#f17359" }} />
                </Typography>
                <Typography variant="body1">
                  {product.orderQuantity} đã mua
                </Typography>
              </Box>
              <hr className="w-full" />
              <Box className="mb-2 flex flex-row">
                <Typography variant="body1" className="text-lg font-bold">
                  Tình trạng: &nbsp;
                </Typography>
                <Typography variant="body1" className="text-lg">
                  {product.inventory > 0 ? "Còn hàng" : "Hết hàng"}
                </Typography>
              </Box>
              <Box>
                {product.discountQuantity > 0 && (
                  <Box className="mb-2 flex flex-row">
                    <Typography variant="body1" className="text-lg font-bold">
                      Đang khuyến mãi với giá: &nbsp;
                    </Typography>
                    <Typography
                      variant="body1"
                      className="text-lg font-bold text-red-700"
                    >
                      {formatCurrency(product.priceDiscount)}
                    </Typography>
                  </Box>
                )}
                <Box className="mb-2 flex flex-row">
                  <Typography variant="body1" className="text-lg font-bold">
                    {product.discountQuantity > 0 ? "Giá gốc: " : "Giá: "}
                  </Typography>
                  <Typography
                    variant="body1"
                    className={
                      product.discountQuantity > 0
                        ? " text-md ml-2 "
                        : "ml-2 text-lg font-bold text-green-600"
                    }
                  >
                    {product.discountQuantity > 0
                      ? ` ${formatCurrency(product.price)} - Tiết kiệm ${
                          ((product.price - product.priceDiscount) /
                            product.price) *
                          100
                        } %`
                      : formatCurrency(product.price)}
                  </Typography>
                </Box>
              </Box>
              {product.inventory > 0 && (
                <>
                  <FormControl className="flex flex-row items-center">
                    <Typography variant="body1" className="text-lg font-bold">
                      Số lượng: &nbsp;
                    </Typography>
                    <Box>
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
                    </Box>
                  </FormControl>
                  <Box className="mt-3 flex flex-row items-center">
                    <BigHoverTransformButton
                      onClick={handleAddToCart}
                      className="mr-3"
                    >
                      Thêm vào giỏ hàng
                    </BigHoverTransformButton>
                    {customer && (
                      <Box>
                         { favorite?.find((item) => item === productCode) ? (
                      <FavoriteIcon
                        color="error"
                        onClick={handleFavorite}
                        fontSize="large"
                      />
                    ) : (
                      <FavoriteBorderIcon
                        color={"inherit"}
                        onClick={handleFavorite}
                        fontSize="large"
                      />
                    )}
                        </Box>
                      )}
                   
                  </Box>
                </>
              )}
              {product?.inventory <= 0 && (
                <BigHoverTransformButton
                  className="mt-3"
                  onClick={() => navigate("/product")}
                >
                  Tiếp tục mua hàng
                </BigHoverTransformButton>
              )}
            </Box>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Tabs
              value={descriptionTab ? 0 : 1}
              textColor="primary"
              indicatorColor="primary"
            >
              <Tab label="Mô tả" onClick={handleDescriptionTab} />
              <Tab label="Đánh giá" onClick={handleReviewTab} />
            </Tabs>
            <Box
              sx={{
                paddingY: 2,
              }}
            >
              {descriptionTab && (
                <Typography
                  variant="body1"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              )}
              {reviewTab && (
                <>
                  {reviews.map((review) => (
                    <Box className="my-3" key={review._id}>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: {
                            xs: "0.75rem",
                            md: "1rem",
                          },
                          fontWeight: "bold",
                        }}
                      >
                        {review.user.name}
                      </Typography>
                      <Rating
                        name="read-only"
                        value={review.rating}
                        readOnly
                        size="small"
                      />
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: {
                            xs: "0.75rem",
                            md: "1rem",
                          },
                        }}
                      >
                        {review.comment}
                      </Typography>
                    </Box>
                  ))}
                  {reviews.length > 0 ? (
                    <Stack spacing={2}>
                      <Pagination
                        onChange={handleChangeReviewPage}
                        page={reviewPagination.page}
                        count={Math.ceil(
                          reviewPagination.total / reviewPagination.limit,
                        )}
                        shape="rounded"
                        className="mb-2 flex justify-end"
                      />
                    </Stack>
                  ) : (
                    <Typography
                      variant="body1"
                      className="text-center text-lg italic"
                    >
                      Chưa có đánh giá nào
                    </Typography>
                  )}
                </>
              )}
            </Box>
          </Box>
        </Paper>
      </Box>
      <HorizontalSlider
        products={recommendProducts}
        title="Sản phẩm liên quan"
      />
    </>
  );
};
