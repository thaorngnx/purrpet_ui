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
import { getBookingSpaByCustomer } from "../../api/bookingSpa";
import { Link } from "react-router-dom";
import { formatCurrency, formatDateTime } from "../../utils/formatData";

export const SpaHistory = () => {
  const handleTabSpaClick = (event) => {
    const status = event.target.innerText;
    for (const [key, value] of Object.entries(CONST.STATUS_BOOKING)) {
      if (value.toUpperCase() === status) {
        const bSpaByStatus = bSpas.filter((bSpa) => bSpa.status === value);
        setBSpaByStatus(bSpaByStatus);
      }
    }
  };

  const [bSpas, setBSpas] = useState([]);
  const [bSpaByStatus, setBSpaByStatus] = useState([]);
  const [tabSpa, setTabSpa] = useState(0);
  useEffect(() => {
    //get status in constant by tab index
    const status = Object.values(CONST.STATUS_BOOKING)[tabSpa];
    //api get booking spa by customer
    getBookingSpaByCustomer().then((res) => {
      console.log(res);
      if (res.err === 0) {
        setBSpas(res.data);
        const waittingForPayBSpa = res.data.filter(
          (bSpa) => bSpa.status === status,
        );
        setBSpaByStatus(waittingForPayBSpa);
      }
    });
  }, []);
  return (
    <Paper className="mb-10 w-[90%]">
      <Typography variant="h6" className="m-3 text-center text-lg font-bold">
        SPA
      </Typography>
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
          {Object.values(CONST.STATUS_BOOKING).map((value) => {
            return (
              <Tab label={value} key={value} onClick={handleTabSpaClick} />
            );
          })}
        </Tabs>
        <Box className="flex max-h-96 flex-col overflow-auto">
          <List>
            <ListItem className="flex">
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
              <Typography
                variant="body1"
                className="w-1/6 text-center font-bold"
              >
                Thao tác
              </Typography>
            </ListItem>
            {bSpaByStatus.map((bookingSpa) => {
              return (
                <ListItem key={bookingSpa.id} className="flex justify-center">
                  <Box className="flex w-full flex-col">
                    <Box className="mb-2 flex flex-row items-center">
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
                      <Box className="flex w-1/6 justify-center px-1 text-center">
                        <Button
                          component={Link}
                          to={`/bookingSpa/${bookingSpa.purrPetCode}`}
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
