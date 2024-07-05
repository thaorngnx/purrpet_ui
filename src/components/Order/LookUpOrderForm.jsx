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
import { sendOtp, verifyOtp } from "../../api/otp";
import { useStore } from "../../zustand/store";
import { validateEmail, validateOtp } from "../../utils/validationData";

export const LookUpOrderForm = () => {
  const navigate = useNavigate();

  const customerState = useStore((state) => state.customerState);

  const { setCustomerState } = useStore();
  console.log("cus", customerState);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [sentOtp, setSentOtp] = useState(false);
  const [error, setError] = useState({});

  useEffect(() => {
    console.log("customer", customerState);
    if (customerState.data && !customerState.error) {
      console.log("cosd cus", customerState.data);
      navigate("/order");
    }
  }, []);

  const handleEmailChange = (e) => {
    if (!e.target.value) {
      setError({ ...error, email: true });
    } else {
      setError({ ...error, email: false });
    }
    setEmail(e.target.value);
    if (otp) {
      setOtp("");
    }
  };

  const handleOtpChange = (e) => {
    if (!e.target.value) {
      setError({ ...error, otp: true });
    } else {
      setError({ ...error, otp: false });
    }
    setOtp(e.target.value);
  };

  const handleSendOTP = () => {
    console.log("send otp");
    if (!email) {
      setError({ ...error, email: true });
      return;
    }
    console.log("validmail", validateEmail(email));
    if (!validateEmail(email)) {
      setError({ ...error, email: true });
      return;
    }

    sendOtp({ email: email }).then((res) => {
      console.log(res);
      if (res.err === 0) {
        //message success
        setSentOtp(true);
        if (otp) {
          setOtp("");
        }
      } else {
        console.log("err", res.message);
        setError({ ...error, email: true });
      }
    });
  };

  const handleVerifyOTP = () => {
    console.log("verify otp");
    if (!otp || !validateOtp(otp)) {
      setError({ ...error, otp: true });
      return;
    }
    verifyOtp({ email: email, otp: otp }).then((res) => {
      console.log(res);
      if (res.err === 0) {
        //message success
        if (res.data) {
          setCustomerState({ data: res.data, error: null, loading: false });
        } else {
          alert("Email chưa có đơn hàng nào");
        }
        navigate("/order");
      } else {
        setError({ ...error, otp: true });
        setOtp("");
      }
    });
  };

  return (
    <Box className="flex min-h-screen flex-col items-center justify-center p-4">
    <Paper className=" flex w-full max-w-md flex-col items-center justify-center p-4 sm:w-3/4 md:w-1/2 lg:w-1/3">
      <Typography
        variant="h4"
        className=" mb-2 text-center text-xl font-bold"
      >
        Tra cứu thông tin đơn hàng
      </Typography>
      <FormControl className=" w-full max-w-xs ">
        <TextField
          variant="outlined"
          placeholder="Nhập email mua hàng"
          required
          size="small"
          InputProps={{
            startAdornment: (
              <MailOutlineIcon position="start" className="mr-3" />
            ),
          }}
          value={email}
          onChange={handleEmailChange}
          error={error.email}
          helperText={error.email && "Email không hợp lệ"}
          focused={error.email}
          onBlur={() => {
            if (!email) {
              setError({ ...error, email: true });
            }
          }}
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
          <FormControl className="m-2 w-full max-w-xs ">
            <TextField
              variant="outlined"
              placeholder="Nhập mã OTP"
              required
              size="small"
              InputProps={{
                startAdornment: (
                  <FiberPinIcon position="start" className="mr-3" />
                ),
              }}
              value={otp}
              onChange={handleOtpChange}
              error={error.otp}
              helperText={error.otp && "Mã OTP không hợp lệ"}
              focused={error.otp}
              onBlur={() => {
                if (!otp) {
                  setError({ ...error, otp: true });
                }
              }}
            />
            {sentOtp && (
              <Typography className="mt-2 text-sm italic text-blue-950">
                Mã OTP đã được gửi đến email của bạn và có hiệu lực trong 5 phút
              </Typography>
            )}
          </FormControl>

          <Box className="flex flex-row justify-between w-full max-w-xs sm:w-2/3">
            <Button
              variant="contained"
              className="m-2 mt-2 bg-black text-white"
              onClick={handleSendOTP}
            >
              Gửi lại OTP
            </Button>
            <Button
              variant="contained"
              className="m-2 mt-2 bg-black text-white"
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
