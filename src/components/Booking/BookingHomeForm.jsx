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
} from "@mui/material";
import * as CONST from "../../constants";
import { getActiveCategories } from "../../api/category";
import { getActiveHomestays } from "../../api/homestay";
import { getMasterDatas } from "../../api/masterData";
import { CustomerInfoForm } from "./CustomerInfoForm";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { createBookingHome, getUnavailableDay } from "../../api/bookingHome";
import { createPaymentUrl } from "../../api/pay";
import { BigHoverTransformButton } from "../Button/StyledButton";
import { formatCurrency } from "../../utils/formatData";
import { validateObject } from "../../utils/validationData";
import el from "date-fns/locale/el";

export const BookingHomeForm = () => {
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
    userPoint: 0,
    useCoin: 0,
    payMethod: CONST.PAYMENT_METHOD.VNPAY,
  });
  const [disableRadio, setDisableRadio] = useState({
    VNPAY: false,
    COIN: false,
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
  }, []);

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
      let validHome = [];
      validHome = allHomes.filter(
        (home) => home.homeType === event.target.value,
      );
      if (bookingInfo.categoryCode !== "") {
        validHome = allHomes.filter(
          (home) =>
            home.homeType === event.target.value &&
            home.categoryCode === bookingInfo.categoryCode,
        );
      }
      const validSizes = [];
      validHome.forEach((home) => {
        const size = homeSizes.find(
          (size) => size.purrPetCode === home.masterDataCode,
        );
        if (!validSizes.includes(size.name)) {
          validSizes.push(size.name);
        }
      });

      setValidSizes(validSizes);
      setValidHomes(validHome);
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
      const validHome = allHomes.filter(
        (home) =>
          home.categoryCode === category.purrPetCode &&
          home.homeType === bookingInfo.petType,
      );
      setValidHomes(validHome);
      const validSizes = [];
      validHome.forEach((home) => {
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
      console.log("diff", diff);
      price = diff * bookingInfo.homePrice;
    }
    setBookingInfo({
      ...bookingInfo,
      dateCheckIn: dateCheckIn,
      dateCheckOut: dayjs(dateCheckOut).isValid() ? dateCheckOut : null,
      bookingHomePrice: price,
    });
  };

  const handleCustomerInfo = (customerInfo) => {
    const total =
      bookingInfo.bookingHomePrice -
      customerInfo.useCoin -
      customerInfo.userPoint;
    if (total === 0) {
      setBookingInfo({
        ...bookingInfo,
        customerCode: customerInfo.customerCode,
        customerNote: customerInfo.customerNote,
        userPoint: customerInfo.userPoint,
        useCoin: customerInfo.useCoin,
        payMethod: CONST.PAYMENT_METHOD.COIN,
      });
      setDisableRadio({
        VNPAY: true,
        COIN: false,
      });
    } else {
      setBookingInfo({
        ...bookingInfo,
        customerCode: customerInfo.customerCode,
        customerNote: customerInfo.customerNote,
        userPoint: customerInfo.userPoint,
        useCoin: customerInfo.useCoin,
        payMethod: CONST.PAYMENT_METHOD.VNPAY,
      });
      setDisableRadio({
        VNPAY: false,
        COIN: true,
      });
    }
  };

  const handleConfirmInfo = (confirm) => {
    setShowBtnConfirmBook(confirm);
  };

  const handleConfirmBooking = () => {
    setShowBtnConfirmBook(false);
    createBookingHome({
      petName: bookingInfo.petName,
      homeCode: bookingInfo.homeCode,
      bookingHomePrice: bookingInfo.bookingHomePrice,
      customerCode: bookingInfo.customerCode,
      customerNote: bookingInfo.customerNote,
      dateCheckIn: bookingInfo.dateCheckIn,
      dateCheckOut: bookingInfo.dateCheckOut,
      payMethod: bookingInfo.payMethod,
      userPoint: bookingInfo.userPoint,
      useCoin: bookingInfo.useCoin,
    }).then((res) => {
      if (res.err === 0) {
        if (bookingInfo.payMethod === CONST.PAYMENT_METHOD.COIN) {
          navigate(`/bookingHome/${res.data.purrPetCode}`);
          return;
        } else {
          createPaymentUrl({
            orderCode: res.data.purrPetCode,
            returnUrl: "vnpay-returnForCus",
          }).then((res) => {
            console.log(res);
            if (res.err === 0) {
              window.location.href = res.data.paymentUrl;
            }
          });
        }
      }
      // navigate(`/bookingHome/${res.data.purrPetCode}`);
      // navigate("/");
      setMessage(res.message);
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        mb: 3,
        minHeight: "100vh",
        backgroundColor: "#f2d663",
      }}
    >
     
     
      <Typography
        variant="h5"
        component="h5"
        sx={{
          m: 3,
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
       ĐẶT LỊCH PHÒNG CHO THÚ CƯNG
      </Typography>
      <Box
        sx={{
          width: {
            xs: "95%",
            sm: "85%",
            md: "75%",
          },
          mx: "auto",
          position: "relative",
          mb: 5,
        }}
      >
      <Paper
        sx={{
          
          mx: "auto",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          p: {
            xs: 3,
            sm: 5,
            md: 7,
          },
         
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          component="div"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Thông tin thú cưng
        </Typography>
        <FormControl>
          <FormLabel
            sx ={{
              mb: 1,
              fontWeight: "bold",
              color: "black",
            }}
          >
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
        <Box sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}>
          <Box sx={{
            display: "flex",
            flexDirection: "column",
          }}>

          
        <FormControl>
          <FormLabel
            sx={{
              mt: 1,
              fontWeight: "bold",
              color: "black",
            }}
          >
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
            <FormLabel
              sx={{
                fontWeight: "bold",
                color: "black",
              }}
            >
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
          <FormControl sx={{
           
          }}>
            <FormLabel
              sx={{
                fontWeight: "bold",
                color: "black",
              }}
            >
              Chọn loại phòng:
            </FormLabel>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
            <RadioGroup
              name="homeSize"
              value={bookingInfo.homeSize}
              onChange={handleChangeBookingInfo}
              sx={{ display: "flex", flexDirection: "col", marginRight: "15px" }}
            >
              {validSizes &&
                validSizes.map((size) => (
                
                    <FormControlLabel
                    key={size}
                    value={size}
                    control={<Radio />}
                    label={
                      size === "Size S" ? "Size S ( 60cm x 60cm x 60cm)" : size === "Size M" ? "Size M ( 60cm x 80cm x 90cm)" : "Size L (  60cm x 90cm x 120cm)"
                    }
                  />
                
                ))}
            </RadioGroup>
          {
               bookingInfo.homeSize === "Size S" ? (
                <img src="https://res.cloudinary.com/drzp9tafy/image/upload/c_pad,w_200,h_190/v1721046337/SizeS_2_apiv3e.jpg" alt="dog" style={{width: "200px", height: "190px"}}/>
              ) : bookingInfo.homeSize === "Size M" ? (
                <img src="https://res.cloudinary.com/drzp9tafy/image/upload/c_pad,w_200,h_190/v1721190639/Screenshot_2024-07-17_113027_sso47r.jpg" alt="cat" style={{width: "200px", height: "190px"}}/>
              ) : bookingInfo.homeSize === "Size L" ?  (
                <img src="https://res.cloudinary.com/drzp9tafy/image/upload/c_pad,w_200,h_190/v1721190639/Screenshot_2024-07-17_113009_nbpvpb.jpg" alt="cat" style={{width: "200px", height: "190px"}}/>
              ): (
                ""
              )
          }
          </Box>
          </FormControl>
        )}
                </Box>
          <Box>
            {
            bookingInfo.petType === "Chó"   ? (
              <Box>
            {
              bookingInfo.petName !== "" && (
                <Typography style={{ fontStyle: 'italic', color: '#555', marginTop:"2px" }}>
                Xin chào! Tên con là <strong>{bookingInfo.petName}</strong>
              </Typography>
              )
            }
              <img src="https://res.cloudinary.com/drzp9tafy/image/upload/v1721105561/dogL-removebg-preview_cklzu7.png" alt="dog" style={{width: "200px", height: "250px"}}/>
              </Box>
            ) : bookingInfo.petType === "Mèo" ? (
              <Box>
              {
              bookingInfo.petName !== "" && (
                <Typography style={{ fontStyle: 'italic', color: '#555', marginTop:"2px" }}>
                Xin chào! Tên con là <strong>{bookingInfo.petName}</strong>
              </Typography>
              )
            }
              <img src="https://res.cloudinary.com/drzp9tafy/image/upload/v1721106128/Cat_big-removebg-preview_lq2fd9.png" alt="cat" style={{width: "200px", height: "250px"}}/>
              </Box>
            ) : (
              <img src="https://res.cloudinary.com/drzp9tafy/image/upload/v1721105931/image-removebg-preview_2_slnir2.png" alt="other" style={{width: "200px", height: "250px"}}/>
            )
          }</Box>
        </Box>
        {bookingInfo.homeSize !== "" && (
          <FormControl>
            <FormLabel
              sx={{
                mb: 2,
                fontWeight: "bold",
                color: "black",
              }}
            >
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
              sx={{
                mt: 2,
                display: "flex",
                flexDirection: "row",
                justifyContent: "end",
                fontWeight: "bold",
                color: "red",
              }}
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
              sx={{
                m: "auto",
                mt: 2,
              }}
            >
              Tiếp tục
            </BigHoverTransformButton>
          )}
      </Paper>
      <img
          src="https://res.cloudinary.com/drzp9tafy/image/upload/v1721111288/image-Photoroom_nzaulw.png"
          alt="spa"
          style={{
            position: "absolute",
            top: "-80px",  // Điều chỉnh giá trị này để đặt ảnh nằm đè lên phần trên của Paper
            left: "10%",
            transform: "translateX(-50%)",
            zIndex: 2,
            width: "150px", // Điều chỉnh kích thước ảnh tùy ý
            height: "auto",
          }}
        />
      </Box>
      {openCustomerInfoForm && (
        <CustomerInfoForm
          customer={handleCustomerInfo}
          confirmInfo={handleConfirmInfo}
          totalPrice={bookingInfo.bookingHomePrice}
        />
      )}
      {validateObject(bookingInfo) && showBtnConfirmBook && (
        <FormControl
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            justifyItems: "center",
            backgroundColor: "#ffffff",
            px: {
              xs: 3,
              sm: 5,
              md: 7,
            },
            mt: 3,
            mx: "auto",
            width: {
              xs: "95%",
              sm: "85%",
              md: "75%",
            },
          }}
        >
          <FormControl
            sx={{
              display: "flex",
              flexDirection: "column",
              mt: 2,
            }}
          >
            <FormLabel
              sx={{
                fontWeight: "bold",
                color: "black",
              }}
            >
              Phương thức thanh toán:
            </FormLabel>
            <RadioGroup
              name="payMethod"
              value={bookingInfo.payMethod}
              sx={{ display: "flex", flexDirection: "row" }}
            >
              <FormControlLabel
                value={CONST.PAYMENT_METHOD.VNPAY}
                control={<Radio />}
                label="VNPAY"
                disabled={disableRadio.VNPAY}
              />
              <FormControlLabel
                value={CONST.PAYMENT_METHOD.COIN}
                control={<Radio />}
                label="Ví xu"
                disabled={disableRadio.COIN}
              />
            </RadioGroup>
          </FormControl>
          <FormControl
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <FormLabel
              sx={{
                fontWeight: "bold",
                color: "black",
              }}
            >
              Thanh toán:
            </FormLabel>
            <FormControl
              sx={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textAlign: "end",
                  mt: 1,
                }}
              >
                Tổng tiền phòng:
                <Typography
                  variant="body1"
                  sx={{
                    mt: 1,
                  }}
                >
                  {formatCurrency(bookingInfo.bookingHomePrice)}
                </Typography>
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textAlign: "end",
                  mt: 1,
                }}
              >
                Sử dụng điểm:
                <Typography
                  variant="body1"
                  sx={{
                    mt: 1,
                  }}
                >
                  - {formatCurrency(bookingInfo.userPoint)}
                </Typography>
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textAlign: "end",
                  mt: 1,
                }}
              >
                Sử dụng ví xu:
                <Typography
                  variant="body1"
                  sx={{
                    mt: 1,
                  }}
                >
                  - {formatCurrency(bookingInfo.useCoin)}
                </Typography>
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textAlign: "end",
                  mt: 1,
                  fontWeight: "bold",
                  color: "red",
                }}
              >
                Thành tiền:
                <Typography
                  variant="body1"
                  sx={{
                    mt: 1,
                    fontWeight: "bold",
                    color: "red",
                  }}
                >
                  {formatCurrency(
                    bookingInfo.bookingHomePrice -
                      bookingInfo.userPoint -
                      bookingInfo.useCoin,
                  )}
                </Typography>
              </Typography>
            </FormControl>
          </FormControl>
        </FormControl>
      )}
      {validateObject(bookingInfo) && showBtnConfirmBook && (
        <Box 
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          justifyItems: "center",
          backgroundColor: "#ffffff",
          px: {
            xs: 3,
            sm: 5,
            md: 7,
          },
          mt: 3,
          mx: "auto",
          width: {
            xs: "95%",
            sm: "85%",
            md: "75%",
          },
        }}
        >
          
        <BigHoverTransformButton
          onClick={handleConfirmBooking}
          sx={{
            m: "auto",
            mt: 2,
            backgroundColor: "#f2d663",
          }}
        >
          Xác nhận đặt lịch
        </BigHoverTransformButton>
        </Box>
      )}
    </Box>
  );
};
