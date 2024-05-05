import { Box, TextField, MenuItem } from "@mui/material";
import * as CONST from "../../constants";
import { useEffect, useState } from "react";

export const UpdateSupplier = ({ supplier, updateSupplier, err }) => {
  const [supplierName, setSupplierName] = useState(supplier?.supplierName);
  const [email, setEmail] = useState(supplier?.email);
  const [phoneNumber, setPhoneNumber] = useState(supplier?.phoneNumber);
  const [error, setError] = useState({});

  useEffect(() => {
    if (Object.keys(err).length > 0) {
      setError(err);
    }
  }, [err]);

  const handleChangeSupplierName = (e) => {
    setSupplierName(e.target.value);
    setError({ ...error, supplierName: false });
    if (!e.target.value) {
      setError({ ...error, supplierName: true });
    }
   updateSupplier({ ...supplier, supplierName: e.target.value });
  };
 const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    setError({ ...error, email: false });
    if (!e.target.value) {
      setError({ ...error, email: true });
    }
    updateSupplier({ ...supplier, email: e.target.value });
  }
    const handleChangePhoneNumber = (e) => {
        setPhoneNumber(e.target.value);
        setError({ ...error, phoneNumber: false });
        if (!e.target.value) {
        setError({ ...error, phoneNumber: true });
        }
        updateSupplier({ ...supplier, phoneNumber: e.target.value });
    }


  return (
    <Box className="m-5 w-[400px]">
      <TextField
        required
        id="outlined-required"
        label="Tên nhà cung cấp"
        fullWidth
        value={supplierName}
        onChange={handleChangeSupplierName}
        error={error.supplierName}
        helperText={error.supplierName && "Tên danh mục không được để trống"}
        className="mb-3"
      />
        <TextField
        required
        id="outlined-required"
        label="Email"
        fullWidth
        value={email}
        onChange={handleChangeEmail}
        error={error.email}
        helperText={error.email && "Email không được để trống"}
        className="mb-3"
      />
        <TextField
        required
        id="outlined-required"
        label="Số điện thoại nhà cung cấp"
        fullWidth
        value={phoneNumber}
        onChange={handleChangePhoneNumber}
        error={error.phoneNumber}
        helperText={error.phoneNumber && "Tên danh mục không được để trống"}
        className="mb-3"
      />
      
    </Box>
  );
};
