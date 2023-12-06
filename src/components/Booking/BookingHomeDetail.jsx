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
import { formatCurrency, formatDateTime } from "../../utils/formatData";
import {
  getBookingHomeByCode,
  updateStatusBookingHome,
} from "../../api/bookingHome";
import { getHomestayByCode } from "../../api/homestay";
import { createPaymentUrl } from "../../api/pay";
import * as CONST from "../../constants";

export const BookingHomeDetail = () => {
  const { bookingHomeCode } = useParams();

  const handlePaymentClick = () => {
    console.log("payment");
    createPaymentUrl({ orderCode: bookingHome.purrPetCode }).then((res) => {
      console.log(res);
      if (res.err === 0) {
        window.location.href = res.data.paymentUrl;
      }
    });
  };

  const handleChangeStatus = () => {
    console.log("cancel");
    updateStatusBookingHome(
      bookingHome.purrPetCode,
      CONST.STATUS_ORDER.CANCEL,
    ).then((res) => {
      console.log(res);
      if (res.err === 0) {
        window.location.reload();
      }
    });
  };

  const [bookingHome, setBookingHome] = useState({});
  const [homestay, setHomestay] = useState({});

  useEffect(() => {
    getBookingHomeByCode(bookingHomeCode).then((res) => {
      console.log(res);
      if (res.err === 0) {
        setBookingHome(res.data);
        getHomestayByCode(res.data.homeCode).then((res) => {
          console.log(res);
          if (res.err === 0) {
            setHomestay(res.data);
          }
        });
      }
    });
  }, [bookingHomeCode]);
  return (
    <Box className="mt-5 flex min-h-screen flex-col items-center">
      <Typography variant="h5" className="font-bold">
        Chi tiết đơn đặt phòng
      </Typography>
      <Paper className="mb-10 flex w-[90%] flex-col justify-center p-8">
        <Box className="flex flex-row items-start justify-start">
          <Box className="flex flex-1 flex-col items-start justify-start">
            <Typography variant="body1">
              <span className="font-bold">Mã đơn: </span>
              {bookingHome.purrPetCode}
            </Typography>
            <Typography variant="body1">
              <span className="font-bold">Ngày đặt: </span>
              {formatDateTime(bookingHome.createdAt)}
            </Typography>
            <Typography variant="body1">
              <span className="font-bold">Trạng thái: </span>
              {bookingHome.status}
            </Typography>
          </Box>
          <Box className="flex flex-1 flex-col items-start justify-start">
            <Typography variant="body1">
              <span className="font-bold">Họ tên: </span>
              {bookingHome.customerName}
            </Typography>
            <Typography variant="body1">
              <span className="font-bold">Số điện thoại: </span>
              {bookingHome.customerPhone}
            </Typography>
            <Typography variant="body1">
              <span className="font-bold">Email: </span>
              {bookingHome.customerEmail}
            </Typography>
            <Typography variant="body1">
              <span className="font-bold">Ghi chú: </span>
              {bookingHome.customerNote}
            </Typography>
          </Box>
        </Box>
        <Divider className="my-3" />
        <Box className="flex flex-row items-start justify-start">
          <Typography variant="body1" className="flex-1">
            <span className="font-bold">Tên thú cưng: </span>
            {bookingHome.petName}
          </Typography>
          <Box className="flex flex-1 flex-col items-start justify-start">
            <Typography variant="body1">
              <span className="font-bold">Ngày check-in: </span>
              {formatDateTime(bookingHome.dateCheckIn)}
            </Typography>
            <Typography variant="body1">
              <span className="font-bold">Ngày check-out: </span>
              {formatDateTime(bookingHome.dateCheckOut)}
            </Typography>
          </Box>
        </Box>
        <Divider className="my-3" />
        <Box className="flex flex-col justify-center">
          <List>
            <ListItem key="title" className="p-0">
              <Typography variant="body1" className="w-1/6 font-bold">
                Mã phòng
              </Typography>
              <Typography
                variant="body1"
                className="w-1/6 p-2 text-center font-bold"
              >
                Loại thú cưng
              </Typography>
              <Typography
                variant="body1"
                className="w-1/6 text-center font-bold"
              >
                Loại phòng
              </Typography>
              <Typography
                variant="body1"
                className="w-1/6 text-center font-bold"
              >
                Kích thước
              </Typography>
              <Typography
                variant="body1"
                className="w-1/6 text-center font-bold"
              >
                Số ngày
              </Typography>
              <Typography
                variant="body1"
                className="m-2 w-1/6 text-center font-bold"
              >
                Đơn giá
              </Typography>
              <Typography
                variant="body1"
                className="m-2 w-1/6 text-center font-bold"
              >
                Thành tiền
              </Typography>
            </ListItem>
            <ListItem key={homestay.purrPetCode} className="my-3 p-0">
              <Typography variant="body1" className="w-1/6">
                {homestay.purrPetCode}
              </Typography>
              <Typography variant="body1" className="w-1/6 p-2">
                {homestay.homeType}
              </Typography>
              <Typography variant="body1" className="w-1/6 text-center">
                {homestay.categoryName}
              </Typography>
              <Typography variant="body1" className="w-1/6 text-center">
                {homestay.masterDataName}
              </Typography>
              <Typography variant="body1" className="w-1/6 text-center">
                {bookingHome.numberOfDay}
              </Typography>
              <Typography variant="body1" className="m-2 w-1/6 text-end">
                {formatCurrency(homestay.price)}
              </Typography>
              <Typography variant="body1" className="m-2 w-1/6 text-end">
                {formatCurrency(bookingHome.bookingHomePrice)}
              </Typography>
            </ListItem>
          </List>
          <Typography variant="body1" className="text-end text-lg font-bold">
            Tổng tiền: {formatCurrency(bookingHome.bookingHomePrice)}
          </Typography>
          <Box className="flex flex-row justify-end">
            {bookingHome.status === "Chờ thanh toán" && (
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
