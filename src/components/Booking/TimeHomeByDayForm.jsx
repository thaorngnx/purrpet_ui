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
import { getBookingSpas } from "../../api/bookingSpa";

export const TimeHomeByDayForm = ({
  bookingInfo,
  slots,
  timeStart,
  timeEnd,
  timeStep,
  setOpenCustomerInfoForm,
  updateBookingInfo,
}) => {
  const [validTime, setValidTime] = useState([]);
  const [openTimePicker, setOpenTimePicker] = useState(false);
  const [openCustomerInfoForm, OpenCustomerInfoForm] = useState(false);
  return (
    <FormControl>
      <FormLabel className="flex font-bold text-black">
        Chọn ngày đặt phòng:
      </FormLabel>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Ngày vào"
          name="dateCheckIn"
          value={bookingInfo.dateCheckIn}
          onChange={handleDateCheckInChange}
          views={["year", "month", "day"]}
          format="DD/MM/YYYY"
          minDate={dayjs()}
        />
        {bookingInfo.dateCheckIn !== "" && (
          <DatePicker
            label="Ngày ra"
            name="dateCheckOut"
            value={bookingInfo.dateCheckOut}
            onChange={handleDateCheckOutChange}
            views={["year", "month", "day"]}
            format="DD/MM/YYYY"
            minDate={bookingInfo.dateCheckIn}
          />
        )}
      </LocalizationProvider>
    </FormControl>
  );
};
