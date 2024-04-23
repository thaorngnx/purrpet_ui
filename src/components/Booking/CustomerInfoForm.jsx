import { useEffect, useState, useRef } from "react";
import {
  TextField,
  FormControl,
  FormLabel,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import { createCustomer, updateCustomer } from "../../api/customer";
import { sendOtp, verifyOtp } from "../../api/otp";
import { useStore } from "../../zustand/store";
import { BigHoverFitContentButton } from "../Button/StyledButton";
import {
  validateEmail,
  validateOtp,
  validatePhone,
} from "../../utils/validationData";
import { formatCurrency } from "../../utils/formatData";


export const CustomerInfoForm = ({ customer, confirmInfo, totalPrice }) => {
  const customerState = useStore((state) => state.customerState.data);

  const { setCustomerState } = useStore();

  const [error, setError] = useState({});
  const [otpClick, setOtpClick] = useState(false);
  const [otpValid, setOtpValid] = useState(false);
  const [existCustomer, setExistCustomer] = useState(false);
  const [editInfo, setEditInfo] = useState(true);
  //backup customer info when cancel edit
  const [backupCustomerInfo, setBackupCustomerInfo] = useState({});
  const [customerInfo, setCustomerInfo] = useState({
    customerPhone: "",
    otp: "",
    customerName: "",
    customerEmail: "",
    customerNote: "",
    customerCode: "",
    customerUserPoint: 0,
  });

  useEffect(() => {
    if (customerState != null) {
      customer({
        ...customerInfo,
        customerCode: customerState.purrPetCode,
      });
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

  useEffect(() => {
    if (!editInfo) {
      setBackupCustomerInfo({ ...customerInfo });
    }
  }, [editInfo]);

  const handleChangeCustomerInfo = (event) => {
    if (!event.target.value) {
      setError({ ...error, [event.target.name]: true });
    } else {
      setError({ ...error, [event.target.name]: false });
    }
    customer({ ...customerInfo, [event.target.name]: event.target.value });
    setCustomerInfo({
      ...customerInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleSendOTPCLick = () => {
    console.log("send otp");
    if (!customerInfo.customerEmail) {
      setError({ ...error, customerEmail: true });
      return;
    }
    if (!validateEmail(customerInfo.customerEmail)) {
      setError({ ...error, customerEmail: true });
      return;
    }
    //api send otp
    sendOtp({ email: customerInfo.customerEmail }).then((res) => {
      if (res.err === 0) {
        setCustomerInfo({ ...customerInfo, otp: "" });
        setOtpClick(true);
      }
    });
  };

  const handleValidOTPCLick = () => {
    console.log("send otp");
    if (!customerInfo.otp) {
      setError({ ...error, otp: true });
      return;
    }
    if (!validateOtp(customerInfo.otp)) {
      setError({ ...error, otp: true });
      return;
    }
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
          setCustomerState({
            loading: false,
            error: null,
            data: res.data,
          });
        }
      } else {
        customerInfo.otp = "";
        setError({ ...error, otp: true });
      }
    });
  };

  const handleEditInfo = () => {
    if (existCustomer && !editInfo) {
      setEditInfo(true);
      confirmInfo(false);
    } else if (existCustomer && editInfo) {
      console.log("edit customer");
      let err = {};
      if (!customerInfo.customerName) {
        err = { ...err, customerName: true };
      }
      if (
        !customerInfo.customerPhone ||
        !validatePhone(customerInfo.customerPhone)
      ) {
        err = { ...err, customerPhone: true };
      }
      if (Object.keys(err).length > 0) {
        setError(err);
        return;
      }
      //api update customer
      updateCustomer({
        purrPetCode: customerInfo.customerCode,
        name: customerInfo.customerName,
        phoneNumber: customerInfo.customerPhone,
      }).then((res) => {
        if (res.err === 0) {
          console.log("after update customer oke");
          // setCustomerInfo({
          //   ...customerInfo,
          //   customerName: res.data.name,
          //   customerPhone: res.data.phoneNumber,
          // });
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
          setCustomerState({
            loading: false,
            error: null,
            data: res.data,
          });
        }
      });

      //oke
      setExistCustomer(true);
      setEditInfo(false);
      confirmInfo(true);
    }
  };

  const handleCancelEditInfo = () => {
    setError({});
    customer({ ...backupCustomerInfo });
    setCustomerInfo({ ...backupCustomerInfo });
    setEditInfo(false);
    confirmInfo(true);
  };

  const handleChangePoint = (event) => {
    if (event.target.value > 0.1 * totalPrice || event.target.value > customerState.point || event.target.value < 0) {
      setError({ ...error, customerUserPoint: true });
      event.target.value = 0;
    } else {
      setError({ ...error, customerUserPoint: false });
      customer({
        ...customerInfo,
        userPoint: event.target.value,
      });
    }
   
  };

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
        className="mb-2 text-center font-bold"
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
              className="my-3"
              error={error.customerEmail}
              helperText={error.customerEmail && "Email không hợp lệ"}
              focused={error.customerEmail}
              onBlur={() => {
                if (!customerInfo.customerEmail) {
                  setError({ ...error, customerEmail: true });
                }
              }}
            />
            {otpClick && !otpValid && (
              <Typography className="text-sm italic text-blue-950">
                Mã OTP đã được gửi đến email của bạn và có hiệu lực trong 5 phút
              </Typography>
            )}
            {!otpValid && (
              <Box sx={{ display: "flex", justifyContent: "end" }}>
                <BigHoverFitContentButton onClick={handleSendOTPCLick}>
                  {otpClick ? "Gửi lại OTP" : "Gửi OTP"}
                </BigHoverFitContentButton>
              </Box>
            )}
          </FormControl>

          {otpClick && !otpValid && (
            <FormControl>
              <FormLabel className="my-2 font-bold text-black">OTP:</FormLabel>
              <TextField
                required
                name="otp"
                type="number"
                value={customerInfo.otp}
                onChange={handleChangeCustomerInfo}
                variant="outlined"
                className="mb-3"
                error={error.otp}
                helperText={error.otp && "OTP không hợp lệ"}
                focused={error.otp}
                onBlur={() => {
                  if (customerInfo.otp === "") {
                    setError({ ...error, otp: true });
                  }
                }}
              />
              <Box sx={{ display: "flex", justifyContent: "end" }}>
                <BigHoverFitContentButton onClick={handleValidOTPCLick}>
                  Xác thực
                </BigHoverFitContentButton>
              </Box>
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
            className="my-3"
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
            className="my-3"
            helperText={error.customerPhone && "Số điện thoại không hợp lệ"}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "end",
            }}
          >
            {existCustomer && editInfo && (
              <BigHoverFitContentButton
                onClick={handleCancelEditInfo}
                className="mr-3"
              >
                Hủy
              </BigHoverFitContentButton>
            )}
            <BigHoverFitContentButton onClick={handleEditInfo}>
              {!editInfo ? "Sửa" : "Xác nhận thông tin"}
            </BigHoverFitContentButton>
          </Box>
          <FormControl>
          <FormLabel className="mb-2 font-bold text-black">
              Điểm sử dụng: (Bạn đang có {formatCurrency(customerState.point) } điểm tích luỹ)
            </FormLabel>
            <TextField
              required
              name="customerUserPoint"
              type="number"
              onChange={handleChangePoint}
              variant="outlined"
              error={error.customerUserPoint}
              helperText={error.customerUserPoint && "Điểm sử dụng dưới 10% tổng đơn hàng và không vượt quá số điểm hiện có"}
              
            />
          </FormControl>
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
