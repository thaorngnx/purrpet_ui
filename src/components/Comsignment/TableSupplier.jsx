import { createSupplier, getActiveSuppliers,  updateStatusSupplier, updateSupplier } from "../../api/supplier";
import { useState, useEffect } from "react";
import { Paper, Typography } from "@mui/material";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Snackbar, Switch, Tooltip } from "@mui/material";
import { Alert } from "@mui/material";
import { Add as AddIcon, Edit as EditIcon } from "@mui/icons-material";
import * as CONST from "../../constants";
import { DataGrid, GridToolbar, viVN } from "@mui/x-data-grid";
import { UpdateSupplier } from "./UpdateSupplier";


export const TableSupplier = () => {
    const [rows, setRows] = useState([]);
    const [openEdit, setOpenEdit] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [alert, setAlert] = useState(false);
    const [severity, setSeverity] = useState(CONST.ALERT_SEVERITY.SUCCESS);
    const [message, setMessage] = useState("");
    const [error, setError] = useState({});
  
    useEffect(() => {
      const param ={
        limit: 10000,
      }
      getActiveSuppliers(param).then((res) => {
        setRows(res.data);
      });
    }, [alert]);
  
   
    useEffect(() => {
      const timer = setTimeout(() => {
        setAlert(false);
      }, 5000);
      return () => clearTimeout(timer);
    }, [alert]);
  
    const columns = [
      {
        field: "purrPetCode",
        headerName: "Mã",
        flex: 1,
        align: "left",
        headerAlign: "left",
        minWidth: 70,
      },
      {
        field: "supplierName",
        headerName: "Tên nhà cung cấp",
        flex: 3,
        headerAlign: "left",
        align: "left",
        minWidth: 150,
      },
      {
        field: "email",
        headerName: "email",
        flex: 3,
        headerAlign: "left",
        align: "left",
        minWidth: 100,
      },
      {
        field: "phoneNumber",
        headerName: "Số điện thoại",
        flex: 1,
        headerAlign: "center",
        align: "right",
        minWidth: 120,
        type: "number",
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
                  checked={params.value === CONST.STATUS_PRODUCT.ACTIVE}
                  inputProps={{
                    "aria-label": "controlled",
                  }}
                  onChange={() => handleChangeStatusSupplier(params.row)}
                />
              }
              label={params.value === CONST.STATUS_PRODUCT.ACTIVE ? "Hợp tác" : "Đã ngưng"}
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
              <EditIcon onClick={() => handleEditSupplier(params.row)}></EditIcon>
            </Tooltip>
          </>
        ),
      },
    ];
  
    const getRowId = (row) => {
      return row.purrPetCode;
    };
  
    const handleEditSupplier = (row) => {
      setOpenEdit(true);
      setSelectedSupplier(row);
    };
  
    const handleCloseEditDialog = () => {
      setOpenEdit(false);
      setError({});
    };
  
    const handleUpdateSupplier = () => {
      let err = {};
      if (!selectedSupplier.supplierName) {
        err = { ...err, supplierName: true };
      }
      if (!selectedSupplier.email) {
        err = { ...err, email: true };
      }
      if (!selectedSupplier.phoneNumber) {
        err = { ...err, phoneNumber: true };
      }
      if (Object.keys(err).length > 0) {
        setError(err);
        return;
      }
      setOpenEdit(false);
      updateSupplier({
        purrPetCode: selectedSupplier.purrPetCode,
        supplierName: selectedSupplier.supplierName,
        email: selectedSupplier.email,
        phoneNumber: selectedSupplier.phoneNumber,
      }).then((res) => {
        setAlert(true);
        setSeverity(CONST.ALERT_SEVERITY.SUCCESS);
        if (res.err === -1) {
          setSeverity(CONST.ALERT_SEVERITY.WARNING);
        }
        setMessage(res.message);
        // getProducts().then((res) => {
        //   setRows(res.data);
        // });
      });
    };
  
    const handleChangeStatusSupplier = (row) => {
        updateStatusSupplier(row.purrPetCode).then((res) => {
            setAlert(true);
            setSeverity(CONST.ALERT_SEVERITY.SUCCESS);
            if (res.err === -1) {
                setSeverity(CONST.ALERT_SEVERITY.WARNING);
            }
            setMessage(res.message);
          
        });
    };
  
    const handleDataUpdateSupplier = (updateSupplier) => {
      setSelectedSupplier(updateSupplier);
    };
  
    const handleAddSupplier = () => {
      setOpenAdd(true);
      setSelectedSupplier({
        supplierName: "",
        email: "",
        phoneNumber: 0,
      });
    };
  
    const handleCloseAddDialog = () => {
      setOpenAdd(false);
      setError({});
    };
  
    const handleCreateSuplier = () => {
      let err = {};
      if (!selectedSupplier.supplierName) {
        err = { ...err, supplierName: true };
      }
      if (!selectedSupplier.email) {
        err = { ...err, email: true };
      }
      if (!selectedSupplier.phoneNumber) {
        err = { ...err, phoneNumber: true };
      }
      if (Object.keys(err).length > 0) {
        setError(err);
        return;
      }
      setOpenAdd(false);
      createSupplier({
        supplierName: selectedSupplier.supplierName,
        email: selectedSupplier.email,
        phoneNumber: selectedSupplier.phoneNumber,
      }).then((res) => {
        setAlert(true);
        setSeverity(CONST.ALERT_SEVERITY.SUCCESS);
        if (res.err === -1) {
          setSeverity(CONST.ALERT_SEVERITY.WARNING);
        }
        setMessage(res.message);
        // getProducts().then((res) => {
        //   setRows(res.data);
        // });
      });
    };
  
    return (
      <>
        <Typography
          variant="h5"
          component="h5"
          className="m-5 text-center font-bold"
        >
          DANH SÁCH NHÀ CUNG CẤP
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
            onClick={handleAddSupplier}
          >
            Thêm nhà cung cấp
          </Button>

          <DataGrid
            rows={rows}
            getRowId={getRowId}
            columns={columns}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
              
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
              SỬA NHÀ CUNG CẤP
            </DialogTitle>
            <DialogContent className="pb-0">
              <UpdateSupplier
                supplier={selectedSupplier}
                updateSupplier={handleDataUpdateSupplier}
                err={error}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseEditDialog}>Hủy</Button>
              <Button onClick={handleUpdateSupplier}>Cập nhật</Button>
            </DialogActions>
          </Dialog>
          <Dialog open={openAdd} onClose={handleCloseAddDialog}>
            <DialogTitle className="bg-gray-400 p-5 text-center font-bold">
              THÊM NHÀ CUNG CẤP
            </DialogTitle>
            <DialogContent className="pb-0">
              <UpdateSupplier
                supplier={selectedSupplier}
                updateSupplier={handleDataUpdateSupplier}
                err={error}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseAddDialog}>Hủy</Button>
              <Button onClick={handleCreateSuplier}>Tạo</Button>
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
}