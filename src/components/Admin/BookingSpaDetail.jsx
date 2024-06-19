import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  Divider,
  FormControl,
  Button,
} from "@mui/material";
import { CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { formatCurrency, formatDateTime } from "../../utils/formatData";
import {
  getBookingSpaByCode,
  updateStatusBookingSpa,
} from "../../api/bookingSpa";
import { getSpaByCode } from "../../api/spa";
import { createPaymentUrl } from "../../api/pay";
import * as CONST from "../../constants";

export const BookingSpaDetail = () => {
  const { bookingSpaCode } = useParams();

  const [bookingSpa, setBookingSpa] = useState({
    purrPetCode: "",
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    customerNote: "",
    petName: "",
    bookingDate: "",
    bookingTime: "",
    bookingSpaPrice: 0,
    status: "",
    createdAt: "",
    spa: {
      purrPetCode: "",
      spaName: "",
      spaType: "",
      description: "",
      price: 0,
      categoryCode: "",
    },
    pointUsed: 0,
    useCoin: 0,
    totalPayment: 0,
    payMethod: "",
  });

  useEffect(() => {
    getBookingSpaByCode(bookingSpaCode).then((res) => {
      console.log(res);
      if (res.err === 0) {
        const bookingSpaInfo = res.data;
        getSpaByCode(res.data.spaCode).then((res) => {
          console.log(res);
          if (res.err === 0) {
            setBookingSpa({
              purrPetCode: bookingSpaInfo.purrPetCode,
              customerName: bookingSpaInfo.customerName,
              customerPhone: bookingSpaInfo.customerPhone,
              customerEmail: bookingSpaInfo.customerEmail,
              customerNote: bookingSpaInfo.customerNote,
              petName: bookingSpaInfo.petName,
              bookingDate: bookingSpaInfo.bookingDate,
              bookingTime: bookingSpaInfo.bookingTime,
              bookingSpaPrice: bookingSpaInfo.bookingSpaPrice,
              status: bookingSpaInfo.status,
              createdAt: bookingSpaInfo.createdAt,
              spa: {
                purrPetCode: res.data.purrPetCode,
                spaName: res.data.spaName,
                spaType: res.data.spaType,
                description: res.data.description,
                price: res.data.price,
                categoryCode: res.data.categoryCode,
              },
              pointUsed: bookingSpaInfo.pointUsed,
              useCoin: bookingSpaInfo.useCoin,
              totalPayment: bookingSpaInfo.totalPayment,
              payMethod: bookingSpaInfo.payMethod,
            });
          }
        });
      }
    });
  }, []);

  const handleUseServiceClick = () => {
    console.log("use service");
    updateStatusBookingSpa(
      bookingSpa.purrPetCode,
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
    updateStatusBookingSpa(
      bookingSpa.purrPetCode,
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
        Chi tiết đơn đặt lịch spa
      </Typography>
      <Paper className="mb-10 flex w-[97%] flex-col justify-center p-8">
      <Box className="flex flex-row items-start justify-start">
          <Box className="flex flex-1 flex-col items-start justify-start">
            <Typography variant="body1">
              <span className="font-bold">Mã đơn: </span>
              {bookingSpa.purrPetCode}
            </Typography>
            <Typography variant="body1">
              <span className="font-bold">Ngày đặt: </span>
              {formatDateTime(bookingSpa.createdAt)}
            </Typography>
            <Typography variant="body1">
              <span className="font-bold">Phương thức thanh toán: </span>
              {bookingSpa.payMethod}
            </Typography>
            <Typography variant="body1">
              <span className="font-bold">Trạng thái: </span>
              {bookingSpa.status}
            </Typography>
          </Box>
          <Box className="flex flex-1 flex-col items-start justify-start">
            <Typography variant="body1">
              <span className="font-bold">Họ tên: </span>
              {bookingSpa.customerName}
            </Typography>
            <Typography variant="body1">
              <span className="font-bold">Số điện thoại: </span>
              {bookingSpa.customerPhone}
            </Typography>
            <Typography variant="body1">
              <span className="font-bold">Email: </span>
              {bookingSpa.customerEmail}
            </Typography>
            <Typography variant="body1">
              <span className="font-bold">Ghi chú: </span>
              {bookingSpa.customerNote}
            </Typography>
          </Box>
        </Box>
        <Divider className="my-3" />
        <Box className="flex flex-row items-start justify-start">
          <Typography variant="body1" className="flex-1">
            <span className="font-bold">Tên thú cưng: </span>
            {bookingSpa.petName}
          </Typography>
          <Box className="flex flex-1 flex-col items-start justify-start">
            <Typography variant="body1">
              <span className="font-bold">Ngày hẹn: </span>
              {formatDateTime(bookingSpa.bookingDate)}
            </Typography>
            <Typography variant="body1">
              <span className="font-bold">Giờ hẹn: </span>
              {bookingSpa.bookingTime}
            </Typography>
          </Box>
        </Box>
        <Divider className="my-3" />
        <Box className="flex flex-col justify-center">
          <List>
            <ListItem key="title" className="p-0">
              <Typography variant="body1" className="w-1/6 font-bold">
                Mã spa
              </Typography>
              <Typography variant="body1" className="w-1/6 p-2 font-bold">
                Spa
              </Typography>
              <Typography
                variant="body1"
                className="w-1/6 text-center font-bold"
              >
                Loại thú cưng
              </Typography>
              <Typography
                variant="body1"
                className="w-1/3 text-center font-bold"
              >
                Mô tả
              </Typography>
              <Typography
                variant="body1"
                className="m-2 w-1/6 text-center font-bold"
              >
                Đơn giá
              </Typography>
            </ListItem>
            <ListItem key={bookingSpa.purrPetCode} className="my-3 p-0">
              <Typography variant="body1" className="w-1/6">
                {bookingSpa.spa.purrPetCode}
              </Typography>
              <Typography variant="body1" className="w-1/6 p-2">
                {bookingSpa.spa.spaName}
              </Typography>
              <Typography variant="body1" className="w-1/6 text-center">
                {bookingSpa.spa.spaType}
              </Typography>
              <Typography variant="body1" className="w-1/3 text-center">
                {bookingSpa.spa.description}
              </Typography>
              <Typography variant="body1" className="m-2 w-1/6 text-end">
                {formatCurrency(bookingSpa.bookingSpaPrice)}
              </Typography>
            </ListItem>
          </List>
          <FormControl className="  ml-[auto] flex w-1/2 justify-end ">
          <Typography variant="body1" className="m-1 flex flex-row items-center justify-between text-end ">
            Điểm sử dụng: 
            <Typography variant="body1" className="text-md text-end ">
           - {formatCurrency(bookingSpa.pointUsed)}
          </Typography>
          </Typography>
          <Typography variant="body1" className="m-1 flex flex-row items-center justify-between text-end  ">
            Xu sử dụng: 
            <Typography>
          -  {formatCurrency(bookingSpa.useCoin)}
              </Typography>
          </Typography>
          <Typography
            variant="body1"
            className="m-1 flex flex-row items-center justify-between text-end "
          >
            Tổng tiền: 
            <Typography variant="body1" className="text-end text-lg font-bold text-[#ee4d2d] ">
            {formatCurrency(bookingSpa.totalPayment)}
            </Typography>
          </Typography>
          </FormControl>
          <Box className="mt-3 flex flex-row justify-end">
            {bookingSpa.status === CONST.STATUS_BOOKING.WAITING_FOR_PAY && (
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
            {bookingSpa.status === CONST.STATUS_BOOKING.PAID && (
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
