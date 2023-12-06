import { Box, Typography } from "@mui/material";
import React from 'react';
import {getTypeHomeStay} from '../../api/homestay';
import { useEffect, useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import LineChart from "../../components/Chart/Line";

export const LineHomeStay = () => {
 

  const [homeStaydata, setHomeStaydata] = useState({
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
});
  const previousDate = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
  const currentDate = dayjs().format('YYYY-MM-DD');
  const [fromDateForHome, setFromDateForHome] = useState(previousDate);
  const [toDateForHome, setToDateForHome] = useState(currentDate);

  const handleFromDateChange1 = (newValue) => {
    setFromDateForHome(dayjs(newValue).format('YYYY-MM-DD'));
  }

  const handleToDateChange1 = (newValue) => {
      setToDateForHome(dayjs(newValue).format('YYYY-MM-DD'));
  }
//homestay
const reloadLineHomestayData = () => {
  getTypeHomeStay({
    fromDate: fromDateForHome,
    toDate: toDateForHome,
  }).then((res) => {
    const data = res.data;
    const homeStayNames = Object.keys(data) ;
    const totalQuantity1 = Object.values(data);
    const data1 = res.datadog;
    const totalQuantity2 = Object.values(data1);
    const data2 = res.datacat;
    const totalQuantity3 = Object.values(data2);

      setHomeStaydata({
        labels: homeStayNames,
        datasets: [
          {
            label: 'Tổng lượt đặt',
            data: totalQuantity1,
            backgroundColor: ['#c38154'],
            borderColor: 'black',
            borderWidth: 1,
          },
          {
            label: 'Số lượng đặt cho chó',
            data: totalQuantity2,
            backgroundColor: ['#2196f3'],
            borderColor: 'black',
            borderWidth: 1,
          },
          {
            label: 'Số lượng đặt cho mèo',
            data: totalQuantity3,
            backgroundColor: ['#11d131'],
            borderColor: 'black',
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
    reloadLineHomestayData(fromDateForHome, toDateForHome);
  }, [fromDateForHome, toDateForHome]);

  return (
    <>
          <Box sx={{ my: 4 }}>
            <Typography variant="h5">2. Thống kê loại homestay đã đặt</Typography>
            <Typography className="w-[80%] flex mb-[20px]">
              <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DemoContainer components={['DatePicker']} >
                  <DatePicker label="Từ ngày"  onChange={handleFromDateChange1} />
                </DemoContainer>
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker label="Đến ngày"  onChange={handleToDateChange1}/>
                </DemoContainer>
              </LocalizationProvider>
           
          </Typography>
          <Box className="w-[60%]">
          <LineChart chartData={homeStaydata} />
          </Box>
          </Box>
    </>
  );
};