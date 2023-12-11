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
import { getBookingSpaByCustomer } from "../../api/bookingSpa";
import { Link } from "react-router-dom";
import { formatCurrency, formatDateTime } from "../../utils/formatData";
import { MiniHoverButton } from "../Button/StyledButton";

export const SpaHistory = () => {
  const [bSpas, setBSpas] = useState([]);
  const [tabSpa, setTabSpa] = useState(0);
  useEffect(() => {
    //api get booking spa by customer
    getBookingSpaByCustomer().then((res) => {
      console.log(res);
      if (res.err === 0) {
        setBSpas(res.data);
      }
    });
  }, []);

  const status = Object.values(CONST.STATUS_BOOKING)[tabSpa];
  const bSpaByStatus = bSpas.filter((bSpa) => bSpa.status === status);

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
            return <Tab label={value} key={value} />;
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
    </Paper>
  );
};
