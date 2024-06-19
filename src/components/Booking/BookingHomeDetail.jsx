import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  Divider,
  Button,
  FormControl,
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
import dayjs from "dayjs";

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
    pointUsed: 0,
    useCoin: 0,
    payMethod: "",
    totalPayment: 0,
    homestay: {
      purrPetCode: "",
      homeType: "",
      categoryName: "",
      masterDataName: "",
      price: 0,
    },
  });
  const [cancel, setCancel] = useState(false);

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
              pointUsed: bookingHomeInfo.pointUsed,
              useCoin: bookingHomeInfo.useCoin,
              payMethod: bookingHomeInfo.payMethod,
              totalPayment: bookingHomeInfo.totalPayment,
              homestay: {
                purrPetCode: res.data.purrPetCode,
                homeType: res.data.homeType,
                categoryName: res.data.categoryName,
                masterDataName: res.data.masterDataName,
                price: res.data.price,
              },
            });
          }
        });
      }
    });
  }, [bookingHomeCode]);

  useEffect(() => {
    const checkedTimeCancel = () => {
      const timeNow = dayjs();
      const timeCheckin = dayjs(bookingHome.dateCheckIn);
      const timeDiff = timeCheckin.diff(timeNow);
      const twentyFourHours = 24 * 60 * 60 * 1000; // 24 giờ expressed in milliseconds
      if (
        timeDiff > twentyFourHours &&
        bookingHome.status === CONST.STATUS_BOOKING.PAID
      ) {
        setCancel(true);
      }
    };
    checkedTimeCancel();
  }, [bookingHome]);

  const handlePaymentClick = () => {
    createPaymentUrl({
      orderCode: bookingHome.purrPetCode,
      returnUrl: "vnpay-returnForCus",
    }).then((res) => {
      if (res.err === 0) {
        window.location.href = res.data.paymentUrl;
      }
    });
  };

  const handleChangeStatus = () => {
    updateStatusBookingHome(
      bookingHome.purrPetCode,
      CONST.STATUS_BOOKING.CANCEL,
    ).then((res) => {
      console.log(res);
      if (res.err === 0) {
        setCancel(false);
        window.location.reload();
      }
    });
  };

  return (
    <Box className="mt-5 flex min-h-screen flex-col items-center">
      <Typography variant="h5" className="font-bold">
        Chi tiết đơn đặt phòng
      </Typography>
      <Paper className="mb-10 flex w-[90%] flex-col justify-center p-8">
        {bookingHome.status === CONST.STATUS_BOOKING.WAITING_FOR_PAY && (
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
        {bookingHome.status === CONST.STATUS_BOOKING.PAID && (
          <>
            <Typography
              variant="body1"
              className="text-base italic text-green-800"
            >
              Đơn hàng chỉ được hủy trước 24h so với thời gian check-in. Sẽ hoàn
              lại 90% số tiền đã thanh toán vào ví xu của bạn.
            </Typography>
            <Divider className="my-3" />
          </>
        )}
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
              <span className="font-bold">Phương thức thanh toán: </span>
              {bookingHome.payMethod}
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
          <FormControl className="  ml-[auto] flex w-1/2 justify-end ">
          <Typography variant="body1" className="m-1 flex flex-row items-center justify-between text-end ">
            Điểm sử dụng: 
            <Typography variant="body1" className="text-md text-end ">
           - {formatCurrency(bookingHome.pointUsed)}
          </Typography>
          </Typography>
          <Typography variant="body1" className="m-1 flex flex-row items-center justify-between text-end  ">
            Xu sử dụng: 
            <Typography>
          -  {formatCurrency(bookingHome.useCoin)}
              </Typography>
          </Typography>
          <Typography
            variant="body1"
            className="m-1 flex flex-row items-center justify-between text-end "
          >
            Tổng tiền: 
            <Typography variant="body1" className="text-end text-lg font-bold text-[#ee4d2d] ">
            {formatCurrency(bookingHome.totalPayment)}
            </Typography>
          </Typography>
          </FormControl>
          <Box className="mt-3 flex flex-row justify-end">
            {bookingHome.status === CONST.STATUS_BOOKING.WAITING_FOR_PAY && (
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
            {cancel === true && (
              <Button
                variant="contained"
                className="mr-3 bg-black"
                onClick={handleChangeStatus}
              >
                Hủy đơn
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
