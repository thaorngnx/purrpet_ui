import {
  Button,
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

export const TimeSpaForm = ({
  bookingInfo,
  setOpenCustomerInfoForm,
  updateBookingInfo,
}) => {
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
      console.log("rés", res);
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
  const [validTime, setValidTime] = useState([]);
  const [openTimePicker, setOpenTimePicker] = useState(false);
  const [openCustomerInfoForm, OpenCustomerInfoForm] = useState(false);
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
        <FormLabel className="flex font-bold text-black">
          Chọn giờ đặt lịch:
        </FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            name="bookingDate"
            value={bookingInfo.bookingDate}
            onChange={handleBookingDateChange}
            views={["year", "month", "day"]}
            format="DD/MM/YYYY"
            minDate={dayjs()}
          />
        </LocalizationProvider>
        {openTimePicker && validTime && validTime.length === 0 && (
          <Typography variant="body1" className="text-red-500">
            Hết chỗ
          </Typography>
        )}
        {openTimePicker && validTime && validTime.length > 0 && (
          <TextField
            select
            required
            name="bookingTime"
            value={bookingInfo.bookingTime}
            onChange={handleChangeBookingTime}
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
      {!openCustomerInfoForm && (
        <Button
          variant="outlined"
          className="w-fit"
          onClick={handleOpenCustomerInfoForm}
        >
          Tiếp tục
        </Button>
      )}
    </Paper>
  );
};
