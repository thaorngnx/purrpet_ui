import React from "react";
import { useEffect, useState } from "react";
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
} from "@mui/material";
import * as CONST from "../../constants";
import { getCategories } from "../../api/category";
import { getHomestays } from "../../api/homestay";
import { getMasterDatas } from "../../api/masterData";
import { getCustomerByEmail } from "../../api/customer";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { createBookingHome, getUnavailableDay, updateStatusBookingHome } from "../../api/bookingHome";
import { Modal } from '@mui/base/Modal';
import {StyledBackdrop} from '../../components/Modal/StyledBackdrop';
import { ModalContent } from '../../components/Modal/ModalContent';

export const CreateBookingHome  = () => {
  const navigate = useNavigate();
  const handleChangeBookingInfo = (event) => {
    setError({ ...error, [event.target.name]: false });
    if (!event.target.value) {
      setError({ ...error, [event.target.name]: true });
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
      setSizeVisible(true);
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
      setPackageVisible(true);
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
    setOpenCustomerInfoForm(true);
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
    setBookingInfo({
      ...bookingInfo,
      dateCheckIn: dateCheckIn,
      dateCheckOut: dateCheckOut,
      bookingHomePrice: price,
    });
  };

  const handleChangeCustomerInfo = (e) => {
    setInputCus(e.target.value);
  };

  const handleConfirmBooking = () => {
    createBookingHome({
      petName: bookingInfo.petName,
      homeCode: bookingInfo.homeCode,
      bookingHomePrice: bookingInfo.bookingHomePrice,
      customerCode: customer.purrPetCode,
      customerNote: bookingInfo.customerNote,
      dateCheckIn: bookingInfo.dateCheckIn,
      dateCheckOut: bookingInfo.dateCheckOut,
    }).then((res) => {
      if (res.err === 0) {
        setOrder(res.data);
        setOpenModal(true);
      }
      setMessage(res.message);
    });
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleCancelOrder = (purrPetCode) => {
    updateStatusBookingHome(purrPetCode, CONST.STATUS_BOOKING.CANCEL).then((res) => {
      setOpenModal(false);
    });
  };

  const handlePayOrder = () => {
    console.log(order.purrPetCode);
    updateStatusBookingHome(order.purrPetCode, CONST.STATUS_BOOKING.PAID).then(
      (res) => {
        setOpenModal(false);
      },
    );
  };

  const [error, setError] = useState({});
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [allHomes, setAllHomes] = useState([]);
  const [validHomes, setValidHomes] = useState([]);
  const [sizeVisible, setSizeVisible] = useState(false);
  const [packageVisible, setPackageVisible] = useState(false);
 const [openCustomerInfoForm, setOpenCustomerInfoForm] = useState(false);
 const [inputCus, setInputCus] = useState('');
 const [customer, setCustomer] = useState({});
  const [homeSizes, setHomeSizes] = useState([]);
  const [validSizes, setValidSizes] = useState([]);
  const [unavailableDays, setUnavailableDays] = useState([]);
  const [maxDateCheckOut, setMaxDateCheckOut] = useState(
    dayjs().add(2, "year"),
  );
  const [openModal, setOpenModal] = React.useState(false);
  const [order, setOrder] = React.useState({});
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
  });

  useEffect(() => {
    getCategories({
      categoryType: CONST.CATEGORY_TYPE.HOMESTAY,
      status: CONST.STATUS.ACTIVE,
    }).then((res) => {
      console.log(res.data);
      setCategories(res.data);
    });
    getHomestays({
      status: CONST.STATUS.ACTIVE,
    }).then((res) => {
      console.log(res.data);
      setAllHomes(res.data);
    });
    getMasterDatas({ groupCode: CONST.GROUP_CODE.HOME_SIZE }).then((res) => {
      console.log(res.data);
      setHomeSizes(res.data);
    });
    getCustomerByEmail({email: inputCus}).then((res) => {
      if (res.err === 0) {
        setCustomer(res.data);
      }else{
      setInputCus('khachle@gmail.com');
      }
    });
  }, [inputCus]);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column" }}
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
          <FormLabel className="font-bold text-black">Tên thú cưng:</FormLabel>
          <TextField
            required
            name="petName"
            value={bookingInfo.petName}
            onChange={handleChangeBookingInfo}
            variant="outlined"
            error={error.petName}
            helperText={error.petName && "Tên thú cưng không được để trống"}
          />
        </FormControl>
        <FormControl>
          <FormLabel className="font-bold text-black">Thú cưng là:</FormLabel>
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
        {sizeVisible && (
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

        {packageVisible && (
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
            <FormLabel className="flex font-bold text-black">
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
                />
              )}
            </LocalizationProvider>
          </FormControl>
        )}

        <Typography
          variant="body1"
          name="bookingHomePrice"
          className="mt-3 justify-end font-bold"
        >
          Tổng tiền: {bookingInfo.bookingHomePrice} VNĐ
        </Typography>
        {!openCustomerInfoForm && (
          <Button
            variant="outlined"
            className="w-fit"
            onClick={handleOpenCustomerForm}
          >
            Tiếp tục
          </Button>
        )}
      </Paper>
      {openCustomerInfoForm && (
        <FormControl  sx={{
          width: "85%",
          ml: "auto",
          mr: "auto",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          p: 5,
        }} >
        <FormLabel className="font-bold text-black">Email Khách hàng:</FormLabel>
        <TextField
          required
          name="email"
          onChange={handleChangeCustomerInfo}
          variant="outlined"
        />
         <Button
          variant="outlined"
          sx={{
            ml: "auto",
            mr: "auto",
            position: "relative",
            width: "fit-content",
          }}
          onClick={handleConfirmBooking}
        >
          Xác nhận đặt lịch
        </Button>
      </FormControl>
      )}
       <Modal
      style={{
        display: 'flex',
        justifyContent: 'center',
        margin: 'auto',
        alignItems: 'center',
      }}
      aria-labelledby="unstyled-modal-title"
      aria-describedby="unstyled-modal-description"
      open={openModal}
      onClose={handleClose}
      slots={{ backdrop: StyledBackdrop }}
    >
      <ModalContent sx={{ width: 600, display: 'flex', justifyContent: 'center' }}>
        <h1 id="unstyled-modal-title">Đơn hàng của bạn đã được tạo</h1>
        <p id="unstyled-modal-description">
          Mã đơn hàng của bạn là: {order.purrPetCode}
        </p>
        <p id="unstyled-modal-description"> Khách hàng: {customer.name}</p>
        <p id="unstyled-modal-description">
          Tổng tiền: {order.bookingHomePrice}
        </p>
        <Button onClick={() => handleCancelOrder(order.purrPetCode)}>Huỷ đơn hàng</Button>
        <Button onClick={() => handlePayOrder(order.purrPetCode)}>Thanh toán</Button>
      </ModalContent>
    </Modal>
  
    </Box>
  );
};