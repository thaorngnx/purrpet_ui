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
import "../../api/product";
import { createProduct, getProducts, updateProduct } from "../../api/product";
import { getCategories } from "../../api/category";
import { UpdateProduct } from "./UpdateProduct";
import * as CONST from "../../constants";

export const ListProduct = () => {
  const columns = [
    {
      field: "purrPetCode",
      headerName: "Mã sản phẩm",
      flex: 1,
      align: "left",
      headerAlign: "center",
      minWidth: 100,
    },
    {
      field: "productName",
      headerName: "Tên sản phẩm",
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
      renderCell: (params) => (
        <div style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
          {params.value}
        </div>
      ),
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
      field: "productType",
      headerName: "Loại sản phẩm",
      flex: 1,
      headerAlign: "center",
      align: "left",
      minWidth: 100,
    },
    {
      field: "image",
      headerName: "Hình ảnh",
      flex: 3,
      headerAlign: "center",
      align: "left",
      minWidth: 150,
      renderCell: (params) => (
        <img
          src={params.value}
          alt={`Image ${params.row.purrPetCode}`}
          width="100%"
          height="100%"
        />
      ),
    },
    {
      field: "inventory",
      headerName: "Hàng tồn kho",
      flex: 1,
      headerAlign: "center",
      align: "right",
      minWidth: 100,
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
                onChange={() => handleChangeStatusProduct(params.row)}
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
            <EditIcon onClick={() => handleEditProduct(params.row)}></EditIcon>
          </Tooltip>
        </>
      ),
    },
  ];

  const getRowId = (row) => {
    return row.purrPetCode;
  };

  const handleEditProduct = (row) => {
    setOpenEdit(true);
    setSelectedProduct(row);
  };

  const handleCloseEditDialog = () => {
    setOpenEdit(false);
  };

  const handleUpdateProduct = () => {
    setOpenEdit(false);
    console.log(selectedProduct);
    updateProduct({
      purrPetCode: selectedProduct.purrPetCode,
      productName: selectedProduct.productName,
      productType: selectedProduct.productType,
      description: selectedProduct.description,
      price: selectedProduct.price,
      categoryCode: selectedProduct.categoryCode,
      image: selectedProduct.image,
      inventory: selectedProduct.inventory,
      // updateBy: "admin"
    }).then((res) => {
      setAlert(true);
      setSeverity(CONST.ALERT_SEVERITY.SUCCESS);
      if (res.err === -1) {
        setSeverity(CONST.ALERT_SEVERITY.WARNING);
      }
      setMessage(res.message);
      getProducts().then((res) => {
        setRows(res.data);
      });
    });
  };

  const handleChangeStatusProduct = (row) => {
    if (row.status === CONST.STATUS_PRODUCT.ACTIVE) {
      row.status = CONST.STATUS_PRODUCT.INACTIVE;
    } else {
      row.status = CONST.STATUS_PRODUCT.ACTIVE;
    }
    updateProduct({
      purrPetCode: row.purrPetCode,
      status: row.status,
      // updateBy: "admin"
    }).then((res) => {
      setAlert(true);
      setSeverity(CONST.ALERT_SEVERITY.SUCCESS);
      if (res.err === -1) {
        setSeverity(CONST.ALERT_SEVERITY.WARNING);
      }
      setMessage(res.message);
      getProducts().then((res) => {
        setRows(res.data);
      });
    });
  };

  const handleDataUpdateProduct = (updateProduct) => {
    console.log(updateProduct);
    setSelectedProduct(updateProduct);
  };

  const handleAddProduct = () => {
    setOpenAdd(true);
    setSelectedProduct({
      productName: "",
      productType: "",
      description: "",
      price: 0,
      categoryCode: "",
      images: [],
      inventory: 0,
    });
  };

  const handleCloseAddDialog = () => {
    setOpenAdd(false);
  };

  const handleCreateProduct = () => {
    setOpenAdd(false);
    createProduct({
      purrPetCode: selectedProduct.purrPetCode,
      productName: selectedProduct.productName,
      productType: selectedProduct.productType,
      description: selectedProduct.description,
      price: selectedProduct.price,
      categoryCode: selectedProduct.categoryCode,
      image: selectedProduct.image,
      inventory: selectedProduct.inventory,
      // updateBy: "admin"
    }).then((res) => {
      setAlert(true);
      setSeverity(CONST.ALERT_SEVERITY.SUCCESS);
      if (res.err === -1) {
        setSeverity(CONST.ALERT_SEVERITY.WARNING);
      }
      setMessage(res.message);
      getProducts().then((res) => {
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

  const [rows, setRows] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [alert, setAlert] = useState(false);
  const [severity, setSeverity] = useState(CONST.ALERT_SEVERITY.SUCCESS);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getProducts().then((res) => {
      console.log(res.data);
      setRows(res.data);
    });
    const params = { categoryType: CONST.CATEGORY_TYPE.PRODUCT };
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

  return (
    <>
      <Typography
        variant="h5"
        component="h5"
        className="m-5 text-center font-bold"
      >
        DANH SÁCH SẢN PHẨM
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
          onClick={handleAddProduct}
        >
          Thêm sản phẩm
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
            SỬA SẢN PHẨM
          </DialogTitle>
          <DialogContent>
            <UpdateProduct
              categories={activeCategory}
              product={selectedProduct}
              updateProduct={handleDataUpdateProduct}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditDialog}>Hủy</Button>
            <Button onClick={handleUpdateProduct}>Cập nhật</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openAdd} onClose={handleCloseAddDialog}>
          <DialogTitle className="bg-gray-400 p-5 text-center font-bold">
            THÊM SẢN PHẨM
          </DialogTitle>
          <DialogContent>
            <UpdateProduct
              categories={activeCategory}
              product={selectedProduct}
              updateProduct={handleDataUpdateProduct}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddDialog}>Hủy</Button>
            <Button onClick={handleCreateProduct}>Tạo</Button>
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
