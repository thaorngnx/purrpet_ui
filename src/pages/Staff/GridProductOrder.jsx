import { useState, useEffect } from "react";
import { getProductStaff } from "../../api/product";
import { DataGrid, viVN } from "@mui/x-data-grid";
import {
  Button,
  FormControl,
  Box,
  TextField,
  Autocomplete,
  Paper,
  Typography,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { createOrder, updateStatusOrder } from "../../api/order";
import {
  MiniIconRoundButton,
  BigHoverTransformButton,
} from "../../components/Button/StyledButton";
import { formatCurrency } from "../../utils/formatData";
import * as CONST from "../../constants";
import { FormControlLabel, Radio, RadioGroup, FormLabel } from "@mui/material";
import PaymentsIcon from "@mui/icons-material/Payments";
import { createPaymentUrl } from "../../api/pay";


export const GridProductOrder = ({ customer, updateCustomer }) => {
  const [productlist, setProductlist] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState({});
  const [disabledicon, setDisabledicon] = useState(false);
  const [showBtnConfirmOrder, setShowBtnConfirmOrder] = useState(false);
  const [showPaymentMethod, setShowPaymentMethod] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(CONST.PAYMENT_METHOD.COD);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = { key: inputValue };
        const response = await getProductStaff(params);
        setProductlist(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    const totalPrice = selectedProducts.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
    setTotalPrice(totalPrice);
    const quantity = selectedProducts.reduce((total, product) => {
      return total + product.quantity;
    }, 0);
    setQuantity(quantity);
    fetchProducts();
  }, [inputValue, selectedProducts]);

  useEffect(() => {
  
    if (selectedProducts.length > 0) {
      setShowBtnConfirmOrder(true);
    } else {
      setShowBtnConfirmOrder(false);
    }
  }, [selectedProducts]);

  useEffect(() => {
    if (order) {
      setProductlist([]);
      setSelectedProducts([]);
      setTotalPrice(0);
      setQuantity(0);
      setInputValue("");
      updateCustomer();
    }
  }, [order]);

  const handleAddQuantity = (productName) => {
    setSelectedProducts((prevSelectedProducts) => {
      return prevSelectedProducts.map((product) => {
        if (
          product.productName === productName &&
          product.quantity < product.inventory
        ) {
          const newQuantity = product.quantity + 1;
          return { ...product, quantity: newQuantity };
        } else {
          setDisabledicon(true);
          return product;
        }
      });
    });
  };

  const handleSubtractQuantity = (productName) => {
    setSelectedProducts((prevSelectedProducts) => {
      return prevSelectedProducts.map((product) => {
        if (product.productName === productName && product.quantity > 1) {
          const newQuantity = product.quantity - 1;
          return { ...product, quantity: newQuantity };
        }
        return product;
      });
    });
  };

  const handleDeleteProduct = (productName) => {
    setSelectedProducts((prevSelectedProducts) => {
      return prevSelectedProducts.filter(
        (product) => product.productName !== productName,
      );
    });
  };
  const columns = [
    { field: "productName", headerName: "Tên sản phẩm", minWidth: 150 },
    {
      field: "actions",
      headerName: "Số lượng",
      headerAlign: "center",
      minWidth: 170,
      renderCell: (params) => (
        <FormControl variant="outlined" sx={{ width: "100%" }}>
          <Box className="flex flex-row">
            <Button
              variant="contained"
              className="min-w-min bg-gray-300 p-2 text-black"
              onClick={() => handleSubtractQuantity(params.row.productName)}
            >
              <RemoveIcon />
            </Button>
            <TextField
              type="number"
              variant="outlined"
              size="small"
              value={params.row.quantity}
              disabled
              sx={{ width: "70px" }}
              inputProps={{
                style: { textAlign: "center" },
              }}
            />
            <Button
              variant="contained"
              className="min-w-min bg-gray-300 p-2 text-black"
              disabled={disabledicon}
              onClick={() => handleAddQuantity(params.row.productName)}
            >
              <AddIcon />
            </Button>
          </Box>
        </FormControl>
      ),
    },
    {
      field: "productPrice",
      headerName: "Đơn giá",
      headerAlign: "center",
      align: "right",
      minWidth: 120,
      valueFormatter: (params) => formatCurrency(params.value),
    },
    {
      field: "totalPrice",
      headerName: "Thành tiền",
      headerAlign: "center",
      align: "right",
      minWidth: 120,
      valueFormatter: (params) => formatCurrency(params.value),
    },
    {
      field: "deleteProduct",
      headerName: "",
      align: "center",
      minWidth: 20,
      renderCell: (params) => (
        <MiniIconRoundButton
          onClick={() => handleDeleteProduct(params.row.productName)}
        >
          <HighlightOffIcon />
        </MiniIconRoundButton>
      ),
    },
  ];
  const rows = selectedProducts.map((product, index) => ({
    id: index + 1,
    productName: product.productName,
    productPrice: product.price,
    totalPrice: product.price * product.quantity,
    quantity: product.quantity,
  }));

  const handleAddProduct = () => {
    if (
      inputValue &&
      !selectedProducts.some((product) => product.productName === inputValue)
    ) {
      console.log(inputValue);
      const selectedProduct = productlist.find(
        (product) => product.productName === inputValue,
      );
      
      if (selectedProduct) {
        setSelectedProducts([
          ...selectedProducts,
          { ...selectedProduct, quantity: 1 },
        ]);
        setInputValue("");
      } else {
        console.log("Sản phẩm không tồn tại");
      }
    } else {
      handleAddQuantity(inputValue);
    }
  };

  const handleCreateOrder = () => {
    setShowBtnConfirmOrder(false);
    const productCodes = selectedProducts.map((product) => product.purrPetCode);
    const quantities = selectedProducts.map((product) => product.quantity);

    const orderItems = productCodes.map((productCode, index) => ({
      productCode: productCode,
      quantity: quantities[index],
    }));

    if (customer.address === undefined) {
      customer.address = {
        street: "Số 1 Võ Văn Ngân",
        ward: "Phường Linh Chiểu",
        district: "Quận Thủ Đức",
        province: "Thành phố Hồ Chí Minh",
      };
    }
    const orderData = {
      orderItems: orderItems,
      customerCode: customer.purrPetCode,
      customerAddress: customer.address,
      payMethod: paymentMethod,
      useCoin: 0,
    };
    createOrder(orderData)
      .then((res) => {
        if (res.err === 0) {
          setOrder(res.data);
          setShowPaymentMethod(false);
          setOpen(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    
  };
  const handleCancelOrder = (purrPetCode) => {
    updateStatusOrder(purrPetCode, CONST.STATUS_ORDER.CANCEL).then((res) => {
      setOpen(false);
      setSelectedProducts([]);
    });
  };
  const handlePayOrder = () => {
     if(paymentMethod === CONST.PAYMENT_METHOD.VNPAY){
        createPaymentUrl({
          orderCode: order.purrPetCode,
          urlReturn: "vnpay-returnForStaff",
        }).then((res) => {
         
           window.location.href = res.data.paymentUrl;
        });

      }else{
        updateStatusOrder(order.purrPetCode, CONST.STATUS_ORDER.PAID).then(
          (res) => {
            setOpen(false);
            setSelectedProducts([]);
          },
        );
      }
      
  };
  return (
    <Box className="flex w-full flex-col items-center justify-center p-5">
      <Box className="flex h-96 w-full justify-between">
        <Box className="flex w-3/5 flex-col">
          <Autocomplete
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleAddProduct();
              }
            }}
            id="product-search"
            options={productlist.map((product) => product.productName)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tên sản phẩm"
                placeholder="Nhập tên sản phẩm"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {params.InputProps.endAdornment}
                      {inputValue && !selectedProducts.includes(inputValue) && (
                        <MiniIconRoundButton onClick={handleAddProduct}>
                          <AddCircleOutlineIcon />
                        </MiniIconRoundButton>
                      )}
                    </>
                  ),
                }}
              />
            )}
          />
          <Box className="mt-5 h-full">
            <DataGrid
              hideFooter
              rows={rows}
              columns={columns}
              pageSize={5}
              classes={{
                columnHeaderTitle: "font-bold text-center",
                columnHeaders: "bg-gray-200",
              }}
              localeText={viVN.components.MuiDataGrid.defaultProps.localeText}
            />
          </Box>
        </Box>
        <Paper className="ml-5 w-2/5 px-5">
          <Typography className="mt-5 text-center text-lg font-bold">
            Thông tin đơn hàng
          </Typography>
          <Box className="mt-5 flex justify-between">
            <Typography className="font-bold">Tổng sản phẩm:</Typography>
            <Typography>{quantity}</Typography>
          </Box>
          <Box className="mt-5 flex justify-between">
            <Typography className="font-bold">Tổng tiền:</Typography>
            <Typography>{formatCurrency(totalPrice)}</Typography>
          </Box>
          <Divider className="mt-5" />
          <Typography className="mt-5 text-center text-lg font-bold">
            Thông tin khách hàng
          </Typography>
          <Box className="mt-5 flex justify-between">
            <Typography className="font-bold">Tên khách hàng:</Typography>
            <Typography>{customer.name}</Typography>
          </Box>
          <Box className="mt-5 flex justify-between">
            <Typography className="font-bold">Email:</Typography>
            <Typography>{customer.email}</Typography>
          </Box>
          <Box className="mt-5 flex justify-between">
            <Typography className="font-bold">Số điện thoại:</Typography>
            <Typography>{customer.phoneNumber}</Typography>
          </Box>
        </Paper>
      </Box>
      {selectedProducts.length > 0 && showBtnConfirmOrder && (
        <BigHoverTransformButton onClick={()=>setShowPaymentMethod(true)} className="mt-5">
         Phương thức thanh toán
        </BigHoverTransformButton>
      )}
      <Dialog open={showPaymentMethod} onClose={handleClose}>
        <DialogTitle className=" bg-gray-400 text-center font-bold">
          Phương thức thanh toán
          </DialogTitle>
        <DialogContent className="flex-col w-[400px] pb-0">
        <FormControl   sx={{
          width: "90%",
          ml: "auto",
          mr: "auto",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          p: 5,
        }}>
          <RadioGroup
            name="payMethod"
            value={paymentMethod}
            onChange={(event) => setPaymentMethod(event.target.value)}
            sx={{ display: "flex", flexDirection: "row" }}
          >
            <FormControlLabel
              value={CONST.PAYMENT_METHOD.COD}
              control={<Radio />}
              label="Tiền mặt"
              icon={<PaymentsIcon />}
            />
            
            <FormControlLabel
              value={CONST.PAYMENT_METHOD.VNPAY}
              control={<Radio />}
              icon={<image src="https://vnpay.vn/wp-content/uploads/2020/07/logo-vnpay.png" alt="VNPAY" />}
              label="VNPAY"
            />
          </RadioGroup>
        </FormControl>
        <DialogActions>
          
          <Button onClick={handleCreateOrder}>
            Tiến hành thanh toán
          </Button>
        </DialogActions>
          </DialogContent>
        </Dialog>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className=" bg-gray-400 text-center font-bold">
          ĐƠN HÀNG
        </DialogTitle>
        <DialogContent className="flex w-[400px] pb-0">
          <Box className="mt-5 flex flex-col">
            <Typography className="italic">Đơn hàng đã được tạo!</Typography>
            <Typography className="text-black">
              Mã đơn hàng của bạn là: {order.purrPetCode}
            </Typography>
            <Typography className="text-black">
              Khách hàng: {customer.name}
            </Typography>
            <Typography className="text-black">
              Tổng tiền: {formatCurrency(order.orderPrice)}
            </Typography>
            <Typography className="text-black">
              Phương thức thanh toán: {order.payMethod}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCancelOrder(order.purrPetCode)}>
            Huỷ đơn hàng
          </Button>
          <Button onClick={() => handlePayOrder(order.purrPetCode)}>
            Thanh toán
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
