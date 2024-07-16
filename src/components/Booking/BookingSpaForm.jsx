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
} from "@mui/material";
import * as CONST from "../../constants";
import { getActiveCategories } from "../../api/category";
import { getActiveSpas } from "../../api/spa";
import { CustomerInfoForm } from "./CustomerInfoForm";
import { TimeSpaForm } from "./TimeSpaForm";
import { createBookingSpa } from "../../api/bookingSpa";
import { createPaymentUrl } from "../../api/pay";
import { BigHoverTransformButton } from "../Button/StyledButton";
import { formatCurrency } from "../../utils/formatData";
import { validateObject } from "../../utils/validationData";

export const BookingSpaForm = () => {
  const navigate = useNavigate();

  const [error, setError] = useState({});
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [allSpas, setAllSpas] = useState([]);
  const [validSpas, setValidSpas] = useState([]);
  const [validSize, setValidSize] = useState([]);
  const [openTimeForm, setOpenTimeForm] = useState(false);
  const [openCustomerInfoForm, setOpenCustomerInfoForm] = useState(false);
  const [showBtnConfirmBook, setShowBtnConfirmBook] = useState(false);
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
      categoryType: CONST.CATEGORY_TYPE.SPA,
    }).then((res) => {
      setCategories(res.data);
    });
    getActiveSpas().then((res) => {
      setAllSpas(res.data);
    });
  }, []);

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
      let validSpa = [];
      validSpa = allSpas.filter((spa) => spa.spaType === event.target.value);
      const validSizes = [];
      validSpa.forEach((spa) => {
        const category = categories.find(
          (category) => category.purrPetCode === spa.categoryCode,
        );
        if (!validSizes.includes(category.categoryName)) {
          validSizes.push(category.categoryName);
        }
      });
      //change type when chosen size
      console.log(bookingInfo.size);
      if (
        (!validSize.includes(bookingInfo.size) && bookingInfo.size !== "") ||
        bookingInfo.size !== ""
      ) {
        console.log("change size");
        const size = categories.find(
          (category) => category.categoryName === bookingInfo.size,
        );

        validSpa = allSpas.filter(
          (spa) =>
            spa.spaType === event.target.value &&
            spa.categoryCode === size.purrPetCode,
        );
      }

      setValidSize(validSizes);
      setValidSpas(validSpa);
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
    console.log(bookingInfo);
  };

  const handleCustomerInfo = (customerInfo) => {
    const total =
      bookingInfo.bookingSpaPrice -
      customerInfo.useCoin -
      customerInfo.userPoint;
    if (total === 0) {
      setDisableRadio({ VNPAY: true, COIN: false });
      setBookingInfo({
        ...bookingInfo,
        customerCode: customerInfo.customerCode,
        customerNote: customerInfo.customerNote,
        userPoint: customerInfo.userPoint,
        useCoin: customerInfo.useCoin,
        payMethod: CONST.PAYMENT_METHOD.COIN,
      });
    } else {
      setDisableRadio({ VNPAY: false, COIN: true });
      setBookingInfo({
        ...bookingInfo,
        customerCode: customerInfo.customerCode,
        customerNote: customerInfo.customerNote,
        userPoint: customerInfo.userPoint,
        useCoin: customerInfo.useCoin,
        payMethod: CONST.PAYMENT_METHOD.VNPAY,
      });
    }
  };

  const handleConfirmInfo = (confirm) => {
    setShowBtnConfirmBook(confirm);
  };

  const handleConfirmBooking = () => {
    setShowBtnConfirmBook(false);
    createBookingSpa({
      petName: bookingInfo.petName,
      spaCode: bookingInfo.spaCode,
      bookingSpaPrice: bookingInfo.bookingSpaPrice,
      customerCode: bookingInfo.customerCode,
      customerNote: bookingInfo.customerNote,
      bookingDate: bookingInfo.bookingDate,
      bookingTime: bookingInfo.bookingTime,
      payMethod: bookingInfo.payMethod,
      userPoint: bookingInfo.userPoint,
      useCoin: bookingInfo.useCoin,
    }).then((res) => {
      if (res.err === 0) {
        if (res.data.payMethod === CONST.PAYMENT_METHOD.VNPAY) {
          createPaymentUrl({
            orderCode: res.data.purrPetCode,
            returnUrl: "vnpay-returnForCus",
          }).then((res) => {
            if (res.err === 0) {
              window.location.href = res.data.paymentUrl;
            }
          });
        } else {
          setMessage(res.message);
          navigate(`/bookingSpa/${res.data.purrPetCode}`);
        }
      }
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
        backgroundColor: "#F6D2BD",
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
        ĐẶT LỊCH SPA CHO THÚ CƯNG
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
            sx={{
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
          <Box  
          sx={{
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
                mt: 1,
                fontWeight: "bold",
                color: "black",
              }}
            >
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
            <FormLabel
              sx={{
                mt: 1,
                fontWeight: "bold",
                color: "black",
              }}
            >
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
        </Box>
        <Box>
        {
            bookingInfo.petType === "Chó"   ? (
              <Box>
            {
              bookingInfo.petName !== "" && (
                <Typography style={{ fontStyle: 'italic', color: '#555', marginTop:"2px", fontSize:"12px" }}>
                Xin chào! Tên con là <strong>{bookingInfo.petName}</strong>
              </Typography>
              )
            }
              <img src="https://res.cloudinary.com/drzp9tafy/image/upload/v1721105561/dogL-removebg-preview_cklzu7.png" alt="dog" style={{width: "150px", height: "180px"}}/>
              </Box>
            ) : bookingInfo.petType === "Mèo" ? (
              <Box>
              {
              bookingInfo.petName !== "" && (
                <Typography style={{ fontStyle: 'italic', color: '#555', marginTop:"2px" , fontSize:"12px" }}>
                Xin chào! Tên con là <strong>{bookingInfo.petName}</strong>
              </Typography>
              )
            }
              <img src="https://res.cloudinary.com/drzp9tafy/image/upload/v1721106128/Cat_big-removebg-preview_lq2fd9.png" alt="cat" style={{width: "150px", height: "180px"}}/>
              </Box>
            ) : (
              <img src="https://res.cloudinary.com/drzp9tafy/image/upload/v1721105931/image-removebg-preview_2_slnir2.png" alt="other" style={{width: "150px", height: "180px"}}/>
            )
          }
        </Box>
        </Box>
        {bookingInfo.spaName && (
          <>
            <Typography
              variant="body1"
              name="bookingSpaPrice"
              sx={{
                mt: 2,
                display: "flex",
                flexDirection: "row",
                justifyContent: "end",
                fontWeight: "bold",
                color: "red",
              }}
            >
              Tổng tiền: {formatCurrency(bookingInfo.bookingSpaPrice)}
            </Typography>
            {!openTimeForm && (
              <BigHoverTransformButton
                onClick={handleOpenTimeForm}
                sx={{
                  m: "auto",
                  mt: 2,
                }}
              >
                Tiếp tục
              </BigHoverTransformButton>
            )}
          </>
        )}
      </Paper>
            <img
          src="https://res.cloudinary.com/drzp9tafy/image/upload/v1721109838/image-removebg-preview_4_nkczgg.png"
          alt="spa"
          style={{
            position: "absolute",
            top: "-50px",  // Điều chỉnh giá trị này để đặt ảnh nằm đè lên phần trên của Paper
            left: "10%",
            transform: "translateX(-50%)",
            zIndex: 2,
            width: "150px", // Điều chỉnh kích thước ảnh tùy ý
            height: "auto",
          }}
        />
      </Box>
      {openTimeForm && (
        <TimeSpaForm
          bookingInfo={bookingInfo}
          setOpenCustomerInfoForm={setOpenCustomerInfoForm}
          updateBookingInfo={handleUpdateBookingInfo}
        />
      )}
      {openCustomerInfoForm && (
        <CustomerInfoForm
          customer={handleCustomerInfo}
          confirmInfo={handleConfirmInfo}
          totalPrice={bookingInfo.bookingSpaPrice}
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
                Tổng tiền dịch vụ:
                <Typography
                  variant="body1"
                  sx={{
                    mt: 1,
                  }}
                >
                  {formatCurrency(bookingInfo.bookingSpaPrice)}
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
                    bookingInfo.bookingSpaPrice -
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
            backgroundColor: "#F6D2BD",
          }}
        >
          Xác nhận đặt lịch
        </BigHoverTransformButton>
        </Box>
      )}
    </Box>
  );
};
