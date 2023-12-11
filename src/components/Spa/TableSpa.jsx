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
import { createSpa, getSpas, updateSpa, updateStatusSpa } from "../../api/spa";
import { getCategories } from "../../api/category";
import { UpdateSpa } from "./UpdateSpa";
import * as CONST from "../../constants";

export const TableSpa = () => {
  const [rows, setRows] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedSpa, setSelectedSpa] = useState(null);
  const [alert, setAlert] = useState(false);
  const [severity, setSeverity] = useState(CONST.ALERT_SEVERITY.SUCCESS);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getSpas().then((res) => {
      console.log(res.data);
      setRows(res.data);
    });
    const params = { categoryType: CONST.CATEGORY_TYPE.SPA };
    getCategories(params).then((res) => {
      console.log(res.data);
      setCategories(res.data);
    });
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

  const columns = [
    {
      field: "purrPetCode",
      headerName: "Mã spa",
      flex: 1,
      align: "left",
      headerAlign: "center",
      minWidth: 100,
    },
    {
      field: "spaName",
      headerName: "Tên spa",
      flex: 3,
      headerAlign: "center",
      align: "left",
      minWidth: 150,
    },
    {
      field: "spaType",
      headerName: "Loại spa",
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
      align: "center",
      minWidth: 150,
      valueGetter: (params) => getCategoryName(params.row.categoryCode),
    },
    // {
    //   field: "images",
    //   headerName: "Hình ảnh",
    //   flex: 3,
    //   headerAlign: "center",
    //   align: "left",
    //   minWidth: 150,
    //   renderCell: (params) => (
    //     <img
    //       src={
    //         params.value && params.value.length > 0
    //           ? params.value[0].path
    //           : null
    //       }
    //       alt={`Image ${params.row.purrPetCode}`}
    //       width="100%"
    //       height="100%"
    //     />
    //   ),
    // },
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
                onChange={() => handleChangeStatusSpa(params.row)}
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
            <EditIcon onClick={() => handleEditSpa(params.row)}></EditIcon>
          </Tooltip>
        </>
      ),
    },
  ];

  const getRowId = (row) => {
    return row.purrPetCode;
  };

  const handleEditSpa = (row) => {
    setOpenEdit(true);
    setSelectedSpa(row);
  };

  const handleCloseEditDialog = () => {
    setOpenEdit(false);
  };

  const handleUpdateSpa = () => {
    setOpenEdit(false);
    console.log(selectedSpa);
    updateSpa({
      purrPetCode: selectedSpa.purrPetCode,
      spaName: selectedSpa.spaName,
      spaType: selectedSpa.spaType,
      description: selectedSpa.description,
      price: selectedSpa.price,
      categoryCode: selectedSpa.categoryCode,
      // images: selectedSpa.images,
    }).then((res) => {
      setAlert(true);
      setSeverity(CONST.ALERT_SEVERITY.SUCCESS);
      if (res.err === -1) {
        setSeverity(CONST.ALERT_SEVERITY.WARNING);
      }
      setMessage(res.message);
      getSpas().then((res) => {
        setRows(res.data);
      });
    });
  };

  const handleChangeStatusSpa = (row) => {
    updateStatusSpa(row.purrPetCode).then((res) => {
      setAlert(true);
      setSeverity(CONST.ALERT_SEVERITY.SUCCESS);
      if (res.err === -1) {
        setSeverity(CONST.ALERT_SEVERITY.WARNING);
      }
      setMessage(res.message);
      getSpas().then((res) => {
        setRows(res.data);
      });
    });
  };

  const handleDataUpdateSpa = (updateSpa) => {
    console.log(updateSpa);
    setSelectedSpa(updateSpa);
  };

  const handleAddSpa = () => {
    setOpenAdd(true);
    setSelectedSpa({
      spaName: "",
      spaType: "",
      description: "",
      price: 0,
      categoryCode: "",
      // images: [],
    });
  };

  const handleCloseAddDialog = () => {
    setOpenAdd(false);
  };

  const handleCreateSpa = () => {
    setOpenAdd(false);
    createSpa({
      purrPetCode: selectedSpa.purrPetCode,
      spaName: selectedSpa.spaName,
      spaType: selectedSpa.spaType,
      description: selectedSpa.description,
      price: selectedSpa.price,
      categoryCode: selectedSpa.categoryCode,
      // images: selectedSpa.images,
    }).then((res) => {
      setAlert(true);
      setSeverity(CONST.ALERT_SEVERITY.SUCCESS);
      if (res.err === -1) {
        setSeverity(CONST.ALERT_SEVERITY.WARNING);
      }
      setMessage(res.message);
      getSpas().then((res) => {
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

  return (
    <>
      <Typography
        variant="h5"
        component="h5"
        className="m-5 text-center font-bold"
      >
        DANH SÁCH SPA
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
          onClick={handleAddSpa}
        >
          Thêm spa
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
            SỬA SPA
          </DialogTitle>
          <DialogContent>
            <UpdateSpa
              categories={activeCategory}
              spa={selectedSpa}
              updateSpa={handleDataUpdateSpa}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditDialog}>Hủy</Button>
            <Button onClick={handleUpdateSpa}>Cập nhật</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openAdd} onClose={handleCloseAddDialog}>
          <DialogTitle className="bg-gray-400 p-5 text-center font-bold">
            THÊM SPA
          </DialogTitle>
          <DialogContent>
            <UpdateSpa
              categories={activeCategory}
              spa={selectedSpa}
              updateSpa={handleDataUpdateSpa}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddDialog}>Hủy</Button>
            <Button onClick={handleCreateSpa}>Tạo</Button>
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
