import {
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { getCart, updateCart, deleteCart } from "../../api/cart";
import { getProductByCode } from "../../api/product";
import { formatCurrency } from "../../utils/FormatPrice";
import { CustomerInfoFormForOrder } from "./CustomerInfoFormForOrder";

export const ListCart = () => {
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
            // price: item.price,
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
      setOrderInfo({
        ...orderInfo,
        orderItems: newProductCart.map((item) => {
          return {
            productCode: item.purrPetCode,
            quantity: item.quantity,
            price: item.price,
          };
        }),
      });
      updateCart({
        productCode: product.purrPetCode,
        quantity: product.quantity - 1,
      });
    }
  };

  const handleDeleteCart = (product) => {
    const newProductCart = productCart.filter(
      (item) => item.purrPetCode !== product.purrPetCode,
    );
    setProductCart(newProductCart);
    setOrderInfo({
      ...orderInfo,
      orderItems: newProductCart.map((item) => {
        return {
          productCode: item.purrPetCode,
          quantity: item.quantity,
          price: item.price,
        };
      }),
    });
    console.log(product.purrPetCode);
    deleteCart({ productCode: product.purrPetCode }).then((res) => {
      console.log(res);
    });
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
        const cartData = await getCart();

        const productList = [];
        for (let i = 0; i < cartData.length; i++) {
          const productData = await getProductByCode(cartData[i].productCode);
          console.log("res", productData.data);
          productList.push({
            ...productData.data,
            quantity: cartData[i].quantity,
            totalPrice: productData.data.price * cartData[i].quantity,
          });
        }
        console.log("productList", productList);
        setProductCart(productList);
        console.log("productCart", productCart);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  return (
    <Box className="flex-col">
      <Typography variant="h4" className="text-center font-bold">
        Giỏ hàng
      </Typography>
      <Paper
        sx={{
          width: "90%",
          ml: "auto",
          mr: "auto",
          display: "block",
          p: 5,
          position: "relative",
        }}
      >
        <List>
          {productCart.map((item) => {
            return (
              <ListItem key={item.purrPetCode} className="my-3 p-0">
                <ListItemAvatar className="w-1/6">
                  <img src={item.images[0]?.path} alt="" />
                </ListItemAvatar>
                <ListItemText
                  primary={item.productName}
                  className="w-1/3 p-2"
                />
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
                  sx={{ width: "80px" }}
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
                <ListItemText
                  primary={formatCurrency(item.totalPrice)}
                  className="m-2 w-1/6 text-end font-bold"
                />
                <Button
                  variant="contained"
                  className="min-w-min bg-red-500 p-1 p-2 text-white"
                  onClick={() => handleDeleteCart(item)}
                >
                  <DeleteIcon />
                </Button>
              </ListItem>
            );
          })}
        </List>
        <Box className="text-end">
          <Typography variant="h6" className="text-base font-bold">
            Tổng tiền:{" "}
            {formatCurrency(productCart.reduce((a, b) => a + b.totalPrice, 0))}
          </Typography>
          <Button
            variant="contained"
            className="m-1 min-w-min bg-cyan-900 p-2 text-white"
            onClick={handleOpenCustomerInfoForm}
          >
            Tiến hành thanh toán
          </Button>
        </Box>
      </Paper>
      {openCustomerInfoForm && (
        <CustomerInfoFormForOrder
          customer={handleCustomerInfo}
          confirmInfo={handleConfirmInfo}
        />
      )}
      {showBtnConfirmOrder && (
        <Button
          variant="contained"
          className="m-1 min-w-fit bg-cyan-900 p-2 text-white"
        >
          Xác nhận đơn hàng
        </Button>
      )}
    </Box>
  );
};
