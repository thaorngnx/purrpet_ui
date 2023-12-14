import { Box, Typography } from "@mui/material";
import React from "react";
import { getreportSpa } from "../../api/spa";
import { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import PieChart from "./Pie";

export const PieSpa = () => {
  const [dataSpa, setDataSpa] = useState({
    labels: ["Chó", "Mèo"],
    datasets: [
      {
        label: "Số lượng",
        data: [0, 0],
        backgroundColor: ["#c38154", "#f9e0bb"],
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  });
  const [dataNameSpa, setDataNameSpa] = useState({
    labels: ["Silver", "Platium", "Gold", "Diamond"],
    datasets: [
      {
        label: "Số lượng",
        data: [0, 0],
        backgroundColor: ["#c38154", "#f9e0bb", "#ffeb3b", "#ffc107"],
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
  const reloadPieSpaData = () => {
    getreportSpa({
      fromDate: fromDate,
      toDate: toDate,
    })
      .then((res) => {
        const data = res.bySpaType;
        const homeStayType = Object.keys(data);
        const totalQuantity1 = Object.values(data);
        const data2 = res.bySpaName;
        const homeStayNames = Object.keys(data2);
        const totalQuantity2 = Object.values(data2);
        setDataSpa({
          labels: homeStayType,
          datasets: [
            {
              label: "Số lượt đặt",
              data: totalQuantity1,
              backgroundColor: ["#c38154", "#f9e0bb"],
              borderColor: "black",
              borderWidth: 1,
            },
          ],
        });
        setDataNameSpa({
          labels: homeStayNames,
          datasets: [
            {
              label: "Số lượt đặt",
              data: totalQuantity2,
              backgroundColor: ["#ff5722", "#f9e0bb", "#ffeb3b", "#ffc107"],
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
    reloadPieSpaData(fromDate, toDate);
  }, [fromDate, toDate]);

  return (
    <Box sx={{ my: 3 }}>
      <Typography variant="h5" className="my-3 text-xl font-bold">
        3. Thống kê loại spa đã đặt
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
      <Box className="flex w-[40%]">
        <PieChart chartData={dataSpa} />
        <PieChart chartData={dataNameSpa} />
      </Box>
    </Box>
  );
};
