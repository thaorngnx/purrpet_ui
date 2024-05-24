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
    const total = bookingInfo.bookingSpaPrice - customerInfo.useCoin - customerInfo.userPoint;
    if(total === 0){
      setDisableRadio({ VNPAY: true, COIN: false });
      setBookingInfo({
        ...bookingInfo,
        customerCode: customerInfo.customerCode,
        customerNote: customerInfo.customerNote,
        userPoint: customerInfo.userPoint,
        useCoin: customerInfo.useCoin,
        payMethod: CONST.PAYMENT_METHOD.COIN,
      });
    }else
    {
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
      if(res.data.payMethod === CONST.PAYMENT_METHOD.VNPAY){
        createPaymentUrl({
          orderCode: res.data.purrPetCode,
        }).then((res) => {
          if (res.err === 0) {
            window.location.href = res.data;
          }
        });

      }else{
        setMessage(res.message);
        navigate(`/bookingSpa/${res.data.purrPetCode}`);
      }
    }
      setMessage(res.message);
    });
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column" }}
      className="mb-3 min-h-screen"
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
        <CustomerInfoForm
          customer={handleCustomerInfo}
          confirmInfo={handleConfirmInfo}
          totalPrice = {bookingInfo.bookingSpaPrice}
        />
      )}
       {
        validateObject(bookingInfo) && showBtnConfirmBook && (
          <FormControl>
          <FormControl    sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          ml: 20,
          mt:5,
        }}>
          <FormLabel className="mb-2 font-bold text-black">
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
               disabled = {disableRadio.VNPAY}
            />
             <FormControlLabel
              value={CONST.PAYMENT_METHOD.COIN}
              control={<Radio />}
              label="Ví xu"
               disabled = {disableRadio.COIN}
            />
          </RadioGroup>
        </FormControl >
        <FormControl   sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          ml: 15,
          p:5
        }}>
          <FormLabel className="mt-2 font-bold text-black text-[18px]">
            Thanh toán:
          </FormLabel>
          <FormControl  sx={{
          position: "relative",
          display: "flex",
          flexDirection: "cloumn",
          mr:7
          
        }} >
            <Typography variant="body1" className="m-1 text-end flex flex-row items-center justify-between">
              Tổng tiền dịch vụ: 
              <Typography variant="body1" className="m-1 text-end">
               {formatCurrency(bookingInfo.bookingSpaPrice)}
               </Typography>
            </Typography>
            <Typography variant="body1" className="m-1 text-end flex flex-row items-center justify-between">
              Sử dụng điểm:
              <Typography variant="body1" className="m-1 text-end">
              - {formatCurrency( bookingInfo.userPoint)}
               </Typography>
            </Typography>
            <Typography variant="body1" className="m-1 text-end flex flex-row items-center justify-between">
              Sử dụng ví xu:   
              <Typography variant="body1" className="m-1 text-end">
              -  {formatCurrency( bookingInfo.useCoin)}
               </Typography>
            </Typography>
            <Typography variant="body1" className="m-1 text-end flex flex-row items-center font-bold text-black text-[17px] justify-between">
              Thành tiền: 
              <Typography variant="body1" className="m-1 text-end text-[#800000] font-bold">
              {formatCurrency(bookingInfo.bookingSpaPrice - bookingInfo.userPoint - bookingInfo.useCoin)}
               </Typography>
            </Typography>
            </FormControl>
            </FormControl>
          </FormControl>
        )
      }
      {validateObject(bookingInfo) && showBtnConfirmBook && (
        <BigHoverTransformButton
          onClick={handleConfirmBooking}
          className="m-auto my-3"
        >
          Xác nhận đặt lịch
        </BigHoverTransformButton>
      )}
    </Box>
  );
};
