import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  List,
  ListItem,
  Divider,
} from "@mui/material";
import * as CONST from "../../constants";
import { useEffect, useState } from "react";
import { getBookingHomeByCustomer } from "../../api/bookingHome";
import { Link } from "react-router-dom";
import { formatCurrency, formatDateTime } from "../../utils/formatData";
import { MiniHoverButton } from "../Button/StyledButton";

export const HomeHistory = () => {
  const [bHomes, setBHomes] = useState([]);
  const [tabHome, setTabHome] = useState(0);

  useEffect(() => {
    //api get booking home by customer
    getBookingHomeByCustomer().then((res) => {
      console.log(res);
      if (res.err === 0) {
        setBHomes(res.data);
      }
    });
  }, []);

  const status = Object.values(CONST.STATUS_BOOKING)[tabHome];
  const bHomeByStatus = bHomes.filter((bHome) => bHome.status === status);

  return (
    <Paper className="mb-10 w-[90%]">
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
          {Object.values(CONST.STATUS_BOOKING).map((value) => {
            return <Tab label={value} key={value} />;
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
                Ngày check-in
              </Typography>
              <Typography
                variant="body1"
                className="w-1/6 text-center font-bold"
              >
                Ngày check-out
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
              <Typography
                variant="body1"
                className="w-1/6 text-center font-bold"
              >
                Thao tác
              </Typography>
            </ListItem>
            {bHomeByStatus.map((bookingHome) => {
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
    </Paper>
  );
};
