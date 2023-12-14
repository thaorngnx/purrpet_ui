import { Box, TextField, TextareaAutosize } from "@mui/material";

import { useEffect, useState } from "react";
import "../../api/masterData";
export const UpdateMasterData = ({ masterData, updateMasterData, err }) => {
  const [masterDataUpdate, setMasterDataUpdate] = useState(masterData);
  const [error, setError] = useState({});

  useEffect(() => {
    if (Object.keys(err).length > 0) {
      setError(err);
    }
  }, [err]);

  const handleChangeMasterData = (event) => {
    if (!event.target.value) {
      setError({ ...error, [event.target.name]: true });
    } else {
      setError({ ...error, [event.target.name]: false });
    }
    setMasterDataUpdate({
      ...masterDataUpdate,
      [event.target.name]: event.target.value,
    });
    updateMasterData({
      ...masterDataUpdate,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Box className="m-5 flex w-[450px] flex-col">
      <TextField
        required
        id="outlined-required"
        label="Nhóm dữ liệu"
        fullWidth
        name="groupCode"
        value={masterDataUpdate.groupCode}
        onChange={handleChangeMasterData}
        error={error.groupCode}
        helperText={error.groupCode && "Nhóm masterData không được để trống"}
        className="mb-3"
      />
      <TextField
        required
        id="outlined-required"
        label="Tên"
        fullWidth
        name="name"
        value={masterDataUpdate.name}
        onChange={handleChangeMasterData}
        error={error.name}
        helperText={error.name && "Tên masterData không được để trống"}
        className="mb-3"
      />
      <TextField
        required
        id="outlined-required"
        label="Giá trị"
        fullWidth
        name="value"
        value={masterDataUpdate.value}
        onChange={handleChangeMasterData}
        error={error.value}
        helperText={error.value && "Giá trị masterData không được để trống"}
        className="mb-3"
      />
      <TextField
        required
        id="outlined-multiline-static"
        label="Mô tả"
        multiline
        fullWidth
        name="description"
        value={masterDataUpdate.description}
        onChange={handleChangeMasterData}
        error={error.description}
        helperText={error.description && "Mô tả masterData không được để trống"}
        className="mb-3"
        InputProps={{
          inputComponent: TextareaAutosize,
        }}
      />
    </Box>
  );
};
