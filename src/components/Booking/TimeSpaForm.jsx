import {
  Box,
  FormControl,
  FormLabel,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { getAvailableTime } from "../../api/bookingSpa";
import { BigHoverTransformButton } from "../Button/StyledButton";

export const TimeSpaForm = ({
  bookingInfo,
  setOpenCustomerInfoForm,
  updateBookingInfo,
}) => {
  const [validTime, setValidTime] = useState([]);
  const [openTimePicker, setOpenTimePicker] = useState(false);
  const [openCustomerInfoForm, OpenCustomerInfoForm] = useState(false);

  const handleBookingDateChange = (event) => {
    setOpenTimePicker(true);
    const newDate = dayjs(event).startOf("day");
    updateBookingInfo({
      ...bookingInfo,
      bookingDate: newDate,
      bookingTime: "",
    });
    getAvailableTime({
      bookingDate: newDate,
    }).then((res) => {
      if (res.err === 0) {
        setValidTime(res.data);
      } else {
        setValidTime([]);
      }
    });
  };

  const handleChangeBookingTime = (event) => {
    updateBookingInfo({
      ...bookingInfo,
      bookingTime: event.target.value,
    });
  };

  const handleOpenCustomerInfoForm = () => {
    setOpenCustomerInfoForm(true);
    OpenCustomerInfoForm(true);
  };

  return (
    <Paper
      sx={{
        width: "80%",
        ml: "auto",
        mr: "auto",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        p: 5,
        mb: 5,
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        component="div"
        className="text-center font-bold"
      >
        Thời gian đặt lịch
      </Typography>
      <FormControl>
        <FormLabel className="mb-3 flex font-bold text-black">
          Chọn giờ đặt lịch:
        </FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            name="bookingDate"
            label="Ngày hẹn"
            value={bookingInfo.bookingDate}
            onChange={handleBookingDateChange}
            views={["year", "month", "day"]}
            format="DD/MM/YYYY"
            minDate={dayjs()}
          />
        </LocalizationProvider>
        {bookingInfo.bookingDate && validTime && validTime.length === 0 && (
          <Typography variant="body1" className="mt-3 text-red-500">
            Đã hết giờ trống trong ngày này. Vui lòng chọn ngày khác.
          </Typography>
        )}
        {bookingInfo.bookingDate && validTime && validTime.length > 0 && (
          <TextField
            select
            required
            label="Giờ hẹn"
            name="bookingTime"
            value={bookingInfo.bookingTime}
            onChange={handleChangeBookingTime}
            className="my-3"
          >
            {validTime &&
              validTime.map((time) => (
                <MenuItem key={time} value={time}>
                  {time}
                </MenuItem>
              ))}
          </TextField>
        )}
      </FormControl>
      {!openCustomerInfoForm &&
        bookingInfo.bookingDate &&
        bookingInfo.bookingTime !== "" && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <BigHoverTransformButton onClick={handleOpenCustomerInfoForm}>
              Tiếp tục
            </BigHoverTransformButton>
          </Box>
        )}
    </Paper>
  );
};
