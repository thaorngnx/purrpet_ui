import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  List,
  ListItem,
  Divider,
  Pagination,
  TextField,
  FormControl,
  FormLabel,
  Tooltip,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import * as CONST from "../../constants";
import { useEffect, useState } from "react";
import { getOrders } from "../../api/order";
import { Link } from "react-router-dom";
import { formatCurrency, formatDateTime } from "../../utils/formatData";
import {
  MiniHoverButton,
  MiniRemoveIconRoundXButton,
} from "../Button/StyledButton";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export const OrderHistory = () => {
  const [resOrders, setResOrders] = useState([]);
  const [tabOrder, setTabOrder] = useState(0);
  const [page, setPage] = useState(0);
  const [searchKey, setSearchKey] = useState("");
  const [rangeDate, setRangeDate] = useState({
    fromDate: null,
    toDate: null,
  });

  useEffect(() => {
    const params = {
      limit: 10,
      page: page,
      key: searchKey,
      fromDate: rangeDate.fromDate,
      toDate: rangeDate.toDate,
    };
    //api get order
    getOrders(params).then((res) => {
      console.log(res);
      if (res.err === 0) {
        setResOrders(res);
      }
    });
  }, [page, searchKey, rangeDate]);

  const orders = resOrders.data;
  let totalPage = resOrders.totalPage;

  let orderByStatus = [];

  if (tabOrder === 0) {
    orderByStatus = orders;
  } else {
    const status = Object.values(CONST.STATUS_ORDER)[tabOrder - 1];
    orderByStatus = orders?.filter((order) => order.status === status) || [];
  }

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleSearch = (event) => {
    setSearchKey(event.target.value);
  };

  const handleFromDateChange = (date) => {
    setRangeDate({
      fromDate: date,
      toDate: null,
    });
  };

  const handleToDateChange = (date) => {
    setRangeDate({
      ...rangeDate,
      toDate: date,
    });
  };

  console.log("searchKey", searchKey);

  return (
    <>
      <Typography variant="h6" className="m-3 text-center text-lg font-bold">
        QUẢN LÝ ĐƠN HÀNG
      </Typography>
      <Box className="mx-4 flex justify-between">
        <FormControl className="flex w-1/2 flex-col pr-20">
          <FormLabel className="mb-2 font-bold text-black">Tìm kiếm:</FormLabel>
          <Box className="flex w-full flex-row items-center">
            <TextField
              id="outlined-basic"
              placeholder="Nhập mã đơn hàng hoặc mã khách hàng"
              variant="outlined"
              value={searchKey}
              onChange={handleSearch}
              className="w-full"
            />
            {searchKey !== "" && (
              <Tooltip title="Xóa từ khóa tìm kiếm" placement="top">
                <MiniRemoveIconRoundXButton
                  onClick={() => {
                    setSearchKey("");
                  }}
                >
                  <HighlightOffIcon />
                </MiniRemoveIconRoundXButton>
              </Tooltip>
            )}
          </Box>
        </FormControl>
        <FormControl className="flex w-1/2 flex-col pl-10">
          <FormLabel className="mb-2 font-bold text-black">
            Thời gian đặt hàng:
          </FormLabel>
          <Box className="flex flex-row items-center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Từ ngày"
                name="fromDate"
                value={rangeDate.fromDate}
                onChange={handleFromDateChange}
                views={["year", "month", "day"]}
                format="DD/MM/YYYY"
                maxDate={dayjs()}
                className="mr-5"
              />
              <DatePicker
                label="Đến ngày"
                name="toDate"
                value={rangeDate.toDate}
                onChange={handleToDateChange}
                views={["year", "month", "day"]}
                format="DD/MM/YYYY"
                minDate={dayjs(rangeDate.fromDate)}
                shouldDisableDate={(date) => {
                  return dayjs(date).isBefore(dayjs(rangeDate.fromDate));
                }}
                maxDate={dayjs()}
                disabled={rangeDate.fromDate === null}
              />
            </LocalizationProvider>
            {rangeDate.toDate !== null && (
              <Tooltip title="Xóa tìm kiếm theo ngày" placement="top">
                <MiniRemoveIconRoundXButton
                  onClick={() => {
                    setRangeDate({
                      fromDate: null,
                      toDate: null,
                    });
                  }}
                >
                  <HighlightOffIcon />
                </MiniRemoveIconRoundXButton>
              </Tooltip>
            )}
          </Box>
        </FormControl>
      </Box>
      <Box className="flex flex-col">
        <Tabs
          value={tabOrder}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          onChange={(event, newValue) => {
            setTabOrder(newValue);
          }}
        >
          <Tab
            label="Tất cả"
            sx={{
              fontSize: "13px",
            }}
          />
          {Object.values(CONST.STATUS_ORDER).map((value) => {
            return (
              <Tab
                label={value}
                key={value}
                sx={{
                  fontSize: "13px",
                }}
              />
            );
          })}
        </Tabs>
        <Box className="flex max-h-96 flex-col overflow-auto">
          <List>
            <ListItem key="title" className="flex">
              <Typography
                variant="body1"
                className="w-1/6 text-center font-bold"
              >
                Mã ĐH
              </Typography>
              <Typography
                variant="body1"
                className="w-1/6 text-center font-bold"
              >
                Mã KH
              </Typography>
              <Typography
                variant="body1"
                className="w-1/5 text-center font-bold"
              >
                Ngày đặt
              </Typography>
              <Typography
                variant="body1"
                className="w-1/5 text-center font-bold"
              >
                SL sản phẩm
              </Typography>
              <Typography
                variant="body1"
                className="w-1/5 text-center font-bold"
              >
                Tổng tiền
              </Typography>
              {tabOrder === 0 && (
                <Typography
                  variant="body1"
                  className="w-1/5 text-center font-bold"
                >
                  Trạng thái
                </Typography>
              )}
              <Typography
                variant="body1"
                className="w-1/5 text-center font-bold"
              >
                Thao tác
              </Typography>
            </ListItem>
            {orderByStatus?.length > 0 &&
              orderByStatus.map((order) => {
                return (
                  <ListItem
                    key={order.purrPetCode}
                    className="flex justify-center"
                  >
                    <Box className="flex w-full flex-col">
                      <Box className="mb-2 flex flex-row items-center">
                        <Typography
                          variant="body1"
                          className="w-1/6 px-1 text-center"
                        >
                          {order.purrPetCode}
                        </Typography>
                        <Typography
                          variant="body1"
                          className="w-1/6 px-1 text-center"
                        >
                          {order.customerCode}
                        </Typography>
                        <Typography
                          variant="body1"
                          className="w-1/5 px-1 text-center"
                        >
                          {formatDateTime(order.createdAt)}
                        </Typography>
                        <Typography
                          variant="body1"
                          className="w-1/5 px-1 text-center"
                        >
                          {order.orderItems.length}
                        </Typography>
                        <Typography
                          variant="body1"
                          className="w-1/5 px-1 text-right"
                        >
                          {formatCurrency(order.orderPrice)}
                        </Typography>
                        {tabOrder === 0 && (
                          <Typography
                            variant="body1"
                            className="w-1/5 px-1 text-center"
                          >
                            {order.status}
                          </Typography>
                        )}
                        <Box className="flex w-1/5 justify-center px-1 text-center">
                          <MiniHoverButton
                            component={Link}
                            to={`${order.purrPetCode}`}
                          >
                            Chi tiết
                          </MiniHoverButton>
                        </Box>
                      </Box>
                      <Divider />
                    </Box>
                  </ListItem>
                );
              })}
          </List>
        </Box>
      </Box>
      {orderByStatus?.length === 0 && (
        <Typography variant="h6" className="m-3 text-center text-base italic">
          Không có dữ liệu
        </Typography>
      )}
      {totalPage > 0 && (
        <Box className="m-2 flex justify-end">
          <Pagination count={totalPage} onChange={handleChangePage} />
        </Box>
      )}
    </>
  );
};
