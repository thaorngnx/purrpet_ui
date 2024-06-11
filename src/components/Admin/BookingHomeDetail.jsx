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
import { useParams } from "react-router-dom";
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

  const [bookingHome, setBookingHome] = useState({
    purrPetCode: "",
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    customerNote: "",
    petName: "",
    dateCheckIn: "",
    dateCheckOut: "",
    numberOfDay: 0,
    bookingHomePrice: 0,
    status: "",
    createdAt: "",
    homestay: {
      purrPetCode: "",
      homeType: "",
      categoryName: "",
      masterDataName: "",
      price: 0,
    },
    pointUsed: 0,
    useCoin: 0,
  });
  const [homestay, setHomestay] = useState({});

  useEffect(() => {
    getBookingHomeByCode(bookingHomeCode).then((res) => {
      console.log(res);
      if (res.err === 0) {
        const bookingHomeInfo = res.data;
        getHomestayByCode(res.data.homeCode).then((res) => {
          console.log(res);
          if (res.err === 0) {
            setBookingHome({
              purrPetCode: bookingHomeInfo.purrPetCode,
              customerName: bookingHomeInfo.customerName,
              customerPhone: bookingHomeInfo.customerPhone,
              customerEmail: bookingHomeInfo.customerEmail,
              customerNote: bookingHomeInfo.customerNote,
              petName: bookingHomeInfo.petName,
              dateCheckIn: bookingHomeInfo.dateCheckIn,
              dateCheckOut: bookingHomeInfo.dateCheckOut,
              numberOfDay: bookingHomeInfo.numberOfDay,
              bookingHomePrice: bookingHomeInfo.bookingHomePrice,
              status: bookingHomeInfo.status,
              createdAt: bookingHomeInfo.createdAt,
              homestay: {
                purrPetCode: res.data.purrPetCode,
                homeType: res.data.homeType,
                categoryName: res.data.categoryName,
                masterDataName: res.data.masterDataName,
                price: res.data.price,
              },
              pointUsed: bookingHomeInfo.pointUsed,
              useCoin: bookingHomeInfo.useCoin,
            });
          }
        });
      }
    });
  }, [bookingHomeCode]);

  const handleUseServiceClick = () => {
    console.log("use service");
    updateStatusBookingHome(
      bookingHome.purrPetCode,
      CONST.STATUS_BOOKING.CHECKIN,
    ).then((res) => {
      console.log(res);
      if (res.err === 0) {
        window.location.reload();
      }
    });
  };

  const handleChangeStatus = () => {
    console.log("cancel");
    updateStatusBookingHome(
      bookingHome.purrPetCode,
      CONST.STATUS_BOOKING.CANCEL,
    ).then((res) => {
      console.log(res);
      if (res.err === 0) {
        window.location.reload();
      }
    });
  };

  return (
    <Box className="mt-5 flex min-h-screen flex-col items-center">
      <Typography variant="h5" className="font-bold">
        Chi tiết đơn đặt phòng
      </Typography>
      <Paper className="mb-10 flex w-[97%] flex-col justify-center p-8">
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
              <span className="font-bold">Ngày vào: </span>
              {formatDateTime(bookingHome.dateCheckIn)}
            </Typography>
            <Typography variant="body1">
              <span className="font-bold">Ngày ra: </span>
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
            <ListItem
              key={bookingHome.homestay.purrPetCode}
              className="my-3 p-0"
            >
              <Typography variant="body1" className="w-1/6">
                {bookingHome.homestay.purrPetCode}
              </Typography>
              <Typography variant="body1" className="w-1/6 p-2">
                {bookingHome.homestay.homeType}
              </Typography>
              <Typography variant="body1" className="w-1/6 text-center">
                {bookingHome.homestay.categoryName}
              </Typography>
              <Typography variant="body1" className="w-1/6 text-center">
                {bookingHome.homestay.masterDataName}
              </Typography>
              <Typography variant="body1" className="w-1/6 text-center">
                {bookingHome.numberOfDay}
              </Typography>
              <Typography variant="body1" className="m-2 w-1/6 text-end">
                {formatCurrency(bookingHome.homestay.price)}
              </Typography>
              <Typography variant="body1" className="m-2 w-1/6 text-end">
                {formatCurrency(bookingHome.bookingHomePrice)}
              </Typography>
            </ListItem>
          </List>
          <Typography variant="body1" className="text-md text-end ">
            Điểm sử dụng: {formatCurrency(bookingHome.pointUsed)}
          </Typography>
          <Typography variant="body1" className="text-md text-end ">
            Xu sử dụng: {formatCurrency(bookingHome.useCoin)}
          </Typography>
          <Typography
            variant="body1"
            className="text-end text-lg font-bold text-[#ee4d2d]"
          >
            Tổng tiền: {formatCurrency(bookingHome.totalPayment)}
          </Typography>
          <Box className="mt-3 flex flex-row justify-end">
            {bookingHome.status === CONST.STATUS_BOOKING.WAITING_FOR_PAY && (
              <>
                <Button
                  variant="contained"
                  className="bg-black"
                  onClick={handleChangeStatus}
                >
                  Hủy đơn
                </Button>
              </>
            )}
            {bookingHome.status === CONST.STATUS_BOOKING.PAID && (
              <>
                <Button
                  variant="contained"
                  className="bg-black"
                  onClick={handleUseServiceClick}
                >
                  Đã sử dụng dịch vụ
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
