import { Box, TextField, MenuItem, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useEffect, useState } from "react";
import "../../api/account";
export const ChangePassword = ({ account, updateAccount, err }) => {
  const [accountUpdate, setAccountUpdate] = useState(account);
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
    setError({ ...error, [event.target.name]: false });
    if (!event.target.value) {
      setError({ ...error, [event.target.name]: true });
    }
    if (event.target.name === "passwordConfirm") {
      if (event.target.value !== accountUpdate.password) {
        setError({ ...error, [event.target.name]: true });
      }
    }
    setAccountUpdate({
      ...accountUpdate,
      [event.target.name]: event.target.value,
    });
    updateAccount({
      ...accountUpdate,
      [event.target.name]: event.target.value,
    });
  };

  const togglePasswordHide = (field) => {
    setTogglePassword({ ...togglePassword, [field]: !togglePassword[field] });
  };

  return (
    <Box className="m-5 w-[400px]">
      <TextField
        label="Tên đăng nhập"
        fullWidth
        name="username"
        value={accountUpdate.username}
        className="mb-3"
        disabled
      />
      <TextField
        label="Quyền"
        fullWidth
        name="role"
        value={accountUpdate.role}
        className="mb-3"
        disabled
      />
      <TextField
        required
        label="Mật khẩu"
        fullWidth
        name="password"
        type={togglePassword.password ? "text" : "password"}
        value={accountUpdate.password}
        onChange={handleChangeAccount}
        error={error.password}
        helperText={error.password && "Mật khẩu không hợp lệ"}
        className="mb-3"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {" "}
              {togglePassword.password ? (
                <VisibilityOff onClick={() => togglePasswordHide("password")} />
              ) : (
                <Visibility
                  className="cursor_pointer"
                  onClick={() => togglePasswordHide("password")}
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
        value={accountUpdate.passwordConfirm}
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
