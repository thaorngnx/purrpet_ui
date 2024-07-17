import { useEffect } from "react";
import {
  createComsignment,
  getComsignments,
  getAllMerchandise,
  UpdateStatusMerchandise,
} from "../../api/comsignment";
import PropTypes from "prop-types";
import { Button, Switch, TextField, Typography } from "@mui/material";
import {
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  FormControlLabel,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import React from "react";
import { useState } from "react";
import { Add as AddIcon } from "@mui/icons-material";
import { set } from "date-fns";
import { CreateComsignment } from "./CreateComsignment";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from "@mui/material";
import * as CONST from "../../constants";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import { formatCurrency, formatDateTime } from "../../utils/formatData";
import { cancelDiscount, createDiscount } from "../../api/product";

async function createData(code, count, supplier, productList) {
  let data = [];

  for (const product of productList) {
    const merchandiseCode = product.productCode + "+" + code;
    const params = {
      key: merchandiseCode,
    };
    try {
      const res = await getAllMerchandise(params);
      const inventory = res.data[0].inventory;
      const status = res.data[0].status;
      const expired = res.data[0].expired;
      const promotion = res.data[0].promotion;
      const priceDiscount = res.data[0].priceDiscount;

      data.push({
        expiryDate: product.expiryDate,
        productCode: product.productCode,
        quantity: product.quantity,
        cost: product.cost,
        inventory: inventory,
        status: status,
        expired: expired,
        promotion: promotion,
        priceDiscount: priceDiscount,
      });
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error(error);
    }
  }
  return { code, count, supplier, data };
}
function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [alert, setAlert] = useState(false);
  const [severity, setSeverity] = useState(CONST.ALERT_SEVERITY.SUCCESS);
  const [message, setMessage] = useState("");
  const [discount, setDiscount] = useState(0);
  const fetchData = async () => {
    try {
      const resolvedData = await row; // Chờ Promise hoàn thành và lấy kết quả
      return resolvedData;
    } catch (error) {
      console.error(error);
      return []; // Xử lý lỗi nếu có
    }
  };
  const [rowData, setRowData] = React.useState([]);
  useEffect(() => {
    fetchData().then((res) => {
      setRowData(res);
    });
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [alert]);
  const handleChangeStatusProduct = (productCode) => {
    UpdateStatusMerchandise(productCode).then((res) => {
      if (res.err === 0) {
        setAlert(true);
        setSeverity(CONST.ALERT_SEVERITY.SUCCESS);
        setMessage("Cập nhật trạng thái sản phẩm thành công");
      } else {
        setAlert(true);
        setSeverity(CONST.ALERT_SEVERITY.ERROR);
        setMessage("Cập nhật trạng thái sản phẩm thất bại");
      }
      setRowData((prev) => {
        const newData = prev.data.map((product) => {
          if (product.productCode === productCode.split("+")[0]) {
            return {
              ...product,
              status:
                product.status === CONST.STATUS_PRODUCT.ACTIVE
                  ? CONST.STATUS_PRODUCT.INACTIVE
                  : CONST.STATUS_PRODUCT.ACTIVE,
            };
          }
          return product;
        });
        return { ...prev, data: newData };
      });
    });
  };
  const handleClickDiscount = (productCode) => {
    const merchandiseCode = productCode + "+" + rowData.code;
    createDiscount({
      merchandiseCode: merchandiseCode,
      discount: discount,
    }).then((res) => {
      if (res.err === 0) {
        setAlert(true);
        setSeverity(CONST.ALERT_SEVERITY.SUCCESS);
        setMessage("Khuyến mãi thành công");
        window.location.reload();
      } else {
        setAlert(true);
        setSeverity(CONST.ALERT_SEVERITY.ERROR);
        setMessage("Khuyến mãi thất bại");
      }
    });
  };
  const handleChangeDiscount = (e) => {
    setDiscount(e.target.value);
  };
  const handleCancelDiscount = (productCode) => {
    const merchandiseCode = productCode + "+" + rowData.code;
    cancelDiscount({
      merchandiseCode: merchandiseCode,
    }).then((res) => {
      if (res.err === 0) {
        setAlert(true);
        setSeverity(CONST.ALERT_SEVERITY.SUCCESS);
        setMessage("Hủy khuyến mãi thành công");
        // window.location.reload();
      } else {
        setAlert(true);
        setSeverity(CONST.ALERT_SEVERITY.ERROR);
        setMessage("Hủy khuyến mãi thất bại");
      }
    });
  };
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {rowData.code}
        </TableCell>
        <TableCell align="center">{rowData.count}</TableCell>
        <TableCell align="center">{rowData.supplier}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell className="font-bold">Hạn sử dụng</TableCell>
                    <TableCell className="font-bold">Mã sản phẩm</TableCell>
                    <TableCell align="center" className="font-bold">
                      Số lượng
                    </TableCell>
                    <TableCell align="center" className="font-bold">
                      Giá nhập
                    </TableCell>
                    <TableCell align="center" className="font-bold">
                      Tồn kho
                    </TableCell>
                    <TableCell align="center" className="font-bold">
                      Trạng thái
                    </TableCell>
                    <TableCell align="center" className="font-bold">
                      Khuyến mãi
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rowData.data &&
                    rowData.data.map((DetailRow) => (
                      <TableRow key={DetailRow.productCode}>
                        <TableCell component="th" scope="row">
                          {formatDateTime(DetailRow.expiryDate)}
                        </TableCell>
                        <TableCell>{DetailRow.productCode}</TableCell>
                        <TableCell align="center">
                          {DetailRow.quantity}
                        </TableCell>
                        <TableCell align="center"> {DetailRow.cost}</TableCell>
                        <TableCell align="center">
                          {DetailRow.inventory}
                        </TableCell>
                        <TableCell align="center">
                          <FormControlLabel
                            control={
                              <Switch
                                checked={
                                  DetailRow.status ===
                                  CONST.STATUS_PRODUCT.ACTIVE
                                }
                                inputProps={{
                                  "aria-label": "controlled",
                                }}
                                onChange={() =>
                                  handleChangeStatusProduct(
                                    DetailRow.productCode + "+" + rowData.code,
                                  )
                                }
                              />
                            }
                            label={
                              DetailRow.status === CONST.STATUS_PRODUCT.ACTIVE
                                ? "Hoạt động"
                                : "Ngừng hoạt động"
                            }
                          />
                        </TableCell>
                        <TableCell align="center">
                          {DetailRow.expired === true &&
                            DetailRow.promotion === false &&
                            DetailRow.status ===
                              CONST.STATUS_PRODUCT.ACTIVE && (
                              <Box className="flex flex-row items-center">
                                <TextField
                                  placeholder="Nhập % khuyến mãi"
                                  type="Number"
                                  onChange={handleChangeDiscount}
                                />
                                <Button
                                  variant="outlined"
                                  className="ml-2 bg-green-500 text-white "
                                  onClick={() =>
                                    handleClickDiscount(DetailRow.productCode)
                                  }
                                >
                                  Khuyến mãi
                                </Button>
                              </Box>
                            )}
                          {DetailRow.promotion === true && (
                            <Box>
                              <Typography className="text-red-500">
                                Đang KM với giá{" "}
                                {formatCurrency(DetailRow.priceDiscount)}
                              </Typography>
                              <Button
                                variant="outlined"
                                className="bg-red-500 text-white "
                                onClick={() =>
                                  handleCancelDiscount(DetailRow.productCode)
                                }
                              >
                                Huỷ khuyển mãi
                              </Button>
                            </Box>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <Snackbar
        open={alert}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        severity={severity}
      >
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
    </React.Fragment>
  );
}
Row.propTypes = {
  row: PropTypes.shape({
    code: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    supplier: PropTypes.number.isRequired,
    productList: PropTypes.arrayOf(
      PropTypes.shape({
        expiryDate: PropTypes.string.isRequired,
        productCode: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        cost: PropTypes.number.isRequired,
        inventory: PropTypes.number.isRequired,
        status: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

export const TableComsignment = () => {
  const [openAdd, setOpenAdd] = React.useState(false);
  const [infoComsignment, setInfoComsignment] = React.useState({});
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState({});
  const [alert, setAlert] = useState(false);
  const [severity, setSeverity] = useState(CONST.ALERT_SEVERITY.SUCCESS);
  const [message, setMessage] = useState("");
  useEffect(() => {
    getComsignments().then((res) => {
      setData(res.data.data);
      console.log(res.data);
    });
  }, [alert]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [alert]);
  const rows = data.map((comsignment) => {
    return createData(
      comsignment.purrPetCode,
      comsignment.productList.length,
      comsignment.supplierCode,
      comsignment.productList,
    );
  });

  const handleAddComsignment = () => {
    setOpenAdd(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAdd(false);
    setError({});
  };
  const handleDatacreate = (data) => {
    setInfoComsignment(data);
  };
  const handleImportGoods = () => {
    if (!infoComsignment.supplierCode) {
      setError({ ...error, supplierCode: true });
      return;
    }
    if (!infoComsignment.productList) {
      setError({ ...error, productCode: true });
      return;
    }
    createComsignment(infoComsignment).then((res) => {
      console.log(res);
      setInfoComsignment({});
      if (res.err === 0) {
        setAlert(true);
        setSeverity(CONST.ALERT_SEVERITY.SUCCESS);
        setMessage("Tạo lô hàng thành công");
      } else {
        setAlert(true);
        setSeverity(CONST.ALERT_SEVERITY.ERROR);
        setMessage("Tạo lô hàng thất bại");
      }
    });
    setOpenAdd(false);
  };

  return (
    <Box>
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        className="relative m-5"
        onClick={handleAddComsignment}
      >
        Nhập hàng
      </Button>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          marginBottom: "30px",
        }}
      >
        <Box
          sx={{
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 2,
          }}
        >
          <Box
            sx={{
              backgroundColor: "#f3f4f6",
              borderRadius: "5px",
              textAlign: "center",
            }}
          >
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell className="text-lg font-bold">Mã lô</TableCell>
                    <TableCell align="center" className="text-lg font-bold">
                      Số lượng
                    </TableCell>
                    <TableCell align="center" className="text-lg font-bold">
                      Mã nhà cung cấp
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <Row key={row.code} row={row} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
      <Dialog open={openAdd} onClose={handleCloseAddDialog}>
        <DialogTitle className="bg-gray-400 p-5 text-center font-bold">
          NHẬP HÀNG
        </DialogTitle>
        <DialogContent className="pb-0">
          <CreateComsignment
            infoComsignment={infoComsignment}
            createComsignment={handleDatacreate}
            err={error}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Hủy</Button>
          <Button onClick={handleImportGoods}>Tạo</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={alert}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        severity={severity}
      >
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
    </Box>
  );
};
