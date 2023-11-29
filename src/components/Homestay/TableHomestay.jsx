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
import { DataGrid, GridToolbar, viVN } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import "../../api/homestay";
import {
  createHomestay,
  getHomestays,
  updateHomestay,
  updateStatusHomestay,
} from "../../api/homestay";
import { getCategories } from "../../api/category";
import { UpdateHomestay } from "./UpdateHomestay";
import * as CONST from "../../constants";
import { getMasterDatas } from "../../api/masterData";

export const TableHomestay = () => {
  const columns = [
    {
      field: "purrPetCode",
      headerName: "Mã homestay",
      flex: 1,
      align: "left",
      headerAlign: "center",
      minWidth: 100,
    },
    {
      field: "masterDataCode",
      headerName: "Kich thước phòng",
      flex: 3,
      headerAlign: "center",
      align: "left",
      minWidth: 150,
      valueGetter: (params) => getMasterDataName(params.row.masterDataCode),
    },
    {
      field: "homeType",
      headerName: "Loại phòng",
      flex: 3,
      headerAlign: "center",
      align: "left",
      minWidth: 150,
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
      field: "price",
      headerName: "Giá",
      flex: 1,
      headerAlign: "center",
      align: "right",
      minWidth: 120,
      type: "number",
    },
    {
      field: "categoryName",
      headerName: "Danh mục",
      flex: 3,
      headerAlign: "center",
      align: "left",
      minWidth: 150,
      valueGetter: (params) => getCategoryName(params.row.categoryCode),
    },
    {
      field: "images",
      headerName: "Hình ảnh",
      flex: 3,
      headerAlign: "center",
      align: "left",
      minWidth: 150,
      renderCell: (params) => (
        <img
          src={
            params.value && params.value.length > 0
              ? params.value[0].path
              : null
          }
          alt={`Image ${params.row.purrPetCode}`}
          width="100%"
          height="100%"
        />
      ),
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
                onChange={() => handleChangeStatusHomestay(params.row)}
              />
            }
            label={params.value === CONST.STATUS_PRODUCT.ACTIVE ? "Hiện" : "Ẩn"}
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
            <EditIcon onClick={() => handleEditHomestay(params.row)}></EditIcon>
          </Tooltip>
        </>
      ),
    },
  ];

  const getRowId = (row) => {
    return row.purrPetCode;
  };

  const handleEditHomestay = (row) => {
    setOpenEdit(true);
    setSelectedHomestay(row);
  };

  const handleCloseEditDialog = () => {
    setOpenEdit(false);
  };

  const handleUpdateHomestay = () => {
    setOpenEdit(false);
    console.log(selectedHomestay);
    updateHomestay({
      purrPetCode: selectedHomestay.purrPetCode,
      homeType: selectedHomestay.homeType,
      description: selectedHomestay.description,
      price: selectedHomestay.price,
      categoryCode: selectedHomestay.categoryCode,
      masterDataCode: selectedHomestay.masterDataCode,
      images: selectedHomestay.images,
    }).then((res) => {
      setAlert(true);
      setSeverity(CONST.ALERT_SEVERITY.SUCCESS);
      if (res.err === -1) {
        setSeverity(CONST.ALERT_SEVERITY.WARNING);
      }
      setMessage(res.message);
      getHomestays().then((res) => {
        setRows(res.data);
      });
    });
  };

  const handleChangeStatusHomestay = (row) => {
    updateStatusHomestay(row.purrPetCode).then((res) => {
      setAlert(true);
      setSeverity(CONST.ALERT_SEVERITY.SUCCESS);
      if (res.err === -1) {
        setSeverity(CONST.ALERT_SEVERITY.WARNING);
      }
      setMessage(res.message);
      getHomestays().then((res) => {
        setRows(res.data);
      });
    });
  };

  const handleDataUpdateHomestay = (updateHomestay) => {
    console.log("updateHomestay", updateHomestay);
    setSelectedHomestay(updateHomestay);
  };

  const handleAddHomestay = () => {
    setOpenAdd(true);
    setSelectedHomestay({
      homeType: "",
      description: "",
      price: 0,
      categoryCode: "",
      categoryName: "",
      masterDataCode: "",
      masterDataName: "",
      images: [],
    });
  };

  const handleCloseAddDialog = () => {
    setOpenAdd(false);
  };

  const handleCreateHomestay = () => {
    setOpenAdd(false);
    createHomestay({
      homeType: selectedHomestay.homeType,
      description: selectedHomestay.description,
      price: selectedHomestay.price,
      categoryCode: selectedHomestay.categoryCode,
      masterDataCode: selectedHomestay.masterDataCode,
      images: selectedHomestay.images,
    }).then((res) => {
      setAlert(true);
      setSeverity(CONST.ALERT_SEVERITY.SUCCESS);
      if (res.err === -1) {
        setSeverity(CONST.ALERT_SEVERITY.WARNING);
      }
      setMessage(res.message);
      getHomestays().then((res) => {
        setRows(res.data);
      });
    });
  };

  const getCategoryName = (categoryCode) => {
    const category = categories.find(
      (category) => category.purrPetCode === categoryCode,
    );
    return category ? category.categoryName : "";
  };

  const getActiveCategory = (categories) => {
    return categories.filter(
      (category) => category.status === CONST.STATUS_CATEGORY.ACTIVE,
    );
  };

  const getMasterDataName = (masterDataCode) => {
    const masterData = sizeHome.find(
      (masterData) => masterData.purrPetCode === masterDataCode,
    );
    return masterData ? masterData.name : "";
  };

  const [rows, setRows] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sizeHome, setSizeHome] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedHomestay, setSelectedHomestay] = useState(null);
  const [alert, setAlert] = useState(false);
  const [severity, setSeverity] = useState(CONST.ALERT_SEVERITY.SUCCESS);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getHomestays().then((res) => {
      console.log(res.data);
      setRows(res.data);
    });
    const params = { categoryType: CONST.CATEGORY_TYPE.HOMESTAY };
    getCategories(params).then((res) => {
      console.log(res.data);
      setCategories(res.data);
    });
    getMasterDatas({ groupCode: CONST.MASTERDATA_HOMESTAY.HOME_SIZE }).then(
      (res) => {
        console.log(res.data);
        setSizeHome(res.data);
      },
    );
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      setActiveCategory(getActiveCategory(categories));
    }
  }, [categories]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [alert]);

  return (
    <>
      <Typography
        variant="h5"
        component="h5"
        className="m-5 text-center font-bold"
      >
        DANH SÁCH HOMESTAY
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
          onClick={handleAddHomestay}
        >
          Thêm homestay
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
            noRowsOverlay: () => "Không có dữ liệu",
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
            SỬA HOMESTAY
          </DialogTitle>
          <DialogContent>
            <UpdateHomestay
              homeSize={sizeHome}
              categories={activeCategory}
              homestay={selectedHomestay}
              updateHomestay={handleDataUpdateHomestay}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditDialog}>Hủy</Button>
            <Button onClick={handleUpdateHomestay}>Cập nhật</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openAdd} onClose={handleCloseAddDialog}>
          <DialogTitle className="bg-gray-400 p-5 text-center font-bold">
            THÊM HOMESTAY
          </DialogTitle>
          <DialogContent>
            <UpdateHomestay
              homeSize={sizeHome}
              categories={activeCategory}
              homestay={selectedHomestay}
              updateHomestay={handleDataUpdateHomestay}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddDialog}>Hủy</Button>
            <Button onClick={handleCreateHomestay}>Tạo</Button>
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
