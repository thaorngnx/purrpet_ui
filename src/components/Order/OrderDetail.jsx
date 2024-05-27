import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  Divider,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  TextareaAutosize
} from "@mui/material";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { formatCurrency, formatDateTime } from "../../utils/formatData";
import { getOrderByCode, updateStatusOrder } from "../../api/order";
import { getProducts } from "../../api/product";
import { createPaymentUrl } from "../../api/pay";
import { MiniHoverButton } from "../Button/StyledButton";
import { FormControl } from "@mui/material";
import * as CONST from "../../constants";
import { UploadImage, UploadImageRefund } from "../Image/UploadImage";
import { requestRefund } from "../../api/pay";

export const OrderDetail = () => {
  const navigate = useNavigate();

  const { orderCode } = useParams();
  const [open, setOpen] = useState(false);
  const [request, setRequest] = useState("");
  const [error, setError] = useState({});
  const [sendRequest, setSendRequest] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
 


  const [order, setOrder] = useState({
    purrPetCode: "",
    createdAt: "",
    status: "",
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    customerAddress: {
      street: "",
      ward: "",
      district: "",
      province: "",
    },
    customerNote: "",
    orderPrice: 0,
    orderItems: [],
    productOrder: [],
    totalPrice: 0,
    payMethod: "",
    paymentStatus: "",
    pointUsed: 0,
    useCoin: 0,
  });

  useEffect(() => {
    getOrderByCode(orderCode).then((res) => {
      console.log(res);
      if (res.err === 0) {
        const order = res.data;
        const orderItems = res.data.orderItems;
        const productCodes = [];
        res.data.orderItems.forEach((item) => {
          productCodes.push(item.productCode);
        });
        getProducts({ productCodes: productCodes.toString() }).then((res) => {
          console.log(res);
          if (res.err === 0) {
            let productOrder = [];
            res.data.forEach((item) => {
              orderItems.forEach((orderItem) => {
                if (item.purrPetCode === orderItem.productCode) {
                  let product = {
                    productCode: orderItem.productCode,
                    images: item.images,
                    name: item.productName,
                    quantity: orderItem.quantity,
                    price: orderItem.productPrice,
                    totalPrice: orderItem.totalPrice,
                  };
                  console.log(product);
                  productOrder.push(product);
                }
              });
            });
            console.log(order);
            setOrder({
              purrPetCode: order.purrPetCode,
              createdAt: order.createdAt,
              status: order.status,
              customerName: order.customerName,
              customerPhone: order.customerPhone,
              customerEmail: order.customerEmail,
              customerAddress: order.customerAddress,
              customerNote: order.customerNote,
              orderPrice: order.orderPrice,
              orderItems: order.orderItems,
              productOrder: productOrder,
              payMethod: order.payMethod,
              paymentStatus: order.paymentStatus,
              pointUsed: order.pointUsed,
              totalPayment: order.totalPayment,
              useCoin: order.useCoin,
              statusRefund: order.statusRefund,
            });
          }
        });
      }
    });
  }, []);

  const productOrder = order?.productOrder;

  const handlePaymentClick = () => {
    console.log("payment");
    createPaymentUrl({ orderCode: res.data.purrPetCode,
      returnUrl: '/vnpay-returnForCus' }).then((res) => {
      console.log(res);
      if (res.err === 0) {
        window.location.href = res.data.paymentUrl;
      }
    });
  };

  const handleChangeStatus = () => {
    console.log("cancel");
    updateStatusOrder(order.purrPetCode, CONST.STATUS_ORDER.CANCEL).then(
      (res) => {
        console.log(res);
        if (res.err === 0) {
          window.location.reload();
        }
      },
    );
  };
  
  const handleRefund = () => {
    console.log("refund");
    requestRefund({
      orderCode: order.purrPetCode,
      message: request.message,
      images: request.images,
    }).then((res) => {
      console.log(res);
      if (res.err === 0) {
        setSendRequest(true);
        handleClose();
      }
    });
    
  }
  console.log(order);

  return (
    <Box className="mt-5 flex min-h-screen flex-col items-center">
      <Typography variant="h5" className="mb-5 font-bold">
        Chi tiết đơn hàng
      </Typography>
      <Paper className="mb-10 flex w-[90%] flex-col justify-center p-8">
        {order.status === CONST.STATUS_ORDER.WAITING_FOR_PAY && (
          <>
            <Typography
              variant="body1"
              className="text-base italic text-red-800"
            >
              Vui lòng thanh toán để hoàn tất đơn. Đơn hàng sẽ tự động hủy sau
              10 phút đặt hàng nếu không thanh toán.
            </Typography>
            <Divider className="my-3" />
          </>
        )}
        <Box className="flex flex-row items-start justify-start">
          <Box className="flex flex-1 flex-col items-start justify-start">
            <Typography variant="body1">
              <span className="font-bold">Mã đơn hàng: </span>
              {order.purrPetCode}
            </Typography>
            <Typography variant="body1">
              <span className="font-bold">Ngày đặt hàng: </span>
              {formatDateTime(order.createdAt)}
            </Typography>
            <Typography variant="body1">
              <span className="font-bold">Trạng thái: </span>
              {order.status}
            </Typography>
            <Typography variant="body1">
              <span className="font-bold">Phương thức thanh toán: </span>
              {order.payMethod}
            </Typography>
            <Typography variant="body1">
              <span className="font-bold">Trạng thái thanh toán: </span>
              {order.paymentStatus}
            </Typography>
            {
            order.statusRefund && (
              <Typography variant="body1">
                <span className="font-bold">Trạng thái hoàn tiền: </span>
                {order.statusRefund}
              </Typography>
            )
           }
            
          </Box>
          <Box className="flex flex-1 flex-col items-start justify-start">
            <Typography variant="body1">
              <span className="font-bold">Họ tên: </span>
              {order.customerName}
            </Typography>
            <Typography variant="body1">
              <span className="font-bold">Số điện thoại: </span>
              {order.customerPhone}
            </Typography>
            <Typography variant="body1">
              <span className="font-bold">Email: </span>
              {order.customerEmail}
            </Typography>
            <Typography variant="body1">
              <span className="font-bold">Địa chỉ nhận hàng: </span>
              {order.customerAddress?.street}, {order.customerAddress?.ward},{" "}
              {order.customerAddress?.district},{" "}
              {order.customerAddress?.province}
            </Typography>
            <Typography variant="body1">
              <span className="font-bold">Ghi chú: </span>
              {order.customerNote}
            </Typography>
          </Box>
        </Box>
        <Divider className="my-3" />
        <Box className="flex flex-col justify-center">
          <List>
            <ListItem key="title" className="p-0">
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
                className="w-1/6 text-center font-bold"
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
                className="w-1/6 text-center font-bold"
              ></Typography>
            </ListItem>
            {productOrder.map((item) => {
              return (
                <ListItem
                  key={item.productCode}
                  className="my-3 min-h-[100px] p-0"
                >
                  <Box className="w-1/6">
                    <img
                      src={item.images[0]?.path}
                      alt=""
                      className="h-[100px] w-[100px] object-cover"
                    />
                  </Box>
                  <Typography variant="body1" className="w-1/3 p-2">
                    {item.name}
                  </Typography>
                  <Typography variant="body1" className="m-2 w-1/6 text-end">
                    {formatCurrency(item.price)}
                  </Typography>
                  <Typography variant="body1" className="w-1/6 text-center">
                    {item.quantity}
                  </Typography>
                  <Typography variant="body1" className="m-2 w-1/6 text-end">
                    {formatCurrency(item.totalPrice)}
                  </Typography>
                  <Box className="flex w-1/6 justify-center">
                    <MiniHoverButton
                      onClick={() => {
                        navigate(`/product/${item.productCode}`);
                      }}
                    >
                      Chi tiết
                    </MiniHoverButton>
                  </Box>
                </ListItem>
              );
            })}
          </List>
        
          <FormControl className="  w-1/2 flex justify-end ml-[auto] " >
            <Typography variant="body1" className="m-1 text-end flex flex-row items-center justify-between">
              Tổng tiền hàng: 
              <Typography variant="body1" className="m-1 text-end">
               {formatCurrency(order.orderPrice)}
               </Typography>
            </Typography>
            <Typography variant="body1" className="m-1 text-end flex flex-row items-center justify-between">
              Sử dụng điểm:
              <Typography variant="body1" className="m-1 text-end">
              - {formatCurrency(order.pointUsed)}
               </Typography>
            </Typography>
            <Typography variant="body1" className="m-1 text-end flex flex-row items-center justify-between">
              Sử dụng ví xu:   
              <Typography variant="body1" className="m-1 text-end">
              -  {formatCurrency( order.useCoin)}
               </Typography>
            </Typography>
            <Typography variant="body1" className="m-1 text-end flex flex-row items-center font-bold text-black text-[17px] justify-between">
              Thành tiền: 
              <Typography variant="body1" className="m-1 text-end text-[#800000] font-bold">
              {formatCurrency(order.totalPayment)}
               </Typography>
            </Typography>
            </FormControl>
       
       
          <Box className="mt-3 flex flex-row justify-end">
            {(order.paymentStatus === CONST.STATUS_PAYMENT.WAITING_FOR_PAY && order.status === CONST.STATUS_ORDER.NEW && order.payMethod === CONST.PAYMENT_METHOD.VNPAY )&& (
              <>
                <Button
                  variant="contained"
                  className="mr-3 bg-black"
                  onClick={handleChangeStatus}
                >
                  Hủy đơn
                </Button>
                <Button
                  variant="contained"
                  className="ml-3 bg-black"
                  onClick={handlePaymentClick}
                >
                  Thanh toán
                </Button>
              </>
            )}
            {
              order.status === CONST.STATUS_ORDER.NEW   && (
                <Button
                  variant="contained"
                  className="ml-3 bg-black"
                  onClick={handleChangeStatus}
                >
                  Huỷ Đơn
                </Button>
              )
            }
            {
              order.status === CONST.STATUS_ORDER.DONE && (
                <Button
                  variant="contained"
                  className={sendRequest ? "bg-gray-500 text-white" : "bg-black text-white"}
                  onClick={handleClickOpen}
                  disabled={sendRequest}
                >
                  {sendRequest ? "Đã gửi yêu cầu" : "Yêu cầu hoàn tiền"}
                </Button>
              )
            }
          </Box>
          <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        
      >
        <DialogTitle id="alert-dialog-title">
          {"Gửi yêu cầu hoàn tiền?"}
        </DialogTitle>
        <DialogContent>
       <TextareaAutosize
        aria-label="minimum height"
        minRows={3}
        placeholder="Nhập lý do hoàn tiền"
        style={{ width: '100%' }}
        onChange={(e) => setRequest({...request,message: e.target.value})}
      />
      <UploadImageRefund
        request={request}
        updateRequest={setRequest}
        err={error}
      />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Huỷ</Button>
          <Button onClick={handleRefund} autoFocus>
          Gửi yêu cầu
          </Button>
        </DialogActions>
      </Dialog>
        </Box>
      </Paper>
    </Box>
  );
};
