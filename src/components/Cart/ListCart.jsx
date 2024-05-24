import {
  Box,
  Button,
  List,
  ListItem,
  Paper,
  TextField,
  Typography,
  Tooltip,
  Snackbar,
  Alert,
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
import { validateObject } from "../../utils/validationData";
import * as CONST from "../../constants";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { de, el } from "date-fns/locale";

export const ListCart = () => {
  const navigate = useNavigate();

  const cart = useStore((state) => state.cartState.data);
  const { updateCart, deleteCart, deleteProductCart } = useStore();
  const [productCart, setProductCart] = useState([]);
  const [openCustomerInfoForm, setOpenCustomerInfoForm] = useState(false);
  const [showBtnConfirmOrder, setShowBtnConfirmOrder] = useState(false);
  const [alert, setAlert] = useState(false);
  const [severity, setSeverity] = useState(CONST.ALERT_SEVERITY.SUCCESS);
  const [message, setMessage] = useState("");
  const [disableRadio, setDisableRadio] = useState({
    COD: false,
    VNPAY: false,
    COIN: true,
  });
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
    payMethod: CONST.PAYMENT_METHOD.COD,
    userPoint: 0,
    useCoin: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productList = [];
        for (let i = 0; i < cart.length; i++) {
          const productData = await getProductByCode(cart[i].productCode);
          if (productData.data.inventory < cart[i].quantity) {
            deleteProductCart({ productCode: cart[i].productCode });
            continue;
          }
          if(productData.data.discountQuantity > 0){
            productList.push({
              ...productData.data,
              quantity: cart[i].quantity,
              totalPrice: productData.data.priceDiscount * cart[i].quantity,
            });
          }
          else{

          productList.push({
            ...productData.data,
            quantity: cart[i].quantity,
            totalPrice: productData.data.price * cart[i].quantity,
          });
        }
        }
        setProductCart(productList);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (cart.length === 0) {
      setProductCart([]);
      setShowBtnConfirmOrder(false);
      if (openCustomerInfoForm) {
        setOpenCustomerInfoForm(false);
      }
    }
  }, [cart]);

  const handleAddQuantity = (product) => {
      if ( product.discountQuantity > 0 && product.quantity < product.discountQuantity) {
        const newProductCart = productCart.map((item) => {
          if (item.purrPetCode === product.purrPetCode) {
            return {
              ...item,
              quantity: item.quantity + 1,
              totalPrice: item.priceDiscount * (item.quantity + 1),
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
      }else{
  if (product.quantity < product.inventory && product.discountQuantity === null) {
  
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
  }
  };

  const handleSubtractQuantity = (product) => {
    if (product.quantity > 1) {
      if (product.discountQuantity > 0 && product.quantity <= product.discountQuantity){
        const newProductCart = productCart.map((item) => {
          if (item.purrPetCode === product.purrPetCode) {
            return {
              ...item,
              quantity: item.quantity - 1,
              totalPrice: item.priceDiscount * (item.quantity - 1),
            };
          }
          return item;
        });
        setProductCart(newProductCart);
        updateCart({
          productCode: product.purrPetCode,
          quantity: product.quantity - 1,
        });
      }else{
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
      }
      
  };

  const handleDeleteCart = (product) => {
    if (productCart.length === 1) {
      deleteCart();
    } else {
      const newProductCart = productCart.filter(
        (item) => item.purrPetCode !== product.purrPetCode,
      );
      setProductCart(newProductCart);
      deleteProductCart({ productCode: product.purrPetCode });
    }
  };

  const handleOpenCustomerInfoForm = () => {
    setOpenCustomerInfoForm(true);
  };

  const handleCustomerInfo = (customerInfo) => {
    const totalPayment = productCart.reduce((a, b) => a + b.totalPrice, 0) - customerInfo.useCoin - customerInfo.userPoint;
   
    if(totalPayment === 0){
      setOrderInfo({
        ...orderInfo,
        customerCode: customerInfo.customerCode,
        customerAddress: customerInfo.customerAddress,
        customerNote: customerInfo.customerNote,
        userPoint: customerInfo.userPoint,
        useCoin: customerInfo.useCoin,
        payMethod: CONST.PAYMENT_METHOD.COIN,
      });
      setDisableRadio({
        ...disableRadio,
        COD: true,
        VNPAY: true,
        COIN: false,
      });
    }
    else{
      setOrderInfo({
        ...orderInfo,
        customerCode: customerInfo.customerCode,
        customerAddress: customerInfo.customerAddress,
        customerNote: customerInfo.customerNote,
        userPoint: customerInfo.userPoint,
        useCoin: customerInfo.useCoin,
        payMethod: CONST.PAYMENT_METHOD.COD,
      });
      setDisableRadio({
        ...disableRadio,
        COD: false,
        VNPAY: false,
        COIN: true,
      });

    }
  };
   console.log(orderInfo);

  const handleConfirmInfo = (confirm) => {
    setShowBtnConfirmOrder(confirm);
  };

  const handleConfirmOrder = () => {
    setShowBtnConfirmOrder(false);
    orderInfo.orderItems = productCart.map((item) => {
      return {
        productCode: item.purrPetCode,
        quantity: item.quantity,
      };
    });
    createOrder(orderInfo).then((res) => {
      if (res.err === 0) {
        console.log("order success", res);
        //delete cart
        deleteCart();
        if(res.data.payMethod === CONST.PAYMENT_METHOD.COD || res.data.payMethod === CONST.PAYMENT_METHOD.COIN){
          console.log(res.data.purrPetCode);
          navigate(`/order/${res.data.purrPetCode}`);
          return;
        }
        else{
          createPaymentUrl({
            orderCode: res.data.purrPetCode,
          }).then((res) => {
            if (res.err === 0) {
              window.location.href = res.data.paymentUrl;
            }   
          });
      }
        //navigate
        // navigate(`/order/${res.data.purrPetCode}`);
       
      }
      else if (res.err === -1) {
        setAlert(true);
        setSeverity(CONST.ALERT_SEVERITY.ERROR);
        setMessage(res.message);
        window.location.reload();
      } 
      else {
        console.log(res.message);
        // setProductCart([]);
        // deleteCart();
      }
    });
  };
  const handleChangePaymentMethod = (e) => {
    setOrderInfo({
      ...orderInfo,
      payMethod: e.target.value,
    });
  }

  return (
    <Box className="mb-5 flex min-h-screen flex-col">
      <Typography variant="h4" className="m-3 text-center font-bold">
        Giỏ hàng
      </Typography>
      <Snackbar
        open={alert}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        severity={severity}
      >
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
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
                    <Box className="flex flex-col w-1/6">
                    <Typography variant="body1" className={item.discountQuantity > 0 ? 'line-through text-gray-500':"m-2 w-1/6 text-end"}>
                      {formatCurrency(item.price)}
                    </Typography>
                    {
                      item.discountQuantity > 0 && (
                        <Typography variant="body1" className="m-2 w-1/6 text-end text-red-600 font-bold">
                          {formatCurrency(item.priceDiscount)}
                        </Typography>
                      )
                    }
                    </Box>
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
      {productCart.length > 0 && openCustomerInfoForm && (
        <CustomerInfoFormForOrder
          customer={handleCustomerInfo}
          confirmInfo={handleConfirmInfo}
          totalPrice = {productCart.reduce((a, b) => a + b.totalPrice, 0)} 
          disableRadio = {setDisableRadio}
        />
      )} {
        productCart.length > 0 && showBtnConfirmOrder && (
          <FormControl>
            <FormControl   sx={{
          position: "relative",
          display: "flex",
          flexDirection: "cloumn",
          mr:7
          
        }}>
            <FormControl   sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          ml: 10,
        }}>
          <FormLabel className="mt-2 font-bold text-black">
            Phương thức thanh toán:
          </FormLabel>
          <RadioGroup
            name="payMethod"
            value={orderInfo.payMethod}
            onChange={handleChangePaymentMethod}
            sx={{ display: "flex", flexDirection: "row" }}
          >
            <FormControlLabel
              value={CONST.PAYMENT_METHOD.COD}
              control={<Radio />}
              label="Tiền mặt"
             disabled = {disableRadio.COD}
            />
            
            <FormControlLabel
              value={CONST.PAYMENT_METHOD.VNPAY}
              control={<Radio />}
              label="VNPAY"
              disabled = {disableRadio.VNPAY}
            />
             <FormControlLabel
              value={CONST.PAYMENT_METHOD.COIN}
              control={<Radio />}
              label="Ví xu"
              disabled = {disableRadio.COIN}
            />
          </RadioGroup>
        </FormControl>
        <FormControl   sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          ml: 10,
        }}>
          <FormLabel className="mt-2 font-bold text-black text-[18px]">
            Thanh toán:
          </FormLabel>
          <FormControl >
            <Typography variant="body1" className="m-1 text-end flex flex-row items-center justify-between">
              Tổng tiền hàng: 
              <Typography variant="body1" className="m-1 text-end">
               {formatCurrency(productCart.reduce((a, b) => a + b.totalPrice, 0))}
               </Typography>
            </Typography>
            <Typography variant="body1" className="m-1 text-end flex flex-row items-center justify-between">
              Sử dụng điểm:
              <Typography variant="body1" className="m-1 text-end">
              - {formatCurrency(orderInfo.userPoint)}
               </Typography>
            </Typography>
            <Typography variant="body1" className="m-1 text-end flex flex-row items-center justify-between">
              Sử dụng ví xu:   
              <Typography variant="body1" className="m-1 text-end">
              -  {formatCurrency( orderInfo.useCoin)}
               </Typography>
            </Typography>
            <Typography variant="body1" className="m-1 text-end flex flex-row items-center font-bold text-black text-[17px] justify-between">
              Thành tiền: 
              <Typography variant="body1" className="m-1 text-end text-[#800000] font-bold">
              {formatCurrency(productCart.reduce((a, b) => a + b.totalPrice, 0) - orderInfo.userPoint - orderInfo.useCoin)}
               </Typography>
            </Typography>
            </FormControl>
            </FormControl>
        
          </FormControl>
        </FormControl>)
      }
        
      {productCart.length > 0 &&
        validateObject(orderInfo) &&
        showBtnConfirmOrder && (
        
          <BigHoverTransformButton
            onClick={handleConfirmOrder}
            className="mx-auto my-3 w-fit justify-center"
          >
            Tiến hành thanh toán
          </BigHoverTransformButton>
        
        )}
    </Box>
  );
};
