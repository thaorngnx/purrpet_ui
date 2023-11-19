import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
  InputAdornment,
} from "@mui/material";
import { useState, useEffect } from "react";
import { loginAdmin } from "../../api/auth";
import * as CONST from "../../constants";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export const Login = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();

  useEffect(() => {
    if (cookies.get("access_token")) {
      navigate("/admin");
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(account);
    loginAdmin(account).then((res) => {
      console.log(res);
      setAlert(true);
      setMessage(res.message);
      if (res.err === 0) {
        setAccount({ username: "", password: "" });
        setSeverity(CONST.ALERT_SEVERITY.SUCCESS);
        navigate("/admin");
      } else {
        setSeverity(CONST.ALERT_SEVERITY.WARNING);
      }
    });
  };

  const handleChangeAccount = (event) => {
    setError({ ...error, [event.target.name]: false });
    if (!event.target.value) {
      setError({ ...error, [event.target.name]: true });
    }
    setAccount({ ...account, [event.target.name]: event.target.value });
  };

  const togglePasswordHide = () => {
    setTogglePassword(!togglePassword);
  };

  const [account, setAccount] = useState({ username: "", password: "" });
  const [error, setError] = useState({});
  const [severity, setSeverity] = useState(CONST.ALERT_SEVERITY.SUCCESS);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [togglePassword, setTogglePassword] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [alert]);

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ width: "50%", margin: "auto" }}
      >
        <Typography variant="h5" component="div" className="m-5 text-center">
          Đăng nhập
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          name="username"
          key="username"
          value={account.username}
          label="Tên đăng nhập"
          autoComplete="username"
          onChange={handleChangeAccount}
          error={error.username}
          helperText={error.username && "Tên đăng nhập không được để trống"}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          key="password"
          value={account.password}
          label="Mật khẩu"
          type={togglePassword ? "text" : "password"}
          autoComplete="current-password"
          onChange={handleChangeAccount}
          error={error.password}
          helperText={error.password && "Mật khẩu không được để trống"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {" "}
                {togglePassword ? (
                  <Visibility
                    className="cursor_pointer"
                    onClick={togglePasswordHide}
                  />
                ) : (
                  <VisibilityOff onClick={togglePasswordHide} />
                )}
              </InputAdornment>
            ),
          }}
        />
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          type="submit"
        >
          Đăng nhập
        </Button>
      </Box>
      <Snackbar
        open={alert}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        severity={severity}
      >
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
    </>
  );
};
