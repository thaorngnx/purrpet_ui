import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  List,
  ListItem,
  Divider,
  Button,
} from "@mui/material";
import * as CONST from "../../constants";
import { useEffect, useState } from "react";
import { getOrdersByCustomer } from "../../api/order";
import { getBookingSpaByCustomer } from "../../api/bookingSpa";
import { getBookingHomeByCustomer } from "../../api/bookingHome";
import { Link } from "react-router-dom";
import { formatCurrency, formatDateTime } from "../../utils/formatData";

export const OrderHistory = () => {
  const handleTabOrderClick = (event) => {
    const status = event.target.innerText;
    for (const [key, value] of Object.entries(CONST.STATUS_ORDER)) {
      if (value.toUpperCase() === status) {
        console.log(value);
        const orderByStatus = orders.filter((order) => order.status === value);
        setOrderByStatus(orderByStatus);
      }
    }
  };

  const handleTabSpaClick = (event) => {
    const status = event.target.innerText;
    for (const [key, value] of Object.entries(CONST.STATUS_BOOKING)) {
      if (value.toUpperCase() === status) {
        console.log(value);
        const bSpaByStatus = bSpas.filter((bSpa) => bSpa.status === value);
        setBSpaByStatus(bSpaByStatus);
      }
    }
  };

  const handleTabHomeClick = (event) => {
    const status = event.target.innerText;
    for (const [key, value] of Object.entries(CONST.STATUS_BOOKING)) {
      if (value.toUpperCase() === status) {
        console.log(value);
        const bHomeByStatus = bHomes.filter((bHome) => bHome.status === value);
        setBHomeByStatus(bHomeByStatus);
      }
    }
  };

  const [orders, setOrders] = useState([]);
  const [orderByStatus, setOrderByStatus] = useState([]);
  const [bSpas, setBSpas] = useState([]);
  const [bSpaByStatus, setBSpaByStatus] = useState([]);
  const [bHomes, setBHomes] = useState([]);
  const [bHomeByStatus, setBHomeByStatus] = useState([]);
  const [tabOrder, setTabOrder] = useState(0);
  const [tabSpa, setTabSpa] = useState(0);
  const [tabHome, setTabHome] = useState(0);

  useEffect(() => {
    //api get order by customer
    getOrdersByCustomer().then((res) => {
      console.log(res);
      if (res.err === 0) {
        setOrders(res.data);
        const waittingForPayOrder = res.data.filter(
          (order) => order.status === CONST.STATUS_ORDER.WAITING_FOR_PAY,
        );
        setOrderByStatus(waittingForPayOrder);
      }
    });
    //api get booking spa by customer
    getBookingSpaByCustomer().then((res) => {
      console.log(res);
      if (res.err === 0) {
        setBSpas(res.data);
        const waittingForPayBSpa = res.data.filter(
          (bSpa) => bSpa.status === CONST.STATUS_BOOKING.WAITING_FOR_PAY,
        );
        setBSpaByStatus(waittingForPayBSpa);
      }
    });

    //api get booking home by customer
    getBookingHomeByCustomer().then((res) => {
      console.log(res);
      if (res.err === 0) {
        setBHomes(res.data);
        const waittingForPayBHome = res.data.filter(
          (bHome) => bHome.status === CONST.STATUS_BOOKING.WAITING_FOR_PAY,
        );
        setBHomeByStatus(waittingForPayBHome);
      }
    });
  }, []);
  return (
    <Box className=" flex min-h-screen w-3/4 flex-col items-center">
      <Typography variant="h6" className="m-3 ml-5 font-bold">
        Lịch sử mua hàng
      </Typography>
      <Paper className="mb-10 w-[90%]">
        <Typography variant="h6" className="m-3 text-center text-lg font-bold">
          ĐƠN HÀNG
        </Typography>
        <Box className="flex flex-col">
          <Tabs
            value={tabOrder}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            onChange={(event, newValue) => {
              setTabOrder(newValue);
            }}
          >
            {Object.values(CONST.STATUS_ORDER).map((value) => {
              return (
                <Tab label={value} key={value} onClick={handleTabOrderClick} />
              );
            })}
          </Tabs>
          <Box className="flex max-h-96 flex-col overflow-auto">
            <List>
              <ListItem className="flex">
                <Typography variant="body1" className="w-1/6 font-bold">
                  Mã ĐH
                </Typography>
                <Typography
                  variant="body1"
                  className="w-1/6 text-center font-bold"
                >
                  Ngày đặt
                </Typography>
                <Typography
                  variant="body1"
                  className="w-1/6 text-center font-bold"
                >
                  SL sản phẩm
                </Typography>
                <Typography
                  variant="body1"
                  className="w-1/6 text-center font-bold"
                >
                  Tổng tiền
                </Typography>
                <Typography
                  variant="body1"
                  className="w-1/6 text-center font-bold"
                >
                  Trạng thái
                </Typography>
                <Typography
                  variant="body1"
                  className="w-1/6 text-center font-bold"
                >
                  Thao tác
                </Typography>
              </ListItem>
              {orderByStatus.map((order) => {
                return (
                  <ListItem
                    key={order.purrPetCode}
                    className="flex justify-center"
                  >
                    <Box className="flex w-full flex-col">
                      <Box className="mb-2 flex flex-row items-center">
                        <Typography variant="body1" className="w-1/6 px-1">
                          {order.purrPetCode}
                        </Typography>
                        <Typography
                          variant="body1"
                          className="w-1/6 px-1 text-center"
                        >
                          {formatDateTime(order.createdAt)}
                        </Typography>
                        <Typography
                          variant="body1"
                          className="w-1/6 px-1 text-center"
                        >
                          {order.orderItems.length}
                        </Typography>
                        <Typography
                          variant="body1"
                          className="w-1/6 px-1 text-right"
                        >
                          {formatCurrency(order.orderPrice)}
                        </Typography>
                        <Typography
                          variant="body1"
                          className="w-1/6 px-1 text-center"
                        >
                          {order.status}
                        </Typography>
                        <Box className="w-1/6 px-1 text-center">
                          <Button
                            component={Link}
                            to={`/order/${order.purrPetCode}`}
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
                          >
                            Chi tiết
                          </Button>
                        </Box>
                      </Box>
                      <Divider />
                    </Box>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Box>
      </Paper>

      <Paper className="mb-10 w-[90%]">
        <Typography variant="h6" className="m-3 text-center text-lg font-bold">
          SPA
        </Typography>
        <Box className="flex flex-col">
          <Tabs
            value={tabSpa}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            onChange={(event, newValue) => {
              setTabSpa(newValue);
            }}
          >
            {Object.values(CONST.STATUS_BOOKING).map((value) => {
              return (
                <Tab label={value} key={value} onClick={handleTabSpaClick} />
              );
            })}
          </Tabs>
          <Box className="flex max-h-96 flex-col overflow-auto">
            <List>
              <ListItem className="flex">
                <Typography variant="body1" className="w-1/6 font-bold">
                  Mã đặt chỗ
                </Typography>
                <Typography
                  variant="body1"
                  className="w-1/6 text-center font-bold"
                >
                  Giờ đặt lịch
                </Typography>
                <Typography
                  variant="body1"
                  className="w-1/6 text-center font-bold"
                >
                  Tên thú cưng
                </Typography>
                <Typography
                  variant="body1"
                  className="w-1/6 text-center font-bold"
                >
                  Mã spa
                </Typography>
                <Typography
                  variant="body1"
                  className="w-1/6 text-center font-bold"
                >
                  Tổng tiền
                </Typography>
                <Typography
                  variant="body1"
                  className="w-1/6 text-center font-bold"
                >
                  Trạng thái
                </Typography>
                <Typography
                  variant="body1"
                  className="w-1/6 text-center font-bold"
                >
                  Thao tác
                </Typography>
              </ListItem>
              {bSpaByStatus.map((bookingSpa) => {
                return (
                  <ListItem key={bookingSpa.id} className="flex justify-center">
                    <Box className="flex w-full flex-col">
                      <Box className="mb-2 flex flex-row items-center">
                        <Typography variant="body1" className="w-1/6 px-1">
                          {bookingSpa.purrPetCode}
                        </Typography>
                        <Typography
                          variant="body1"
                          className="w-1/6 px-1 text-center"
                        >
                          {bookingSpa.bookingTime}{" "}
                          {formatDateTime(bookingSpa.bookingDate)}
                        </Typography>
                        <Typography
                          variant="body1"
                          className="w-1/6 px-1 text-center"
                        >
                          {bookingSpa.petName}
                        </Typography>
                        <Typography
                          variant="body1"
                          className="w-1/6 px-1 text-center"
                        >
                          {bookingSpa.spaCode}
                        </Typography>
                        <Typography
                          variant="body1"
                          className="w-1/6 px-1 text-right"
                        >
                          {formatCurrency(bookingSpa.bookingSpaPrice)}
                        </Typography>
                        <Typography
                          variant="body1"
                          className="w-1/6 px-1 text-center"
                        >
                          {bookingSpa.status}
                        </Typography>
                        <Box className="w-1/6 px-1 text-center">
                          <Button
                            component={Link}
                            to={`/bookingSpa/${bookingSpa.purrPetCode}`}
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
                          >
                            Chi tiết
                          </Button>
                        </Box>
                      </Box>
                      <Divider />
                    </Box>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Box>
      </Paper>

      <Paper className="mb-10 w-[90%]">
        <Typography variant="h6" className="m-3 text-center text-lg font-bold">
          HOMESTAY
        </Typography>
        <Box className="flex flex-col">
          <Tabs
            value={0}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            onChange={(event, newValue) => {
              setTabHome(newValue);
            }}
          >
            {Object.values(CONST.STATUS_BOOKING).map((value) => {
              return (
                <Tab label={value} key={value} onClick={handleTabHomeClick} />
              );
            })}
          </Tabs>
          <Box className="flex max-h-96 flex-col overflow-auto">
            <List>
              <ListItem className="flex">
                <Typography variant="body1" className="w-1/6 font-bold">
                  Mã đặt phòng
                </Typography>
                <Typography
                  variant="body1"
                  className="w-1/6 text-center font-bold"
                >
                  Ngày checkin
                </Typography>
                <Typography
                  variant="body1"
                  className="w-1/6 text-center font-bold"
                >
                  Ngày checkout
                </Typography>
                <Typography
                  variant="body1"
                  className="w-1/6 text-center font-bold"
                >
                  Tên thú cưng
                </Typography>
                <Typography
                  variant="body1"
                  className="w-1/6 text-center font-bold"
                >
                  Mã phòng
                </Typography>
                <Typography
                  variant="body1"
                  className="w-1/6 text-center font-bold"
                >
                  Tổng tiền
                </Typography>
                <Typography
                  variant="body1"
                  className="w-1/6 text-center font-bold"
                >
                  Trạng thái
                </Typography>
                <Typography
                  variant="body1"
                  className="w-1/6 text-center font-bold"
                >
                  Thao tác
                </Typography>
              </ListItem>
              {bHomeByStatus.map((bookingHome) => {
                return (
                  <ListItem
                    key={bookingHome.id}
                    className="flex justify-center"
                  >
                    <Box className="flex w-full flex-col">
                      <Box className="mb-2 flex flex-row items-center">
                        <Typography variant="body1" className="w-1/6 px-1">
                          {bookingHome.purrPetCode}
                        </Typography>
                        <Typography
                          variant="body1"
                          className="w-1/6 px-1 text-center"
                        >
                          {formatDateTime(bookingHome.dateCheckIn)}
                        </Typography>
                        <Typography
                          variant="body1"
                          className="w-1/6 px-1 text-center"
                        >
                          {formatDateTime(bookingHome.dateCheckOut)}
                        </Typography>
                        <Typography
                          variant="body1"
                          className="w-1/6 px-1 text-center"
                        >
                          {bookingHome.petName}
                        </Typography>
                        <Typography
                          variant="body1"
                          className="w-1/6 px-1 text-center"
                        >
                          {bookingHome.homeCode}
                        </Typography>
                        <Typography
                          variant="body1"
                          className="w-1/6 px-1 text-right"
                        >
                          {formatCurrency(bookingHome.bookingHomePrice)}
                        </Typography>
                        <Typography
                          variant="body1"
                          className="w-1/6 px-1 text-center"
                        >
                          {bookingHome.status}
                        </Typography>
                        <Box className="w-1/6 px-1 text-center">
                          <Button
                            component={Link}
                            to={`/bookingHome/${bookingHome.purrPetCode}`}
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
                          >
                            Chi tiết
                          </Button>
                        </Box>
                      </Box>
                      <Divider />
                    </Box>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
