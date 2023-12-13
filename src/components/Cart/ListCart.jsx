import {
  Box,
  Button,
  List,
  ListItem,
  Paper,
  TextField,
  Typography,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useEffect, useState } from "react";
import { getProductByCode } from "../../api/product";
import { formatCurrency } from "../../utils/formatData";
import { CustomerInfoFormForOrder } from "./CustomerInfoFormForOrder";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../api/order";
import { useStore } from "../../zustand/store";
import { createPaymentUrl } from "../../api/pay";
import { BigHoverTransformButton } from "../Button/StyledButton";

export const ListCart = () => {
  const navigate = useNavigate();

  const cart = useStore((state) => state.cartState.data);
  const { updateCart, deleteCart, deleteProductCart } = useStore();

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [productCart, setProductCart] = useState([]);
  const [openCustomerInfoForm, setOpenCustomerInfoForm] = useState(false);
  const [showBtnConfirmOrder, setShowBtnConfirmOrder] = useState(false);
  const [orderInfo, setOrderInfo] = useState({
    customerCode: "",
    customerAddress: {
      street: "",
      province: "",
      district: "",
      ward: "",
    },
    customerNote: "",
    orderItems: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productList = [];
        for (let i = 0; i < cart.length; i++) {
          const productData = await getProductByCode(cart[i].productCode);
          if (productData.data.inventory <= 0) {
            deleteProductCart({ productCode: cart[i].productCode });
            continue;
          }

          productList.push({
            ...productData.data,
            quantity: cart[i].quantity,
            totalPrice: productData.data.price * cart[i].quantity,
          });
        }
        setProductCart(productList);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleAddQuantity = (product) => {
    if (product.quantity < product.inventory) {
      const newProductCart = productCart.map((item) => {
        if (item.purrPetCode === product.purrPetCode) {
          return {
            ...item,
            quantity: item.quantity + 1,
            totalPrice: item.price * (item.quantity + 1),
          };
        }
        return item;
      });
      setProductCart(newProductCart);
      setOrderInfo({
        ...orderInfo,
        orderItems: newProductCart.map((item) => {
          return {
            productCode: item.purrPetCode,
            quantity: item.quantity,
          };
        }),
      });
      updateCart({
        productCode: product.purrPetCode,
        quantity: product.quantity + 1,
      });
    }
  };

  const handleSubtractQuantity = (product) => {
    if (product.quantity > 1) {
      const newProductCart = productCart.map((item) => {
        if (item.purrPetCode === product.purrPetCode) {
          return {
            ...item,
            quantity: item.quantity - 1,
            totalPrice: item.price * (item.quantity - 1),
          };
        }
        return item;
      });
      setProductCart(newProductCart);
      updateCart({
        productCode: product.purrPetCode,
        quantity: product.quantity - 1,
      });
    }
  };

  const handleDeleteCart = (product) => {
    if (productCart.length === 1) {
      deleteCart();
      openCustomerInfoForm && setOpenCustomerInfoForm(false);
    } else {
      const newProductCart = productCart.filter(
        (item) => item.purrPetCode !== product.purrPetCode,
      );
      setProductCart(newProductCart);
      console.log(product.purrPetCode);
      deleteProductCart({ productCode: product.purrPetCode });
    }
  };

  const handleOpenCustomerInfoForm = () => {
    setOpenCustomerInfoForm(true);
  };

  const handleCustomerInfo = (customerInfo) => {
    setOrderInfo({
      ...orderInfo,
      customerCode: customerInfo.customerCode,
      customerAddress: customerInfo.customerAddress,
      customerNote: customerInfo.customerNote,
    });
  };

  const handleConfirmInfo = (confirm) => {
    setShowBtnConfirmOrder(confirm);
  };

  const handleConfirmOrder = () => {
    setButtonDisabled(true);
    orderInfo.orderItems = productCart.map((item) => {
      return {
        productCode: item.purrPetCode,
        quantity: item.quantity,
      };
    });
    createOrder(orderInfo).then((res) => {
      console.log(res);
      if (res.err === 0) {
        console.log("order success");
        //delete cart
        deleteCart();
        //navigate
        // navigate(`/order/${res.data.purrPetCode}`);
        createPaymentUrl({
          orderCode: res.data.purrPetCode,
        }).then((res) => {
          if (res.err === 0) {
            window.location.href = res.data.paymentUrl;
          }
        });
      }
    });
  };

  return (
    <Box className="mb-5 flex min-h-screen flex-col">
      <Typography variant="h4" className="m-3 text-center font-bold">
        Giỏ hàng
      </Typography>
      <Paper
        sx={{
          width: "90%",
          ml: "auto",
          mr: "auto",
          display: "block",
          px: 5,
          position: "relative",
        }}
      >
        {productCart.length === 0 && (
          <Box className="my-10 flex flex-col">
            <Typography
              variant="h6"
              className="flex items-center justify-center text-center text-lg italic"
            >
              Không có sản phẩm nào trong giỏ hàng!
            </Typography>
            <BigHoverTransformButton
              onClick={() => navigate("/product")}
              className="mx-auto my-3 justify-center"
            >
              Tiếp tục mua hàng
            </BigHoverTransformButton>
          </Box>
        )}
        {productCart.length > 0 && (
          <>
            <List>
              <ListItem key="title" className="my-3 p-0">
                <Typography
                  variant="body1"
                  className="w-1/6 font-bold"
                ></Typography>
                <Typography variant="body1" className="w-1/3 p-2 font-bold">
                  Sản phẩm
                </Typography>
                <Typography
                  variant="body1"
                  className="m-2 w-1/6 text-center font-bold"
                >
                  Đơn giá
                </Typography>
                <Typography
                  variant="body1"
                  className="w-1/4 text-center font-bold"
                >
                  Số lượng
                </Typography>
                <Typography
                  variant="body1"
                  className="m-2 w-1/6 text-center font-bold"
                >
                  Thành tiền
                </Typography>
                <Typography
                  variant="body1"
                  className="m-2 w-1/12 text-center font-bold"
                >
                  Thao tác
                </Typography>
              </ListItem>
              {productCart.map((item) => {
                return (
                  <ListItem
                    key={item.purrPetCode}
                    className="my-3 min-h-[100px] p-0"
                  >
                    <Box className="w-1/6">
                      <img
                        src={item.images[0]?.path}
                        alt=""
                        className="h-[100px] w-[100px] object-contain"
                      />
                    </Box>
                    <Typography variant="body1" className="w-1/3 p-2">
                      {item.productName}
                    </Typography>
                    <Typography variant="body1" className="m-2 w-1/6 text-end">
                      {formatCurrency(item.price)}
                    </Typography>
                    <Box className="flex w-1/4 justify-center">
                      <Button
                        variant="contained"
                        className="min-w-min bg-gray-300 p-2 text-black"
                        onClick={() => handleSubtractQuantity(item)}
                      >
                        <RemoveIcon />
                      </Button>
                      <TextField
                        type="number"
                        variant="outlined"
                        size="small"
                        value={item.quantity}
                        disabled
                        sx={{ width: "70px" }}
                        inputProps={{
                          style: { textAlign: "center" },
                        }}
                      />
                      <Button
                        variant="contained"
                        className="min-w-min bg-gray-300 p-2 text-black"
                        onClick={() => handleAddQuantity(item)}
                      >
                        <AddIcon />
                      </Button>
                    </Box>
                    <Typography variant="body1" className="m-2 w-1/6 text-end">
                      {formatCurrency(item.totalPrice)}
                    </Typography>
                    <Box className="m-1 flex w-1/12 justify-center">
                      <Tooltip title="Xem chi tiết">
                        <Button
                          variant="contained"
                          className="mr-1 min-w-min bg-gray-300 p-1 text-black"
                          onClick={() => {
                            navigate(`/product/${item.purrPetCode}`);
                          }}
                        >
                          <VisibilityIcon />
                        </Button>
                      </Tooltip>
                      <Tooltip title="Xóa khỏi giỏ hàng">
                        <Button
                          variant="contained"
                          className="ml-1 min-w-min bg-red-500 p-1 text-white"
                          onClick={() => handleDeleteCart(item)}
                        >
                          <DeleteIcon />
                        </Button>
                      </Tooltip>
                    </Box>
                  </ListItem>
                );
              })}
            </List>
            <Typography
              variant="h6"
              className="text-l mb-5 text-end text-base font-bold"
            >
              Tổng tiền:{" "}
              {formatCurrency(
                productCart.reduce((a, b) => a + b.totalPrice, 0),
              )}
            </Typography>
            {!openCustomerInfoForm && (
              <Box className="flex justify-end">
                <BigHoverTransformButton
                  onClick={handleOpenCustomerInfoForm}
                  className="mb-5 justify-center"
                >
                  Tiến hành đặt hàng
                </BigHoverTransformButton>
              </Box>
            )}
          </>
        )}
      </Paper>
      {openCustomerInfoForm && (
        <CustomerInfoFormForOrder
          customer={handleCustomerInfo}
          confirmInfo={handleConfirmInfo}
        />
      )}
      {showBtnConfirmOrder && (
        // <Button
        //   variant="contained"
        //   className="mx-auto my-3 w-fit justify-center bg-cyan-900 p-2 text-center text-white"
        //   disabled={buttonDisabled}
        //   onClick={handleConfirmOrder}
        // >
        //   Tiến hành thanh toán
        // </Button>
        <BigHoverTransformButton
          onClick={handleConfirmOrder}
          className="mx-auto my-3 w-fit justify-center"
          disabled={buttonDisabled}
        >
          Tiến hành thanh toán
        </BigHoverTransformButton>
      )}
    </Box>
  );
};
