import { Box, Typography } from "@mui/material";
import React from "react";
import { getTypeHomeStay } from "../../api/homestay";
import { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import LineChart from "../../components/Chart/Line";

export const LineHomeStay = () => {
  const [homeStaydata, setHomeStaydata] = useState({
    labels: [],
    datasets: [
      {
        label: "Số lượng",
        data: [],
        backgroundColor: ["#c38154"],
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  });
  const [fromDate, setFromDate] = useState(dayjs().subtract(7, "day"));
  const [toDate, setToDate] = useState(dayjs());

  const handleFromDateChange = (newValue) => {
    setFromDate(dayjs(newValue));
  };

  const handleToDateChange = (newValue) => {
    setToDate(dayjs(newValue));
  };
  //homestay
  const reloadLineHomestayData = () => {
    getTypeHomeStay({
      fromDate: fromDate,
      toDate: toDate,
    })
      .then((res) => {
        const data = res.data;
        const homeStayNames = Object.keys(data);
        const totalQuantity1 = Object.values(data);
        const data1 = res.datadog;
        const totalQuantity2 = Object.values(data1);
        const data2 = res.datacat;
        const totalQuantity3 = Object.values(data2);

        setHomeStaydata({
          labels: homeStayNames,
          datasets: [
            {
              label: "Tổng lượt đặt",
              data: totalQuantity1,
              backgroundColor: ["#c38154"],
              borderColor: "black",
              borderWidth: 1,
            },
            {
              label: "Số lượng đặt cho chó",
              data: totalQuantity2,
              backgroundColor: ["#2196f3"],
              borderColor: "black",
              borderWidth: 1,
            },
            {
              label: "Số lượng đặt cho mèo",
              data: totalQuantity3,
              backgroundColor: ["#11d131"],
              borderColor: "black",
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    reloadLineHomestayData(fromDate, toDate);
  }, [fromDate, toDate]);

  return (
    <>
      <Box sx={{ my: 3 }}>
        <Typography variant="h5" className="my-3 text-xl font-bold">
          2. Thống kê loại homestay đã đặt
        </Typography>
        <Box className="mb-5 flex flex-row">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Từ ngày"
              value={fromDate}
              onChange={handleFromDateChange}
              format="DD/MM/YYYY"
              maxDate={dayjs()}
              className="mr-5"
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Đến ngày"
              value={toDate}
              onChange={handleToDateChange}
              format="DD/MM/YYYY"
              maxDate={dayjs()}
              minDate={dayjs(fromDate)}
            />
          </LocalizationProvider>
        </Box>
        <Box className="w-[80%]">
          <LineChart chartData={homeStaydata} />
        </Box>
      </Box>
    </>
  );
};
