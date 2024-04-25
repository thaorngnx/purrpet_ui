import { useEffect, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Typography,
  Paper,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import * as CONST from "../../constants";
import { getActiveCategories } from "../../api/category";
import { getActiveSpas } from "../../api/spa";
import { getCustomerByEmail, createCustomerByStaff } from "../../api/customer";
import { TimeSpaForm } from "../../components/Booking/TimeSpaForm";
import { createBookingSpa, updateStatusBookingSpa } from "../../api/bookingSpa";
import { BigHoverTransformButton } from "../../components/Button/StyledButton";
import { formatCurrency } from "../../utils/formatData";
import { validateObject, validateEmail } from "../../utils/validationData";
import { createPaymentUrl } from "../../api/pay";
import PaymentsIcon from "@mui/icons-material/Payments";

export const BookingSpa = () => {
  const [error, setError] = useState({});
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [allSpas, setAllSpas] = useState([]);
  const [validSpas, setValidSpas] = useState([]);
  const [validSize, setValidSize] = useState([]);
  const [openTimeForm, setOpenTimeForm] = useState(false);
  const [showBtnConfirmBook, setShowBtnConfirmBook] = useState(false);
  const [openCustomerInfoForm, setOpenCustomerInfoForm] = useState(false);
  const [inputCus, setInputCus] = useState("khachle@gmail.com");
  const [customer, setCustomer] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [order, setOrder] = useState({});
  const [showNameInput, setShowNameInput] = useState(false);
  const [nameValue, setNameValue] = useState("");
 // const [showPaymentMethod, setShowPaymentMethod] = useState(false);

  const [bookingInfo, setBookingInfo] = useState({
    petName: "",
    spaCode: "",
    bookingSpaPrice: 0,
    customerCode: "",
    customerNote: "",
    bookingDate: null,
    bookingTime: "",
    spaName: "",
    size: "",
    petType: "",
    payMethod: CONST.PAYMENT_METHOD.COD,
  });

  useEffect(() => {
    getActiveCategories({
      categoryType: CONST.CATEGORY_TYPE.SPA,
    }).then((res) => {
      console.log(res.data);
      setCategories(res.data);
    });
    getActiveSpas().then((res) => {
      console.log(res.data);
      setAllSpas(res.data);
    });
  }, []);

  useEffect(() => {
    getCustomerByEmail({ email: inputCus }).then((res) => {
      if (res.err === 0) {
        setCustomer(res.data);
        setBookingInfo({
          ...bookingInfo,
          customerCode: res.data.purrPetCode,
        });
      } else {
        setShowNameInput(true);
      }
    });
  }, [inputCus]);

  useEffect(() => {
    setShowBtnConfirmBook(openCustomerInfoForm);
  }, [openCustomerInfoForm]);

  const handleChangeBookingInfo = (event) => {
    setError({ ...error, [event.target.name]: false });
    if (!event.target.value) {
      setError({ ...error, [event.target.name]: true });
    }
    if (event.target.name === "spaName") {
      const spa = validSpas.find((spa) => spa.spaName === event.target.value);
      setBookingInfo({
        ...bookingInfo,
        spaCode: spa.purrPetCode,
        bookingSpaPrice: spa.price,
        spaName: spa.spaName,
      });
    } else if (event.target.name === "petType") {
      let validSpas = [];
      validSpas = allSpas.filter((spa) => spa.spaType === event.target.value);
      const validSizes = [];
      validSpas.forEach((spa) => {
        const category = categories.find(
          (category) => category.purrPetCode === spa.categoryCode,
        );
        if (!validSizes.includes(category.categoryName)) {
          validSizes.push(category.categoryName);
        }
      });
      //change type when chosen size
      if (
        (!validSize.includes(bookingInfo.size) && bookingInfo.size !== "") ||
        bookingInfo.size !== ""
      ) {
        const size = categories.find(
          (category) => category.categoryName === bookingInfo.size,
        );
        validSpas = allSpas.filter(
          (spa) =>
            spa.spaType === event.target.value &&
            spa.categoryCode === size.purrPetCode,
        );
      }
      setValidSize(validSizes);
      setValidSpas(validSpas);
      setBookingInfo({
        ...bookingInfo,
        petType: event.target.value,
        spaName: "",
        size: "",
        bookingSpaPrice: 0,
      });
    } else if (event.target.name === "size") {
      const size = categories.find(
        (category) => category.categoryName === event.target.value,
      );
      setValidSpas(
        allSpas.filter(
          (spa) =>
            spa.categoryCode === size.purrPetCode &&
            spa.spaType === bookingInfo.petType,
        ),
      );
      setBookingInfo({
        ...bookingInfo,
        [event.target.name]: event.target.value,
        spaName: "",
      });
    } else {
      setBookingInfo({
        ...bookingInfo,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleOpenTimeForm = () => {
    if (bookingInfo.petName === "") {
      setError({ ...error, petName: true });
      return;
    }
    setOpenTimeForm(true);
  };

  const handleUpdateBookingInfo = (bookingInfo) => {
    setBookingInfo(bookingInfo);
  };

  const handleConfirmBooking = () => {
    setShowBtnConfirmBook(false);
    createBookingSpa({
      petName: bookingInfo.petName,
      spaCode: bookingInfo.spaCode,
      bookingSpaPrice: bookingInfo.bookingSpaPrice,
      customerCode: customer.purrPetCode,
      customerNote: bookingInfo.customerNote,
      bookingDate: bookingInfo.bookingDate,
      bookingTime: bookingInfo.bookingTime,
      payMethod: bookingInfo.payMethod,
    }).then((res) => {
      console.log(res);
      if (res.err === 0) {
        // navigate(`/bookingSpa/${res.data.purrPetCode}`);
        setOrder(res.data);
        setOpenModal(true);
      }
      setMessage(res.message);
    });
  };
  const handleChangeCustomerInfo = (e) => {
    if (error.email) {
      setError({ ...error, email: false });
    }
    if (e.key === "Enter") {
      if (!validateEmail(e.target.value)) {
        setError({ ...error, email: true });
        return;
      }
      setInputCus(e.target.value);
    }
  };
  const handleCancelOrder = () => {
    updateStatusBookingSpa(order.purrPetCode, CONST.STATUS_BOOKING.CANCEL).then(
      (res) => {
        if (res.err === 0) {
          console.log(res);
          setOpenModal(false);
          setBookingInfo({
            petName: "",
            spaCode: "",
            bookingSpaPrice: 0,
            customerCode: "",
            customerNote: "",
            bookingDate: null,
            bookingTime: "",
            spaName: "",
            size: "",
            petType: "",
          });
          setInputCus("khachle@gmail.com");
          setOpenCustomerInfoForm(false);
          setShowBtnConfirmBook(false);
          setOpenTimeForm(false);
          setOpenModal(false);
        }
        setMessage(res.message);
      },
    );
  };
  const handlePayOrder = () => {
    if (order.paymentMethod === CONST.PAYMENT_METHOD.COD) {
    updateStatusBookingSpa(order.purrPetCode, CONST.STATUS_BOOKING.PAID).then(
      (res) => {
        if (res.err === 0) {
          console.log(res);
          setOpenModal(false);
          setBookingInfo({
            petName: "",
            spaCode: "",
            bookingSpaPrice: 0,
            customerCode: "",
            customerNote: "",
            bookingDate: null,
            bookingTime: "",
            spaName: "",
            size: "",
            petType: "",
          });
          setInputCus("khachle@gmail.com");
          setOpenCustomerInfoForm(false);
          setShowBtnConfirmBook(false);
          setOpenTimeForm(false);
        }
        setMessage(res.message);
      },
    );
  } else {
    createPaymentUrl(order.purrPetCode).then((res) => {
      if (res.err === 0) {
        window.location.href = res.data;
      }
    });
  }
  };

  const handleClose = () => {
    setOpenModal(false);
    setError({});
  };

  const handleNameChange = (e) => {
    if (!e.target.value) {
      setError({ ...error, name: true });
    } else {
      setError({ ...error, name: false });
    }
    setNameValue(e.target.value);
  };

  const handleCloseDialog = () => {
    setShowNameInput(false);
    setError({});
  };

  const handleSubscribe = () => {
    let err = {};
    if (!nameValue) {
      console.log("name");
      err = { ...err, name: true };
    }
    if (Object.keys(err).length > 0) {
      setError(err);
      return;
    }
    createCustomerByStaff({
      name: nameValue,
      email: inputCus,
    }).then((res) => {
      if (res.err === 0) {
        console.log(res.data);
        setCustomer(res.data);
        setBookingInfo({
          ...bookingInfo,
          customerCode: res.data.purrPetCode,
        });
      } else {
        setInputCus("khachle@gmail.com");
      }
      setShowNameInput(false);
    });
    setShowNameInput(false);
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", width: "100%" }}
      className="min-h-screen"
    >
      <Typography
        variant="h5"
        component="h5"
        className="m-5 text-center font-bold"
      >
        Thông tin đặt lịch spa
      </Typography>
      <Paper
        sx={{
          width: "80%",
          ml: "auto",
          mr: "auto",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          p: 5,
          mb: 5,
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          component="div"
          className="text-center font-bold"
        >
          Thông tin thú cưng
        </Typography>
        <FormControl>
          <FormLabel className="mb-2 font-bold text-black">
            Tên thú cưng:
          </FormLabel>
          <TextField
            required
            name="petName"
            value={bookingInfo.petName}
            onChange={handleChangeBookingInfo}
            variant="outlined"
            error={error.petName}
            helperText={error.petName && "Tên thú cưng không được để trống"}
            focused={error.petName}
            onBlur={() => {
              if (bookingInfo.petName === "") {
                setError({ ...error, petName: true });
              }
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel className="mt-2 font-bold text-black">
            Thú cưng là:
          </FormLabel>
          <RadioGroup
            name="petType"
            value={bookingInfo.petType}
            onChange={handleChangeBookingInfo}
            sx={{ display: "flex", flexDirection: "row" }}
          >
            {Object.values(CONST.PET_TYPE).map((value) => (
              <FormControlLabel
                key={value}
                value={value}
                control={<Radio />}
                label={value}
              />
            ))}
          </RadioGroup>
        </FormControl>
        {bookingInfo.petType && (
          <FormControl>
            <FormLabel className="font-bold text-black">
              Cân nặng của thú cưng:
            </FormLabel>
            <RadioGroup
              name="size"
              value={bookingInfo.size}
              onChange={handleChangeBookingInfo}
              sx={{ display: "flex", flexDirection: "row" }}
            >
              {validSize &&
                validSize.map((size) => (
                  <FormControlLabel
                    key={size}
                    value={size}
                    control={<Radio />}
                    label={size}
                  />
                ))}
            </RadioGroup>
          </FormControl>
        )}

        {bookingInfo.size && (
          <FormControl>
            <FormLabel className="font-bold text-black">
              Chọn gói dịch vụ:
            </FormLabel>
            <RadioGroup
              name="spaName"
              value={bookingInfo.spaName}
              onChange={handleChangeBookingInfo}
              sx={{ display: "flex", flexDirection: "row" }}
            >
              {validSpas &&
                validSpas.map((spa) => (
                  <FormControlLabel
                    key={spa.spaName}
                    value={spa.spaName}
                    control={<Radio />}
                    label={spa.spaName}
                  />
                ))}
            </RadioGroup>
          </FormControl>
        )}

        {bookingInfo.spaName && (
          <>
            <Typography
              variant="body1"
              name="bookingSpaPrice"
              className="mt-3 flex justify-end font-bold"
            >
              Tổng tiền: {formatCurrency(bookingInfo.bookingSpaPrice)}
            </Typography>
            {!openTimeForm && (
              <BigHoverTransformButton
                onClick={handleOpenTimeForm}
                className="m-auto mt-5"
              >
                Tiếp tục
              </BigHoverTransformButton>
            )}
          </>
        )}
      </Paper>
      {openTimeForm && (
        <TimeSpaForm
          bookingInfo={bookingInfo}
          setOpenCustomerInfoForm={setOpenCustomerInfoForm}
          updateBookingInfo={handleUpdateBookingInfo}
        />
      )}
      {openCustomerInfoForm && (
        <Paper
          sx={{
            width: "80%",
            ml: "auto",
            mr: "auto",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            p: 5,
            mb: 3,
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            className="text-center font-bold"
          >
            Thông tin khách hàng
          </Typography>
          <FormControl>
            <FormLabel className="mb-2 font-bold text-black">
              Email khách hàng:
            </FormLabel>
            <TextField
              required
              name="email"
              onKeyDown={handleChangeCustomerInfo}
              variant="outlined"
              error={error.email}
              helperText={error.email && "Email không hợp lệ"}
              focused={error.email}
            />
            <Box className="mt-3 flex flex-row">
              <Typography variant="body1" className="font-bold">
                Tên khách hàng:
              </Typography>
              <Typography variant="body1" className="ml-2">
                {customer.name}
              </Typography>
            </Box>
            <Box className="mt-3 flex flex-row">
              <Typography variant="body1" className="font-bold">
                Email:
              </Typography>
              <Typography variant="body1" className="ml-2">
                {customer.email}
              </Typography>
            </Box>
            <Box className="mt-3 flex flex-row">
              <Typography variant="body1" className="font-bold">
                Số điện thoại:
              </Typography>
              <Typography variant="body1" className="ml-2">
                {customer.phoneNumber}
              </Typography>
            </Box>
            <FormControl>
            <FormLabel className="mt-2 font-bold text-black">
            Phương thức thanh toán:
          </FormLabel>
          <RadioGroup
            name="payMethod"
            value={bookingInfo.payMethod}
            onChange={(event)=>setBookingInfo({ ...bookingInfo, payMethod: event.target.value })}
            sx={{ display: "flex", flexDirection: "row" }}
          >
            <FormControlLabel
              value={CONST.PAYMENT_METHOD.COD}
              control={<Radio />}
              label="Tiền mặt"
              icon={<PaymentsIcon />}
            />
            
            <FormControlLabel
              value={CONST.PAYMENT_METHOD.VNPAY}
              control={<Radio />}
              icon={<image src="https://vnpay.vn/wp-content/uploads/2020/07/logo-vnpay.png" alt="VNPAY" />}
              label="VNPAY"
            />
          </RadioGroup>
              </FormControl>
          </FormControl>
        </Paper>
      )}
      {validateObject(bookingInfo) &&
        openCustomerInfoForm &&
        showBtnConfirmBook && (
          <BigHoverTransformButton
            onClick={handleConfirmBooking}
            className="m-auto mb-5"
          >
            Xác nhận đặt lịch
          </BigHoverTransformButton>
        )}
        

      <Dialog open={openModal} onClose={handleClose}>
        <DialogTitle className=" bg-gray-400 text-center font-bold">
          ĐƠN ĐẶT LỊCH SPA
        </DialogTitle>
        <DialogContent className="flex w-[400px] pb-0">
          <Box className="mt-5 flex flex-col">
            <Typography className="italic">
              Đơn đặt lịch đã được tạo!
            </Typography>
            <Typography className="text-black">
              Mã đơn đặt lịch: {order.purrPetCode}
            </Typography>
            <Typography className="text-black">
              Khách hàng: {customer.name}
            </Typography>
            <Typography className="text-black">
              Phương thức thanh toán: {order.payMethod}
            </Typography>
            <Typography className="text-black">
              Tổng tiền: {formatCurrency(order.bookingSpaPrice)}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>handleCancelOrder(order.purrPetCode)}>
            Huỷ đơn
          </Button>
          <Button onClick={() => handlePayOrder(order.purrPetCode)}>
            Thanh toán
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={showNameInput} onClose={handleCloseDialog}>
        <DialogTitle className=" bg-gray-400 text-center font-bold">
          THÊM KHÁCH HÀNG
        </DialogTitle>
        <DialogContent className="flex w-[400px] justify-center pb-0">
          <TextField
            autoFocus
            id="name"
            name="name"
            label="Tên khách hàng"
            type="text"
            onChange={handleNameChange}
            className="my-5 w-[90%]"
            error={error.name}
            helperText={error.name && "Tên khách hàng không được để trống"}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button onClick={handleSubscribe}>Tạo</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
