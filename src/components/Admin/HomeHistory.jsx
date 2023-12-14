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
import { getBookingHomes } from "../../api/bookingHome";
import { Link } from "react-router-dom";
import { formatCurrency, formatDateTime } from "../../utils/formatData";
import { MiniHoverButton, MiniIconRoundButton } from "../Button/StyledButton";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export const HomeHistory = () => {
  const [resBHomes, setResBHomes] = useState([]);
  const [tabHome, setTabHome] = useState(0);
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
    //api get booking home
    getBookingHomes(params).then((res) => {
      console.log(res);
      if (res.err === 0) {
        setResBHomes(res);
      }
    });
  }, [page, searchKey, rangeDate]);

  const bHomes = resBHomes.data;
  let totalPage = resBHomes.totalPage;

  let bHomeByStatus = [];

  if (tabHome === 0) {
    bHomeByStatus = bHomes;
  } else {
    const status = Object.values(CONST.STATUS_BOOKING)[tabHome - 1];
    bHomeByStatus = bHomes?.filter((bHome) => bHome.status === status) || [];
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
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
      <Typography variant="h6" className="m-3 text-center text-lg font-bold">
        QUẢN LÝ ĐẶT PHÒNG
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
                <MiniIconRoundButton
                  onClick={() => {
                    setSearchKey("");
                  }}
                >
                  <HighlightOffIcon />
                </MiniIconRoundButton>
              </Tooltip>
            )}
          </Box>
        </FormControl>
        <FormControl className="flex w-1/2 flex-col pl-10">
          <FormLabel className="mb-2 font-bold text-black">Ngày vào:</FormLabel>
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
                <MiniIconRoundButton
                  onClick={() => {
                    setRangeDate({
                      fromDate: null,
                      toDate: null,
                    });
                  }}
                >
                  <HighlightOffIcon />
                </MiniIconRoundButton>
              </Tooltip>
            )}
          </Box>
        </FormControl>
      </Box>
      <Box className="flex flex-col">
        <Tabs
          value={tabHome}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          onChange={(event, newValue) => {
            setTabHome(newValue);
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
              <Typography
                variant="body1"
                className="w-1/6 text-center font-bold"
              >
                Mã đặt phòng
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
                Ngày vào
              </Typography>
              <Typography
                variant="body1"
                className="w-1/6 text-center font-bold"
              >
                Ngày ra
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
                Mã phòng
              </Typography>
              <Typography
                variant="body1"
                className="w-1/6 text-center font-bold"
              >
                Tổng tiền
              </Typography>
              {tabHome === 0 && (
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
            {bHomeByStatus?.length > 0 &&
              bHomeByStatus.map((bookingHome) => {
                return (
                  <ListItem
                    key={bookingHome.purrPetCode}
                    className="flex justify-center"
                  >
                    <Box className="flex w-full flex-col">
                      <Box className="mb-2 flex flex-row items-center">
                        <Typography
                          variant="body1"
                          className="w-1/6 px-1 text-center"
                        >
                          {bookingHome.purrPetCode}
                        </Typography>
                        <Typography
                          variant="body1"
                          className="w-1/6 px-1 text-center"
                        >
                          {bookingHome.customerCode}
                        </Typography>
                        <Typography
                          variant="body1"
                          className="w-1/6 px-1 text-center"
                        >
                          {formatDateTime(bookingHome.dateCheckIn)}
                        </Typography>
                        <Typography
                          variant="body1"
                          className="w-1/6 px-1 text-center"
                        >
                          {formatDateTime(bookingHome.dateCheckOut)}
                        </Typography>
                        <Typography
                          variant="body1"
                          className="w-1/6 px-1 text-center"
                        >
                          {bookingHome.petName}
                        </Typography>
                        <Typography
                          variant="body1"
                          className="w-1/6 px-1 text-center"
                        >
                          {bookingHome.homeCode}
                        </Typography>
                        <Typography
                          variant="body1"
                          className="w-1/6 px-1 text-right"
                        >
                          {formatCurrency(bookingHome.bookingHomePrice)}
                        </Typography>
                        {tabHome === 0 && (
                          <Typography
                            variant="body1"
                            className="w-1/6 px-1 text-center"
                          >
                            {bookingHome.status}
                          </Typography>
                        )}
                        <Box className="flex w-1/6 justify-center px-1 text-center">
                          <MiniHoverButton
                            component={Link}
                            to={`${bookingHome.purrPetCode}`}
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
      {bHomeByStatus?.length === 0 && (
        <Typography variant="h6" className="m-3 text-center text-base italic">
          Không có dữ liệu
        </Typography>
      )}
      {totalPage > 1 && (
        <Box className="m-2 flex justify-end">
          <Pagination count={totalPage} onChange={handleChangePage} />
        </Box>
      )}
    </>
  );
};
