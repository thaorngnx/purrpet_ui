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
} from "@mui/material";
import * as CONST from "../../constants";
import { useEffect, useState } from "react";
import { getBookingHomes } from "../../api/bookingHome";
import { Link } from "react-router-dom";
import { formatCurrency, formatDateTime } from "../../utils/formatData";
import { MiniHoverButton } from "../Button/StyledButton";

export const HomeHistory = () => {
  const [resBHomes, setResBHomes] = useState([]);
  const [tabHome, setTabHome] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const params = {
      limit: 10,
      page: page,
      // key: categoryCode || searchKey,
      // order: sort,
    };
    //api get booking home
    getBookingHomes(params).then((res) => {
      console.log(res);
      if (res.err === 0) {
        setResBHomes(res);
      }
    });
  }, [page]);

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

  return (
    <Paper className="mb-10 w-[97%]">
      <Typography variant="h6" className="m-3 text-center text-lg font-bold">
        HOMESTAY
      </Typography>
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
              <Typography variant="body1" className="w-1/6 font-bold">
                Mã đặt phòng
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
                        <Typography variant="body1" className="w-1/6 px-1">
                          {bookingHome.purrPetCode}
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
                            to={`/bookingHome/${bookingHome.purrPetCode}`}
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
      {totalPage > 0 && (
        <Box className="m-2 flex justify-end">
          <Pagination count={totalPage} onChange={handleChangePage} />
        </Box>
      )}
    </Paper>
  );
};
