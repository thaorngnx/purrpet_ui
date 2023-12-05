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
import { useParams, Link } from "react-router-dom";
import { formatCurrency } from "../../utils/FormatPrice";
import { getOrderByCode, updateStatusOrder } from "../../api/order";
import { getCustomerByCode } from "../../api/customer";
import { getProductByCode } from "../../api/product";
import { createPaymentUrl } from "../../api/pay";
import * as CONST from "../../constants";

export const OrderDetail = () => {
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
  const [orderItems, setOrderItems] = useState([]);
  const [productOrder, setProductOrder] = useState([]);
  const [customer, setCustomer] = useState({});
  useEffect(() => {
    getOrderByCode(orderCode).then((res) => {
      console.log(res);
      if (res.err === 0) {
        setOrder(res.data);
        setOrderItems(res.data.orderItems);
        getCustomerByCode(res.data.customerCode).then((res) => {
          console.log(res);
          if (res.err === 0) {
            setCustomer(res.data);
          }
        });
      }
    });
  }, [orderCode]);
  useEffect(() => {
    let productOrder = [];
    orderItems.map((item) => {
      console.log(item);
      getProductByCode(item.productCode).then((res) => {
        console.log(res);
        if (res.err === 0) {
          let product = {
            productCode: item.productCode,
            images: res.data.images,
            name: res.data.productName,
            quantity: item.quantity,
            price: item.productPrice,
            totalPrice: item.totalPrice,
          };
          productOrder.push(product);
        }
      });
    });
    setProductOrder(productOrder);
  }, [orderItems]);
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
              {order.createdAt}
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
              {customer.name}
            </Typography>
            <Typography variant="body1">
              <span className="font-bold">Số điện thoại: </span>
              {customer.phoneNumber}
            </Typography>
            <Typography variant="body1">
              <span className="font-bold">Email: </span>
              {customer.email}
            </Typography>
            <Typography variant="body1">
              <span className="font-bold">Địa chỉ nhận hàng: </span>
              {order.customerAddress?.street}, {order.customerAddress?.ward},
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
                  <Link
                    to={`/product/${item.productCode}`}
                    underline="hover"
                    color={"inherit"}
                    className="w-1/6"
                  >
                    <Typography variant="body1" className="text-center text-sm">
                      Xem sản phẩm
                    </Typography>
                  </Link>
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
                  Hủy đơn hàng
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
