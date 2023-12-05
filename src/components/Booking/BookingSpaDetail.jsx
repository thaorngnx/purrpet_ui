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
  getBookingSpaByCode,
  updateStatusBookingSpa,
} from "../../api/bookingSpa";
import { getSpaByCode } from "../../api/spa";
import { createPaymentUrl } from "../../api/pay";
import * as CONST from "../../constants";

export const BookingSpaDetail = () => {
  const { bookingSpaCode } = useParams();

  const handlePaymentClick = () => {
    console.log("payment");
    createPaymentUrl({ orderCode: bookingSpa.purrPetCode }).then((res) => {
      console.log(res);
      if (res.err === 0) {
        window.location.href = res.data.paymentUrl;
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

  const [bookingSpa, setBookingSpa] = useState({});
  const [spa, setSpa] = useState({});

  useEffect(() => {
    getBookingSpaByCode(bookingSpaCode).then((res) => {
      console.log(res);
      if (res.err === 0) {
        setBookingSpa(res.data);
        getSpaByCode(res.data.spaCode).then((res) => {
          console.log(res);
          if (res.err === 0) {
            setSpa(res.data);
          }
        });
      }
    });
  }, [bookingSpaCode]);
  return (
    <Box className="mt-5 flex min-h-screen flex-col items-center">
      <Typography variant="h5" className="font-bold">
        Chi tiết đơn đặt lịch spa
      </Typography>
      <Paper className="mb-10 flex w-[90%] flex-col justify-center p-8">
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
            <ListItem key={spa.purrPetCode} className="my-3 p-0">
              <Typography variant="body1" className="w-1/6">
                {spa.purrPetCode}
              </Typography>
              <Typography variant="body1" className="w-1/6 p-2">
                {spa.spaName}
              </Typography>
              <Typography variant="body1" className="w-1/6 text-center">
                {spa.spaType}
              </Typography>
              <Typography variant="body1" className="w-1/3 text-center">
                {spa.description}
              </Typography>
              <Typography variant="body1" className="m-2 w-1/6 text-end">
                {formatCurrency(bookingSpa.bookingSpaPrice)}
              </Typography>
            </ListItem>
          </List>
          <Typography variant="body1" className="text-end text-lg font-bold">
            Tổng tiền: {formatCurrency(bookingSpa.bookingSpaPrice)}
          </Typography>
          <Box className="flex flex-row justify-end">
            {bookingSpa.status === "Chờ thanh toán" && (
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
