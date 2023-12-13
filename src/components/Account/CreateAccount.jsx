import { Box, TextField, MenuItem, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import * as CONST from "../../constants";
import { useState, useEffect } from "react";
import "../../api/account";
export const CreateAccount = ({ account, createAccount, err }) => {
  const [accountCreate, setAccountCreate] = useState(account);
  const [error, setError] = useState({});
  const [togglePassword, setTogglePassword] = useState({
    password: false,
    passwordConfirm: false,
  });

  useEffect(() => {
    if (Object.keys(err).length > 0) {
      setError(err);
    }
  }, [err]);

  const handleChangeAccount = (event) => {
    if (!event.target.value) {
      setError({ ...error, [event.target.name]: true });
    } else {
      setError({ ...error, [event.target.name]: false });
    }
    if (event.target.name === "passwordConfirm") {
      if (event.target.value !== accountCreate.password) {
        setError({ ...error, [event.target.name]: true });
      }
    }
    setAccountCreate({
      ...accountCreate,
      [event.target.name]: event.target.value,
    });
    createAccount({
      ...accountCreate,
      [event.target.name]: event.target.value,
    });
  };

  const togglePasswordHide = (field) => {
    setTogglePassword({ ...togglePassword, [field]: !togglePassword[field] });
  };

  return (
    <Box component="form" className="m-5">
      <TextField
        required
        label="Tên đăng nhập"
        fullWidth
        name="username"
        value={accountCreate.username}
        onChange={handleChangeAccount}
        error={error.username}
        helperText={error.username && "Tên đăng nhập không được để trống"}
        className="mb-3"
      />
      <TextField
        label="Quyền"
        select
        fullWidth
        required
        className="mb-3"
        name="role"
        value={accountCreate.role}
        onChange={handleChangeAccount}
        error={error.role}
        helperText={error.role && "Quyền không được để trống"}
      >
        {Object.values(CONST.ROLE_ACCOUNT).map((value) => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        required
        label="Mật khẩu"
        fullWidth
        name="password"
        type={togglePassword.password ? "text" : "password"}
        value={accountCreate.password}
        onChange={handleChangeAccount}
        error={error.password}
        helperText={error.password && "Mật khẩu không hợp lệ"}
        className="mb-3"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {" "}
              {togglePassword.passwordConfirm ? (
                <VisibilityOff
                  onClick={() => togglePasswordHide("passwordConfirm")}
                />
              ) : (
                <Visibility
                  className="cursor_pointer"
                  onClick={() => togglePasswordHide("passwordConfirm")}
                />
              )}
            </InputAdornment>
          ),
        }}
      />
      <TextField
        required
        label="Nhập lại mật khẩu"
        fullWidth
        name="passwordConfirm"
        type={togglePassword.passwordConfirm ? "text" : "password"}
        value={accountCreate.passwordConfirm}
        onChange={handleChangeAccount}
        error={error.passwordConfirm}
        helperText={error.passwordConfirm && "Mật khẩu không khớp"}
        className="mb-3"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {" "}
              {togglePassword.passwordConfirm ? (
                <VisibilityOff
                  onClick={() => togglePasswordHide("passwordConfirm")}
                />
              ) : (
                <Visibility
                  className="cursor_pointer"
                  onClick={() => togglePasswordHide("passwordConfirm")}
                />
              )}
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};
