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
  DialogContentText, 
  DialogTitle,
} from "@mui/material";
import * as CONST from "../../constants";
import { getCategories } from "../../api/category";
import { getSpas } from "../../api/spa";
import { getCustomerByEmail, createCustomerByStaff } from "../../api/customer";
import { TimeSpaForm } from "../../components/Booking/TimeSpaForm";
import { createBookingSpa, updateStatusBookingSpa } from "../../api/bookingSpa";
import { BigHoverTransformButton } from "../../components/Button/StyledButton";
import { formatCurrency } from "../../utils/formatData";
import { Modal } from "@mui/base/Modal";
import { StyledBackdrop } from "../../components/Modal/StyledBackdrop";
import { ModalContent } from "../../components/Modal/ModalContent";

export const BookingSpa = () => {
  const navigate = useNavigate();

  const [error, setError] = useState({});
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [allSpas, setAllSpas] = useState([]);
  const [validSpas, setValidSpas] = useState([]);
  const [validSize, setValidSize] = useState([]);
  const [openTimeForm, setOpenTimeForm] = useState(false);
  const [openCustomerInfoForm, setOpenCustomerInfoForm] = useState(false);
  const [inputCus, setInputCus] = useState("khachle@gmail.com");
  const [customer, setCustomer] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [order, setOrder] = useState({});
  const [showNameInput, setShowNameInput] = useState(false);
  const [nameValue, setNameValue] = useState("");
  
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
  });

  useEffect(() => {
    getCategories({
      categoryType: CONST.CATEGORY_TYPE.SPA,
      status: CONST.STATUS.ACTIVE,
    }).then((res) => {
      console.log(res.data);
      setCategories(res.data);
    });
    getSpas({
      status: CONST.STATUS.ACTIVE,
    }).then((res) => {
      console.log(res.data);
      setAllSpas(res.data);
    });
    getCustomerByEmail({ email: inputCus }).then((res) => {
      if (res.err === 0) {
        setCustomer(res.data);
      } else {
        setShowNameInput(true);
      }
    });
  }, [inputCus]);

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
    console.log(bookingInfo);
  };

  const handleConfirmBooking = () => {
    console.log("book", bookingInfo);
    createBookingSpa({
      petName: bookingInfo.petName,
      spaCode: bookingInfo.spaCode,
      bookingSpaPrice: bookingInfo.bookingSpaPrice,
      customerCode: customer.purrPetCode,
      customerNote: bookingInfo.customerNote,
      bookingDate: bookingInfo.bookingDate,
      bookingTime: bookingInfo.bookingTime,
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
    if (e.key === "Enter") {
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
          setOpenTimeForm(false);
        }
        setMessage(res.message);
      },
    );
  };
  const handlePayOrder = () => {
    updateStatusBookingSpa(order.purrPetCode, CONST.STATUS_BOOKING.PAID).then(
      (res) => {
        if (res.err === 0) {
          console.log(res);
          setOpenModal(false);
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
          setOpenTimeForm(false);
        }
        setMessage(res.message);
      },
    );
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleNameChange = (e) => { 
    setNameValue(e.target.value);
  };

  const handleCloseDialog = () => {
    setShowNameInput(false);
  };

  const handleSubscribe = () => {
    createCustomerByStaff({
      name: nameValue,
      email: inputCus,
    }).then((res) => {
      if (res.err === 0) {
        setCustomer(res.data);
      } else {
        setInputCus("CUS_1");
      }
      setShowNameInput(false);

    });
    setShowNameInput(false);
  
   
  }
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
        <FormControl
          sx={{
            width: "85%",
            ml: "auto",
            mr: "auto",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            p: 5,
          }}
        >
          <FormLabel className="font-bold text-black">
            Email Khách hàng:
          </FormLabel>
          <TextField
            required
            name="email"
            onKeyDown={handleChangeCustomerInfo}
            variant="outlined"
          />
          <BigHoverTransformButton
          onClick={handleConfirmBooking}
          className="m-auto my-3" >
          Xác nhận đặt lịch
        </BigHoverTransformButton>

        </FormControl>
      )}
       <Modal
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 9999,
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
          Tổng tiền: {order.bookingSpaPrice}
        </p>
        <Button onClick={() => handleCancelOrder(order.purrPetCode)}>Huỷ đơn hàng</Button>
        <Button onClick={() => handlePayOrder(order.purrPetCode)}>Thanh toán</Button>
      </ModalContent>
    </Modal>
    <Dialog open={showNameInput} onClose={handleCloseDialog}>
           <DialogTitle>Subscribe</DialogTitle>
           <DialogContent>
             <DialogContentText>
               Tên của khách là: 
             </DialogContentText>
             <TextField
               autoFocus
               margin="dense"
               id="name"
               label="name"
               fullWidth
               variant="standard"
                onChange={handleNameChange}
             />
           </DialogContent>
           <DialogActions>
             <Button onClick={handleCloseDialog}>Cancel</Button>
             <Button onClick={handleSubscribe}>Subscribe</Button>
           </DialogActions>
         </Dialog>
    </Box>
  );
};
