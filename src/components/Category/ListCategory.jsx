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
import "../../api/category";
import {
  createCategory,
  getCategories,
  updateCategory,
  updateStatusCategory,
} from "../../api/category";
import { UpdateCategory } from "./UpdateCategory";
import * as CONST from "../../constants";

export const ListCategory = () => {
  const columns = [
    {
      field: "purrPetCode",
      headerName: "Mã danh mục",
      flex: 2,
      align: "left",
      headerAlign: "center",
      minWidth: 100,
    },
    {
      field: "categoryName",
      headerName: "Tên danh mục",
      flex: 3,
      headerAlign: "center",
      align: "left",
      minWidth: 150,
    },
    {
      field: "categoryType",
      headerName: "Loại danh mục",
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
                onChange={() => handleChangeStatusCategory(params.row)}
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
            <EditIcon onClick={() => handleEditCategory(params.row)}></EditIcon>
          </Tooltip>
        </>
      ),
    },
  ];

  const getRowId = (row) => {
    return row.purrPetCode;
  };

  const handleEditCategory = (row) => {
    setOpenEdit(true);
    setSelectedCategory(row);
  };

  const handleCloseEditDialog = () => {
    setOpenEdit(false);
  };

  const handleUpdateCategory = () => {
    setOpenEdit(false);
    updateCategory({
      purrPetCode: selectedCategory.purrPetCode,
      categoryName: selectedCategory.categoryName,
      categoryType: selectedCategory.categoryType,
    }).then((res) => {
      setAlert(true);
      setSeverity(CONST.ALERT_SEVERITY.SUCCESS);
      if (res.err === -1) {
        setSeverity(CONST.ALERT_SEVERITY.WARNING);
      }
      setMessage(res.message);
      getCategories().then((res) => {
        setRows(res.data);
      });
    });
  };

  const handleChangeStatusCategory = (row) => {
    if (row.status === CONST.STATUS_CATEGORY.ACTIVE) {
      row.status = CONST.STATUS_CATEGORY.INACTIVE;
    } else {
      row.status = CONST.STATUS_CATEGORY.ACTIVE;
    }
    updateStatusCategory(row.purrPetCode).then((res) => {
      setAlert(true);
      setSeverity(CONST.ALERT_SEVERITY.SUCCESS);
      if (res.err === -1) {
        setSeverity(CONST.ALERT_SEVERITY.WARNING);
      }
      setMessage(res.message);
      getCategories().then((res) => {
        setRows(res.data);
      });
    });
  };

  const handleDataUpdateCategory = (updateCategory) => {
    setSelectedCategory(updateCategory);
  };

  const handleAddCategory = (row) => {
    setOpenAdd(true);
    setSelectedCategory({ categoryName: "", categoryType: "" });
  };

  const handleCloseAddDialog = () => {
    setOpenAdd(false);
  };

  const handleCreateCategory = () => {
    setOpenAdd(false);
    createCategory({
      purrPetCode: selectedCategory.purrPetCode,
      categoryName: selectedCategory.categoryName,
      categoryType: selectedCategory.categoryType,
    }).then((res) => {
      setAlert(true);
      setSeverity(CONST.ALERT_SEVERITY.SUCCESS);
      if (res.err === -1) {
        setSeverity(CONST.ALERT_SEVERITY.WARNING);
      }
      setMessage(res.message);
      getCategories().then((res) => {
        setRows(res.data);
      });
    });
  };

  const [rows, setRows] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [alert, setAlert] = useState(false);
  const [severity, setSeverity] = useState(CONST.ALERT_SEVERITY.SUCCESS);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getCategories().then((res) => {
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

  return (
    <>
      <Typography
        variant="h5"
        component="h5"
        className="m-5 text-center font-bold"
      >
        DANH SÁCH DANH MỤC
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
          onClick={handleAddCategory}
        >
          Thêm danh mục
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
            SỬA DANH MỤC
          </DialogTitle>
          <DialogContent>
            <UpdateCategory
              category={selectedCategory}
              updateCategory={handleDataUpdateCategory}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditDialog}>Hủy</Button>
            <Button onClick={handleUpdateCategory}>Cập nhật</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openAdd} onClose={handleCloseAddDialog}>
          <DialogTitle className="bg-gray-400 p-5 text-center font-bold">
            THÊM DANH MỤC
          </DialogTitle>
          <DialogContent>
            <UpdateCategory
              category={selectedCategory}
              updateCategory={handleDataUpdateCategory}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddDialog}>Hủy</Button>
            <Button onClick={handleCreateCategory}>Tạo</Button>
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
