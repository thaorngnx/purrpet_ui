import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  Divider,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { formatCurrency, formatDateTime } from "../../utils/formatData";
import { getOrderByCode, updateStatusOrder } from "../../api/order";
import { getProducts } from "../../api/product";
import { createPaymentUrl } from "../../api/pay";
import * as CONST from "../../constants";

export const OrderDetail = () => {
  const navigate = useNavigate();

  const { orderCode } = useParams();

  const handlePaymentClick = () => {
    console.log("payment");
    createPaymentUrl({ orderCode: order.purrPetCode }).then((res) => {
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

  const [order, setOrder] = useState({});
  const [productOrder, setProductOrder] = useState([]);

  useEffect(() => {
    getOrderByCode(orderCode).then((res) => {
      console.log(res);
      if (res.err === 0) {
        setOrder(res.data);
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
            setProductOrder(productOrder);
          }
        });
      }
    });
  }, [orderCode]);
  return (
    <Box className="mt-5 flex min-h-screen flex-col items-center">
      <Typography variant="h5" className="font-bold">
        Chi tiết đơn hàng
      </Typography>
      <Paper className="mb-10 flex w-[90%] flex-col justify-center p-8">
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
              <span className="font-bold">Ghi chú: </span>
              {order.customerNote}
            </Typography>
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
                    <Button
                      size="small"
                      sx={{
                        color: "black",
                        display: "block",
                        fontWeight: "bold",
                        border: "1px solid black",
                        textTransform: "none",
                        m: 2,
                        ":hover": {
                          backgroundColor: "black",
                          color: "white",
                        },
                      }}
                      onClick={() => {
                        navigate(`/product/${item.productCode}`);
                      }}
                    >
                      Chi tiết
                    </Button>
                  </Box>
                </ListItem>
              );
            })}
          </List>
          <Typography variant="body1" className="text-end text-lg font-bold">
            Tổng tiền: {formatCurrency(order.orderPrice)}
          </Typography>
          <Box className="flex flex-row justify-end">
            {order.status === "Chờ thanh toán" && (
              <>
                <Button
                  variant="contained"
                  className="mr-3 mt-3 bg-black"
                  onClick={handleChangeStatus}
                >
                  Hủy đơn
                </Button>
                <Button
                  variant="contained"
                  className="ml-3 mt-3 bg-black"
                  onClick={handlePaymentClick}
                >
                  Thanh toán
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
