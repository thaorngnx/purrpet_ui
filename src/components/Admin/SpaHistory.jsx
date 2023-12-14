import {
  Box,
  Typography,
  Tabs,
  Tab,
  List,
  ListItem,
  Divider,
  Paper,
  Pagination,
  TextField,
  FormControl,
  FormLabel,
  Tooltip,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import * as CONST from "../../constants";
import { useEffect, useState } from "react";
import { getBookingSpas } from "../../api/bookingSpa";
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

export const SpaHistory = () => {
  const [resBSpas, setResBSpas] = useState([]);
  const [tabSpa, setTabSpa] = useState(0);
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
    //api get booking spa
    getBookingSpas(params).then((res) => {
      console.log(res);
      if (res.err === 0) {
        setResBSpas(res);
      }
    });
  }, [page, searchKey, rangeDate]);

  const bSpas = resBSpas.data;
  let totalPage = resBSpas.totalPage;

  let bSpaByStatus = [];

  if (tabSpa === 0) {
    bSpaByStatus = bSpas;
  } else {
    const status = Object.values(CONST.STATUS_BOOKING)[tabSpa - 1];
    bSpaByStatus = bSpas?.filter((bSpa) => bSpa.status === status) || [];
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

  return (
    <>
      <Typography variant="h6" className="m-3 text-center text-xl font-bold">
        QUẢN LÝ ĐẶT LỊCH SPA
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
          <FormLabel className="mb-2 font-bold text-black">Ngày hẹn:</FormLabel>
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
          value={tabSpa}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          onChange={(event, newValue) => {
            setTabSpa(newValue);
          }}
        >
          <Tab
            label="Tất cả"
            sx={{
              fontSize: "13px",
            }}
          />
          {Object.values(CONST.STATUS_BOOKING).map((value) => {
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
              <Typography variant="body1" className="w-1/6 font-bold">
                Mã đặt lịch
              </Typography>
              <Typography
                variant="body1"
                className="w-1/6 text-center font-bold"
              >
                Mã KH
              </Typography>
              <Typography
                variant="body1"
                className="w-1/6 text-center font-bold"
              >
                Giờ hẹn
              </Typography>
              <Typography
                variant="body1"
                className="w-1/6 text-center font-bold"
              >
                Tên thú cưng
              </Typography>
              <Typography
                variant="body1"
                className="w-1/6 text-center font-bold"
              >
                Mã spa
              </Typography>
              <Typography
                variant="body1"
                className="w-1/6 text-center font-bold"
              >
                Tổng tiền
              </Typography>
              {tabSpa === 0 && (
                <Typography
                  variant="body1"
                  className="w-1/6 text-center font-bold"
                >
                  Trạng thái
                </Typography>
              )}
              <Typography
                variant="body1"
                className="w-1/6 text-center font-bold"
              >
                Thao tác
              </Typography>
            </ListItem>
            {bSpaByStatus?.length > 0 &&
              bSpaByStatus.map((bookingSpa) => {
                return (
                  <ListItem
                    key={bookingSpa.purrPetCode}
                    className="flex justify-center"
                  >
                    <Box className="flex w-full flex-col">
                      <Box className="mb-2 flex flex-row items-center">
                        <Typography variant="body1" className="w-1/6 px-1">
                          {bookingSpa.purrPetCode}
                        </Typography>
                        <Typography
                          variant="body1"
                          className="w-1/6 px-1 text-center"
                        >
                          {bookingSpa.customerCode}
                        </Typography>
                        <Typography
                          variant="body1"
                          className="w-1/6 px-1 text-center"
                        >
                          {bookingSpa.bookingTime}{" "}
                          {formatDateTime(bookingSpa.bookingDate)}
                        </Typography>
                        <Typography
                          variant="body1"
                          className="w-1/6 px-1 text-center"
                        >
                          {bookingSpa.petName}
                        </Typography>
                        <Typography
                          variant="body1"
                          className="w-1/6 px-1 text-center"
                        >
                          {bookingSpa.spaCode}
                        </Typography>
                        <Typography
                          variant="body1"
                          className="w-1/6 px-1 text-right"
                        >
                          {formatCurrency(bookingSpa.bookingSpaPrice)}
                        </Typography>
                        {tabSpa === 0 && (
                          <Typography
                            variant="body1"
                            className="w-1/6 text-center"
                          >
                            {bookingSpa.status}
                          </Typography>
                        )}
                        <Box className="flex w-1/6 justify-center px-1 text-center">
                          <MiniHoverButton
                            component={Link}
                            to={`${bookingSpa.purrPetCode}`}
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
      {bSpaByStatus?.length === 0 && (
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
