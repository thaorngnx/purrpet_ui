import {
  Paper,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid, GridToolbar, viVN } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import "../../api/masterData";
import {
  createMasterData,
  getMasterDatas,
  updateMasterData,
} from "../../api/masterData";
import { UpdateMasterData } from "./UpdateMasterData";
import * as CONST from "../../constants";

export const TableMasterData = () => {
  const [rows, setRows] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedMasterData, setSelectedMasterData] = useState(null);
  const [alert, setAlert] = useState(false);
  const [severity, setSeverity] = useState(CONST.ALERT_SEVERITY.SUCCESS);
  const [message, setMessage] = useState("");
  const [error, setError] = useState({});

  useEffect(() => {
    const param = {
      limit: 10000,
    };
    getMasterDatas(param).then((res) => {
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
      headerName: "Mã masterData",
      flex: 1,
      align: "left",
      headerAlign: "center",
      minWidth: 100,
    },
    {
      field: "groupCode",
      headerName: "Nhóm",
      flex: 3,
      headerAlign: "center",
      align: "left",
      minWidth: 150,
    },
    {
      field: "name",
      headerName: "Tên",
      flex: 1,
      headerAlign: "center",
      align: "left",
      minWidth: 100,
    },
    {
      field: "value",
      headerName: "Giá trị",
      flex: 1,
      headerAlign: "center",
      align: "left",
      minWidth: 100,
    },
    {
      field: "description",
      headerName: "Mô tả",
      flex: 3,
      headerAlign: "center",
      align: "left",
      minWidth: 100,
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
            <EditIcon
              onClick={() => handleEditMasterData(params.row)}
            ></EditIcon>
          </Tooltip>
        </>
      ),
    },
  ];

  const getRowId = (row) => {
    return row.purrPetCode;
  };

  const handleEditMasterData = (row) => {
    setOpenEdit(true);
    setSelectedMasterData(row);
  };

  const handleCloseEditDialog = () => {
    setOpenEdit(false);
    setError({});
  };

  const handleUpdateMasterData = () => {
    let err = {};
    if (!selectedMasterData.groupCode) {
      err = { ...err, groupCode: true };
    }
    if (!selectedMasterData.name) {
      err = { ...err, name: true };
    }
    if (!selectedMasterData.value) {
      err = { ...err, value: true };
    }
    if (!selectedMasterData.description) {
      err = { ...err, description: true };
    }
    if (Object.keys(err).length > 0) {
      setError(err);
      return;
    }
    setOpenEdit(false);
    console.log(selectedMasterData);
    updateMasterData({
      purrPetCode: selectedMasterData.purrPetCode,
      groupCode: selectedMasterData.groupCode,
      name: selectedMasterData.name,
      value: selectedMasterData.value,
      description: selectedMasterData.description,
    }).then((res) => {
      setAlert(true);
      setSeverity(CONST.ALERT_SEVERITY.SUCCESS);
      if (res.err === -1) {
        setSeverity(CONST.ALERT_SEVERITY.WARNING);
      }
      setMessage(res.message);
      getMasterDatas().then((res) => {
        setRows(res.data);
      });
    });
  };

  const handleDataUpdateMasterData = (updateMasterData) => {
    setSelectedMasterData(updateMasterData);
  };

  const handleAddMasterData = () => {
    setOpenAdd(true);
    setSelectedMasterData({
      groupCode: "",
      name: "",
      value: "",
      description: "",
    });
  };

  const handleCloseAddDialog = () => {
    setOpenAdd(false);
    setError({});
  };

  const handleCreateMasterData = () => {
    let err = {};
    if (!selectedMasterData.groupCode) {
      err = { ...err, groupCode: true };
    }
    if (!selectedMasterData.name) {
      err = { ...err, name: true };
    }
    if (!selectedMasterData.value) {
      err = { ...err, value: true };
    }
    if (!selectedMasterData.description) {
      err = { ...err, description: true };
    }
    if (Object.keys(err).length > 0) {
      setError(err);
      return;
    }
    setOpenAdd(false);
    createMasterData({
      purrPetCode: selectedMasterData.purrPetCode,
      groupCode: selectedMasterData.groupCode,
      name: selectedMasterData.name,
      value: selectedMasterData.value,
      description: selectedMasterData.description,
    }).then((res) => {
      setAlert(true);
      setSeverity(CONST.ALERT_SEVERITY.SUCCESS);
      if (res.err === -1) {
        setSeverity(CONST.ALERT_SEVERITY.WARNING);
      }
      setMessage(res.message);
      getMasterDatas().then((res) => {
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
        DANH SÁCH MATER DATA
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
          onClick={handleAddMasterData}
        >
          Thêm Master Data
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
            SỬA MATER DATA
          </DialogTitle>
          <DialogContent className="pb-0">
            <UpdateMasterData
              masterData={selectedMasterData}
              updateMasterData={handleDataUpdateMasterData}
              err={error}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditDialog}>Hủy</Button>
            <Button onClick={handleUpdateMasterData}>Cập nhật</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openAdd} onClose={handleCloseAddDialog}>
          <DialogTitle className="bg-gray-400 p-5 text-center font-bold">
            THÊM MATER DATA
          </DialogTitle>
          <DialogContent className="pb-0">
            <UpdateMasterData
              masterData={selectedMasterData}
              updateMasterData={handleDataUpdateMasterData}
              err={error}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddDialog}>Hủy</Button>
            <Button onClick={handleCreateMasterData}>Tạo</Button>
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
