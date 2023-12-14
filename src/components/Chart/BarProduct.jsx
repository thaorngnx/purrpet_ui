import { Box, Typography } from "@mui/material";
import BarChart from "../../components/Chart/Bar";
import React from 'react';
import {reportProduct} from '../../api/product';
import { useEffect, useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export const BarProduct = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Số lượng',
        data: [],
        backgroundColor: ['#c38154'],
        borderColor: 'black',
        borderWidth: 1,
      },
    ],
    productNames: [],
  });
  const previousDate = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
  const currentDate = dayjs().format('YYYY-MM-DD');
  const [fromDate, setFromDate] = useState(previousDate);
  const [toDate, setToDate] = useState( currentDate);

  const handleFromDateChange = (newValue) => {
    setFromDate(dayjs(newValue).format('YYYY-MM-DD'));
  }

  const handleToDateChange = (newValue) => {
      setToDate(dayjs(newValue).format('YYYY-MM-DD'));
  }

 
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
            label: 'Số lượng bán ra',
            data: totalQuantity,
            backgroundColor: ['#c38154'],
            borderColor: 'black',
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
            const uniqueProductNames = Array.from(new Set(productName.split(' - '))).join(' - ');
            
            return uniqueProductNames;
          }
          return '';
        },
        label: (tooltipItem) => {
          return tooltipItem.formattedValue;
        },
      },
    },
  },
};

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
  return (
    <>
          <Box sx={{ my: 4 }}>
            <Typography variant="h5">1. Thống kê sản phẩm bán chạy</Typography>
            <Typography className="w-[80%] flex mb-[20px]">
              <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DemoContainer components={['DatePicker']} >
                  <DatePicker label="Từ ngày"  onChange={handleFromDateChange} />
                </DemoContainer>
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker label="Đến ngày"  onChange={handleToDateChange}/>
                </DemoContainer>
              </LocalizationProvider>
          </Typography>
          <Box className="w-[60%]">
          <BarChart chartData={chartData} options={options} />
        </Box>
          </Box>
    </>
  );
};