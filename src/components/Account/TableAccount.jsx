import {
  Paper,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Switch,
  Alert,
  Snackbar,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import PinIcon from "@mui/icons-material/Pin";
import { DataGrid, GridToolbar, viVN } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import "../../api/account";
import {
  createAccount,
  getAccounts,
  updateAccount,
  updateStatusAccount,
} from "../../api/account";
import { UpdateAccount } from "./UpdateAccount";
import { CreateAccount } from "./CreateAccount";
import { ChangePassword } from "./ChangePassword";
import * as CONST from "../../constants";
import { validatePassword } from "../../utils/validationData";

export const TableAccount = () => {
  const [rows, setRows] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [alert, setAlert] = useState(false);
  const [severity, setSeverity] = useState(CONST.ALERT_SEVERITY.SUCCESS);
  const [message, setMessage] = useState("");
  const [error, setError] = useState({});

  useEffect(() => {
    getAccounts().then((res) => {
      console.log(res.data);
      setRows(res.data);
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [alert]);

  const columns = [
    {
      field: "purrPetCode",
      headerName: "Mã tài khoản",
      flex: 2,
      align: "left",
      headerAlign: "center",
      minWidth: 100,
    },
    {
      field: "username",
      headerName: "Tên đăng nhập",
      flex: 3,
      headerAlign: "center",
      align: "left",
      minWidth: 150,
    },
    {
      field: "role",
      headerName: "Quyền",
      flex: 3,
      headerAlign: "center",
      align: "left",
      minWidth: 150,
    },
    {
      field: "status",
      headerName: "Trạng thái",
      headerAlign: "center",
      align: "center",
      flex: 2,
      minWidth: 100,
      renderCell: (params) => (
        <Tooltip title="Đổi trạng thái">
          <FormControlLabel
            control={
              <Switch
                checked={params.value === CONST.STATUS_CATEGORY.ACTIVE}
                inputProps={{
                  "aria-label": "controlled",
                }}
                onChange={() => handleChangeStatusAccount(params.row)}
              />
            }
            label={
              params.value === CONST.STATUS_CATEGORY.ACTIVE ? "Hiện" : "Ẩn"
            }
          />
        </Tooltip>
      ),
    },
    {
      field: "action",
      headerName: "Thao tác",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 100,
      sortable: false,
      filterable: false,
      disableExport: true,
      renderCell: (params) => (
        <>
          <Tooltip title="Sửa">
            <EditIcon onClick={() => handleEditAccount(params.row)}></EditIcon>
          </Tooltip>
          <Tooltip title="Đổi mật khẩu">
            <PinIcon
              onClick={() => handleEditPasswordAccount(params.row)}
            ></PinIcon>
          </Tooltip>
        </>
      ),
    },
  ];

  const getRowId = (row) => {
    return row.purrPetCode;
  };

  const handleEditAccount = (row) => {
    setOpenEdit(true);
    setSelectedAccount(row);
  };

  const handleCloseEditDialog = () => {
    setError({});
    setOpenEdit(false);
  };

  const handleUpdateAccount = () => {
    let err = {};
    if (!selectedAccount.username) {
      err = { ...err, username: true };
    }
    if (!selectedAccount.role) {
      err = { ...err, role: true };
    }
    if (Object.keys(err).length > 0) {
      setError(err);
      return;
    }
    setOpenEdit(false);
    updateAccount({
      purrPetCode: selectedAccount.purrPetCode,
      username: selectedAccount.username,
      role: selectedAccount.role,
    }).then((res) => {
      setAlert(true);
      setSeverity(CONST.ALERT_SEVERITY.SUCCESS);
      if (res.err === -1) {
        setSeverity(CONST.ALERT_SEVERITY.WARNING);
      }
      setMessage(res.message);
      getAccounts().then((res) => {
        setRows(res.data);
      });
    });
  };

  const handleChangeStatusAccount = (row) => {
    if (row.status === CONST.STATUS_CATEGORY.ACTIVE) {
      row.status = CONST.STATUS_CATEGORY.INACTIVE;
    } else {
      row.status = CONST.STATUS_CATEGORY.ACTIVE;
    }
    updateStatusAccount(row.purrPetCode).then((res) => {
      setAlert(true);
      setSeverity(CONST.ALERT_SEVERITY.SUCCESS);
      if (res.err === -1) {
        setSeverity(CONST.ALERT_SEVERITY.WARNING);
      }
      setMessage(res.message);
      getAccounts().then((res) => {
        setRows(res.data);
      });
    });
  };

  const handleDataUpdateAccount = (updateAccount) => {
    setSelectedAccount(updateAccount);
  };

  const handleAddAccount = (row) => {
    setOpenAdd(true);
    setSelectedAccount({
      username: "",
      role: "",
      password: "",
      passwordConfirm: "",
    });
  };

  const handleCloseAddDialog = () => {
    setError({});
    setOpenAdd(false);
  };

  const handleCloseChangePasswordDialog = () => {
    setError({});
    setOpenChangePassword(false);
  };

  const handleCreateAccount = () => {
    let err = {};
    if (!selectedAccount.username) {
      err = { ...err, username: true };
    }
    if (!selectedAccount.role) {
      err = { ...err, role: true };
    }
    if (
      !selectedAccount.password ||
      !validatePassword(selectedAccount.password)
    ) {
      err = { ...err, password: true };
    }
    if (
      selectedAccount.password &&
      selectedAccount.passwordConfirm &&
      selectedAccount.password !== selectedAccount.passwordConfirm
    ) {
      err = { ...err, passwordConfirm: true };
    }
    if (Object.keys(err).length > 0) {
      setError(err);
      return;
    }
    setOpenAdd(false);
    createAccount({
      purrPetCode: selectedAccount.purrPetCode,
      username: selectedAccount.username,
      role: selectedAccount.role,
      password: selectedAccount.password,
    }).then((res) => {
      setAlert(true);
      setSeverity(CONST.ALERT_SEVERITY.SUCCESS);
      if (res.err === -1) {
        setSeverity(CONST.ALERT_SEVERITY.WARNING);
      }
      setMessage(res.message);
      getAccounts().then((res) => {
        setRows(res.data);
      });
    });
  };

  const handleEditPasswordAccount = (row) => {
    setOpenChangePassword(true);
    setSelectedAccount({ ...row, password: "", passwordConfirm: "" });
  };

  const handleChangePasswordAccount = () => {
    console.log(selectedAccount);
    let err = {};
    if (
      !selectedAccount.password ||
      !validatePassword(selectedAccount.password)
    ) {
      console.log("password");
      err = { ...err, password: true };
    }
    if (
      selectedAccount.password &&
      selectedAccount.passwordConfirm &&
      selectedAccount.password !== selectedAccount.passwordConfirm
    ) {
      err = { ...err, passwordConfirm: true };
    }
    if (Object.keys(err).length > 0) {
      setError(err);
      return;
    }
    setOpenChangePassword(false);
    updateAccount({
      purrPetCode: selectedAccount.purrPetCode,
      password: selectedAccount.password,
    }).then((res) => {
      setAlert(true);
      setSeverity(CONST.ALERT_SEVERITY.SUCCESS);
      if (res.err === -1) {
        setSeverity(CONST.ALERT_SEVERITY.WARNING);
      }
      setMessage(res.message);
      getAccounts().then((res) => {
        setRows(res.data);
      });
    });
  };

  return (
    <>
      <Typography
        variant="h5"
        component="h5"
        className="m-5 text-center font-bold"
      >
        DANH SÁCH TÀI KHOẢN
      </Typography>
      <Paper
        sx={{
          width: "90%",
          display: "block",
          ml: "auto",
          mr: "auto",
          position: "relative",
        }}
      >
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          className="relative m-5"
          onClick={handleAddAccount}
        >
          Thêm tài khoản
        </Button>
        <DataGrid
          rows={rows}
          getRowId={getRowId}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10, 25, 100]}
          hideFooterSelectedRowCount
          slots={{
            toolbar: GridToolbar,
          }}
          classes={{
            columnHeaderTitle: "font-bold text-center",
            columnHeaders: "bg-gray-200",
          }}
          componentsProps={{
            panel: {
              sx: {
                top: "-10% !important",
              },
            },
          }}
          localeText={viVN.components.MuiDataGrid.defaultProps.localeText}
        />
        <Dialog open={openEdit} onClose={handleCloseEditDialog}>
          <DialogTitle className="bg-gray-400 p-5 text-center font-bold">
            SỬA TÀI KHOẢN
          </DialogTitle>
          <DialogContent className="pb-0">
            <UpdateAccount
              account={selectedAccount}
              updateAccount={handleDataUpdateAccount}
              err={error}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditDialog}>Hủy</Button>
            <Button onClick={handleUpdateAccount}>Cập nhật</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openAdd} onClose={handleCloseAddDialog}>
          <DialogTitle className="bg-gray-400 p-5 text-center font-bold">
            THÊM TÀI KHOẢN
          </DialogTitle>
          <DialogContent className="pb-0">
            <CreateAccount
              account={selectedAccount}
              createAccount={handleDataUpdateAccount}
              err={error}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddDialog}>Hủy</Button>
            <Button onClick={handleCreateAccount}>Tạo</Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openChangePassword}
          onClose={handleCloseChangePasswordDialog}
        >
          <DialogTitle className="bg-gray-400 p-5 text-center font-bold">
            ĐỔI MẬT KHẨU
          </DialogTitle>
          <DialogContent className="pb-0">
            <ChangePassword
              account={selectedAccount}
              updateAccount={handleDataUpdateAccount}
              err={error}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseChangePasswordDialog}>Hủy</Button>
            <Button onClick={handleChangePasswordAccount}>Cập nhật</Button>
          </DialogActions>
        </Dialog>
      </Paper>
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
