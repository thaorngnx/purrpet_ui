import { useEffect, useState, useRef } from "react";
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
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import * as CONST from "../../constants";
import { getActiveCategories } from "../../api/category";
import { getActiveHomestays } from "../../api/homestay";
import { getMasterDatas } from "../../api/masterData";
import { getCustomerByEmail, createCustomerByStaff } from "../../api/customer";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {
  createBookingHome,
  getUnavailableDay,
  updateStatusBookingHome,
} from "../../api/bookingHome";
import { BigHoverTransformButton } from "../../components/Button/StyledButton";
import { formatCurrency } from "../../utils/formatData";
import { validateObject, validateEmail } from "../../utils/validationData";
import PaymentsIcon from "@mui/icons-material/Payments";
import { createPaymentUrl } from "../../api/pay";

export const BookingHome = () => {
  const navigate = useNavigate();

  const [error, setError] = useState({});
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [allHomes, setAllHomes] = useState([]);
  const [validHomes, setValidHomes] = useState([]);
  const [openCustomerInfoForm, setOpenCustomerInfoForm] = useState(false);
  const [showBtnConfirmBook, setShowBtnConfirmBook] = useState(false);
  const [homeSizes, setHomeSizes] = useState([]);
  const [validSizes, setValidSizes] = useState([]);
  const [unavailableDays, setUnavailableDays] = useState([]);
  const [inputCus, setInputCus] = useState("khachle@gmail.com");
  const [customer, setCustomer] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [order, setOrder] = useState({});
  const [showNameInput, setShowNameInput] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [maxDateCheckOut, setMaxDateCheckOut] = useState(
    dayjs().add(2, "year"),
  );
  const [bookingInfo, setBookingInfo] = useState({
    petName: "",
    homeCode: "",
    bookingHomePrice: 0,
    customerCode: "",
    customerNote: "",
    homeSize: "",
    petType: "",
    categoryName: "",
    categoryCode: "",
    dateCheckIn: null,
    dateCheckOut: null,
    homePrice: 0,
    payMethod: CONST.PAYMENT_METHOD.COD,
  });

  useEffect(() => {
    getActiveCategories({
      categoryType: CONST.CATEGORY_TYPE.HOMESTAY,
    }).then((res) => {
      console.log(res.data);
      setCategories(res.data);
    });
    getActiveHomestays().then((res) => {
      console.log(res.data);
      setAllHomes(res.data);
    });
    getMasterDatas({ groupCode: CONST.GROUP_CODE.HOME_SIZE }).then((res) => {
      console.log(res.data);
      setHomeSizes(res.data);
    });
  }, [inputCus]);

  useEffect(() => {
    getCustomerByEmail({ email: inputCus }).then((res) => {
      if (res.err === 0) {
        setCustomer(res.data);
        setBookingInfo({ ...bookingInfo, customerCode: res.data.purrPetCode });
      } else {
        setShowNameInput(true);
      }
    });
  }, [inputCus]);

  const handleChangeBookingInfo = (event) => {
    if (!event.target.value) {
      setError({ ...error, [event.target.name]: true });
    } else {
      setError({ ...error, [event.target.name]: false });
    }
    if (event.target.name === "homeSize") {
      const masterData = homeSizes.find(
        (size) => size.name === event.target.value,
      );
      const home = validHomes.find(
        (home) =>
          home.masterDataCode === masterData.purrPetCode &&
          home.homeType === bookingInfo.petType &&
          home.categoryCode === bookingInfo.categoryCode,
      );
      getUnavailableDay({
        masterDataCode: masterData.purrPetCode,
      }).then((res) => {
        if (res.err === 0) {
          console.log("unavailable", res.data);
          setUnavailableDays(res.data);
        } else {
          setUnavailableDays([]);
        }
      });
      setBookingInfo({
        ...bookingInfo,
        homeCode: home.purrPetCode,
        homePrice: home.price,
        bookingHomePrice: home.price,
        homeSize: masterData.name,
      });
    } else if (event.target.name === "petType") {
      console.log("petType", event.target.value);
      let validHomes = [];
      validHomes = allHomes.filter(
        (home) => home.homeType === event.target.value,
      );
      if (bookingInfo.categoryCode !== "") {
        validHomes = allHomes.filter(
          (home) =>
            home.homeType === event.target.value &&
            home.categoryCode === bookingInfo.categoryCode,
        );
      }
      const validSizes = [];
      validHomes.forEach((home) => {
        const size = homeSizes.find(
          (size) => size.purrPetCode === home.masterDataCode,
        );
        if (!validSizes.includes(size.name)) {
          validSizes.push(size.name);
        }
      });

      setValidSizes(validSizes);
      setValidHomes(validHomes);
      setBookingInfo({
        ...bookingInfo,
        petType: event.target.value,
        homeSize: "",
        homePrice: 0,
        bookingHomePrice: 0,
        homeCode: "",
        categoryCode: "",
        categoryName: "",
        dateCheckIn: null,
        dateCheckOut: null,
      });
    } else if (event.target.name === "category") {
      const category = categories.find(
        (category) => category.categoryName === event.target.value,
      );
      const validHomes = allHomes.filter(
        (home) =>
          home.categoryCode === category.purrPetCode &&
          home.homeType === bookingInfo.petType,
      );
      setValidHomes(validHomes);
      const validSizes = [];
      validHomes.forEach((home) => {
        const size = homeSizes.find(
          (size) => size.purrPetCode === home.masterDataCode,
        );
        if (!validSizes.includes(size.name)) {
          validSizes.push(size.name);
        }
      });
      setValidSizes(validSizes);
      setBookingInfo({
        ...bookingInfo,
        categoryName: category.categoryName,
        categoryCode: category.purrPetCode,
        homeSize: "",
        homePrice: 0,
        bookingHomePrice: 0,
        homeCode: "",
      });
    } else {
      setBookingInfo({
        ...bookingInfo,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleOpenCustomerForm = () => {
    if (bookingInfo.petName === "") {
      setError({ ...error, petName: true });
      return;
    }
    setOpenCustomerInfoForm(true);
    setShowBtnConfirmBook(true);
  };

  const handleDateCheckInChange = (event) => {
    const newDate = dayjs(event).startOf("day");
    let checkOut = dayjs(bookingInfo.dateCheckOut);
    if (newDate.isAfter(checkOut) || newDate.isSame(checkOut)) {
      checkOut = null;
    }
    let maxDateCheckOut = dayjs().add(2, "year");
    unavailableDays.forEach((day) => {
      if (dayjs(day).isAfter(newDate) && dayjs(day).isBefore(maxDateCheckOut)) {
        maxDateCheckOut = dayjs(day);
      }
    });
    setMaxDateCheckOut(maxDateCheckOut);
    countDateAndPrice(newDate, checkOut);
  };

  const handleDateCheckOutChange = (event) => {
    const newDate = dayjs(event).startOf("day");
    countDateAndPrice(bookingInfo.dateCheckIn, newDate);
  };

  const countDateAndPrice = (dateCheckIn, dateCheckOut) => {
    let price = bookingInfo.homePrice;
    if (dayjs(dateCheckOut).isValid()) {
      let diff = dateCheckOut.diff(dateCheckIn, "day");
      price = diff * bookingInfo.homePrice;
    }
    console.log("checkout", dateCheckOut);
    setBookingInfo({
      ...bookingInfo,
      dateCheckIn: dateCheckIn,
      dateCheckOut: dayjs(dateCheckOut).isValid() ? dateCheckOut : null,
      bookingHomePrice: price,
    });
  };

  const handleConfirmBooking = () => {
    setShowBtnConfirmBook(false);
    console.log("book", bookingInfo);
    createBookingHome({
      petName: bookingInfo.petName,
      homeCode: bookingInfo.homeCode,
      bookingHomePrice: bookingInfo.bookingHomePrice,
      customerCode: customer.purrPetCode,
      customerNote: bookingInfo.customerNote,
      dateCheckIn: bookingInfo.dateCheckIn,
      dateCheckOut: bookingInfo.dateCheckOut,
      payMethod: bookingInfo.payMethod,
    }).then((res) => {
      if (res.err === 0) {
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
    updateStatusBookingHome(
      order.purrPetCode,
      CONST.STATUS_BOOKING.CANCEL,
    ).then((res) => {
      if (res.err === 0) {
        console.log(res);
        setOpenModal(false);
        setBookingInfo({
          petName: "",
          homeCode: "",
          bookingHomePrice: 0,
          customerCode: "",
          customerNote: "",
          homeSize: "",
          petType: "",
          categoryName: "",
          categoryCode: "",
          dateCheckIn: null,
          dateCheckOut: null,
          homePrice: 0,
        });
        setInputCus("khachle@gmail.com");
        setOpenCustomerInfoForm(false);
      }
      setMessage(res.message);
    });
  };
  const handlePayOrder = () => {
    if(order.payMethod === CONST.PAYMENT_METHOD.COD){
    updateStatusBookingHome(order.purrPetCode, CONST.STATUS_BOOKING.PAID).then(
      (res) => {
        if (res.err === 0) {
          console.log(res);
          setOpenModal(false);
          setBookingInfo({
            petName: "",
            homeCode: "",
            bookingHomePrice: 0,
            customerCode: "",
            customerNote: "",
            homeSize: "",
            petType: "",
            categoryName: "",
            categoryCode: "",
            dateCheckIn: null,
            dateCheckOut: null,
            homePrice: 0,
          });
          setInputCus("khachle@gmail.com");
          setOpenCustomerInfoForm(false);
        }
        setMessage(res.message);
      },
    );
  }
  else{
    createPaymentUrl({
      orderCode: order.purrPetCode,
      returnUrl: "vnpay-returnForStaff",
    }).then((res) => {
      if (res.err === 0) {
        window.location.href = res.data;
      }
    }
    )
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
    if (!nameValue) {
      setError({ ...error, name: true });
      return;
    }
    createCustomerByStaff({
      name: nameValue,
      email: inputCus,
    }).then((res) => {
      if (res.err === 0) {
        setCustomer(res.data);
        setBookingInfo({ ...bookingInfo, customerCode: res.data.purrPetCode });
        setInputCus(res.data.email);
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
        Thông tin đặt phòng
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
              Bạn muốn đặt phòng:
            </FormLabel>
            <RadioGroup
              name="category"
              value={bookingInfo.categoryName}
              onChange={handleChangeBookingInfo}
              sx={{ display: "flex", flexDirection: "row" }}
            >
              {categories &&
                categories.map((category) => (
                  <FormControlLabel
                    key={category.categoryName}
                    value={category.categoryName}
                    control={<Radio />}
                    label={category.categoryName}
                  />
                ))}
            </RadioGroup>
          </FormControl>
        )}

        {bookingInfo.categoryCode && (
          <FormControl>
            <FormLabel className="font-bold text-black">
              Chọn loại phòng:
            </FormLabel>
            <RadioGroup
              name="homeSize"
              value={bookingInfo.homeSize}
              onChange={handleChangeBookingInfo}
              sx={{ display: "flex", flexDirection: "row" }}
            >
              {validSizes &&
                validSizes.map((size) => (
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
        {bookingInfo.homeSize !== "" && (
          <FormControl>
            <FormLabel className="mb-3 flex font-bold text-black">
              Chọn ngày đặt phòng:
            </FormLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Ngày vào"
                name="dateCheckIn"
                value={bookingInfo.dateCheckIn}
                onChange={handleDateCheckInChange}
                views={["year", "month", "day"]}
                format="DD/MM/YYYY"
                minDate={dayjs()}
                shouldDisableDate={(date) => {
                  return unavailableDays.some((day) =>
                    dayjs(date).isSame(dayjs(day)),
                  );
                }}
                maxDate={dayjs().add(1, "year")}
              />
              {bookingInfo.dateCheckIn !== "" && (
                <DatePicker
                  label="Ngày ra"
                  name="dateCheckOut"
                  value={bookingInfo.dateCheckOut}
                  onChange={handleDateCheckOutChange}
                  views={["year", "month", "day"]}
                  format="DD/MM/YYYY"
                  minDate={dayjs(bookingInfo.dateCheckIn).add(1, "day")}
                  shouldDisableDate={(date) => {
                    return unavailableDays.some(
                      (day) =>
                        dayjs(date).isSame(dayjs(bookingInfo.dateCheckIn)) &&
                        dayjs(date).isSame(dayjs(day).add(1, "day")),
                    );
                  }}
                  maxDate={maxDateCheckOut}
                  className="mt-4"
                />
              )}
            </LocalizationProvider>
          </FormControl>
        )}

        {bookingInfo.dateCheckIn && bookingInfo.dateCheckOut && (
          <>
            <Typography
              variant="body1"
              name="bookingHomePrice"
              className="mt-3 flex justify-end font-bold"
            >
              Tổng tiền: {formatCurrency(bookingInfo.bookingHomePrice)}
            </Typography>
          </>
        )}
        {bookingInfo.dateCheckIn &&
          bookingInfo.dateCheckOut &&
          !openCustomerInfoForm && (
            <BigHoverTransformButton
              onClick={handleOpenCustomerForm}
              className="m-auto my-3"
            >
              Tiếp tục
            </BigHoverTransformButton>
          )}
      </Paper>
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
          </FormControl>
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
          ĐƠN ĐẶT PHÒNG
        </DialogTitle>
        <DialogContent className="flex w-[400px] pb-0">
          <Box className="mt-5 flex flex-col">
            <Typography className="italic">
              Đơn đặt phòng đã được tạo!
            </Typography>
            <Typography className="text-black">
              Mã đơn đặt phòng: {order.purrPetCode}
            </Typography>
            <Typography className="text-black">
              Khách hàng: {customer.name}
            </Typography>
            <Typography className="text-black">
              Tổng tiền: {formatCurrency(order.bookingHomePrice)}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCancelOrder(order.purrPetCode)}>
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
