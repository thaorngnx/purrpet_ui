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
} from "@mui/material";
import * as CONST from "../../constants";
import { useEffect, useState } from "react";
import { getBookingSpas } from "../../api/bookingSpa";
import { Link } from "react-router-dom";
import { formatCurrency, formatDateTime } from "../../utils/formatData";
import { MiniHoverButton } from "../Button/StyledButton";

export const SpaHistory = () => {
  const [resBSpas, setResBSpas] = useState([]);
  const [tabSpa, setTabSpa] = useState(0);
  const [page, setPage] = useState(0);

  // const [sort, setSort] = useState("asc");
  useEffect(() => {
    const params = {
      limit: 10,
      page: page,
      //   // key: categoryCode || searchKey,
      //   // order: sort,
    };
    //api get booking spa
    getBookingSpas().then((res) => {
      console.log(res);
      if (res.err === 0) {
        setResBSpas(res);
      }
    });
  }, [page]);

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

  return (
    <Paper className="mb-10 w-[97%]">
      <Typography variant="h6" className="m-3 text-center text-xl font-bold">
        SPA
      </Typography>
      <Box className="flex flex-col">
        <Tabs
          value={tabSpa}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          onChange={(event, newValue) => {
            setTabSpa(newValue);
          }}
          scrollButtons="auto"
          allowScrollButtonsMobile
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
            <ListItem key="title" className="flex justify-around">
              <Typography variant="body1" className="w-1/6 font-bold">
                Mã đặt lịch
              </Typography>
              <Typography
                variant="body1"
                className="w-1/6 text-center font-bold"
              >
                Giờ hẹn
              </Typography>
              <Typography
                variant="body1"
                className="hidden w-1/6 text-center font-bold md:block"
              >
                Tên thú cưng
              </Typography>
              <Typography
                variant="body1"
                className="hidden w-1/6 text-center font-bold md:block"
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
                    className="flex justify-around "
                  >
                    <Box className="flex w-full flex-col ">
                      <Box className="mb-2 flex flex-row items-center justify-around">
                        <Typography variant="body1" className="w-1/6 px-1">
                          {bookingSpa.purrPetCode}
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
                          className="hidden w-1/6 px-1  text-center md:block"
                        >
                          {bookingSpa.petName}
                        </Typography>
                        <Typography
                          variant="body1"
                          className="hidden w-1/6 px-1 text-center md:block"
                        >
                          {bookingSpa.spaCode}
                        </Typography>
                        <Typography
                          variant="body1"
                          className="w-1/6 px-1 text-center"
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
                            to={`/bookingSpa/${bookingSpa.purrPetCode}`}
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
    </Paper>
  );
};
