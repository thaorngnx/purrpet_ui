import { useEffect, useState } from "react";
import {
  TextField,
  FormControl,
  FormLabel,
  Typography,
  Paper,
  Button,
} from "@mui/material";
import { createCustomer, updateCustomer } from "../../api/customer";
import { sendOtp, verifyOtp } from "../../api/otp";
import { useStore } from "../../zustand/store";
import { BigHoverFitContentButton } from "../Button/StyledButton";

export const CustomerInfoForm = ({ customer, confirmInfo }) => {
  const customerState = useStore((state) => state.customerState.data);

  const handleChangeCustomerInfo = (event) => {
    setError({ ...error, [event.target.name]: false });
    if (!event.target.value) {
      setError({ ...error, [event.target.name]: true });
    }
    if (event.target.name === "customerPhone") {
      customer({ ...customerInfo, customerPhone: event.target.value });
      setCustomerInfo({
        ...customerInfo,
        [event.target.name]: event.target.value,
      });
    }
    if (event.target.name === "customerNote") {
      // customerNote(event.target.value);
      customer({ ...customerInfo, customerNote: event.target.value });
      setCustomerInfo({
        ...customerInfo,
        [event.target.name]: event.target.value,
      });
    }
    setCustomerInfo({
      ...customerInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleSendOTPCLick = () => {
    console.log("send otp");
    //api send otp
    sendOtp({ email: customerInfo.customerEmail }).then((res) => {
      if (res.err === 0) {
        console.log(res);
        setOtpClick(true);
      }
    });
  };

  const handleValidOTPCLick = () => {
    console.log("send otp");
    //api check otp
    verifyOtp({
      email: customerInfo.customerEmail,
      otp: customerInfo.otp,
    }).then((res) => {
      console.log(res);
      if (res.err === 0) {
        setOtpValid(true);
        if (res.data === null) {
          setExistCustomer(false);
          setEditInfo(true);
        } else {
          setExistCustomer(true);
          setEditInfo(false);
          confirmInfo(true);
          customer({
            ...customerInfo,
            customerCode: res.data.purrPetCode,
            customerName: res.data.name,
            customerPhone: res.data.phoneNumber,
          });
          setCustomerInfo({
            ...customerInfo,
            customerCode: res.data.purrPetCode,
            customerName: res.data.name,
            customerPhone: res.data.phoneNumber,
          });
        }
      } else {
        setEditInfo(true);
        confirmInfo(false);
      }
    });
  };

  const handleEditInfo = () => {
    if (existCustomer && !editInfo) {
      setEditInfo(true);
      confirmInfo(false);
    } else if (existCustomer && editInfo) {
      console.log("edit customer");
      //api update customer
      updateCustomer({
        purrPetCode: customerInfo.customerCode,
        name: customerInfo.customerName,
        phoneNumber: customerInfo.customerPhone,
      }).then((res) => {
        if (res.err === 0) {
          setCustomerInfo({
            ...customerInfo,
            customerName: res.data.name,
            customerPhone: res.data.phoneNumber,
          });
        }
      });
      //oke
      setEditInfo(false);
      confirmInfo(true);
    } else if (!existCustomer && editInfo) {
      console.log("create customer");
      //api create customer
      createCustomer({
        phoneNumber: customerInfo.customerPhone,
        email: customerInfo.customerEmail,
        name: customerInfo.customerName,
      }).then((res) => {
        if (res.err === 0) {
          console.log("after create customer oke");
          setCustomerInfo({
            ...customerInfo,
            customerCode: res.data.purrPetCode,
          });
          customer({ ...customerInfo, customerCode: res.data.purrPetCode });
        }
      });

      //oke
      setExistCustomer(true);
      setEditInfo(false);
      confirmInfo(true);
    }
  };

  const handleCancleEditInfo = () => {
    setEditInfo(false);
    confirmInfo(true);
  };

  const [error, setError] = useState({});
  const [otpClick, setOtpClick] = useState(false);
  const [otpValid, setOtpValid] = useState(false);
  const [existCustomer, setExistCustomer] = useState(false);
  const [editInfo, setEditInfo] = useState(true);
  const [customerInfo, setCustomerInfo] = useState({
    customerPhone: "",
    otp: "",
    customerName: "",
    customerEmail: "",
    customerNote: "",
    customerCode: "",
  });

  useEffect(() => {
    if (customerState != null) {
      customer({ ...customerInfo, customerCode: customerState.purrPetCode });
      setCustomerInfo({
        ...customerInfo,
        customerName: customerState.name,
        customerPhone: customerState.phoneNumber,
        customerCode: customerState.purrPetCode,
      });
      setExistCustomer(true);
      setEditInfo(false);
      confirmInfo(true);
      setOtpValid(true);
    }
  }, [customerState]);

  return (
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
        Thông tin khách hàng
      </Typography>
      {customerState == null && (
        <>
          <FormControl>
            <FormLabel className="font-bold text-black">Email:</FormLabel>
            <TextField
              required
              name="customerEmail"
              value={customerInfo.customerEmail}
              disabled={otpValid}
              onChange={handleChangeCustomerInfo}
              variant="outlined"
              error={error.customerEmail}
              helperText={error.customerPhone && "Email không được để trống"}
            />
            {!otpValid && (
              // <Button
              //   variant="outlined"
              //   className="w-fit"
              //   onClick={handleSendOTPCLick}
              // >
              //   {otpClick ? "Gửi lại OTP" : "Gửi OTP"}
              // </Button>
              <BigHoverFitContentButton onClick={handleSendOTPCLick}>
                {otpClick ? "Gửi lại OTP" : "Gửi OTP"}
              </BigHoverFitContentButton>
            )}
          </FormControl>

          {otpClick && !otpValid && (
            <FormControl>
              <FormLabel className="font-bold text-black">OTP:</FormLabel>
              <TextField
                required
                name="otp"
                type="number"
                value={customerInfo.otp}
                onChange={handleChangeCustomerInfo}
                variant="outlined"
                error={error.otp}
                helperText={error.otp && "OTP không được để trống"}
              />
              {/* <Button
                variant="outlined"
                className="w-fit"
                onClick={handleValidOTPCLick}
              >
                Xác thực
              </Button> */}
              <BigHoverFitContentButton onClick={handleValidOTPCLick}>
                Xác thực
              </BigHoverFitContentButton>
            </FormControl>
          )}
        </>
      )}

      {otpValid && (
        <FormControl>
          <FormLabel className="font-bold text-black">
            Tên khách hàng:
          </FormLabel>
          <TextField
            required
            name="customerName"
            value={customerInfo.customerName}
            disabled={!editInfo}
            onChange={handleChangeCustomerInfo}
            variant="outlined"
            error={error.customerName}
            helperText={
              error.customerName && "Tên khách hàng không được để trống"
            }
          />
          <FormLabel className="font-bold text-black">Số điện thoại:</FormLabel>
          <TextField
            required
            name="customerPhone"
            value={customerInfo.customerPhone}
            disabled={!editInfo}
            onChange={handleChangeCustomerInfo}
            variant="outlined"
            error={error.customerPhone}
            helperText={
              error.customerPhone && "Số điện thoại không được để trống"
            }
          />
          {existCustomer && editInfo && (
            // <Button
            //   variant="outlined"
            //   className="w-fit"
            //   onClick={handleCancleEditInfo}
            // >
            //   Hủy
            // </Button>
            <BigHoverFitContentButton onClick={handleCancleEditInfo}>
              Hủy
            </BigHoverFitContentButton>
          )}
          {/* <Button variant="outlined" className="w-fit" onClick={handleEditInfo}>
            {!editInfo ? "Sửa" : "Xác nhận thông tin"}
          </Button> */}
          <BigHoverFitContentButton onClick={handleEditInfo}>
            {!editInfo ? "Sửa" : "Xác nhận thông tin"}
          </BigHoverFitContentButton>
          <FormLabel className="font-bold text-black">Ghi chú:</FormLabel>
          <TextField
            required
            name="customerNote"
            value={customerInfo.customerNote}
            onChange={handleChangeCustomerInfo}
            variant="outlined"
          />
        </FormControl>
      )}
    </Paper>
  );
};
