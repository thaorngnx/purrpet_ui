import { Box, TextField, MenuItem } from "@mui/material";
import * as CONST from "../../constants";
import { useState, useEffect } from "react";
import "../../api/account";

export const UpdateAccount = ({ account, updateAccount, err }) => {
  const [accountUpdate, setAccountUpdate] = useState(account);
  const [error, setError] = useState({});

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
    setAccountUpdate({
      ...accountUpdate,
      [event.target.name]: event.target.value,
    });
    updateAccount({
      ...accountUpdate,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Box className="m-5 w-[400px]">
      <TextField
        required
        id="outlined-required"
        label="Tên đăng nhập"
        fullWidth
        name="username"
        value={accountUpdate.username}
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
        name="role"
        value={accountUpdate.role}
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
    </Box>
  );
};
