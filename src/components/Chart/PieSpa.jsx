import { Box, Typography } from "@mui/material";
import React from 'react';
import {reportPruduct} from '../../api/product';
import {getTypeHomeStay} from '../../api/homestay';
import { getreportSpa } from "../../api/spa";
import { useEffect, useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import PieChart from "./Pie";

export const PieSpa = () => {
 

    const [dataSpa, setDataSpa] = useState({
        labels: ['Chó', 'Mèo'],
        datasets: [
            {
                label: 'Số lượng',
                data: [0, 0],
                backgroundColor: ['#c38154', '#f9e0bb'],
                borderColor: 'black',
                borderWidth: 1,
            },
        ],
    });
    const [dataNameSpa, setDataNameSpa] = useState({
        labels: ['Silver', 'Platium', 'Gold', 'Diamond'],
        datasets: [
            {
                label: 'Số lượng',
                data: [0, 0],
                backgroundColor: ['#c38154', '#f9e0bb', '#ffeb3b', '#ffc107'],
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
const reloadPieSpaData = () => {
    getreportSpa({
    fromDate: fromDateForHome,
    toDate: toDateForHome,
  }).then((res) => {
    const data = res.bySpaType;
    const homeStayType = Object.keys(data) ;
    const totalQuantity1 = Object.values(data);
    const data2 = res.bySpaName;
    const homeStayNames = Object.keys(data2) ;
    const totalQuantity2 = Object.values(data2);
    setDataSpa({
        labels: homeStayType,
        datasets: [
            {
                label: 'Số lượt đặt',
                data: totalQuantity1 ,
                backgroundColor: ['#c38154', '#f9e0bb'],
                borderColor: 'black',
                borderWidth: 1,
            },
        ],
    });
    setDataNameSpa({
        labels:  homeStayNames,
        datasets: [
            {
                label: 'Số lượt đặt',
                data: totalQuantity2,
                backgroundColor: ['#ff5722', '#f9e0bb', '#ffeb3b', '#ffc107'],
                borderColor: 'black',
                borderWidth: 1,
            },
        ],
        
    })
  }).catch((error) => {
    console.log(error);
  });};
  useEffect(() => {
    reloadPieSpaData(fromDateForHome, toDateForHome);
  }, [fromDateForHome, toDateForHome]);

  return (
    <>
          <Box sx={{ my: 4 }}>
            <Typography variant="h5">3. Thống kê loại spa đã đặt</Typography>
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
          <Box className="w-[40%] flex">
          <PieChart chartData= {dataSpa}/>
          <PieChart chartData= {dataNameSpa}/>
          </Box>
          </Box>
    </>
  );
};