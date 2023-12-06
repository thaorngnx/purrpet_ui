import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FiberPinIcon from "@mui/icons-material/FiberPin";
import { sendOtp } from "../../api/otp";
import { useStore } from "../../zustand/store";
import Cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";
import * as CONST from "../../constants";

export const LookUpOrderForm = () => {
  const navigate = useNavigate();

  const { customer } = useStore();

  useEffect(() => {
    if (Cookie.get(import.meta.env.VITE_APP_COOKIE_ACCESS_TOKEN)) {
      const decode = jwtDecode(
        Cookie.get(import.meta.env.VITE_APP_COOKIE_ACCESS_TOKEN),
      );
      console.log(decode);
      if (decode.role === CONST.ROLE.CUSTOMER) {
        navigate("/order");
      }
    }
  }, []);

  const { verifyOtp } = useStore();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSendOTP = () => {
    console.log("send otp");
    setSentOtp(true);
    sendOtp({ email: email }).then((res) => {
      console.log(res);
      if (res.err === 0) {
        //message success
      }
    });
  };

  const handleVerifyOTP = () => {
    console.log("verify otp");
    verifyOtp({ email: email, otp: otp });
    if (customer != [] && customer != null) {
      navigate("/order");
    } else {
      //message error
      console.log("error");
    }
  };

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [sentOtp, setSentOtp] = useState(false);

  return (
    <Box className="flex min-h-screen flex-col items-center justify-center">
      <Paper className="mx-auto flex w-1/2 flex-col items-center justify-center">
        <Typography
          variant="h4"
          className="m-5 mb-2 text-center text-xl font-bold"
        >
          Tra cứu thông tin đơn hàng
        </Typography>
        <FormControl className="m-2 w-2/3">
          <TextField
            variant="outlined"
            placeholder="Nhập email mua hàng"
            size="small"
            InputProps={{
              startAdornment: (
                <MailOutlineIcon position="start" className="mr-3" />
              ),
            }}
            value={email}
            onChange={handleEmailChange}
          />
        </FormControl>
        {!sentOtp && (
          <Button
            variant="contained"
            className="m-5 mt-2 bg-black text-white"
            onClick={handleSendOTP}
          >
            Gửi OTP
          </Button>
        )}
        {sentOtp && (
          <>
            <FormControl className="m-2 w-2/3">
              <TextField
                variant="outlined"
                placeholder="Nhập mã OTP"
                size="small"
                InputProps={{
                  startAdornment: (
                    <FiberPinIcon position="start" className="mr-3" />
                  ),
                }}
                value={otp}
                onChange={handleOtpChange}
              />
            </FormControl>
            <Box className="flex flex-row">
              <Button
                variant="contained"
                className="m-5 mt-2 bg-black text-white"
                onClick={handleSendOTP}
              >
                Gửi lại OTP
              </Button>
              <Button
                variant="contained"
                className="m-5 mt-2 bg-black text-white"
                onClick={handleVerifyOTP}
              >
                Xác nhận
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Box>
  );
};
