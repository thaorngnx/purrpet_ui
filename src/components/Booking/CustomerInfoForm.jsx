import { useEffect, useState } from "react";
import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Typography,
  Paper,
  MenuItem,
  Button,
} from "@mui/material";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import * as CONST from "../../constants";
import { getCategories } from "../../api/category";
import { getSpas } from "../../api/spa";
import { getMasterDatas } from "../../api/masterData";
import { getBookingSpas } from "../../api/bookingSpa";
import {
  createCustomer,
  getCustomerByPhone,
  updateCustomer,
} from "../../api/customer";

export const CustomerInfoForm = ({ customer, confirmInfo }) => {
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
    setOtpClick(true);
  };

  const handleValidOTPCLick = () => {
    console.log("send otp");
    //api check otp
    //oke
    setOtpValid(true);
    getCustomerByPhone({ phoneNumber: customerInfo.customerPhone }).then(
      (res) => {
        if (res.err === 0) {
          setExistCustomer(true);
          setEditInfo(false);
          confirmInfo(true);
          customer({
            ...customerInfo,
            customerCode: res.data.purrPetCode,
            customerName: res.data.name,
          });
          setCustomerInfo({
            ...customerInfo,
            customerCode: res.data.purrPetCode,
            customerName: res.data.name,
          });
        } else {
          setEditInfo(true);
          confirmInfo(false);
        }
      },
    );
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
      }).then((res) => {
        if (res.err === 0) {
          customer({ ...customerInfo, customerName: res.data.name });
          setCustomerInfo({ ...customerInfo, customerName: res.data.name });
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
        name: customerInfo.customerName,
      }).then((res) => {
        if (res.err === 0) {
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

  const [otpClick, setOtpClick] = useState(false);
  const [otpValid, setOtpValid] = useState(false);
  const [existCustomer, setExistCustomer] = useState(false);
  const [editInfo, setEditInfo] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    customerPhone: "",
    otp: "",
    customerName: "",
    customerNote: "",
    customerCode: "",
  });
  const [error, setError] = useState({});
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
      <FormControl>
        <FormLabel className="font-bold text-black">Số điện thoại:</FormLabel>
        <TextField
          required
          name="customerPhone"
          value={customerInfo.customerPhone}
          type="number"
          disabled={otpValid}
          onChange={handleChangeCustomerInfo}
          variant="outlined"
          error={error.customerPhone}
          helperText={
            error.customerPhone && "Số điện thoại không được để trống"
          }
        />
        {!otpValid && (
          <Button
            variant="outlined"
            className="w-fit"
            onClick={handleSendOTPCLick}
          >
            {otpClick ? "Gửi lại OTP" : "Gửi OTP"}
          </Button>
        )}
      </FormControl>

      {otpClick && !otpValid && (
        <FormControl>
          <FormLabel className="font-bold text-black">OTP:</FormLabel>
          <TextField
            required
            name="otp"
            value={customerInfo.otp}
            onChange={handleChangeCustomerInfo}
            variant="outlined"
            error={error.otp}
            helperText={error.otp && "OTP không được để trống"}
          />
          <Button
            variant="outlined"
            className="w-fit"
            onClick={handleValidOTPCLick}
          >
            Xác thực
          </Button>
        </FormControl>
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
          {existCustomer && editInfo && (
            <Button
              variant="outlined"
              className="w-fit"
              onClick={handleCancleEditInfo}
            >
              Hủy
            </Button>
          )}
          <Button variant="outlined" className="w-fit" onClick={handleEditInfo}>
            {!editInfo ? "Sửa" : "Xác nhận thông tin"}
          </Button>
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
