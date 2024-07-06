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
  TextareaAutosize,
  DialogContentText,
  Rating,
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
import { UploadImageRefund } from "../Image/UploadImage";
import { requestRefund } from "../../api/pay";
import { createReview, getReviewByCodeAndCustomer } from "../../api/review";

export const OrderDetail = () => {
  const navigate = useNavigate();

  const { orderCode } = useParams();
  const [open, setOpen] = useState(false);
  const [openRating, setOpenRating] = useState(false);
  const [request, setRequest] = useState({
    message: "",
    images: [],
  });
  const [error, setError] = useState({});
  const [sendRequest, setSendRequest] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({
    productCode: "",
    images: [],
    name: "",
    quantity: 0,
    price: 0,
    totalPrice: 0,
    review: {
      productCode: "",
      orderCode: "",
      rating: 0,
      comment: "",
    },
    reviewed: false,
  });
  const [review, setReview] = useState({
    productCode: "",
    orderCode: "",
    rating: 0,
    comment: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenRating = (product) => {
    setSelectedProduct(product);
    setOpenRating(true);
  };

  const handleCloseRating = () => {
    setOpenRating(false);
    setReview({
      ...review,
      rating: 0,
      comment: "",
    });
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

  const fetchOrderDetail = async () => {
    getOrderByCode(orderCode).then(async (res) => {
      console.log(res);
      if (res.err === 0) {
        const order = res.data;
        const orderItems = res.data.orderItems;
        const productCodes = [];
        res.data.orderItems.forEach((item) => {
          productCodes.push(item.productCode);
        });
        const productsRes = await getProducts({
          productCodes: productCodes.toString(),
        });
        console.log(productsRes);
        if (productsRes.err === 0) {
          let productOrder = [];
          for (const item of productsRes.data) {
            for (const orderItem of orderItems) {
              if (item.purrPetCode === orderItem.productCode) {
                const reviewRes = await getReviewByCodeAndCustomer(
                  order.purrPetCode,
                  orderItem.productCode,
                );
                if (reviewRes.err === 0) {
                  let reviewed = false;
                  if (reviewRes.data.rating > 0) {
                    reviewed = true;
                  }
                  let product = {
                    productCode: orderItem.productCode,
                    images: item.images,
                    name: item.productName,
                    quantity: orderItem.quantity,
                    price: orderItem.productPrice,
                    totalPrice: orderItem.totalPrice,
                    review: reviewRes.data,
                    reviewed: reviewed,
                  };
                  console.log(product);
                  productOrder.push(product);
                }
              }
            }
          }
          console.log("order", productOrder);
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
      }
    });
  };

  useEffect(() => {
    fetchOrderDetail();
  }, []);
  const productOrder = order?.productOrder;

  const handlePaymentClick = () => {
    console.log("payment");
    createPaymentUrl({
      orderCode: res.data.purrPetCode,
      returnUrl: "/vnpay-returnForCus",
    }).then((res) => {
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
    if (request.message === "") {
      setError({ message: "Vui lòng nhập lý do !" });
      console.log("error", error);
      return;
    } else if (request.images.length === 0) {
      setError({ images: "Vui lòng chọn hình ảnh !" });
      return;
    }
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
  };

  const handleRating = () => {
    console.log("rating");
    createReview({
      ...review,
      orderCode: order.purrPetCode,
      productCode: selectedProduct.productCode,
    }).then((res) => {
      console.log(res);
      if (res.err === 0) {
        fetchOrderDetail();
        handleCloseRating();
      }
    });
  };

  console.log("selectedProduct", selectedProduct);
  console.log(review);

  return (
    <Box className="mt-5 flex min-h-screen flex-col items-center">
      <Typography variant="h5" className="mb-5 font-bold">
        Chi tiết đơn hàng
      </Typography>
      <Paper className="mb-10 flex w-[90%] flex-col justify-center p-8">
        {order.paymentStatus === CONST.STATUS_PAYMENT.WAITING_FOR_PAY &&
          order.payMethod === CONST.PAYMENT_METHOD.VNPAY &&
          order.status === CONST.STATUS_ORDER.NEW && (
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
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            alignItems: "start",
            justifyContent: "start",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              alignItems: "start",
              justifyContent: "start",
            }}
          >
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
            {order.statusRefund && (
              <Typography variant="body1">
                <span className="font-bold">Trạng thái hoàn tiền: </span>
                {order.statusRefund}
              </Typography>
            )}
          </Box>
          <Divider
            sx={{
              display: {
                xs: "block",
                sm: "block",
                md: "none",
              },
              my: 1,
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              alignItems: "start",
              justifyContent: "start",
            }}
          >
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <List
            sx={{
              display: {
                xs: "none",
                sm: "block",
              },
            }}
          >
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
                    {order.status === CONST.STATUS_ORDER.DONE && (
                      <MiniHoverButton
                        className="ml-2"
                        onClick={() => {
                          handleClickOpenRating(item);
                        }}
                      >
                        {item.reviewed ? "Đã đánh giá" : "Đánh giá"}
                      </MiniHoverButton>
                    )}
                  </Box>
                </ListItem>
              );
            })}
          </List>
          <List
            sx={{
              display: {
                xs: "block",
                sm: "none",
              },
            }}
          >
            {productOrder.map((item) => {
              return (
                <ListItem
                  key={item.productCode}
                  className="my-3 min-h-[100px] p-0"
                >
                  <Box className="ml-auto flex flex-col">
                    <Box className="flex flex-row items-center">
                      <img
                        src={item.images[0]?.path}
                        alt=""
                        className="h-[100px] w-[100px] object-cover"
                      />
                      <Typography className=" ml-2 text-black">
                        {item.name}
                      </Typography>
                    </Box>
                    <Box className="flex flex-col items-end">
                      <Typography className="text-black">
                        {formatCurrency(item.price)}
                      </Typography>
                      <Typography className="text-black">
                        x {item.quantity}
                      </Typography>
                      <Typography className="font-bold text-black">
                        {formatCurrency(item.totalPrice)}
                      </Typography>
                    </Box>
                    <Box className="flex flex-row justify-center">
                      <MiniHoverButton
                        onClick={() => {
                          navigate(`/product/${item.productCode}`);
                        }}
                      >
                        Chi tiết
                      </MiniHoverButton>
                      {order.status === CONST.STATUS_ORDER.DONE && (
                        <MiniHoverButton
                          className="ml-2"
                          onClick={() => {
                            handleClickOpenRating(item);
                          }}
                        >
                          {item.reviewed ? "Đã đánh giá" : "Đánh giá"}
                        </MiniHoverButton>
                      )}
                    </Box>
                  </Box>
                </ListItem>
              );
            })}
          </List>

          <FormControl
            sx={{
              display: "flex",
              width: {
                xs: "100%",
                sm: "50%",
              },
              ml: "auto",
              justifyContent: "end",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                marginTop: 1,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              Tổng tiền hàng:
              <Typography
                variant="body1"
                sx={{
                  textAlign: "end",
                }}
              >
                {formatCurrency(order.orderPrice)}
              </Typography>
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginTop: 1,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              Sử dụng điểm:
              <Typography
                variant="body1"
                sx={{
                  textAlign: "end",
                }}
              >
                - {formatCurrency(order.pointUsed)}
              </Typography>
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginTop: 1,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              Sử dụng ví xu:
              <Typography
                variant="body1"
                sx={{
                  textAlign: "end",
                }}
              >
                - {formatCurrency(order.useCoin)}
              </Typography>
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginTop: 1,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                fontWeight: "bold",
                color: "black",
              }}
            >
              Thành tiền:
              <Typography
                variant="body1"
                sx={{
                  textAlign: "end",
                  color: "#800000",
                  fontWeight: "bold",
                }}
              >
                {formatCurrency(order.totalPayment)}
              </Typography>
            </Typography>
          </FormControl>

          <Box className="mt-3 flex flex-row justify-end">
            {order.status === CONST.STATUS_ORDER.NEW && (
              <>
                <Button
                  variant="contained"
                  className="mr-3 bg-black"
                  onClick={handleChangeStatus}
                >
                  Hủy đơn
                </Button>
                {order.paymentStatus === CONST.STATUS_PAYMENT.WAITING_FOR_PAY &&
                  order.payMethod === CONST.PAYMENT_METHOD.VNPAY && (
                    <Button
                      variant="contained"
                      className="ml-3 bg-black"
                      onClick={handlePaymentClick}
                    >
                      Thanh toán
                    </Button>
                  )}
              </>
            )}
            {/* {order.status === CONST.STATUS_ORDER.NEW  (
              <Button
                variant="contained"
                className="ml-3 bg-black"
                onClick={handleChangeStatus}
              >
                Huỷ Đơn
              </Button>
            )} */}
            {order.status === CONST.STATUS_ORDER.DONE && (
              <Button
                variant="contained"
                className={
                  sendRequest ? "bg-gray-500 text-white" : "bg-black text-white"
                }
                onClick={handleClickOpen}
                disabled={sendRequest}
              >
                {sendRequest ? "Đã gửi yêu cầu" : "Yêu cầu hoàn tiền"}
              </Button>
            )}
          </Box>
          <Dialog open={openRating} onClose={handleCloseRating}>
            <DialogTitle id="alert-dialog-title">
              {"Đánh giá sản phẩm"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {selectedProduct && (
                  <Box className="flex flex-col">
                    <Box className="items-center justify-between">
                      <Box className="flex flex-row items-center">
                        <img
                          src={selectedProduct?.images[0]?.path}
                          alt={selectedProduct?.name}
                          className="h-[100px] w-[100px] object-cover"
                        />
                        <Typography className=" ml-2 text-black">
                          {selectedProduct?.name}
                        </Typography>
                      </Box>
                      <Box className="flex flex-col justify-center">
                        <Rating
                          name="simple-controlled"
                          value={
                            selectedProduct.review.rating
                              ? selectedProduct.review.rating
                              : review.rating
                          }
                          onChange={(event, newValue) => {
                            setReview({ ...review, rating: newValue });
                          }}
                          disabled={selectedProduct.reviewed}
                          className="my-3 w-max"
                        />
                        <TextField
                          id="outlined-multiline-static"
                          label="Đánh giá"
                          defaultValue={selectedProduct.review.comment}
                          disabled={selectedProduct.reviewed}
                          multiline
                          rows={3}
                          onChange={(e) =>
                            setReview({ ...review, comment: e.target.value })
                          }
                        />
                      </Box>
                    </Box>
                  </Box>
                )}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseRating}>Hủy</Button>
              {!selectedProduct.reviewed && (
                <Button onClick={handleRating} autoFocus>
                  Gửi đánh giá
                </Button>
              )}
            </DialogActions>
          </Dialog>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="xl"
            height="auto"
          >
            <DialogTitle id="alert-dialog-title">
              {"Gửi yêu cầu hoàn tiền"}
            </DialogTitle>
            {error.message && (
              <DialogContentText
                id="alert-dialog-description"
                className="ml-5 w-[md] text-[#FF0000] "
              >
                {error.message}
              </DialogContentText>
            )}
            <DialogContent id="alert-dialog-description">
              <TextareaAutosize
                aria-label="minimum height"
                minRows={3}
                placeholder="Nhập lý do hoàn tiền"
                style={{ width: "400px" }}
                onChange={(e) =>
                  setRequest({ ...request, message: e.target.value }) &&
                  setError({ message: "" })
                }
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
