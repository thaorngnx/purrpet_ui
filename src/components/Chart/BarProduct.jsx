import { Box, Typography } from "@mui/material";
import BarChart from "../../components/Chart/Bar";
import React from "react";
import { reportProduct } from "../../api/product";
import { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export const BarProduct = () => {
  const [chartData, setChartData] = useState({
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
    productNames: [],
  });
  const [fromDate, setFromDate] = useState(dayjs().subtract(7, "day"));
  const [toDate, setToDate] = useState(dayjs());

  useEffect(() => {
    reloadChartData(fromDate, toDate);
  }, [fromDate, toDate]);

  useEffect(() => {
    setChartData((prevChartData) => ({
      ...prevChartData,
      productNames: chartData.labels.map((label, index) => {
        return `${label} - ${chartData.productNames[index]}`;
      }),
    }));
  }, [chartData.labels, chartData.productNames]);

  const handleFromDateChange = (newValue) => {
    setFromDate(dayjs(newValue));
  };

  const handleToDateChange = (newValue) => {
    setToDate(dayjs(newValue));
  };

  //product
  const reloadChartData = () => {
    reportProduct({
      fromDate: fromDate,
      toDate: toDate,
    })
      .then((res) => {
        const data = res.data;
        const productNames = data.map((item) => item.productName);
        const productCodes = data.map((item) => item._id);
        const totalQuantity = data.map((item) => item.totalQuantity);
        setChartData({
          labels: productCodes,
          datasets: [
            {
              label: "Số lượng bán ra",
              data: totalQuantity,
              backgroundColor: ["#c38154"],
              borderColor: "black",
              borderWidth: 1,
            },
          ],
          productNames: productNames,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const options = {
    plugins: {
      tooltip: {
        enabled: true,
        intersect: false,
        callbacks: {
          title: (tooltipItems) => {
            if (tooltipItems.length > 0) {
              const index = tooltipItems[0].dataIndex;
              const productName = chartData.productNames[index];

              // Remove duplicate product names
              const uniqueProductNames = Array.from(
                new Set(productName.split(" - ")),
              ).join(" - ");

              return uniqueProductNames;
            }
            return "";
          },
          label: (tooltipItem) => {
            return tooltipItem.formattedValue;
          },
        },
      },
    },
  };

  return (
    <>
      <Box sx={{ my: 3 }}>
        <Typography variant="h5" className="my-3 text-xl font-bold">
          1. Thống kê sản phẩm bán chạy
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
          <BarChart chartData={chartData} options={options} />
        </Box>
      </Box>
    </>
  );
};
