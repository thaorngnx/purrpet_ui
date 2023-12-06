import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  List,
  ListItem,
  Divider,
  Button,
} from "@mui/material";
import * as CONST from "../../constants";
import { useEffect, useState } from "react";
import { getBookingHomeByCustomer } from "../../api/bookingHome";
import { Link } from "react-router-dom";
import { formatCurrency, formatDateTime } from "../../utils/formatData";

export const HomeHistory = () => {
  const handleTabHomeClick = (event) => {
    const status = event.target.innerText;
    for (const [key, value] of Object.entries(CONST.STATUS_BOOKING)) {
      if (value.toUpperCase() === status) {
        const bHomeByStatus = bHomes.filter((bHome) => bHome.status === value);
        setBHomeByStatus(bHomeByStatus);
      }
    }
  };

  const [bHomes, setBHomes] = useState([]);
  const [bHomeByStatus, setBHomeByStatus] = useState([]);
  const [tabHome, setTabHome] = useState(0);

  useEffect(() => {
    //get status in constant by tab index
    const status = Object.values(CONST.STATUS_BOOKING)[tabHome];
    //api get booking home by customer
    getBookingHomeByCustomer().then((res) => {
      console.log(res);
      if (res.err === 0) {
        setBHomes(res.data);
        const waittingForPayBHome = res.data.filter(
          (bHome) => bHome.status === status,
        );
        setBHomeByStatus(waittingForPayBHome);
      }
    });
  }, []);
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
            return (
              <Tab label={value} key={value} onClick={handleTabHomeClick} />
            );
          })}
        </Tabs>
        <Box className="flex max-h-96 flex-col overflow-auto">
          <List>
            <ListItem className="flex">
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
                <ListItem key={bookingHome.id} className="flex justify-center">
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
                        <Button
                          component={Link}
                          to={`/bookingHome/${bookingHome.purrPetCode}`}
                          size="small"
                          sx={{
                            color: "black",
                            display: "block",
                            fontWeight: "bold",
                            border: "1px solid black",
                            textTransform: "none",
                            m: 1,
                            ":hover": {
                              backgroundColor: "black",
                              color: "white",
                            },
                            width: "fit-content",
                          }}
                        >
                          Chi tiết
                        </Button>
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
